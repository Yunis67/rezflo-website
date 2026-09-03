import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Container } from '../ui/Container'
import { SectionAura } from '../ui/SectionAura'
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
      {/* Soft violet accents on the warm-white background */}
      <SectionAura position="top-right" color="rgba(169, 147, 255, 0.40)" size={70} opacity={0.5} />
      <SectionAura position="bottom-left" color="rgba(91, 65, 218, 0.28)" size={55} opacity={0.4} blur={100} />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-[#A993FF]/45 bg-[#5B41DA]/[0.06] px-4 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-[#5B41DA]">
            The cost of a missed call
          </span>
          <h2 className="font-display mt-7 text-[2.25rem] font-medium leading-[1.1] tracking-[-0.018em] text-[#201B33] sm:text-[2.85rem] lg:text-[3.5rem]">
            Restaurants <GradText>lose revenue</GradText> to
            the phone, <GradText>not the food.</GradText>
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-[#201B33]/60">
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
              className="h-full rounded-3xl border border-[#A993FF]/35 bg-white p-8 md:p-9"
              style={{
                boxShadow:
                  '0 30px 60px -34px rgba(91,65,218,0.35), 0 8px 22px -14px rgba(32,27,51,0.12)',
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5B41DA]/10 text-[#5B41DA] ring-1 ring-[#5B41DA]/15">
                <s.Icon className="h-5 w-5" />
              </div>
              <div className="font-display mt-7 text-[3.25rem] font-medium leading-none tracking-tight text-[#201B33] md:text-[3.75rem]">
                {s.prefix}
                <CountUp target={s.target} inView={inView} delay={i * 0.1} />
                {s.suffix}
              </div>
              <p className="mt-4 text-[1rem] font-semibold leading-relaxed text-[#201B33]">
                {s.label}
              </p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-[#201B33]/60">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

/** Violet gradient phrase tuned for a light background. */
function GradText({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        background: 'linear-gradient(180deg, #6E52E8 0%, #A993FF 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {children}
    </span>
  )
}
