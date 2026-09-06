import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Bot, ShoppingBag, Eye, CheckCircle2, Send } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionAura } from '../ui/SectionAura'
import { useIsMobile } from '../../lib/useIsMobile'

/* Light-mode helpers — local so the shared dark components used by the
   sections further down the page are left untouched. */
function LightPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#A993FF]/45 bg-[#5B41DA]/[0.06] px-4 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-[#5B41DA]">
      {children}
    </span>
  )
}
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

interface FlowStep {
  number: string
  title: string
  description: string
  image: string
  Icon: typeof Phone
}

const steps: FlowStep[] = [
  {
    number: '01',
    title: 'Customer calls during a rush',
    description:
      'Your phone rings while staff are serving guests, packing orders, or handling the counter.',
    image: '/images/how-step-1.png',
    Icon: Phone,
  },
  {
    number: '02',
    title: 'RezFlo answers instantly',
    description:
      'The AI handles FAQs, reservations, pickup orders, spam, and customer questions in the caller’s language.',
    image: '/images/how-step-2.png',
    Icon: Bot,
  },
  {
    number: '03',
    title: 'Revenue gets captured',
    description:
      'Orders, booking details, and customer info are sent into your systems so your team never loses the opportunity.',
    image: '/images/how-step-3.png',
    Icon: ShoppingBag,
  },
]

const pills = [
  { text: 'Customer calling', emoji: '📞' },
  { text: 'Staff busy', emoji: '👀' },
  { text: 'RezFlo answers', emoji: '🤖' },
  { text: 'Order captured', emoji: '✅' },
]

