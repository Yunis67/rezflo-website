import { type ReactNode, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

/**
 * Aceternity-style ContainerScroll. The header slides up while the
 * card "lays down" — starts tilted forward (rotateX 20°) and slightly
 * zoomed, settles to flat 0° + base scale by the time the user has
 * scrolled through the section. Adapted for plain React + Tailwind v4
 * (no Next.js Image, no "use client").
 *
 * The outer wrapper is tall on purpose — that's the scroll runway. As
 * the user scrolls past it, scrollYProgress goes 0 → 1 and drives the
 * card's transforms. Mobile uses gentler scale values so the tablet
 * frame doesn't overflow the viewport.
 */
export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: ReactNode
  children: ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const scaleDimensions = (): [number, number] => (isMobile ? [0.7, 0.9] : [1.05, 1])

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0])
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions())
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div
      ref={containerRef}
      className="relative flex h-[60rem] items-center justify-center p-2 md:h-[80rem] md:p-20"
    >
      <div
        className="relative w-full py-10 md:py-40"
        style={{ perspective: '1000px' }}
      >
        <Header translate={translate}>{titleComponent}</Header>
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  )
}

function Header({
  translate,
  children,
}: {
  translate: MotionValue<number>
  children: ReactNode
}) {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="mx-auto max-w-5xl text-center"
    >
      {children}
    </motion.div>
  )
}

function Card({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  children: ReactNode
}) {
  // No gray frame / dark fill — the children (e.g. the RezFlo tablet
  // image) already render their own device bezel and don't need a
  // second frame around them. Just a transformable wrapper that
  // rotateX + scales as the user scrolls past, with a soft drop
  // shadow so the floating element reads against the dark page bg.
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        filter:
          'drop-shadow(0 25px 50px rgba(0,0,0,0.55)) drop-shadow(0 0 90px rgba(124,58,237,0.18))',
      }}
      className="mx-auto -mt-12 h-[30rem] w-full max-w-5xl md:h-[44rem]"
    >
      <div className="flex h-full w-full items-center justify-center">
        {children}
      </div>
    </motion.div>
  )
}
