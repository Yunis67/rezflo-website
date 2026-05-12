import { type ReactNode, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Tightened ContainerScroll. The original Aceternity component was
 * designed as a standalone hero with an internal heading and ~80rem
 * of scroll runway — when embedded between other sections that ran
 * as a huge empty gap above the card. This version:
 *
 *  - Removes the internal heading slot. Use the section's own
 *    heading above the component instead.
 *  - Keeps the rotateX 20° → 0° + scale animation but uses a much
 *    shorter scroll runway so the card sits right under the section
 *    above it.
 *
 * Mobile uses gentler scale values so the embedded element doesn't
 * overflow the viewport.
 */
export function ContainerScroll({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start animating just before the section enters; finish just as
    // the section's bottom hits the viewport bottom. Keeps the
    // animation tight against the runway.
    offset: ['start end', 'end start'],
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const scaleDimensions = (): [number, number] =>
    isMobile ? [0.88, 1] : [0.85, 1.08]

  // Drive the transforms across the first ~65% of scroll progress so
  // the card is settled by the time the section is centered in view.
  const rotate = useTransform(scrollYProgress, [0, 0.65], [12, 0])
  const scale = useTransform(scrollYProgress, [0, 0.65], scaleDimensions())
  // Small upward drift as it scales in — makes the reveal feel more
  // intentional than scale alone.
  const translateY = useTransform(scrollYProgress, [0, 0.65], [40, 0])

  return (
    <div
      ref={containerRef}
      // Compact runway: just enough room for the rotate/scale to play
      // out without forcing a "separate page" of empty space above
      // the card.
      className="relative flex items-center justify-center px-4 py-6 md:px-8 md:py-10"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        style={{
          rotateX: rotate,
          scale,
          y: translateY,
          filter:
            'drop-shadow(0 35px 70px rgba(0,0,0,0.6)) drop-shadow(0 0 90px rgba(124,58,237,0.22))',
        }}
        className="mx-auto w-full max-w-6xl"
      >
        {children}
      </motion.div>
    </div>
  )
}
