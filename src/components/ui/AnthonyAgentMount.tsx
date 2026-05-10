import { useEffect } from 'react'
import { closeAnthonyWidget } from './anthonyAgent'
import { setVoiceMode } from '../../lib/voiceMode'

/**
 * Mounts a single global <elevenlabs-convai> widget for the whole app.
 *
 * The widget's default floating launcher is visually hidden via the
 * #anthony-agent-host[data-open="false"] rule in index.css. Our custom
 * "Talk to Anthony" CTAs call triggerAnthonyWidget() to programmatically
 * open the conversation; closeAnthonyWidget() collapses it again.
 */
export function AnthonyAgentMount() {
  useEffect(() => {
    // Esc to close the conversation panel back to hidden.
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeAnthonyWidget()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Safety net: if the user closes the call via the widget's own UI
  // (the widget's internal X / hangup), our trigger/close helpers
  // never fire, so voice mode would stay "true" forever and the rest
  // of the page would stay paused. Listen for any plausible end-of-
  // call event the widget might dispatch and flip voice mode off.
  useEffect(() => {
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
  }, [])

  return (
    <div id="anthony-agent-host" data-open="false" aria-hidden>
      {/* @ts-expect-error - custom element provided by the embed script */}
      <elevenlabs-convai agent-id="agent_4101kqtzr48zewjay0vsqs2h0fwk" />
    </div>
  )
}
