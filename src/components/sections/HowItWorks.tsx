import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Bot, ShoppingBag, Eye, CheckCircle2, Send } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionAura } from '../ui/SectionAura'
import { SectionLabel } from '../ui/SectionLabel'

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
      <SectionAura position="top-left" color="rgba(168, 85, 247, 0.55)" size={70} opacity={0.4} />
      <SectionAura position="right" color="rgba(196, 181, 253, 0.45)" size={50} opacity={0.5} blur={90} />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="font-display mt-7 text-[2.25rem] font-medium leading-[1.1] tracking-[-0.018em] text-white sm:text-[2.85rem] lg:text-[3.5rem]">
            From <span className="gradient-text">ringing phone</span> to{' '}
            <span className="gradient-text">paid order</span> in seconds.
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-white/75">
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
                  i === active ? 'rgba(167,139,250,0.25)' : 'rgba(255,255,255,0.12)',
              }}
            >
              {i === active && (
                <motion.span
                  key={active}
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background:
                      'linear-gradient(90deg, #a78bfa 0%, #ffffff 50%, #a78bfa 100%)',
                    boxShadow: '0 0 12px 2px rgba(167,139,250,0.6)',
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
            <SectionLabel>The phone, handled.</SectionLabel>
            <h3 className="font-display mt-7 text-[2rem] font-medium leading-[1.08] tracking-[-0.018em] text-white sm:text-[2.5rem] lg:text-[3rem]">
              An <span className="gradient-text">AI receptionist</span><br />
              that never misses a lead.
            </h3>
            <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-white/75">
              Your team is on the floor. RezFlo answers 24/7, qualifies the
              caller, captures essential details, and hands the result to your
              POS or booking platform automatically.
            </p>

            <ul className="mt-8 space-y-3 text-[0.95rem] text-white/85">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-violet-300" />
                AI Receptionist
              </li>
              <li className="flex items-center gap-3 text-white/45">
                <Bot className="h-4 w-4" />
                Maintenance follow-ups
              </li>
              <li className="flex items-center gap-3 text-white/45">
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
   Cards animate smoothly to their slot whenever `active` changes.
   ===================================================================== */
function Carousel({
  active,
  setActive,
}: {
  active: number
  setActive: (i: number) => void
}) {
  const total = steps.length

  // Wrap-around offset in [-1, 0, 1] so prev/next always peek.
  function offsetFor(i: number): number {
    let d = i - active
    if (d > total / 2) d -= total
    if (d < -total / 2) d += total
    return d
  }

  return (
    <div
      className="relative mx-auto h-[500px] w-full max-w-6xl select-none sm:h-[540px] md:h-[460px]"
      role="region"
      aria-label="How RezFlo works — animated walkthrough"
    >
      {/* Side click affordances */}
      <button
        type="button"
        onClick={() => setActive((active - 1 + total) % total)}
        aria-label="Previous step"
        className="absolute left-0 top-0 z-30 flex h-full w-[14%] cursor-pointer items-center justify-start pl-2 text-white/70 transition-colors hover:text-white md:w-[18%] md:pl-4 md:text-white/0 md:hover:text-white/40"
      >
        <span className="rounded-full border border-white/15 bg-black/55 p-2 backdrop-blur-sm md:bg-black/30">
          <ChevronIcon dir="left" />
        </span>
      </button>
      <button
        type="button"
        onClick={() => setActive((active + 1) % total)}
        aria-label="Next step"
        className="absolute right-0 top-0 z-30 flex h-full w-[14%] cursor-pointer items-center justify-end pr-2 text-white/70 transition-colors hover:text-white md:w-[18%] md:pr-4 md:text-white/0 md:hover:text-white/40"
      >
        <span className="rounded-full border border-white/15 bg-black/55 p-2 backdrop-blur-sm md:bg-black/30">
          <ChevronIcon dir="right" />
        </span>
      </button>

      {steps.map((s, i) => {
        const offset = offsetFor(i)
        const isActive = offset === 0
        const inFrame = Math.abs(offset) <= 1

        // Translate the side cards far enough out that only ~14% peeks in.
        const x = offset === 0 ? '0%' : offset < 0 ? '-72%' : '72%'
        const scale = isActive ? 1 : 0.82
        const opacity = isActive ? 1 : inFrame ? 0.35 : 0

        return (
          <motion.div
            key={s.number}
            className="absolute inset-0 flex items-center justify-center"
            // Animate only transform + opacity (compositor-only — no paint).
            // Blur is applied via static style on inactive cards so it
            // doesn't transition (filter transitions trigger paints).
            animate={{ x, scale, opacity }}
            transition={{ duration: 0.7, ease: [0.22, 0.9, 0.25, 1] }}
            style={{
              zIndex: isActive ? 20 : 10,
              filter: isActive ? 'none' : 'blur(4px)',
              willChange: 'transform, opacity',
              transform: 'translateZ(0)', // force its own GPU layer
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

  // Holographic cursor-tracking + 3D tilt — mirrors the effect on the
  // Anthony voice card and the scroll-expand video frame.
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
        animate={{ opacity: active ? 0.95 : 0 }}
        transition={{ duration: 0.6 }}
        className="pointer-events-none absolute -inset-6 rounded-[40px] blur-3xl"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 40%, rgba(167,139,250,0.55), transparent 70%)',
        }}
      />

      {/*
        Fixed-size shell — every slide renders at exactly these
        dimensions so the carousel never reflows or jumps between
        steps. Content variants (text, image) live inside slots with
        reserved min-heights so wrapping never resizes the card.
      */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative grid grid-cols-1 overflow-hidden rounded-[28px] border transition-transform duration-150 ease-out will-change-transform md:grid-cols-[1.05fr_1fr]"
        style={{
          // Layered background: translucent gradient on top of an opaque
          // fallback so the rounded-corner clip doesn't show the page bg
          // through the card on mobile (where the card is the only opaque
          // element in the section).
          background:
            'linear-gradient(180deg, rgba(30,16,60,0.55) 0%, rgba(12,8,28,0.82) 100%), #0F0824',
          borderColor: active
            ? 'rgba(167,139,250,0.45)'
            : 'rgba(255,255,255,0.08)',
          boxShadow: active
            ? '0 40px 90px -28px rgba(124,58,237,0.65), 0 0 0 1px rgba(167,139,250,0.25) inset'
            : '0 0 0 1px rgba(255,255,255,0.05) inset',
          height: '100%',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* === Left: text — fixed-height column, content slots reserved === */}
        <div className="order-2 flex h-full flex-col justify-between p-7 md:order-1 md:p-10">
          <div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.04] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-violet-200/90">
              <step.Icon className="h-3 w-3" />
              Step {step.number}
            </span>

            {/* Reserved title block — min-height accommodates 2 lines so
                short and long titles sit in the same vertical slot. */}
            <h3
              className="font-display mt-5 text-[1.85rem] font-medium leading-[1.1] tracking-[-0.015em] text-white sm:text-[2.1rem] md:text-[2.4rem]"
              style={{ minHeight: '5.4rem' }}
            >
              {step.title}
            </h3>

            {/* Reserved description block — clamps to 3 lines so any
                copy length sits in the same slot. */}
            <p
              className="mt-4 max-w-md text-[1rem] leading-relaxed text-white/75 md:text-[1.05rem]"
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

          {/* Inline progress hint — pinned to the bottom of the column */}
          <div className="mt-6 flex items-center gap-3 text-[0.78rem] tracking-wide text-white/55">
            <span className="font-mono">
              {step.number} / {String(steps.length).padStart(2, '0')}
            </span>
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-violet-200/80">Live demo · auto-cycling</span>
          </div>
        </div>

        {/* === Right: image — fills the fixed grid cell ===
            Mobile note: the grid is single-column, image row is auto-sized
            so we need an explicit height; the absolute-positioned <img>
            otherwise collapses to ~0px and looks like a thin strip.
            Mobile also gets explicit rounded-t corners + a violet ring
            so the top edges read as curved with the brand-color outline,
            matching the rest of the card. Desktop has the image filling
            the right grid cell flush, so no rounding/ring there. */}
        <div className="relative order-1 h-44 sm:h-56 overflow-hidden rounded-t-[24px] ring-1 ring-violet-400/35 md:order-2 md:h-full md:rounded-none md:ring-0">
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
          {/* Soft side-only fade so text reads on the left edge */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden md:block"
            style={{
              background:
                'linear-gradient(90deg, rgba(12,8,28,0.55) 0%, rgba(12,8,28,0) 35%)',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 md:hidden"
            style={{
              background:
                'linear-gradient(180deg, rgba(12,8,28,0) 60%, rgba(12,8,28,0.65) 100%)',
            }}
          />
        </div>

        {/* Holographic cursor-tracking radial glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5] mix-blend-screen transition-opacity duration-200"
          style={{
            opacity: 'var(--holo-opacity, 0)',
            background:
              'radial-gradient(circle 280px at var(--holo-x, 50%) var(--holo-y, 50%), rgba(196,181,253,0.55) 0%, rgba(124,58,237,0.25) 35%, transparent 70%)',
          }}
        />
        {/* Holographic conic shimmer */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[4] mix-blend-overlay transition-opacity duration-200"
          style={{
            opacity: 'var(--holo-opacity, 0)',
            background:
              'conic-gradient(from 180deg at var(--holo-x, 50%) var(--holo-y, 50%), rgba(167,139,250,0) 0deg, rgba(232,121,249,0.35) 90deg, rgba(125,211,252,0.25) 180deg, rgba(167,139,250,0.35) 270deg, rgba(167,139,250,0) 360deg)',
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
  // Pills 0,1 → step 0 ; pill 2 → step 1 ; pills 3,4 → step 2
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
                    ? 'rgba(167,139,250,0.45)'
                    : 'rgba(255,255,255,0.10)',
                  background: isLatest
                    ? 'linear-gradient(180deg, rgba(76,29,149,0.55), rgba(30,16,60,0.65))'
                    : 'rgba(20,12,40,0.55)',
                  boxShadow: isLatest
                    ? '0 8px 22px -8px rgba(124,58,237,0.6)'
                    : 'none',
                  color: isLatest ? '#ede9fe' : 'rgba(255,255,255,0.78)',
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

  useEffect(() => {
    const id = window.setInterval(() => setPhase(p => (p + 1) % 4), 2400)
    return () => window.clearInterval(id)
  }, [])

  // Holographic cursor-tracking + 3D tilt — same effect used on the
  // other RezFlo cards.
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
            'radial-gradient(60% 50% at 50% 30%, rgba(124,58,237,0.45), transparent 70%)',
        }}
      />

      {/*
        Fixed-height frame — every phase renders inside the same exact
        rectangle. Slots are reserved with absolute positioning so
        appearing/disappearing content never reflows the layout.
      */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-[26px] border border-white/[0.10] transition-transform duration-150 ease-out will-change-transform"
        style={{
          background:
            'linear-gradient(180deg, rgba(30,16,60,0.92) 0%, rgba(12,8,28,0.96) 100%)',
          boxShadow:
            '0 30px 80px -30px rgba(124,58,237,0.55), 0 0 0 1px rgba(167,139,250,0.18) inset',
          height: 460,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* === Notifications slot (top, fixed area) ====================== */}
        <div
          className="pointer-events-none absolute inset-x-0 top-7 flex flex-col items-center gap-3"
          style={{ height: 100 }}
        >
          <FadeSlot show={phase >= 0 && phase < 3}>
            <div
              className="flex items-center gap-3 rounded-full border border-white/[0.10] bg-white/[0.04] px-3 py-2 text-[0.85rem] text-white/90"
              style={{ boxShadow: '0 14px 30px -14px rgba(0,0,0,0.6)' }}
            >
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{
                  background:
                    'radial-gradient(circle at 30% 30%, #f5d8a0, #c89455)',
                }}
                aria-hidden
              />
              <Phone className="h-4 w-4 text-white/70" />
              <span>Lead calling</span>
              <span className="ml-1 inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            </div>
          </FadeSlot>

          <FadeSlot show={phase >= 1 && phase < 3} delay={0.05}>
            <div
              className="flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[0.8rem] font-medium text-neutral-900"
              style={{ boxShadow: '0 14px 30px -14px rgba(0,0,0,0.5)' }}
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

        {/* === Main content slot (center, fixed area) =================== */}
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
              className="w-full max-w-sm rounded-2xl border border-white/[0.10] bg-black/30 p-5"
              style={{ marginInline: 24 }}
            >
              <div className="flex items-center gap-3">
                <span aria-hidden className="relative inline-block h-9 w-9">
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'conic-gradient(from 0deg, #3b0d80, #ffffff 18deg, #6d28d9 40deg, #2a0860 80deg, #ffffff 110deg, #5b21b6 140deg, #1f0648 180deg, #ffffff 210deg, #6d28d9 240deg, #2a0860 280deg, #ffffff 310deg, #3b0d80 360deg)',
                      animation: 'orbSpin 14s linear infinite',
                      boxShadow: '0 0 16px 3px rgba(124,58,237,0.6)',
                    }}
                  />
                </span>
                <div>
                  <div className="text-[0.8rem] font-semibold text-white">RezFlo</div>
                  <div className="text-[0.7rem] text-white/55">answering now…</div>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[0.65rem] font-medium text-emerald-300 ring-1 ring-emerald-400/30">
                  LIVE
                </span>
              </div>

              <div className="mt-4 space-y-2 text-[0.8rem] text-white/75">
                {phase === 2 && (
                  <>
                    <TranscriptLine delay={0.1}>“Thanks for calling Bella Pasta — how can I help?”</TranscriptLine>
                    <TranscriptLine delay={0.6} muted>“Hi, I&rsquo;d like to book a table for 4 at 7pm.”</TranscriptLine>
                    <TranscriptLine delay={1.1}>“Great — booked. Anything else?”</TranscriptLine>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Phase 3: RezFlo logo + captured pills */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 transition-opacity duration-500"
            style={{
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
                    'radial-gradient(circle, rgba(167,139,250,0.45), transparent 70%)',
                }}
              />
              <img
                src="/logos/rezflo-logo.png"
                alt="RezFlo"
                className="relative h-24 w-auto object-contain md:h-28"
                style={{
                  filter: 'drop-shadow(0 6px 20px rgba(124,58,237,0.65))',
                }}
              />
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-1.5 text-[0.8rem] font-medium text-emerald-200">
                <CheckCircle2 className="h-4 w-4" />
                Details captured
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3.5 py-1.5 text-[0.8rem] font-medium text-violet-200">
                <Send className="h-4 w-4" />
                Sent to POS
              </div>
            </div>
          </div>
        </div>

        {/* Status footer (bottom, fixed area) */}
        <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2 text-[0.7rem] tracking-wide text-white/50">
          <Eye className="h-3.5 w-3.5" />
          Live demo · auto-cycling
        </div>

        {/* Holographic cursor-tracking radial glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5] mix-blend-screen transition-opacity duration-200"
          style={{
            opacity: 'var(--holo-opacity, 0)',
            background:
              'radial-gradient(circle 240px at var(--holo-x, 50%) var(--holo-y, 50%), rgba(196,181,253,0.55) 0%, rgba(124,58,237,0.25) 35%, transparent 70%)',
          }}
        />
        {/* Holographic conic shimmer */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[4] mix-blend-overlay transition-opacity duration-200"
          style={{
            opacity: 'var(--holo-opacity, 0)',
            background:
              'conic-gradient(from 180deg at var(--holo-x, 50%) var(--holo-y, 50%), rgba(167,139,250,0) 0deg, rgba(232,121,249,0.35) 90deg, rgba(125,211,252,0.25) 180deg, rgba(167,139,250,0.35) 270deg, rgba(167,139,250,0) 360deg)',
          }}
        />
      </div>
    </div>
  )
}

/**
 * FadeSlot — opacity-only show/hide that never affects layout.
 * Children stay mounted at their reserved slot; only opacity and
 * pointer-events change so nothing else in the frame moves.
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
        transition: `opacity 350ms ease ${delay * 1000}ms`,
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
  delay = 0,
  muted = false,
}: {
  children: React.ReactNode
  delay?: number
  muted?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className={`rounded-lg px-3 py-2 ${
        muted
          ? 'self-end bg-white/[0.05] text-white/65'
          : 'bg-violet-500/10 text-white/85'
      }`}
      style={{
        maxWidth: '85%',
        marginLeft: muted ? 'auto' : 0,
        willChange: 'opacity',
      }}
    >
      {children}
    </motion.div>
  )
}
