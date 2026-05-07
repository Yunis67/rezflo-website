import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'

/**
 * ScrollExpandMedia — clean scroll-scrubbed sticky media expander.
 *
 * Behavior:
 *   - The outer section is tall (250vh). An inner container is
 *     `sticky top-0 h-screen`, so the media frame stays pinned while
 *     the page scrolls past — for the full duration of the section.
 *   - `useScroll({ target: sectionRef, offset: ['start start', 'end end'] })`
 *     produces a 0→1 scroll progress that drives every animated value
 *     via MotionValues. There is NO wheel/touch event handling, NO
 *     `mediaFullyExpanded` lock, NO `scrollTo(0,0)` during animation.
 *     The animation is a pure scrub of scroll position, so reverse-
 *     scroll smoothly minimizes the video again.
 *   - Once scrollYProgress passes 1, the section's bottom leaves the
 *     viewport and the page continues to the next section naturally.
 *   - When the video frame is fully expanded its size hits the
 *     viewport-relative max (≈100vw × 100vh), so the section truly
 *     fills the screen at the apex of the animation.
 *
 * The <video> has no <track>, no controls, no PiP, no remote playback,
 * `autoPlay muted loop playsInline`. The mute toggle drives the real
 * `videoRef.current.muted` so it actually unmutes audio on click.
 *
 * On mount we reset window.scrollY to 0 so reloads always start in the
 * minimized state.
 */
interface ScrollExpandMediaProps {
  mediaSrc: string
  posterSrc?: string
  /** Accepts JSX so callers can wrap keywords in their own glow spans. */
  title?: ReactNode
  subtitle?: ReactNode
  scrollToExpand?: string
  children?: ReactNode
}

