import { useEffect, useState } from 'react'
import { WarmOrb } from './AnthonyVoiceCard'
import { triggerAnthonyWidget } from './anthonyAgent'

/**
 * Sticky floating pill that follows the user down the page.
 * Clicking it opens the same hidden ElevenLabs voice agent.
 *
 * Hidden while the hero voice card is in view, then revealed once
 * the user scrolls past it.
 */
export function AnthonyFloatingButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const target = document.getElementById('anthony-voice-card')
    if (!target) {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.25 },
    )
    obs.observe(target)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      className={`pointer-events-none fixed bottom-5 right-5 z-50 transition-all duration-500 sm:bottom-7 sm:right-7 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <button
        type="button"
        onClick={triggerAnthonyWidget}
        className="pointer-events-auto group relative flex h-[72px] w-[72px] items-center justify-center rounded-full transition-transform duration-300 hover:scale-[1.06] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70"
        aria-label="Talk to Anthony — open the live voice demo"
      >
        <WarmOrb size={72} />
      </button>
    </div>
  )
}
