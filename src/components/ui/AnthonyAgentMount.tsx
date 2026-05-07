import { useEffect } from 'react'
import { closeAnthonyWidget } from './anthonyAgent'

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

  return (
    <div id="anthony-agent-host" data-open="false" aria-hidden>
      {/* @ts-expect-error - custom element provided by the embed script */}
      <elevenlabs-convai agent-id="agent_4101kqtzr48zewjay0vsqs2h0fwk" />
    </div>
  )
}
