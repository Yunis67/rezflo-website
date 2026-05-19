/**
 * Helpers for controlling the single global ElevenLabs ConvAI widget
 * mounted by <AnthonyAgentMount/>.
 *
 * Trigger strategy (in order, all attempted):
 *  1. Reveal the host immediately so the user gets visual feedback
 *     even if every programmatic step below fails.
 *  2. Try the widget's imperative API (open / start / toggle / ...)
 *     — covers every known method name across widget versions.
 *  3. Set common "expand" attributes the widget may react to.
 *  4. Click the shadow-DOM launcher, prioritising buttons whose
 *     aria-label hints at "open/start/talk/call".
 *  5. If the custom element isn't defined yet (embed script still
 *     loading), wait up to 5s with customElements.whenDefined, then
 *     retry the whole sequence a few times with small backoffs.
 *  6. Voice mode is flipped on so videos/marquees pause for the
 *     duration of the call. The flip happens via two independent
 *     channels — setVoiceMode() (React pub/sub used by JS pausing
 *     logic) and setActive() (sets <html data-anthony-active="true">
 *     used by the CSS rules in index.css that pause keyframe-driven
 *     animations).
 */

import { setVoiceMode } from '../../lib/voiceMode'
import { getMicState, setMicState } from '../../lib/micPermission'
import { isInAppBrowser } from '../../lib/inAppBrowser'

const HOST_ID = 'anthony-agent-host'
const WIDGET_TAG = 'elevenlabs-convai'

/**
 * Toggle a global data attribute on <html> while the conversation is
 * active. CSS uses [data-anthony-active="true"] selectors to pause
 * expensive marquees, shader-style animations, and looped transforms
 * so the device's CPU/GPU isn't fighting the WebRTC audio thread.
 */
function setActive(active: boolean): void {
  document.documentElement.dataset.anthonyActive = active ? 'true' : 'false'
}

function findWidget(): HTMLElement | null {
  const host = document.getElementById(HOST_ID)
  if (!host) return null
  return host.querySelector(WIDGET_TAG) as HTMLElement | null
}

function tryImperativeOpen(widget: HTMLElement): boolean {
  const anyWidget = widget as unknown as Record<string, unknown>
  const methods = [
    'open',
    'expand',
    'start',
    'show',
    'toggle',
    'startCall',
    'startConversation',
    'openCall',
    'openConversation',
    'toggleCall',
    'toggleConversation',
  ]
  for (const fn of methods) {
    const m = anyWidget[fn]
    if (typeof m === 'function') {
      try {
        ;(m as () => void).call(widget)
        return true
      } catch {
        /* try next */
      }
    }
  }
  return false
}

function trySetExpandAttributes(widget: HTMLElement): void {
  // Some widget versions watch attributes to drive their open/closed
  // state. These are no-ops if the widget doesn't observe them.
  for (const attr of ['expand', 'expanded', 'open']) {
    try {
      widget.setAttribute(attr, 'true')
    } catch {
      /* ignore */
    }
  }
}

function clickShadowLauncher(el: HTMLElement): boolean {
  // BFS through shadow roots. Prefer launcher-shaped buttons first
  // (aria-label hints at open/start/talk/call), fall back to any
  // interactive element.
  const visited = new Set<ShadowRoot>()
  const queue: (Element | ShadowRoot)[] = [el]
  const candidates: HTMLElement[] = []

  while (queue.length) {
    const node = queue.shift()!
    const root = (node as Element).shadowRoot
    if (root && !visited.has(root)) {
      visited.add(root)
      candidates.push(
        ...Array.from(
          root.querySelectorAll<HTMLElement>('button, [role="button"]'),
        ),
      )
      queue.push(...Array.from(root.children))
    }
    if ('children' in node) queue.push(...Array.from(node.children))
  }

  if (candidates.length === 0) return false

  const launcherHint = /open|start|talk|call|begin|launch/i
  const launcher =
    candidates.find(b => launcherHint.test(b.getAttribute('aria-label') ?? '')) ??
    candidates.find(b => launcherHint.test(b.textContent ?? '')) ??
    candidates[0]

  try {
    launcher.click()
    return true
  } catch {
    return false
  }
}

function attemptOpen(): boolean {
  const widget = findWidget()
  if (!widget) return false
  if (tryImperativeOpen(widget)) return true
  trySetExpandAttributes(widget)
  return clickShadowLauncher(widget)
}

/**
 * Public entry for every "Talk to Flo" CTA. Alven.ai-style gate: if
 * the user hasn't granted the mic yet, this only opens the RezFlo
 * permission card — it does NOT touch ElevenLabs. The widget is only
 * mounted (by AnthonyAgentMount) and opened (via openFloAgentNow,
 * called from there) once mic state is "granted". This guarantees no
 * ElevenLabs / getUserMedia call ever happens on page load or before
 * an explicit user grant — which is what was erroring inside
 * Instagram's in-app browser.
 */
export function triggerAnthonyWidget(): void {
  if (getMicState() === 'granted') {
    void openFloAgentNow()
    return
  }
  // In-app browsers (Instagram / Facebook / TikTok / ...) block the
  // mic at the platform level — getUserMedia would just fail. Skip
  // the attempt entirely and route the user to a real browser, the
  // same way Alven.ai does.
  if (isInAppBrowser()) {
    setMicState('needs-browser')
    return
  }
  // Real browser — show the permission card. Mounting the ElevenLabs
  // element + calling getUserMedia happens later, only after the
  // user taps "Allow Microphone".
  setMicState('asking')
}

/**
 * Actually open the ElevenLabs conversation. Only call this once the
 * <elevenlabs-convai> element is in the DOM (i.e. mic granted and
 * AnthonyAgentMount has rendered it).
 */
export async function openFloAgentNow(): Promise<void> {
  // Step 1 — synchronous visual + state updates so iOS counts the
  // gesture and the user sees feedback even if every later step
  // fails.
  const host = document.getElementById(HOST_ID)
  if (host) host.dataset.open = 'true'
  setVoiceMode(true)
  setActive(true)

  // Step 2 — synchronous open attempt (most common path: script
  // already loaded by the time the user clicks).
  if (attemptOpen()) return

  // Step 3 — wait for the embed script to register the custom
  // element. Cap at 5s so a blocked/failing script doesn't leave
  // the user hanging.
  if (typeof customElements !== 'undefined') {
    try {
      await Promise.race([
        customElements.whenDefined(WIDGET_TAG),
        new Promise(resolve => window.setTimeout(resolve, 5000)),
      ])
    } catch {
      /* ignore */
    }
  }

  // Step 4 — retry a few times to give the widget time to attach
  // its shadow DOM after definition.
  for (let i = 0; i < 8; i++) {
    if (attemptOpen()) return
    await new Promise(resolve => window.setTimeout(resolve, 120))
  }
  // Fall through: host is already visible so the user can click
  // the native widget's launcher themselves.
}

export function closeAnthonyWidget(): void {
  const host = document.getElementById(HOST_ID)
  if (host) host.dataset.open = 'false'
  setVoiceMode(false)
  setActive(false)
}
