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

  const scaleRange: [number, number] = isMobile ? [0.88, 1] : [0.85, 1.08]

  // Animation completes ~65% through the wrapper so the wrapped
  // element is fully settled when it's centered in view.
  const rotate = useTransform(scrollYProgress, [0, 0.65], [12, 0])
  const scale = useTransform(scrollYProgress, [0, 0.65], scaleRange)
  const translateY = useTransform(scrollYProgress, [0, 0.65], [40, 0])

  return (
    <div
      ref={containerRef}
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
