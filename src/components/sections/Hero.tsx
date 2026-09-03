import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '../ui/Container'
import { site } from '../../data/site'
import { AnthonyVoiceCard } from '../ui/AnthonyVoiceCard'
import { subscribeVoiceMode, isVoiceModeActive } from '../../lib/voiceMode'

/**
 * Hero — warm-white + purple composition on a subtle looping video
 * background (the supplied lavender-wave animation). Left-aligned
 * editorial headline on the left, "Meet Flo" voice-demo card on the
 * right; the card stacks below the copy on mobile.
 *
 * Palette:
 *   Background  #F8F7FC   Main text  #201B33
 *   Purple      #5B41DA   Light purple #A993FF
 *
 * The video autoplays muted + looped and covers the whole section
 * without blocking clicks. A soft white overlay keeps the copy
 * readable while leaving the lavender waves visible near the bottom.
 * Users who prefer reduced motion get a static lavender background
 * instead of the video.
 */
export function Hero() {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null)
  const prefersReducedMotion = useReducedMotion()

  // iOS Safari sometimes ignores autoPlay even with muted+playsInline,
  // showing a tap-to-play overlay. Force it on mount and on the first
  // user interaction. Without this, mobile users see a play-button
  // ghost over the hero on a cold load.
  useEffect(() => {
    if (prefersReducedMotion) return
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
  }, [prefersReducedMotion])

  // Pause the hero video any time it scrolls out of view OR the
  // Anthony voice agent is active. The first frees the mobile H.264
  // decoder for other videos further down; the second frees CPU/GPU
  // and network bandwidth for the WebRTC voice stream so the call
  // doesn't come through choppy.
  useEffect(() => {
    if (prefersReducedMotion) return
    const v = heroVideoRef.current
    if (!v) return
    if (typeof IntersectionObserver === 'undefined') return
    let inView = false
    const sync = () => {
      if (inView && !isVoiceModeActive()) {
        v.play().catch(() => {})
      } else {
        v.pause()
      }
    }
    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          inView = entry.isIntersecting
        }
        sync()
      },
      { threshold: 0.01 },
    )
    io.observe(v)
    const offVoice = subscribeVoiceMode(sync)
    return () => {
      io.disconnect()
      offVoice()
    }
  }, [prefersReducedMotion])

  return (
    <section
      id="top"
      className="relative isolate flex flex-col overflow-hidden min-h-[88vh]"
      style={{ background: '#F8F7FC' }}
    >
      {/* Looping lavender-wave video background — or a static gradient
          for reduced-motion users. */}
      {prefersReducedMotion ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 20% 20%, rgba(169,147,255,0.28) 0%, transparent 55%), radial-gradient(120% 90% at 90% 80%, rgba(91,65,218,0.18) 0%, transparent 60%), #F8F7FC',
          }}
        />
      ) : (
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
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      )}

      {/* Soft white overlay — strongest behind the headline, lighter
          toward the bottom so the lavender waves stay visible. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(248,247,252,0.78) 0%, rgba(248,247,252,0.60) 42%, rgba(248,247,252,0.34) 78%, rgba(248,247,252,0.20) 100%)',
        }}
      />

      {/* Extra readability wash behind the left copy on large screens. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-2/3 lg:block"
        style={{
          background:
            'linear-gradient(90deg, rgba(248,247,252,0.55) 0%, rgba(248,247,252,0.10) 70%, transparent 100%)',
        }}
      />

      {/* === Content =================================================== */}
      <Container className="relative z-10 flex flex-1 flex-col">
        {/*
          Top intro paragraphs (just below nav). Hidden on mobile/tablet
          (kept for top-padding), full two-column intro on lg+.
        */}
        <div className="grid grid-cols-1 gap-9 pt-28 md:pt-32 lg:grid-cols-2 lg:gap-10">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="hidden max-w-md text-[0.95rem] font-normal leading-relaxed text-[#201B33]/80 lg:block lg:text-base lg:leading-relaxed"
          >
            RezFlo answers calls, takes orders, books reservations, filters spam,
            and captures every detail so your restaurant team can stay focused
            on guests.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26 }}
            className="relative ml-auto hidden max-w-md text-[0.95rem] font-normal leading-relaxed text-[#201B33]/80 before:mb-5 before:block before:h-px before:w-10 before:bg-gradient-to-l before:from-[#A993FF] before:to-transparent before:ml-auto lg:block lg:text-right lg:text-base lg:leading-relaxed"
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
              className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5B41DA] md:text-sm"
            >
              AI Phone Agents for Restaurants
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-left font-medium tracking-tighter"
              style={{ lineHeight: 0.88, color: '#201B33' }}
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
                className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 md:px-8 md:py-4 md:text-base"
                style={{
                  background: 'linear-gradient(180deg, #6E52E8 0%, #5B41DA 100%)',
                  boxShadow:
                    '0 16px 34px -12px rgba(91,65,218,0.6), inset 0 1px 0 rgba(255,255,255,0.28)',
                }}
              >
                Book Free Demo
                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <p className="max-w-sm text-xs text-[#201B33]/70 md:text-sm">
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
   ShinyText — Inline animated gradient sweep tuned for the light
   hero: RezFlo purple (#5B41DA) → light purple (#A993FF) → purple.
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
          'linear-gradient(100deg, #5B41DA 0%, #A993FF 50%, #5B41DA 100%)',
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
