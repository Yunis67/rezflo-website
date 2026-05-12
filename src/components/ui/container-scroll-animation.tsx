import { type ReactNode, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Scroll-driven reveal wrapper. As the user scrolls the wrapper into
 * view, children scale up (0.85 → 1.08 on desktop) and drift slightly
 * upward, with a small forward tilt that flattens to 0°. Reverses on
 * scroll-up. Lean — no internal heading slot, compact vertical
 * footprint so the wrapped element sits tucked against whatever is
 * above it.
 *
 * Mobile uses a gentler scale range so the wrapped element doesn't
 * overflow the viewport.
 */
export function ContainerScroll({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const scaleRange: [number, number] = isMobile ? [0.90, 1.02] : [0.82, 1.10]

  // Smooth, broad scroll range — animation completes ~75% in so the
  // tablet is fully settled when it's centered in view. Wider easing
  // bands soften the curve so motion feels premium rather than
  // snappy. Spring damping (via the LayoutGroup-style overshoot) is
  // avoided to keep the reveal smooth + reversible.
  const rotate = useTransform(scrollYProgress, [0, 0.75], [10, 0])
  const scale = useTransform(scrollYProgress, [0, 0.75], scaleRange)
  const translateY = useTransform(scrollYProgress, [0, 0.75], [60, 0])

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center px-2 py-4 md:px-4 md:py-8"
      style={{ perspective: '1400px' }}
    >
      <motion.div
        style={{
          rotateX: rotate,
          scale,
          y: translateY,
          filter:
            'drop-shadow(0 40px 80px rgba(0,0,0,0.55)) drop-shadow(0 0 120px rgba(124,58,237,0.25))',
        }}
        className="mx-auto w-full max-w-[1400px]"
      >
        {children}
      </motion.div>
    </div>
  )
}