export function HowItWorks() {
  const [active, setActive] = useState(0)
  const hovering = useRef(false)

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!hovering.current) setActive(a => (a + 1) % steps.length)
    }, 3800)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section id="how" className="relative overflow-hidden py-28 md:py-36">
      <div aria-hidden className="divider-violet absolute inset-x-0 top-0 h-px" />
      <SectionAura position="top-left" color="rgba(169, 147, 255, 0.40)" size={70} opacity={0.45} />
      <SectionAura position="right" color="rgba(91, 65, 218, 0.22)" size={50} opacity={0.5} blur={90} />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <LightPill>How it works</LightPill>
          <h2 className="font-display mt-7 text-[2.25rem] font-medium leading-[1.1] tracking-[-0.018em] text-[#201B33] sm:text-[2.85rem] lg:text-[3.5rem]">
            From <GradText>ringing phone</GradText> to{' '}
            <GradText>paid order</GradText> in seconds.
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-[#201B33]/60">
            Live in days, not months. Forward your line and you&rsquo;re operational.
          </p>
        </div>

        {/* === Cinematic horizontal carousel ================================= */}
        <div
          onMouseEnter={() => (hovering.current = true)}
          onMouseLeave={() => (hovering.current = false)}
          className="relative mt-16"
        >
          <Carousel active={active} setActive={setActive} />
        </div>

        {/* === Progress dots ================================================ */}
        <div className="mt-10 flex justify-center gap-3">
          {steps.map((s, i) => (
            <button
              key={s.number}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Go to ${s.title}`}
              className="group relative h-1.5 overflow-hidden rounded-full transition-all duration-500"
              style={{
                width: i === active ? 56 : 22,
                background:
                  i === active ? 'rgba(91,65,218,0.18)' : 'rgba(32,27,51,0.12)',
              }}
            >
              {i === active && (
                <motion.span
                  key={active}
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background:
                      'linear-gradient(90deg, #5B41DA 0%, #A993FF 50%, #5B41DA 100%)',
                    boxShadow: '0 0 12px 2px rgba(91,65,218,0.4)',
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3.6, ease: 'linear' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* === Sequenced floating status pills =============================== */}
        <div className="mt-12 flex justify-center">
          <PillFlow active={active} />
        </div>
      </Container>

      {/* === Mini call-flow mockup section (Alven-style) ==================== */}
      <Container>
        <div className="mt-28 grid grid-cols-1 items-center gap-12 md:mt-36 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <LightPill>The phone, handled.</LightPill>
            <h3 className="font-display mt-7 text-[2rem] font-medium leading-[1.08] tracking-[-0.018em] text-[#201B33] sm:text-[2.5rem] lg:text-[3rem]">
              An <GradText>AI receptionist</GradText><br />
              that never misses a lead.
            </h3>
            <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-[#201B33]/60">
              Your team is on the floor. RezFlo answers 24/7, qualifies the
              caller, captures essential details, and hands the result to your
              POS or booking platform automatically.
            </p>

            <ul className="mt-8 space-y-3 text-[0.95rem] text-[#201B33]/85">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#5B41DA]" />
                AI Receptionist
              </li>
              <li className="flex items-center gap-3 text-[#201B33]/40">
                <Bot className="h-4 w-4" />
                Maintenance follow-ups
              </li>
              <li className="flex items-center gap-3 text-[#201B33]/40">
                <ShoppingBag className="h-4 w-4" />
                After-hours capture
              </li>
            </ul>
          </div>

          <CallFlowMockup />
        </div>
      </Container>
    </section>
  )
}

/* =====================================================================
   Cinematic horizontal carousel — one active card centered with the
   previous and next cards peeking in on the sides (faded + blurred).
   ===================================================================== */
function Carousel({
  active,
  setActive,
}: {
  active: number
  setActive: (i: number) => void
}) {
  const total = steps.length

  function offsetFor(i: number): number {
    let d = i - active
    if (d > total / 2) d -= total
    if (d < -total / 2) d += total
    return d
  }

  return (
    <div
      className="hiw-carousel relative mx-auto h-[500px] w-full max-w-6xl select-none sm:h-[540px] md:h-[460px]"
      role="region"
      aria-label="How RezFlo works — animated walkthrough"
    >
      {/* Side click affordances */}
      <button
        type="button"
        onClick={() => setActive((active - 1 + total) % total)}
        aria-label="Previous step"
        className="absolute left-0 top-0 z-30 flex h-full w-[14%] cursor-pointer items-center justify-start pl-2 text-[#201B33]/70 transition-colors hover:text-[#5B41DA] md:w-[18%] md:pl-4"
      >
        <span className="rounded-full border border-[#A993FF]/40 bg-white/80 p-2 shadow-sm backdrop-blur-sm">
          <ChevronIcon dir="left" />
        </span>
      </button>
      <button
        type="button"
        onClick={() => setActive((active + 1) % total)}
        aria-label="Next step"
        className="absolute right-0 top-0 z-30 flex h-full w-[14%] cursor-pointer items-center justify-end pr-2 text-[#201B33]/70 transition-colors hover:text-[#5B41DA] md:w-[18%] md:pr-4"
      >
        <span className="rounded-full border border-[#A993FF]/40 bg-white/80 p-2 shadow-sm backdrop-blur-sm">
          <ChevronIcon dir="right" />
        </span>
      </button>

      {steps.map((s, i) => {
        const offset = offsetFor(i)
        const isActive = offset === 0
        const inFrame = Math.abs(offset) <= 1

        const x = offset === 0 ? '0%' : offset < 0 ? '-72%' : '72%'
        const scale = isActive ? 1 : 0.82
        const opacity = isActive ? 1 : inFrame ? 0.35 : 0

        return (
          <motion.div
            key={s.number}
            className="absolute inset-0 flex items-center justify-center"
            animate={{ x, scale, opacity }}
            transition={{ duration: 0.7, ease: [0.22, 0.9, 0.25, 1] }}
            style={{
              zIndex: isActive ? 20 : 10,
              filter: isActive ? 'none' : 'blur(4px)',
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
            }}
            aria-hidden={!isActive}
          >
            <div className="pointer-events-auto h-full w-[92%] max-w-4xl py-2">
              <ActiveCard step={s} active={isActive} />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function ChevronIcon({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {dir === 'left' ? <path d="m15 6-6 6 6 6" /> : <path d="m9 6 6 6-6 6" />}
    </svg>
  )
}

function ActiveCard({ step, active }: { step: FlowStep; active: boolean }) {
  const cardRef = useRef<HTMLDivElement | null>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotateX = (y - cy) / 28
    const rotateY = (cx - x) / 28
    card.style.setProperty('--holo-x', `${x}px`)
    card.style.setProperty('--holo-y', `${y}px`)
    card.style.setProperty('--holo-opacity', '0.8')
    card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }
  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg)'
    card.style.setProperty('--holo-opacity', '0')
  }

  return (
    <div className="relative h-full">
      {/* Glow halo only behind the active card */}
      <motion.div
        aria-hidden
        animate={{ opacity: active ? 0.9 : 0 }}
        transition={{ duration: 0.6 }}
        className="pointer-events-none absolute -inset-6 rounded-[40px] blur-3xl"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 40%, rgba(169,147,255,0.45), transparent 70%)',
        }}
      />

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative grid grid-cols-1 overflow-hidden rounded-[28px] border transition-transform duration-150 ease-out will-change-transform md:grid-cols-[1.05fr_1fr]"
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FCFBFF 100%)',
          borderColor: active
            ? 'rgba(169,147,255,0.55)'
            : 'rgba(32,27,51,0.08)',
          boxShadow: active
            ? '0 40px 90px -30px rgba(91,65,218,0.4), 0 0 0 1px rgba(169,147,255,0.25) inset'
            : '0 10px 30px -18px rgba(32,27,51,0.18)',
          height: '100%',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* === Left: text === */}
        <div className="order-2 flex h-full flex-col justify-between p-7 md:order-1 md:p-10">
          <div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#A993FF]/45 bg-[#5B41DA]/[0.06] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#5B41DA]">
              <step.Icon className="h-3 w-3" />
              Step {step.number}
            </span>

            <h3
              className="cf-step-title font-display mt-5 text-[1.85rem] font-medium leading-[1.1] tracking-[-0.015em] text-[#201B33] sm:text-[2.1rem] md:text-[2.4rem]"
              style={{ minHeight: '5.4rem' }}
            >
              {step.title}
            </h3>

            <p
              className="cf-step-desc mt-4 max-w-md text-[1rem] leading-relaxed text-[#201B33]/60 md:text-[1.05rem]"
              style={{
                minHeight: '4.5rem',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3,
                overflow: 'hidden',
              }}
            >
              {step.description}
            </p>
          </div>

          {/* Inline progress hint */}
          <div className="mt-6 flex items-center gap-3 text-[0.78rem] tracking-wide text-[#201B33]/50">
            <span className="font-mono">
              {step.number} / {String(steps.length).padStart(2, '0')}
            </span>
            <span className="h-px flex-1 bg-[#201B33]/10" />
            <span className="text-[#5B41DA]/80">Live demo · auto-cycling</span>
          </div>
        </div>

        {/* === Right: image === */}
        <div className="relative order-1 h-44 sm:h-56 overflow-hidden rounded-t-[24px] ring-1 ring-[#A993FF]/35 md:order-2 md:h-full md:rounded-none md:ring-0">
          <img
            src={step.image}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out"
            style={{
              transform: active ? 'scale(1.04)' : 'scale(1)',
              willChange: 'transform',
            }}
          />
          {/* Soft white edge blend so the image melts into the card */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden md:block"
            style={{
              background:
                'linear-gradient(90deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 24%)',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 md:hidden"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0) 62%, rgba(255,255,255,0.75) 100%)',
            }}
          />
        </div>

        {/* Cursor-tracking violet sheen — subtle on white */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5] transition-opacity duration-200"
          style={{
            opacity: 'var(--holo-opacity, 0)',
            background:
              'radial-gradient(circle 300px at var(--holo-x, 50%) var(--holo-y, 50%), rgba(169,147,255,0.24) 0%, rgba(91,65,218,0.08) 38%, transparent 70%)',
          }}
        />
      </div>
    </div>
  )
}

/* =====================================================================
   Floating sequenced status pills.
   ===================================================================== */
function PillFlow({ active }: { active: number }) {
  const visibleCount = active === 0 ? 2 : active === 1 ? 3 : 4

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {pills.map((p, i) => {
        const visible = i < visibleCount
        const isLatest = i === visibleCount - 1
        return (
          <AnimatePresence key={p.text}>
            {visible && (
              <motion.span
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.78rem] font-medium tracking-tight "
                style={{
                  borderColor: isLatest
                    ? 'rgba(169,147,255,0.55)'
                    : 'rgba(32,27,51,0.10)',
                  background: isLatest
                    ? 'linear-gradient(180deg, rgba(91,65,218,0.10), rgba(169,147,255,0.16))'
                    : '#FFFFFF',
                  boxShadow: isLatest
                    ? '0 10px 24px -12px rgba(91,65,218,0.45)'
                    : '0 6px 16px -12px rgba(32,27,51,0.2)',
                  color: isLatest ? '#5B41DA' : 'rgba(32,27,51,0.75)',
                }}
              >
                <span className="text-[0.85rem]">{p.emoji}</span>
                {p.text}
              </motion.span>
            )}
          </AnimatePresence>
        )
      })}
    </div>
  )
}

/* =====================================================================
   Mini call-flow mockup — staff misses, RezFlo picks up, details captured.
   ===================================================================== */
function CallFlowMockup() {
  const [phase, setPhase] = useState(0) // 0..3
  const cardRef = useRef<HTMLDivElement | null>(null)
  const isMobile = useIsMobile()
  const cardHeight = isMobile ? 560 : 460

  useEffect(() => {
    const id = window.setInterval(() => setPhase(p => (p + 1) % 4), 2400)
    return () => window.clearInterval(id)
  }, [])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotateX = (y - cy) / 24
    const rotateY = (cx - x) / 24
    card.style.setProperty('--holo-x', `${x}px`)
    card.style.setProperty('--holo-y', `${y}px`)
    card.style.setProperty('--holo-opacity', '0.85')
    card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }
  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg)'
    card.style.setProperty('--holo-opacity', '0')
  }

  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      {/* Outer halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 rounded-[36px] opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 30%, rgba(169,147,255,0.42), transparent 70%)',
        }}
      />

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-[26px] border transition-transform duration-150 ease-out will-change-transform"
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FCFBFF 100%)',
          borderColor: 'rgba(169,147,255,0.5)',
          boxShadow:
            '0 30px 80px -32px rgba(91,65,218,0.45), 0 0 0 1px rgba(169,147,255,0.20) inset',
          height: cardHeight,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* === Notifications slot (top) ====================== */}
        <div
          className="pointer-events-none absolute inset-x-0 top-7 flex flex-col items-center gap-3"
          style={{ height: 100 }}
        >
          <FadeSlot show={phase >= 0 && phase < 3}>
            <div
              className="flex items-center gap-3 rounded-full border border-[#A993FF]/35 bg-white px-3 py-2 text-[0.85rem] text-[#201B33]"
              style={{ boxShadow: '0 14px 30px -16px rgba(32,27,51,0.35)' }}
            >
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{
                  background:
                    'radial-gradient(circle at 30% 30%, #f5d8a0, #c89455)',
                }}
                aria-hidden
              />
              <Phone className="h-4 w-4 text-[#201B33]/60" />
              <span>Lead calling</span>
              <span className="ml-1 inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            </div>
          </FadeSlot>

          <FadeSlot show={phase >= 1 && phase < 3} delay={0.05}>
            <div
              className="flex items-center gap-2 rounded-full border border-[#201B33]/10 bg-white px-3 py-1.5 text-[0.8rem] font-medium text-[#201B33]"
              style={{ boxShadow: '0 14px 30px -16px rgba(32,27,51,0.3)' }}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white">
                <svg viewBox="0 0 24 24" className="h-3 w-3 fill-none stroke-current" strokeWidth="3" strokeLinecap="round" aria-hidden>
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              </span>
              Staff can&rsquo;t pick up
            </div>
          </FadeSlot>
        </div>

        {/* === Main content slot (center) =================== */}
        <div
          className="absolute inset-x-0"
          style={{ top: 140, bottom: 56 }}
        >
          {/* Phase 2: RezFlo card */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
            style={{
              opacity: phase === 2 ? 1 : 0,
              pointerEvents: phase === 2 ? 'auto' : 'none',
              willChange: 'opacity',
            }}
          >
            <div
              className="w-full max-w-sm rounded-2xl border border-[#A993FF]/35 bg-[#FBFAFF] p-5"
              style={{ marginInline: 24, boxShadow: '0 18px 40px -24px rgba(91,65,218,0.35)' }}
            >
              <div className="flex items-center gap-3">
                <span aria-hidden className="relative inline-block h-9 w-9">
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'conic-gradient(from 0deg, #3b0d80, #ffffff 18deg, #6d28d9 40deg, #2a0860 80deg, #ffffff 110deg, #5b21b6 140deg, #1f0648 180deg, #ffffff 210deg, #6d28d9 240deg, #2a0860 280deg, #ffffff 310deg, #3b0d80 360deg)',
                      animation: 'orbSpin 14s linear infinite',
                      boxShadow: '0 0 16px 3px rgba(91,65,218,0.5)',
                    }}
                  />
                </span>
                <div>
                  <div className="text-[0.8rem] font-semibold text-[#201B33]">RezFlo</div>
                  <div className="text-[0.7rem] text-[#201B33]/50">answering now…</div>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[0.65rem] font-medium text-emerald-600 ring-1 ring-emerald-500/25">
                  LIVE
                </span>
              </div>

              <div className="mt-4 space-y-2 text-[0.8rem]">
                <TranscriptLine>
                  “Thanks for calling Bella Pasta — how can I help?”
                </TranscriptLine>
                <TranscriptLine muted>
                  “Hi, I&rsquo;d like to book a table for 4 at 7pm.”
                </TranscriptLine>
                <TranscriptLine>
                  “Great — booked. Anything else?”
                </TranscriptLine>
              </div>
            </div>
          </div>

          {/* Phase 3: RezFlo logo + captured pills.
              Notifications are hidden in this phase, so the block is
              pulled up into that empty top space (top:-96 relative to
              this slot) to sit centered in the whole card rather than
              low in the lower slot. */}
          <div
            className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center gap-6 transition-opacity duration-500"
            style={{
              top: -96,
              opacity: phase === 3 ? 1 : 0,
              pointerEvents: phase === 3 ? 'auto' : 'none',
              willChange: 'opacity',
            }}
          >
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 rounded-full blur-2xl"
                style={{
                  background:
                    'radial-gradient(circle, rgba(169,147,250,0.45), transparent 70%)',
                }}
              />
              <img
                src="/logos/rezflo-logo.png"
                alt="RezFlo"
                className="relative h-6 w-auto object-contain md:h-28"
                style={{
                  filter: 'drop-shadow(0 6px 20px rgba(91,65,218,0.4))',
                }}
              />
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-[0.8rem] font-medium text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                Details captured
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#A993FF]/45 bg-[#5B41DA]/10 px-3.5 py-1.5 text-[0.8rem] font-medium text-[#5B41DA]">
                <Send className="h-4 w-4" />
                Sent to POS
              </div>
            </div>
          </div>
        </div>

        {/* Status footer */}
        <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2 text-[0.7rem] tracking-wide text-[#201B33]/45">
          <Eye className="h-3.5 w-3.5" />
          Live demo · auto-cycling
        </div>

        {/* Cursor-tracking violet sheen — subtle on white */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5] transition-opacity duration-200"
          style={{
            opacity: 'var(--holo-opacity, 0)',
            background:
              'radial-gradient(circle 260px at var(--holo-x, 50%) var(--holo-y, 50%), rgba(169,147,255,0.22) 0%, rgba(91,65,218,0.08) 38%, transparent 70%)',
          }}
        />
      </div>
    </div>
  )
}

/**
 * FadeSlot — opacity-only show/hide that never affects layout.
 */
function FadeSlot({
  show,
  delay = 0,
  children,
}: {
  show: boolean
  delay?: number
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transition: `opacity 500ms ease ${delay * 1000}ms`,
        pointerEvents: show ? 'auto' : 'none',
        willChange: 'opacity',
      }}
    >
      {children}
    </div>
  )
}

function TranscriptLine({
  children,
  muted = false,
}: {
  children: React.ReactNode
  muted?: boolean
}) {
  return (
    <div
      className={`rounded-lg px-3 py-2 ${
        muted
          ? 'self-end bg-[#201B33]/[0.05] text-[#201B33]/70'
          : 'bg-[#5B41DA]/[0.08] text-[#201B33]'
      }`}
      style={{
        maxWidth: '85%',
        marginLeft: muted ? 'auto' : 0,
      }}
    >
      {children}
    </div>
  )
}