export default function ScrollExpandMedia({
  mediaSrc,
  posterSrc,
  title,
  subtitle,
  scrollToExpand,
  children,
}: ScrollExpandMediaProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const frameRef = useRef<HTMLDivElement | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  // Default to 16/9 until the real video metadata loads — the frame's
  // aspectRatio uses this so object-cover never crops or letterboxes.
  const [videoAspect, setVideoAspect] = useState(16 / 9)

  // Reset to top on every reload so the section always starts minimized.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  // Pure scroll-scrubbed progress through this section.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Frame width grows on scroll; height is derived from the video's
  // real aspect ratio (set on loadedmetadata) so object-cover fills
  // the frame edge-to-edge with no black bars and no caption clipping.
  const frameWidth = useTransform(scrollYProgress, [0, 1], ['42vw', '100vw'])
  const frameRadius = useTransform(scrollYProgress, [0, 1], [22, 0])

  // Title + subtitle — centered above the video, slide up + fade as
  // the video expands; reverse smoothly on scroll-up.
  const titleY = useTransform(scrollYProgress, [0, 0.45, 0.75], [0, -80, -180])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35, 0.55], [1, 0.5, 0])
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.25, 0.45], [1, 0.4, 0])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const bgFade = useTransform(scrollYProgress, [0, 1], [1, 0.55])

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setIsMuted(v.muted)
  }

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      void v.play()
      setIsPaused(false)
    } else {
      v.pause()
      setIsPaused(true)
    }
  }

  // Holographic tilt + cursor-tracking glow for the minimized frame.
  // The tilt strength fades to zero as the video expands so the
  // effect never fights the fullscreen view.
  const handleFrameMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = frameRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    // Damp tilt as scroll progresses so the apex (fullscreen) is flat.
    const damp = 1 - Math.min(scrollYProgress.get(), 1)
    const rotateX = ((y - cy) / 18) * damp
    const rotateY = ((cx - x) / 18) * damp
    card.style.setProperty('--holo-x', `${x}px`)
    card.style.setProperty('--holo-y', `${y}px`)
    card.style.setProperty('--holo-opacity', `${0.7 * damp}`)
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }
  const handleFrameMouseLeave = () => {
    const card = frameRef.current
    if (!card) return
    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)'
    card.style.setProperty('--holo-opacity', '0')
  }

  return (
    <div
      ref={sectionRef}
      className="relative w-full"
      style={{ height: '180vh' }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* RezFlo branded background — radial purple glow over a deep
            violet→black gradient. Fades slightly as the media expands. */}
        <motion.div
          aria-hidden
          className="absolute inset-0 z-0"
          style={{ opacity: bgFade }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 35%, rgba(124,58,237,0.35) 0%, rgba(76,29,149,0.18) 35%, rgba(15,8,35,0) 70%), linear-gradient(180deg, #1A0F2E 0%, #140A2C 30%, #0E0720 65%, #08041A 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 90% 70% at 50% 50%, transparent 50%, rgba(0,0,0,0.45) 100%)',
            }}
          />
        </motion.div>

        {/* Title — perfectly centered above the video. Slides up
            and fades on scroll-down; reverses on scroll-up. */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-[12%] z-20 mx-auto flex w-full flex-col items-center px-6 text-center md:top-[14%]"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          {/* Soft violet glow plate behind the title — lifts the copy
              off the dark background. */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[200%] w-[120%] max-w-5xl -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(167,139,250,0.45) 0%, rgba(124,58,237,0.22) 35%, transparent 70%)',
              filter: 'blur(34px)',
            }}
          />
          <h2
            className="shimmer-title font-display mx-auto max-w-4xl text-balance text-[1.7rem] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[2.1rem] md:text-[2.75rem] lg:text-[3.4rem]"
            style={{
              filter:
                'drop-shadow(0 2px 12px rgba(167,139,250,0.35)) drop-shadow(0 0 28px rgba(124,58,237,0.25))',
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <motion.p
              className="mx-auto mt-4 max-w-2xl text-balance text-sm leading-relaxed text-white/90 sm:text-base md:text-lg"
              style={{
                opacity: subtitleOpacity,
                textShadow: '0 1px 18px rgba(124,58,237,0.45), 0 1px 6px rgba(0,0,0,0.6)',
              }}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Expanding video frame. Width/height/radius are MotionValues,
            so the frame is purely a function of scroll position. */}
        <motion.div
          ref={frameRef}
          onMouseMove={handleFrameMouseMove}
          onMouseLeave={handleFrameMouseLeave}
          className="relative z-10 overflow-hidden ring-1 ring-violet-400/20 transition-transform duration-150 ease-out will-change-transform"
          style={{
            width: frameWidth,
            // Make the frame ~14% wider than the video's native aspect.
            // With object-cover + object-top below, this crops the
            // bottom strip of the video — hiding the burned-in
            // captions baked into the source file.
            aspectRatio: videoAspect / 0.86,
            maxHeight: '92vh',
            borderRadius: frameRadius,
            transformStyle: 'preserve-3d',
            boxShadow:
              '0 30px 90px -20px rgba(124,58,237,0.55), 0 0 0 1px rgba(255,255,255,0.04), 0 60px 140px -40px rgba(0,0,0,0.7)',
          }}
        >
          {/* Clickable surface — toggles play/pause. Uses object-contain
              so the entire split-screen frame is visible at any size,
              never clipping captions baked into the video. */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPaused ? 'Play video' : 'Pause video'}
            className="group absolute inset-0 z-10 block h-full w-full cursor-pointer"
          >
            <video
              ref={videoRef}
              src={mediaSrc}
              poster={posterSrc}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              preload="auto"
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              onLoadedMetadata={e => {
                const v = e.currentTarget
                if (v.videoWidth && v.videoHeight) {
                  setVideoAspect(v.videoWidth / v.videoHeight)
                }
              }}
              className="pointer-events-none h-full w-full bg-black object-cover object-top"
            />

            {/* Center play/pause icon. Persistent when paused, briefly
                visible on hover when playing, then fades out. */}
            <AnimatePresence>
              {isPaused && (
                <motion.span
                  key="paused-icon"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
                  className="pointer-events-none absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/20 backdrop-blur-md"
                >
                  <Play size={28} className="ml-1" />
                </motion.span>
              )}
            </AnimatePresence>

            {/* Subtle hover hint while playing — fades in on hover, out otherwise */}
            {!isPaused && (
              <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white opacity-0 ring-1 ring-white/20 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                <Pause size={28} />
              </span>
            )}
          </button>

          {/* Mute / unmute toggle. Drives the real <video>.muted so
              the button actually toggles audio. */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            className="absolute bottom-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/15 backdrop-blur-md transition hover:bg-black/75"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          {/* Holographic cursor-tracking glow — radial highlight that
              follows the mouse, modulated by --holo-opacity which is
              set in the mousemove handler and dropped to 0 on leave
              (and as the frame expands toward fullscreen). */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[5] mix-blend-screen transition-opacity duration-200"
            style={{
              opacity: 'var(--holo-opacity, 0)',
              background:
                'radial-gradient(circle 260px at var(--holo-x, 50%) var(--holo-y, 50%), rgba(196,181,253,0.55) 0%, rgba(124,58,237,0.25) 35%, transparent 70%)',
            }}
          />
          {/* Holographic conic shimmer — subtle iridescent sheen that
              also tracks the cursor. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[4] mix-blend-overlay transition-opacity duration-200"
            style={{
              opacity: 'var(--holo-opacity, 0)',
              background:
                'conic-gradient(from 180deg at var(--holo-x, 50%) var(--holo-y, 50%), rgba(167,139,250,0.0) 0deg, rgba(232,121,249,0.35) 90deg, rgba(125,211,252,0.25) 180deg, rgba(167,139,250,0.35) 270deg, rgba(167,139,250,0.0) 360deg)',
            }}
          />
        </motion.div>

        {/* Scroll hint — fades out almost immediately on first scroll. */}
        {scrollToExpand && (
          <motion.p
            className="font-display pointer-events-none absolute bottom-2 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap text-[0.78rem] font-medium uppercase tracking-[0.28em] text-violet-200/80"
            style={{ opacity: hintOpacity }}
          >
            {scrollToExpand}
          </motion.p>
        )}
      </div>

      {children && (
        <div className="relative z-10 px-8 py-10 md:px-16 lg:py-20">
          {children}
        </div>
      )}
    </div>
  )
}
