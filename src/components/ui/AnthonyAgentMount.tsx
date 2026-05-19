import { useEffect } from 'react'
import { closeAnthonyWidget, openFloAgentNow } from './anthonyAgent'
import { setVoiceMode } from '../../lib/voiceMode'
import { useMicState } from '../../lib/micPermission'
import { MicPermissionModal } from './MicPermissionModal'

/**
 * Alven.ai-style gated mount for the ElevenLabs ConvAI widget.
 *
 * The <elevenlabs-convai> element is NOT in the DOM on page load —
 * mounting it is what makes the widget initialise and reach for the
 * mic, which is exactly what was erroring inside Instagram's in-app
 * browser. Instead:
 *
 *  1. "Talk to Flo" → triggerAnthonyWidget() → shows
 *     <MicPermissionModal/> (state "asking").
 *  2. User taps "Allow Microphone" → getUserMedia() runs inside that
 *     click. On success mic state becomes "granted".
 *  3. Only then does this component render <elevenlabs-convai>, and
 *     once it's in the DOM we call openFloAgentNow() to start the
 *     conversation.
 *  4. On denial the modal shows the clean fallback message; the
 *     widget never mounts, so no broken ElevenLabs error.
 */
export function AnthonyAgentMount() {
  const micState = useMicState()
  const widgetMounted = micState === 'granted'

  // Esc closes the conversation panel.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeAnthonyWidget()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Once the widget element is actually in the DOM, open the
  // conversation. Small timeout lets the custom element upgrade +
  // attach its shadow root first.
  useEffect(() => {
    if (!widgetMounted) return
    const t = window.setTimeout(() => {
      void openFloAgentNow()
    }, 80)
    return () => window.clearTimeout(t)
  }, [widgetMounted])

  // Safety net: if the user closes the call via the widget's own UI,
  // our close helper never fires, so flip voice mode off on any
  // plausible end-of-call event. Re-attached whenever the widget
  // (re)mounts.
  useEffect(() => {
    if (!widgetMounted) return
    const host = document.getElementById('anthony-agent-host')
    if (!host) return
    const endEvents = [
      'convai-call-ended',
      'convai-conversation-ended',
      'convai-disconnect',
      'call-ended',
      'conversation-ended',
      'disconnect',
      'close',
      'end',
    ]
    const startEvents = [
      'convai-call-started',
      'convai-conversation-started',
      'convai-connect',
      'call-started',
      'conversation-started',
      'connect',
    ]
    const onEnd = () => setVoiceMode(false)
    const onStart = () => setVoiceMode(true)
    for (const e of endEvents) host.addEventListener(e, onEnd)
    for (const e of startEvents) host.addEventListener(e, onStart)
    return () => {
      for (const e of endEvents) host.removeEventListener(e, onEnd)
      for (const e of startEvents) host.removeEventListener(e, onStart)
    }
  }, [widgetMounted])

  return (
    <>
      <MicPermissionModal />
      {widgetMounted && (
        <div id="anthony-agent-host" data-open="false" aria-hidden>
          {/* @ts-expect-error - custom element provided by the embed script */}
          <elevenlabs-convai agent-id="agent_4101kqtzr48zewjay0vsqs2h0fwk" />
        </div>
      )}
    </>
  )
}
