import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion'
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

  // Smooth the raw scroll value with a spring so the marquee glides
  // instead of tracking every jittery scroll delta 1:1 (fixes the
  // "rough/laggy" feel). Stiff + well-damped so it stays responsive.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 320,
    damping: 44,
    mass: 0.35,
    restDelta: 0.001,
  })

  // Larger travel range = the logos move faster for the same scroll.
  const xRow1 = useTransform(smooth, [0, 1], [0, -1500])
  const xRow2 = useTransform(smooth, [0, 1], [-1500, 0])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-24 md:py-32"
    >
      {/* Warm-white base with a soft violet glow in the middle — matches
          the light hero above so there's no visible seam. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: '#F8F7FC' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 72% 58% at 50% 46%, rgba(91,65,218,0.16) 0%, rgba(169,147,255,0.11) 32%, rgba(248,247,252,0) 70%)',
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        <h2 className="font-display text-left text-[2rem] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[2.6rem] md:text-[3.25rem] lg:text-[3.75rem]">
          <span className="text-[#201B33]">Plays nicely with your</span>{' '}
          <AnimatedTextCycle
            words={HEADLINE_WORDS}
            interval={2500}
            className="bg-gradient-to-r from-[#5B41DA] via-[#7358F0] to-[#A993FF] bg-clip-text text-transparent"
          />
          <span className="bg-gradient-to-r from-[#5B41DA] via-[#7358F0] to-[#A993FF] bg-clip-text text-transparent sm:block">
            {' '}stack.
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
        <Row x={xRow1} cards={ROW_1} offsetClass="-ml-10 md:-ml-14" />
        <div className="h-3 md:h-4" />
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
  // Render the set several times so the rail stays full across the whole
  // (now larger) translate range with the smaller square tiles.
  const repeated = [...cards, ...cards, ...cards, ...cards]

  return (
    <motion.div
      style={{ x, willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
      className={`flex w-max gap-3 px-6 md:gap-4 md:px-10 ${offsetClass}`}
    >
      {repeated.map((card, i) => (
        <Card key={`${card.name}-${i}`} card={card} />
      ))}
    </motion.div>
  )
}

function Card({ card }: { card: LogoCard }) {
  return (
    <div
      className="relative flex aspect-square h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-[22px] bg-white ring-1 ring-[#201B33]/[0.06] sm:h-[128px] sm:w-[128px] md:h-[156px] md:w-[156px] lg:h-[176px] lg:w-[176px]"
      style={{
        boxShadow:
          '0 20px 44px -28px rgba(91,65,218,0.30), 0 6px 18px -12px rgba(32,27,51,0.14)',
      }}
    >
      <img
        src={card.src}
        alt={card.name}
        loading="eager"
        decoding="async"
        draggable={false}
        className="h-full w-full select-none object-cover"
        style={{ transform: 'scale(1.06) translateZ(0)', backfaceVisibility: 'hidden' }}
      />
    </div>
  )
}
