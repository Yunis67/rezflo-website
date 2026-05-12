import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Container } from '../ui/Container'
import { SpotlightCard } from '../ui/spotlight-card'
import { SectionAura } from '../ui/SectionAura'
import { SectionLabel } from '../ui/SectionLabel'
import { ContainerScroll } from '../ui/container-scroll-animation'
import { TrendingDown, PhoneOff, DollarSign } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Stat {
  prefix?: string
  target: number
  suffix?: string
  label: string
  description: string
  Icon: LucideIcon
}

const stats: Stat[] = [
  {
    target: 1,
    suffix: ' in 3',
    label: 'calls go unanswered at peak hours',
    description: 'Customers hang up and call the next place on the list.',
    Icon: PhoneOff,
  },
  {
    prefix: '$',
    target: 40,
    suffix: '+',
    label: 'average ticket on a phone order',
    description: 'Every dropped call is a lost check, tip, and potential regular.',
    Icon: DollarSign,
  },
  {
    prefix: '–',
    target: 15,
    suffix: '%',
    label: 'service quality when staff answer phones',
    description: 'Your servers get pulled off the floor exactly when guests need them most.',
    Icon: TrendingDown,
  },
]

function CountUp({ target, inView, delay = 0 }: { target: number; inView: boolean; delay?: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v).toString())

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, target, {
      duration: 1.3,
      delay,
      ease: [0.2, 0.8, 0.2, 1],
    })
    return controls.stop
  }, [inView, target, delay, count])

  return <motion.span>{rounded}</motion.span>
}

export function ProblemStats() {
  const gridRef = useRef<HTMLDivElement>(null)
  const inView = useInView(gridRef, { once: true, margin: '-80px' })
  return (
    <section id="problem" className="relative overflow-hidden py-28 md:py-36">
      {/* Atmospheric accents — break the flat shader bg */}
      <SectionAura position="top-right" color="rgba(192, 132, 252, 0.55)" size={70} opacity={0.45} />
      <SectionAura position="bottom-left" color="rgba(124, 58, 237, 0.5)"  size={55} opacity={0.4} blur={100} />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>The cost of a missed call</SectionLabel>
          <h2 className="font-display mt-7 text-[2.25rem] font-medium leading-[1.1] tracking-[-0.018em] text-white sm:text-[2.85rem] lg:text-[3.5rem]">
            Restaurants <span className="gradient-text">lose revenue</span> to
            the phone, <span className="gradient-text">not the food.</span>
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-white/75">
            Three numbers from real operators. They&rsquo;re the reason RezFlo exists.
          </p>
        </div>

        <div ref={gridRef} className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <SpotlightCard glowColor="purple" className="h-full p-8 md:p-9">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-violet-200 ring-1 ring-violet-400/30">
                  <s.Icon className="h-5 w-5" />
                </div>
                <div className="font-display mt-7 text-[3.25rem] font-medium leading-none tracking-tight text-white md:text-[3.75rem]">
                  {s.prefix}
                  <CountUp target={s.target} inView={inView} delay={i * 0.1} />
                  {s.suffix}
                </div>
                <p className="mt-4 text-[1rem] font-medium leading-relaxed text-white">
                  {s.label}
                </p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-white/65">
                  {s.description}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Scroll-driven RezFlo tablet reveal — sits directly under
            the three cards inside the same Container so vertical
            spacing matches the rest of the section. The tablet is
            built in HTML/CSS to match the design reference exactly
            — no image file needed, sharp at every DPR. */}
        <div className="mt-12 md:mt-16">
          <ContainerScroll>
            <RezFloTablet />
          </ContainerScroll>
        </div>
      </Container>
    </section>
  )
}

/* ============================================================
   Faithful HTML/CSS recreation of the supplied RezFlo tablet
   reference. Outer device bezel, blue screen, RezFlo R-mark +
   wordmark top-right, three flat text lines (no chat bubbles)
   with simple circular avatars on the left, animated typing
   indicator, and a yellow "Watch demo" pill in the bottom-right.
   ============================================================ */
