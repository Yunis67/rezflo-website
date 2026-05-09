import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '../ui/Container'
import { site } from '../../data/site'
import { AnthonyVoiceCard } from '../ui/AnthonyVoiceCard'

/**
 * Hero — full-bleed cinematic video background, left-aligned
 * editorial composition. The bottom of the hero fades through deep
 * violet into the animated shader background of the next section so
 * the boundary is invisible.
 *
 * Layout:
 *   1. Top row (just below nav): two-column intro paragraphs
 *      (left: capability summary, right: stat tagline right-aligned).
 *   2. Center: eyebrow + headline + CTA + tagline — ALL LEFT-ALIGNED
 *      and constrained to ~max-w-3xl so the brand sits to the left.
 *
 * Title:
 *   Line 1 — "RezFlo" (white, large, font-medium)
 *   Line 2 — "We'll Handle the Calls" (animated shiny gradient)
 */
export function Hero() {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null)

  // iOS Safari sometimes ignores autoPlay even with muted+playsInline,
  // showing a tap-to-play overlay. Force it on mount and on the first
  // user interaction. Without this, mobile users see a play-button
  // ghost over the hero on a cold load.
  useEffect(() => {
    const v = heroVideoRef.current
    if (!v) return
    v.muted = true
    v.setAttribute('webkit-playsinline', 'true')
    const tryPlay = () => {
      v.play().catch(() => {
        /* will retry on first user gesture */
      })
    }
    tryPlay()
    const onFirstTouch = () => {
      tryPlay()
      window.removeEventListener('touchstart', onFirstTouch)
      window.removeEventListener('click', onFirstTouch)
    }
    window.addEventListener('touchstart', onFirstTouch, { once: true, passive: true })
    window.addEventListener('click', onFirstTouch, { once: true })
    return () => {
      window.removeEventListener('touchstart', onFirstTouch)
      window.removeEventListener('click', onFirstTouch)
    }
  }, [])

  return (
    <section
      id="top"
      className="relative isolate flex flex-col overflow-hidden bg-black min-h-[88vh]"
    >
      {/* Looping video background */}
      <video
        ref={heroVideoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        aria-hidden
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay for readability */}
      <div aria-hidden className="absolute inset-0 bg-black/55" />

      {/*
        Bottom blend — fades video → deep violet → continues into the
        shader background. Long gradient (h-96) so there is no visible
        seam between sections.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-96"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.35) 30%, rgba(28,9,53,0.7) 60%, rgba(46,16,101,0.85) 85%, #1A0F2E 100%)',
        }}
      />

      {/* === Content =================================================== */}
      <Container className="relative z-10 flex flex-1 flex-col">
        {/*
          Top intro paragraphs (just below nav).
          Mobile: more vertical breathing room (gap-9), relaxed line
          height, and an editorial divider rule between the two
          paragraphs so they read as two distinct beats — the
          description + the proof point — instead of one wall of text.
          Desktop (lg+): unchanged 2-column side-by-side layout.
        */}
        <div className="grid grid-cols-1 gap-9 pt-28 md:pt-32 lg:grid-cols-2 lg:gap-10">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="max-w-md text-[0.95rem] font-normal leading-relaxed text-white/85 md:text-base md:leading-relaxed"
          >
            RezFlo answers calls, takes orders, books reservations, filters spam,
            and captures every detail so your restaurant team can stay focused
            on guests.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26 }}
            className="relative max-w-md text-[0.95rem] font-normal leading-relaxed text-white/85 before:mb-5 before:block before:h-px before:w-10 before:bg-gradient-to-r before:from-violet-300/70 before:to-transparent md:text-base md:leading-relaxed lg:ml-auto lg:text-right lg:before:ml-auto lg:before:bg-gradient-to-l"
          >
            0 missed calls. 24/7 restaurant coverage.
          </motion.p>
        </div>

        {/* Center hero — LEFT-aligned editorial composition + voice card right */}
        <div className="grid flex-1 grid-cols-1 items-center gap-12 pt-14 pb-32 md:pt-16 md:pb-36 lg:grid-cols-[minmax(0,1fr)_clamp(360px,32vw,440px)] lg:gap-16">
          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="text-xs font-medium uppercase tracking-[0.18em] text-white/75 md:text-sm"
            >
              AI Phone Agents for Restaurants
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-left font-medium tracking-tighter text-white"
              style={{ lineHeight: 0.88 }}
            >
              <span className="block text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9rem]">
                RezFlo
              </span>
              <ShinyText className="mt-2 block text-[2.1rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem] tracking-tight">
                We&rsquo;ll Handle the Calls
              </ShinyText>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6"
            >
              <a
                href={site.cta.bookDemo}
                className="group inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-neutral-900 md:px-8 md:py-4 md:text-base"
                style={{
                  border: '1px solid rgba(255,255,255,0.16)',
                  boxShadow:
                    '0 10px 30px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                Book Free Demo
                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <p className="max-w-sm text-xs text-white/70 md:text-sm">
                Built for restaurants, cafés, bakeries, and appointment-based businesses.
              </p>
            </motion.div>
          </div>

          {/* Right column — Anthony voice agent card */}
          <div className="w-full">
            <AnthonyVoiceCard />
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ===================================================================
   ShinyText — Inline animated gradient sweep.
   Base color: #8B5CF6, Shine color: #FFFFFF. 100° gradient spread,
   3s loop. Uses backgroundClip: text + transparent fill.
   ================================================================= */
function ShinyText({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={className}
      style={{
        background:
          'linear-gradient(100deg, #8B5CF6 0%, #FFFFFF 50%, #8B5CF6 100%)',
        backgroundSize: '200% 100%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        animation: 'shineSweep 3s linear infinite',
      }}
    >
      {children}
    </span>
  )
}
