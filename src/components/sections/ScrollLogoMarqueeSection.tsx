import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { AnimatedTextCycle } from '../ui/animated-text-cycle'

const HEADLINE_WORDS = [
  'restaurant',
  'café',
  'reservation',
  'ordering',
  'POS',
  'calendar',
  'booking',
  'customer',
]

/**
 * Scroll-driven logo marquee — dark, branded.
 *
 * Two rows of logo cards translate horizontally in opposite directions —
 * the motion is tied directly to the user's vertical scroll position via
 * framer-motion's useScroll. Scrolling down slides row 1 left and row 2
 * right; scrolling back up reverses both. Nothing animates on its own.
 *
 * To swap real logos: replace entries in ROW_1 / ROW_2 below. Each entry
 * just points at an image in /public. The image is rendered edge-to-edge
 * inside a rounded card; a slight 1.06× scale crops any faint border.
 */

interface LogoCard {
  name: string
  src: string
}

const LOGOS: LogoCard[] = [
  { name: 'Clover',          src: '/logos/yay/clover.png' },
  { name: 'Square',          src: '/logos/yay/square.png' },
  { name: 'Toast',           src: '/logos/yay/toast.png' },
  { name: 'Olo',             src: '/logos/yay/olo.png' },
  { name: 'Cal.com',         src: '/logos/yay/calcom.png' },
  { name: 'Google Calendar', src: '/logos/yay/gcal.png' },
  { name: 'Resy',            src: '/logos/yay/resy.png' },
]

// Two visually distinct orderings so the rows don't look symmetrical.
const ROW_1 = LOGOS
const ROW_2 = [LOGOS[3], LOGOS[6], LOGOS[1], LOGOS[5], LOGOS[0], LOGOS[4], LOGOS[2]]

export function ScrollLogoMarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null)

  // Track scroll progress through the section: 0 when the section's top
  // hits the bottom of the viewport, 1 when its bottom leaves the top.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Faster, more dynamic horizontal travel — bumped from ±300 to ±900.
  const xRow1 = useTransform(scrollYProgress, [0, 1], [0, -900])
  const xRow2 = useTransform(scrollYProgress, [0, 1], [-900, 0])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-24 md:py-32"
    >
      {/* Branded purple gradient + glow. Top and bottom fade to pure black
          so the section blends seamlessly into the hero above and the
          shader background below — no visible horizontal seam. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-black"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 55% at 50% 50%, rgba(124,58,237,0.32) 0%, rgba(76,29,149,0.18) 35%, rgba(15,8,35,0) 75%), linear-gradient(180deg, #1A0F2E 0%, #140A2C 22%, #110827 50%, #160B30 78%, #1A0F2E 100%)',
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        <h2 className="font-display text-left text-[2rem] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[2.6rem] md:text-[3.25rem] lg:text-[3.75rem]">
          <span className="text-white">Plays nicely with your</span>{' '}
          <AnimatedTextCycle
            words={HEADLINE_WORDS}
            interval={2500}
            className="bg-gradient-to-r from-violet-300 via-violet-200 to-fuchsia-200 bg-clip-text text-transparent"
          />
          <span className="block bg-gradient-to-r from-violet-300 via-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
            stack.
          </span>
        </h2>
      </div>

      <div
        className="relative mt-14 md:mt-20"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      >
        <Row x={xRow1} cards={ROW_1} offsetClass="-ml-12 md:-ml-16" />
        <div className="h-4 md:h-6" />
        <Row x={xRow2} cards={ROW_2} offsetClass="-ml-4 md:-ml-6" />
      </div>
    </section>
  )
}

interface RowProps {
  cards: LogoCard[]
  x: MotionValue<number>
  offsetClass?: string
}

function Row({ cards, x, offsetClass = '' }: RowProps) {
  // Render the set twice so the row extends past the viewport on both
  // ends. Combined with the edge mask + clamped translate range this
  // keeps the rails visually full at every scroll position.
  const doubled = [...cards, ...cards, ...cards]

  return (
    <motion.div
      style={{ x, willChange: 'transform' }}
      className={`flex w-max gap-4 px-6 md:gap-8 md:px-10 ${offsetClass}`}
    >
      {doubled.map((card, i) => (
        <Card key={`${card.name}-${i}`} card={card} />
      ))}
    </motion.div>
  )
}

function Card({ card }: { card: LogoCard }) {
  return (
    <div
      className="relative flex h-[132px] w-[165px] shrink-0 items-center justify-center overflow-hidden rounded-[22px] bg-white/[0.04] ring-1 ring-white/10 backdrop-blur-sm sm:h-[164px] sm:w-[204px] md:h-[208px] md:w-[258px] lg:h-[220px] lg:w-[275px]"
      style={{
        boxShadow:
          '0 24px 60px -28px rgba(124,58,237,0.55), 0 8px 22px -10px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      <img
        src={card.src}
        alt={card.name}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="h-full w-full select-none object-cover"
        style={{ transform: 'scale(1.06)' }}
      />
    </div>
  )
}
