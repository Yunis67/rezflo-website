import { useEffect, useState } from 'react'
import { WarmOrb } from './AnthonyVoiceCard'
import { triggerAnthonyWidget } from './anthonyAgent'

/**
 * Sticky floating "Live Demo · Talk to Flo" pill at the bottom-
 * center of the viewport. Clicking it opens the hidden ElevenLabs
 * voice agent.
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
      className={`anthony-fab pointer-events-none fixed inset-x-0 z-50 flex justify-center px-4 transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <button
        type="button"
        onClick={triggerAnthonyWidget}
        className="pointer-events-auto group inline-flex max-w-[calc(100vw-2rem)] items-center gap-2.5 rounded-full bg-white/95 py-2 pl-2 pr-4 text-[0.92rem] font-medium tracking-tight text-neutral-900 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.7)_inset] backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_22px_50px_-12px_rgba(124,58,237,0.55),0_0_0_1px_rgba(255,255,255,0.8)_inset] sm:gap-3 sm:pr-5"
        aria-label="Talk to Flo — open the live voice demo"
      >
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center sm:h-9 sm:w-9">
          <WarmOrb size={32} />
        </span>
        <span className="flex flex-col items-start leading-tight">
          <span className="text-[0.6rem] uppercase tracking-[0.16em] text-neutral-500 sm:text-[0.66rem]">
            Live Demo
          </span>
          <span className="text-[0.88rem] font-semibold text-neutral-900 sm:text-[0.95rem]">
            Talk to Flo
          </span>
        </span>
        <svg
          viewBox="0 0 24 24"
          className="ml-0.5 h-4 w-4 shrink-0 stroke-neutral-700 transition-transform duration-300 group-hover:translate-x-0.5 sm:ml-1"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      </button>
    </div>
  )
}