function RezFloTablet() {
  return (
    <div className="mx-auto flex h-full w-full max-w-[1100px] items-center justify-center px-4 md:px-0">
      {/* Outer tablet body — dark bezel with subtle gradient + soft
          highlight on the top edge. Aspect ratio held with padding-
          bottom trick so the whole thing scales fluidly. */}
      <div
        className="relative w-full overflow-hidden rounded-[32px] md:rounded-[44px]"
        style={{
          aspectRatio: '4 / 3',
          background: 'linear-gradient(160deg, #1a1a22 0%, #0a0a10 100%)',
          boxShadow:
            'inset 0 0 0 2px rgba(255,255,255,0.04), inset 0 2px 0 rgba(255,255,255,0.08), 0 30px 80px -30px rgba(0,0,0,0.7)',
          padding: 'clamp(10px, 1.5vw, 22px)',
        }}
      >
        {/* Screen */}
        <div
          className="relative h-full w-full overflow-hidden rounded-[22px] md:rounded-[28px]"
          style={{ background: '#2540ff' }}
        >
          {/* RezFlo logo top-right */}
          <div className="absolute right-[3%] top-[5%] flex items-center gap-[0.6vw]">
            <RLogo />
            <span className="text-[2.6vw] font-extrabold leading-none text-white md:text-[1.8vw]">
              RezFlo
            </span>
          </div>

          {/* Chat lines */}
          <div className="absolute inset-y-0 left-[5%] flex w-[70%] flex-col justify-center gap-[2.5vw] md:gap-[1.8vw]">
            <Line speaker="ai">
              <span className="text-white/60">Hi, this is RezFlo&rsquo;s AI Host.</span>{' '}
              How can I help you?
            </Line>
            <Line speaker="guest">I&rsquo;d like to place an order.</Line>
            <Line speaker="ai">
              <span className="text-white/60">Great.</span> What can I get you?
            </Line>

            {/* Three-dot typing indicator */}
            <span className="mt-[1vw] inline-flex h-[3.2vw] w-[6vw] items-center justify-center gap-[0.6vw] rounded-full bg-white/20 md:h-[2.2vw] md:w-[4.2vw] md:gap-[0.4vw]">
              <Dot delay="0s" />
              <Dot delay="0.18s" />
              <Dot delay="0.36s" />
            </span>
          </div>

          {/* Watch demo pill */}
          <button
            type="button"
            className="absolute bottom-[5%] right-[4%] inline-flex items-center gap-[0.8vw] rounded-full bg-[#facc15] px-[2.4vw] py-[1.2vw] text-[2.2vw] font-bold text-[#1c1500] shadow-[0_10px_24px_-8px_rgba(250,204,21,0.55)] transition-transform hover:scale-[1.03] active:scale-95 md:px-[1.6vw] md:py-[0.9vw] md:text-[1.4vw]"
          >
            <svg viewBox="0 0 24 24" className="h-[2vw] w-[2vw] fill-current md:h-[1.3vw] md:w-[1.3vw]" aria-hidden>
              <path d="M8 5.14v13.72a1 1 0 0 0 1.55.83l10.4-6.86a1 1 0 0 0 0-1.66L9.55 4.31A1 1 0 0 0 8 5.14Z" />
            </svg>
            Watch demo
          </button>
        </div>
      </div>
    </div>
  )
}

function RLogo() {
  return (
    <svg
      viewBox="0 0 36 36"
      className="h-[5vw] w-[5vw] md:h-[3.4vw] md:w-[3.4vw]"
      aria-hidden
    >
      <path
        d="M6 4h17.5a8.5 8.5 0 0 1 4.9 15.45l5.3 12.55h-6.7l-4.6-10.6H12V32H6V4Zm6 12.6h11.2a3.6 3.6 0 0 0 0-7.2H12v7.2Z"
        fill="#fff"
      />
    </svg>
  )
}

function Line({
  speaker,
  children,
}: {
  speaker: 'ai' | 'guest'
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-[1.6vw] md:gap-[1.1vw]">
      <Avatar speaker={speaker} />
      <p className="font-display text-[3.6vw] font-extrabold leading-[1.12] tracking-[-0.005em] text-white md:text-[2.6vw]">
        {children}
      </p>
    </div>
  )
}

function Avatar({ speaker }: { speaker: 'ai' | 'guest' }) {
  if (speaker === 'guest') {
    return (
      <span
        aria-hidden
        className="mt-[0.6vw] flex h-[4.2vw] w-[4.2vw] shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-white/30 md:h-[3vw] md:w-[3vw]"
        style={{
          background:
            'radial-gradient(circle at 35% 30%, #f4d3b6 0%, #e8b896 55%, #c08a6a 100%)',
        }}
      />
    )
  }
  return (
    <span
      aria-hidden
      className="mt-[0.6vw] flex h-[4.2vw] w-[4.2vw] shrink-0 items-center justify-center rounded-full bg-[#facc15] md:h-[3vw] md:w-[3vw]"
    >
      <svg viewBox="0 0 36 36" className="h-[2.6vw] w-[2.6vw] md:h-[1.8vw] md:w-[1.8vw]" aria-hidden>
        <path
          d="M6 4h17.5a8.5 8.5 0 0 1 4.9 15.45l5.3 12.55h-6.7l-4.6-10.6H12V32H6V4Zm6 12.6h11.2a3.6 3.6 0 0 0 0-7.2H12v7.2Z"
          fill="#1c1500"
        />
      </svg>
    </span>
  )
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      aria-hidden
      className="block h-[0.8vw] w-[0.8vw] rounded-full bg-white md:h-[0.55vw] md:w-[0.55vw]"
      style={{
        animation: 'tabletTypingDot 1.2s ease-in-out infinite',
        animationDelay: delay,
      }}
    />
  )
}
