/**
 * Helpers for controlling the single global ElevenLabs ConvAI widget
 * mounted by <AnthonyAgentMount/>.
 *
 * Strategy:
 *  - The widget renders its own launcher inside a Shadow DOM. We hide
 *    its default visual chrome via CSS (.anthony-agent-host > * → hidden)
 *    and click its internal launcher button programmatically when the
 *    user hits one of our custom "Talk to Anthony" CTAs.
 *  - If the widget exposes an imperative API (open/expand/start), we
 *    try those first — best-effort, with click fallback.
 */

const HOST_ID = 'anthony-agent-host'

function findWidget(): HTMLElement | null {
  const host = document.getElementById(HOST_ID)
  if (!host) return null
  return host.querySelector('elevenlabs-convai') as HTMLElement | null
}

function clickShadowLauncher(el: HTMLElement): boolean {
  // Reveal the widget UI for the duration of the conversation.
  const host = document.getElementById(HOST_ID)
  if (host) host.dataset.open = 'true'

  // Walk shadow roots looking for the first interactive button.
  const visited = new Set<ShadowRoot>()
  const queue: (Element | ShadowRoot)[] = [el]
  while (queue.length) {
    const node = queue.shift()!
    const root = (node as Element).shadowRoot
    if (root && !visited.has(root)) {
      visited.add(root)
      const btn =
        root.querySelector<HTMLElement>('button, [role="button"]') ?? null
      if (btn) {
        btn.click()
        return true
      }
      queue.push(...Array.from(root.children))
    }
    if ('children' in node) queue.push(...Array.from(node.children))
  }
  return false
}

export function triggerAnthonyWidget(): void {
  const widget = findWidget()
  if (!widget) {
    // Script may not have hydrated yet — retry shortly.
    window.setTimeout(triggerAnthonyWidget, 250)
    return
  }

  // Try imperative APIs first (different widget versions expose
  // different method names; calls are best-effort).
  const anyWidget = widget as unknown as Record<string, unknown>
  for (const fn of ['open', 'expand', 'start', 'show', 'toggle']) {
    const m = anyWidget[fn]
    if (typeof m === 'function') {
      try {
        ;(m as () => void).call(widget)
        const host = document.getElementById(HOST_ID)
        if (host) host.dataset.open = 'true'
        return
      } catch {
        /* fall through to click */
      }
    }
  }

  // Fallback: click the shadow-DOM launcher.
  if (!clickShadowLauncher(widget)) {
    // As an absolute last resort, just reveal the host so the user can
    // click the native widget themselves.
    const host = document.getElementById(HOST_ID)
    if (host) host.dataset.open = 'true'
  }
}

export function closeAnthonyWidget(): void {
  const host = document.getElementById(HOST_ID)
  if (host) host.dataset.open = 'false'
}
