import { useRef, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { triggerAnthonyWidget } from './anthonyAgent'
import { useIsMobile } from '../../lib/useIsMobile'

/**
 * Premium custom hero voice-agent card. The raw ElevenLabs widget is
 * mounted globally (and visually hidden) by <AnthonyAgentMount/> in
 * App.tsx — this card is fully custom HTML/CSS, and the "Talk to
 * Anthony" button triggers the hidden widget.
 */
export function AnthonyVoiceCard() {
  const cardRef = useRef<HTMLDivElement | null>(null)

  // Holographic cursor-tracking + 3D tilt — same effect used on the
  // scroll-expand video frame.
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotateX = (y - cy) / 22
    const rotateY = (cx - x) / 22
    card.style.setProperty('--holo-x', `${x}px`)
    card.style.setProperty('--holo-y', `${y}px`)
    card.style.setProperty('--holo-opacity', '0.85')
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }
  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    card.style.setProperty('--holo-opacity', '0')
  }

  return (
    <motion.div
      id="anthony-voice-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-[420px]"
    >
      {/* Outer halo — desktop only; on mobile the heavy blur dominates the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[36px] opacity-80 blur-3xl hidden md:block"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 30%, rgba(124,58,237,0.45), transparent 70%)',
        }}
      />

      {/* Glass card — holographic tilt + cursor-tracking glow.
          Mobile drops the backdrop-blur and uses a more opaque solid
          background so the hero video doesn't smear through and create
          the "fake play button" appearance. Desktop keeps the glass. */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-[28px] border border-white/[0.10] px-7 pt-6 pb-8 transition-transform duration-150 ease-out will-change-transform md:backdrop-blur-2xl"
        style={{
          background:
            'linear-gradient(180deg, rgba(20,10,42,0.96) 0%, rgba(8,4,22,0.98) 100%)',
          boxShadow:
            '0 30px 80px -30px rgba(124,58,237,0.55), 0 0 0 1px rgba(167,139,250,0.18) inset',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.20em] text-white/85">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(16,185,129,0.6)]" />
            Live Voice Demo
          </span>
          <span className="text-[0.68rem] tracking-wide text-mist-400">
            Powered by RezFlo
          </span>
        </div>

        {/* Glowing warm orb avatar */}
        <div className="mt-8 flex flex-col items-center text-center">
          <WarmOrb size={108} />
          <h3 className="font-display mt-7 text-[1.55rem] font-medium leading-tight tracking-[-0.01em] text-white">
            Meet Anthony
          </h3>
          <p className="mt-2 max-w-[300px] text-[0.92rem] leading-relaxed text-mist-300">
            Ask Anthony anything — hours, menu, reservations, and more.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-7 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={triggerAnthonyWidget}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[0.95rem] font-semibold tracking-tight text-neutral-900 shadow-[0_14px_30px_-10px_rgba(124,58,237,0.55),0_0_0_1px_rgba(255,255,255,0.7)_inset] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_20px_50px_-12px_rgba(124,58,237,0.85),0_0_0_1px_rgba(255,255,255,0.85)_inset]"
            aria-label="Talk to Anthony — open live voice agent"
          >
            <SparkleIcon />
            Talk to Anthony
          </button>
          <p className="text-[0.7rem] tracking-wide text-mist-400">
            Mic access required • English
          </p>
        </div>

        {/* Holographic cursor-tracking radial glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5] mix-blend-screen transition-opacity duration-200"
          style={{
            opacity: 'var(--holo-opacity, 0)',
            background:
              'radial-gradient(circle 220px at var(--holo-x, 50%) var(--holo-y, 50%), rgba(196,181,253,0.55) 0%, rgba(124,58,237,0.25) 35%, transparent 70%)',
          }}
        />
        {/* Holographic conic shimmer */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[4] mix-blend-overlay transition-opacity duration-200"
          style={{
            opacity: 'var(--holo-opacity, 0)',
            background:
              'conic-gradient(from 180deg at var(--holo-x, 50%) var(--holo-y, 50%), rgba(167,139,250,0) 0deg, rgba(232,121,249,0.35) 90deg, rgba(125,211,252,0.25) 180deg, rgba(167,139,250,0.35) 270deg, rgba(167,139,250,0) 360deg)',
          }}
        />
      </div>
    </motion.div>
  )
}

/* ============================================================
   Metallic purple orb — radiant conic-gradient with slow rotating
   light beams, soft violet halo, and a specular highlight. Used
   in the hero card AND the floating button.
   ============================================================ */
export function WarmOrb({ size = 88 }: { size?: number }) {
  const isMobile = useIsMobile()

  // Mobile: static violet orb. Three concurrent infinite animations
  // (orbSpin conic-gradient + orbPulse halo + orbShimmer specular)
  // were the largest single GPU/CPU cost in the visible part of the
  // page on phones, contributing materially to overall lag. Keeps
  // a glowing violet sphere with a fixed highlight so the brand
  // identity stays intact — just not animated on phones.
  if (isMobile) {
    return (
      <span
        aria-hidden
        className="relative inline-block"
        style={{ width: size, height: size }}
      >
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 30% 25%, #c4b5fd 0%, #7c3aed 35%, #4c1d95 70%, #1f0648 100%)',
            boxShadow:
              '0 0 24px 4px rgba(124,58,237,0.45), inset 0 -8px 18px rgba(20,4,55,0.55), inset 0 6px 14px rgba(255,255,255,0.18)',
          }}
        />
        <span
          className="absolute rounded-full pointer-events-none"
          style={{
            top: '12%',
            left: '20%',
            width: '42%',
            height: '30%',
            background:
              'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.7), transparent 70%)',
            filter: 'blur(2px)',
          }}
        />
      </span>
    )
  }

  return (
    <span
      aria-hidden
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      {/* Outer pulsing halo */}
      <span
        className="absolute inset-[-32%] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(167,139,250,0.65) 0%, rgba(124,58,237,0.30) 38%, transparent 72%)',
          filter: 'blur(10px)',
          animation: 'orbPulse 3.6s ease-in-out infinite',
        }}
      />

      {/* Conic radiant beams — slowly rotating light streaks */}
      <span
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          animation: 'orbSpin 16s linear infinite',
          background:
            'conic-gradient(from 0deg, #3b0d80 0deg, #ffffff 18deg, #6d28d9 40deg, #2a0860 80deg, #ffffff 110deg, #5b21b6 140deg, #1f0648 180deg, #ffffff 210deg, #6d28d9 240deg, #2a0860 280deg, #ffffff 310deg, #3b0d80 360deg)',
          boxShadow:
            '0 0 32px 6px rgba(124,58,237,0.55), inset 0 -10px 22px rgba(20,4,55,0.65), inset 0 6px 16px rgba(255,255,255,0.35)',
        }}
      />

      {/* Glassy core overlay — softens beams and adds depth */}
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(124,58,237,0) 0%, rgba(76,29,149,0.35) 55%, rgba(20,4,55,0.55) 100%)',
        }}
      />

      {/* Specular highlight — subtle gleam, fixed position */}
      <span
        className="absolute rounded-full pointer-events-none"
        style={{
          top: '12%',
          left: '20%',
          width: '42%',
          height: '30%',
          background:
            'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.85), transparent 70%)',
          filter: 'blur(2px)',
          animation: 'orbShimmer 4.8s ease-in-out infinite',
        }}
      />

      <style>{`
        @keyframes orbPulse {
          0%, 100% { opacity: 0.80; transform: scale(1); }
          50%     { opacity: 1;    transform: scale(1.08); }
        }
        @keyframes orbSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbShimmer {
          0%, 100% { opacity: 0.65; }
          50%     { opacity: 1; }
        }
      `}</style>
    </span>
  )
}

function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M12 2.5 13.6 8 19 9.5 13.6 11 12 16.5 10.4 11 5 9.5 10.4 8 12 2.5Z" />
      <path d="M19 14.5 19.8 17 22 17.8 19.8 18.5 19 21 18.2 18.5 16 17.8 18.2 17 19 14.5Z" opacity=".7" />
    </svg>
  )
}
