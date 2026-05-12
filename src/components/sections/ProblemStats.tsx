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

        {/* Scroll-driven RezFlo tablet reveal — tucks right under the
            three cards with a small gap, scales up + drifts upward as
            the user scrolls into view. The PNG was exported with a
            checkered transparency-preview pattern baked into the
            outer pixels, so the inner wrapper uses overflow-hidden +
            a slight scale to crop those edge pixels off-screen. */}
        <div className="mt-6 md:mt-8">
          <ContainerScroll>
            <div className="relative mx-auto w-full overflow-hidden">
              <img
                src="/images/rezflo-tablet.png"
                alt="RezFlo AI Host answering a phone order on a tablet"
                draggable={false}
                className="mx-auto block w-full select-none"
                style={{ transform: 'scale(1.04)', transformOrigin: 'center' }}
              />
            </div>
          </ContainerScroll>
        </div>
      </Container>
    </section>
  )
}
