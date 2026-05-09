import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionLabel } from '../ui/SectionLabel'
import { testimonials } from '../../data/testimonials'
import { useIsMobile } from '../../lib/useIsMobile'
import {
  TestimonialsColumn,
  type MarqueeTestimonial,
} from '../ui/TestimonialsMarquee'

function initialsFor(name: string): string {
  const parts = name.replace(/\./g, '').trim().split(/\s+/)
  const first = parts[0]?.[0] ?? '?'
  const last = parts[1]?.[0] ?? ''
  return (first + last).toUpperCase()
}

const items: MarqueeTestimonial[] = testimonials.map(t => ({
  text: t.quote,
  name: t.name,
  role: t.role,
  initials: initialsFor(t.name),
}))

// Two staggered orderings so each column reads distinctly while the
// scrolling animation behavior stays exactly the same as before.
const col1 = [items[0], items[2], items[4], items[1]]
const col2 = [items[3], items[5], items[0], items[2]]

export function Testimonials() {
  const isMobile = useIsMobile()
  // Pause the marquee while the demo video is playing on mobile.
  // The marquee cards use backdrop-filter (glass-card) and run a
  // continuous transform animation; combined with H.264 decode that
  // saturates the mobile GPU and makes playback stutter.
  const [videoPlaying, setVideoPlaying] = useState(false)
  const pauseMarquee = isMobile && videoPlaying

  // The fade-out mask on the marquee container is decorative but
  // forces an offscreen compositing pass. Drop it on mobile.
  const marqueeMask = isMobile
    ? ''
    : '[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]'

  return (
    <section
      id="stories"
      aria-labelledby="testimonials-heading"
      className="relative py-28 md:py-36 overflow-hidden"
    >
      <div aria-hidden className="divider-violet absolute inset-x-0 top-0 h-px" />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
            <SectionLabel>Customer Stories</SectionLabel>
            <h2
              id="testimonials-heading"
              className="font-display mt-7 text-[2.25rem] font-medium leading-[1.1] tracking-[-0.018em] text-white sm:text-[2.85rem] lg:text-[3.5rem]"
            >
              Restaurants getting their{' '}
              <span className="gradient-text">phone time back.</span>
            </h2>
            <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-mist-300">
              From neighborhood pizzerias to multi-location operators — operators
              tell us the same story.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_clamp(320px,30vw,420px)] lg:gap-12 lg:items-start">
            <div
              role="region"
              aria-label="Scrolling Testimonials"
              className={`flex justify-center sm:justify-start gap-6 max-h-[440px] sm:max-h-[640px] overflow-hidden ${marqueeMask}`}
            >
              <TestimonialsColumn testimonials={col1} duration={26} paused={pauseMarquee} />
              <TestimonialsColumn
                testimonials={col2}
                className="hidden sm:block"
                duration={32}
                paused={pauseMarquee}
              />
            </div>

            <DemoVideoCard isMobile={isMobile} onPlayingChange={setVideoPlaying} />
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

interface DemoVideoCardProps {
  isMobile: boolean
  onPlayingChange: (playing: boolean) => void
}

function DemoVideoCard({ isMobile, onPlayingChange }: DemoVideoCardProps) {
  const [started, setStarted] = useState(false)
  const [paused, setPaused] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Mount the <video> from the start with preload="metadata" so when
  // the user taps the thumbnail we can call play() synchronously in
  // the same gesture stack — that's what works under iOS Low Power
  // Mode (the autoPlay attribute alone is blocked there). The
  // thumbnail simply overlays on top until the user taps.
  const handleStart = () => {
    setStarted(true)
    onPlayingChange(true)
    const v = videoRef.current
    if (v) {
      v.muted = false
      // Call play() synchronously inside the click handler so iOS
      // counts it as user-initiated even in Low Power Mode.
      v.play().catch(() => {
        // If audio is blocked, retry muted as a fallback so something
        // shows on screen rather than a frozen frame.
        v.muted = true
        v.play().catch(() => {
          // Both attempts blocked — surface the play button so the
          // user can try again on a fresh gesture.
          setPaused(true)
        })
      })
    }
  }

  // Pause the demo when scrolled out of view so it stops occupying
  // the mobile hardware decoder once the user has moved on.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting && started && !v.paused) {
            v.pause()
          }
        }
      },
      { threshold: 0.01 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [started])

  // On mobile, the wrapper's backdrop-blur and the halo's blur-3xl
  // force the GPU to re-rasterize those layers on every video frame —
  // which is what causes the stutter and "doesn't always play" symptoms.
  // We swap to a solid violet card + drop the halo on mobile, and
  // isolate the video's paint so its frame updates don't bleed into
  // surrounding layers. Desktop is unchanged.
  return (
    <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none lg:sticky lg:top-28">
      {!isMobile && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 rounded-[36px] opacity-70 blur-3xl"
          style={{
            background:
              'radial-gradient(60% 50% at 50% 30%, rgba(124,58,237,0.45), transparent 70%)',
          }}
        />
      )}
      <div
        className={
          'relative overflow-hidden rounded-[28px] border border-white/[0.08] p-3 ' +
          (isMobile ? '' : 'backdrop-blur-xl')
        }
        style={{
          background: isMobile
            ? 'linear-gradient(180deg, #1f1240 0%, #0c081c 100%)'
            : 'linear-gradient(180deg, rgba(30,16,60,0.78) 0%, rgba(12,8,28,0.92) 100%)',
          boxShadow:
            '0 30px 80px -30px rgba(124,58,237,0.55), 0 0 0 1px rgba(167,139,250,0.18) inset',
        }}
      >
        <div className="flex items-center justify-between px-3 pt-2 pb-3">
          <span className="text-[0.85rem] font-medium tracking-tight text-white/90">
            RezFlo Demo Preview
          </span>
          <span className="rounded-full border border-white/[0.12] bg-white/[0.04] px-3 py-1 text-[0.68rem] font-medium tracking-wide text-mist-300">
            Qamaria Mississauga
          </span>
        </div>

        <div
          className="relative overflow-hidden rounded-[20px] border border-white/[0.06]"
          style={{ aspectRatio: '9 / 16', contain: 'paint' }}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover bg-black"
            src="/videos/qamaria-demo.mp4"
            playsInline
            preload="metadata"
            disablePictureInPicture
            disableRemotePlayback
            controls={!isMobile && started}
            // @ts-expect-error legacy iOS attribute, still useful on older WebKit
            webkit-playsinline="true"
            x5-video-player-type="h5-page"
            onPlay={() => {
              setPaused(false)
              onPlayingChange(true)
            }}
            onPause={() => {
              setPaused(true)
              onPlayingChange(false)
            }}
            onEnded={() => onPlayingChange(false)}
            style={{ transform: 'translateZ(0)' }}
          />

          {/* Thumbnail overlay — sits above the (paused) video until
              the user taps to start. After that it's unmounted so the
              video and its tap-to-toggle layer get the full frame. */}
          {!started && <DemoThumbnail onPlay={handleStart} />}

          {/* Mobile-only tap-to-toggle layer. Sibling of <video> so
              iOS Safari doesn't treat the video as a button child and
              force its native fullscreen control overlay. */}
          {started && isMobile && (
            <button
              type="button"
              onClick={e => {
                e.preventDefault()
                const v = videoRef.current
                if (!v) return
                if (v.paused) {
                  v.play().catch(() => {})
                } else {
                  v.pause()
                }
              }}
              aria-label={paused ? 'Play video' : 'Pause video'}
              className="absolute inset-0 z-10 block h-full w-full bg-transparent p-0 focus:outline-none"
            >
              {paused && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/20"
                >
                  <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-white" aria-hidden>
                    <path d="M8 5.14v13.72a1 1 0 0 0 1.55.83l10.4-6.86a1 1 0 0 0 0-1.66L9.55 4.31A1 1 0 0 0 8 5.14Z" />
                  </svg>
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function DemoThumbnail({ onPlay }: { onPlay: () => void }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label="Play Qamaria Café demo video"
      className="group absolute inset-0 block w-full cursor-pointer overflow-hidden p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60"
    >
      <img
        src="/images/qamaria-bg.png"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(12,6,28,0.15) 0%, rgba(12,6,28,0.30) 50%, rgba(8,4,22,0.65) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(110% 55% at 50% 115%, rgba(124,58,237,0.30), transparent 60%)',
        }}
      />

      <div className="relative flex h-full flex-col items-center justify-between px-5 py-7 text-center">
        <div className="flex flex-col items-center">
          <QamariaLogo />
          <h3 className="font-display mt-4 text-[1.45rem] font-medium leading-tight tracking-[-0.01em] text-white">
            Qamaria Café Demo
          </h3>
          <p className="mt-2 max-w-[260px] text-[0.82rem] leading-snug text-mist-200">
            How RezFlo handles calls, rushes, and customer questions
          </p>
        </div>

        <div className="flex flex-col items-center">
          <span
            className="relative flex h-[68px] w-[68px] items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105"
            style={{
              background:
                'linear-gradient(160deg, #a78bfa 0%, #7c3aed 60%, #5b21b6 100%)',
              boxShadow:
                '0 0 0 6px rgba(167,139,250,0.18), 0 18px 40px -12px rgba(124,58,237,0.85), inset 0 1px 0 rgba(255,255,255,0.25)',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="ml-1 h-7 w-7 fill-white drop-shadow-sm"
              aria-hidden
            >
              <path d="M8 5.14v13.72a1 1 0 0 0 1.55.83l10.4-6.86a1 1 0 0 0 0-1.66L9.55 4.31A1 1 0 0 0 8 5.14Z" />
            </svg>
          </span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.14] bg-black/40 px-3 py-1 text-[0.72rem] font-medium tracking-wide text-white/90 backdrop-blur-md">
            <svg viewBox="0 0 24 24" className="h-3 w-3 fill-none stroke-white/80" strokeWidth="2" aria-hidden>
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" strokeLinecap="round" />
            </svg>
            1:20
          </span>
          <span className="inline-flex items-center gap-1 text-[0.78rem] font-medium tracking-tight text-violet-200/90">
            <span aria-hidden>›</span> Click to watch
          </span>
        </div>
      </div>
    </button>
  )
}

function QamariaLogo() {
  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 64 56"
        aria-hidden
        className="h-10 w-10 opacity-95"
        style={{ filter: 'drop-shadow(0 4px 14px rgba(255,210,150,0.35))' }}
      >
        <defs>
          <linearGradient id="qg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#f5d8a0" />
            <stop offset="100%" stopColor="#c89455" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#qg)" strokeWidth="1.4" strokeLinecap="round">
          <path d="M32 4c8 6 12 14 12 22s-4 16-12 22" />
          <path d="M32 4c-8 6-12 14-12 22s4 16 12 22" />
          <path d="M14 28c6-3 12-3 18 0s12 3 18 0" />
          <path d="M22 18c4 4 14 4 20 0" />
          <path d="M22 38c4-4 14-4 20 0" />
          <circle cx="32" cy="28" r="3.2" fill="url(#qg)" stroke="none" />
        </g>
      </svg>
      <div className="mt-2 flex flex-col items-center leading-none">
        <span
          className="font-display text-[1.15rem] tracking-[0.32em] text-[#f3dca8]"
          style={{ textShadow: '0 2px 14px rgba(245,216,160,0.35)' }}
        >
          QAMARIA
        </span>
        <span className="mt-1 text-[0.55rem] tracking-[0.42em] text-[#f3dca8]/80">
          CAFÉ
        </span>
      </div>
    </div>
  )
}
