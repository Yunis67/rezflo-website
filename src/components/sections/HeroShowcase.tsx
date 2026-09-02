import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Pizza,
  Beef,
  ShoppingBag,
  UtensilsCrossed,
  Coffee,
  PhoneIncoming,
  AudioLines,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react'

/* ============================================================
   Auto-rotating restaurant showcase for the hero's right column.
   Inspired by bookedworks.com's hero visual, on RezFlo branding.

   Per category it animates a call through 3 stages over 6.5s:
     0.0–1.5s  Incoming Call
     1.5–4.0s  RezFlo Is Answering
     4.0–6.5s  Successful Result
   Then auto-advances to the next category. Clicking a pill
   activates it immediately and restarts the sequence.

   Pauses on hover (image or controls) and when the tab is hidden.
   Respects prefers-reduced-motion (no slow zoom, fades only).

   Images are placeholders — drop real photos at
   /public/images/hero/<key>.jpg and set `image` on each category.
   ============================================================ */

interface Category {
  key: string
  label: string
  badge: string
  context: string
  incoming: { name: string; loc: string }
  answering: { title: string; body: string }
  result: { title: string; body: string }
  Icon: LucideIcon
  accent: string
  image?: string // e.g. '/images/hero/pizzeria.jpg' once supplied
}

const CATEGORIES: Category[] = [
  {
    key: 'pizzeria',
    label: 'Pizzeria',
    badge: 'Pizzeria',
    context: 'While your ovens are full',
    incoming: { name: 'Maria R.', loc: 'Toronto, ON' },
    answering: {
      title: 'RezFlo is taking the order',
      body: 'Large pepperoni pizza, wings and two drinks.',
    },
    result: { title: 'Order sent to POS', body: 'Clover · $47.80' },
    Icon: Pizza,
    accent: '#ef7d3a',
  },
  {
    key: 'fastfood',
    label: 'Fast Food',
    badge: 'Fast Food',
    context: 'During the lunch rush',
    incoming: { name: 'Daniel K.', loc: 'Mississauga, ON' },
    answering: {
      title: 'RezFlo is taking the order',
      body: 'Two burger combos, fries and three drinks.',
    },
    result: { title: 'Order sent to kitchen', body: 'Square · $38.50' },
    Icon: Beef,
    accent: '#e5484d',
  },
  {
    key: 'takeout',
    label: 'Takeout',
    badge: 'Takeout',
    context: 'While your team packs orders',
    incoming: { name: 'Aisha M.', loc: 'Waterloo, ON' },
    answering: {
      title: 'RezFlo is scheduling pickup',
      body: 'Family meal with two customized sides.',
    },
    result: { title: 'Pickup confirmed', body: 'Ready at 7:15 PM · $64.25' },
    Icon: ShoppingBag,
    accent: '#f5b800',
  },
  {
    key: 'fullservice',
    label: 'Full Service',
    badge: 'Full Service',
    context: 'While your hosts welcome guests',
    incoming: { name: 'Michael T.', loc: 'Kitchener, ON' },
    answering: {
      title: 'RezFlo is booking',
      body: 'Table for four this evening.',
    },
    result: { title: 'Reservation confirmed', body: 'Tonight · 6:30 PM' },
    Icon: UtensilsCrossed,
    accent: '#7c3aed',
  },
  {
    key: 'cafe',
    label: 'Café',
    badge: 'Café',
    context: 'While your baristas make drinks',
    incoming: { name: 'Sofia L.', loc: 'Cambridge, ON' },
    answering: {
      title: 'RezFlo is helping',
      body: 'Checking dairy-free options and closing time.',
    },
    result: {
      title: 'Question answered',
      body: 'Instantly · No staff interruption',
    },
    Icon: Coffee,
    accent: '#10b981',
  },
]

const CYCLE_MS = 6500
const STAGE1_MS = 1500 // incoming -> answering
const STAGE2_MS = 4000 // answering -> result

export function HeroShowcase() {
  const [active, setActive] = useState(0)
  const [stage, setStage] = useState<0 | 1 | 2>(0)
  const reduceMotion = useReducedMotion()

  const pausedRef = useRef(false)
  const elapsedRef = useRef(0)
  const lastRef = useRef(0)
  const stageRef = useRef<0 | 1 | 2>(0)

  // Reset the sequence whenever the active category changes.
  useEffect(() => {
    elapsedRef.current = 0
    stageRef.current = 0
    setStage(0)
  }, [active])

  // Pause when the tab is hidden.
  useEffect(() => {
    const onVis = () => {
      pausedRef.current = document.hidden || pausedRef.current
      if (!document.hidden) pausedRef.current = hoverRef.current
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const hoverRef = useRef(false)

  // rAF accumulator drives stage transitions + auto-advance so pause
  // freezes progress rather than restarting it.
  useEffect(() => {
    let raf = 0
    lastRef.current = performance.now()
    const tick = (now: number) => {
      const dt = now - lastRef.current
      lastRef.current = now
      const frozen = pausedRef.current || document.hidden
      if (!frozen) {
        elapsedRef.current += dt
        const e = elapsedRef.current
        const s: 0 | 1 | 2 = e < STAGE1_MS ? 0 : e < STAGE2_MS ? 1 : 2
        if (s !== stageRef.current) {
          stageRef.current = s
          setStage(s)
        }
        if (e >= CYCLE_MS) {
          elapsedRef.current = 0
          stageRef.current = 0
          setActive(a => (a + 1) % CATEGORIES.length)
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const setHover = (v: boolean) => {
    hoverRef.current = v
    pausedRef.current = v
  }

  const cat = CATEGORIES[active]

  return (
    <div className="w-full">
      {/* ===== Image / call card ===== */}
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="group relative overflow-hidden rounded-[28px] border border-white/[0.12]"
        style={{
          aspectRatio: '16 / 9',
          boxShadow:
            '0 40px 90px -30px rgba(124,58,237,0.45), 0 0 0 1px rgba(255,255,255,0.04) inset',
        }}
      >
        {/* Crossfading image layers (placeholders for now) */}
        {CATEGORIES.map((c, i) => (
          <ImageLayer
            key={c.key}
            cat={c}
            active={i === active}
            reduceMotion={!!reduceMotion}
          />
        ))}

        {/* Bottom dark-purple gradient for card legibility (~35%) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%]"
          style={{
            background:
              'linear-gradient(180deg, rgba(20,8,40,0) 0%, rgba(20,8,40,0.55) 45%, rgba(12,4,26,0.9) 100%)',
          }}
        />

        {/* Top-left badge */}
        <div className="absolute left-4 top-4">
          <Pill>
            <cat.Icon className="h-3.5 w-3.5" aria-hidden />
            <span className="font-geist-mono text-[0.66rem] font-medium uppercase tracking-[0.14em]">
              {cat.badge}
            </span>
          </Pill>
        </div>

        {/* Top-right context */}
        <div className="absolute right-4 top-4">
          <Pill>
            <span className="text-[0.72rem] font-medium text-white/85">
              {cat.context}
            </span>
          </Pill>
        </div>

        {/* Notification card (bottom, inside image) */}
        <div className="absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5">
          <div className="relative min-h-[84px] md:min-h-[92px]">
            <AnimatePresence initial={false}>
              <motion.div
                key={`${active}-${stage}`}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
                transition={{ duration: 0.42, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <NotifCard cat={cat} stage={stage} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ===== Category pill controls ===== */}
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="mt-4 flex gap-2 overflow-x-auto pb-1 md:mt-5 md:flex-wrap md:justify-start md:overflow-visible"
        style={{ scrollbarWidth: 'none' }}
      >
        {CATEGORIES.map((c, i) => {
          const on = i === active
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={on}
              className={`font-geist inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-[0.82rem] font-semibold transition-all duration-300 ${
                on
                  ? 'border-transparent text-white'
                  : 'border-neutral-300 bg-white text-neutral-600 hover:border-violet-300 hover:text-neutral-900'
              }`}
              style={
                on
                  ? {
                      background:
                        'linear-gradient(180deg, #8b5cf6 0%, #7c3aed 100%)',
                      boxShadow: '0 10px 24px -10px rgba(124,58,237,0.6)',
                    }
                  : undefined
              }
            >
              <c.Icon className="h-3.5 w-3.5" aria-hidden />
              {c.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* One crossfading background layer. Uses the real image when supplied,
   otherwise a branded gradient placeholder with the category icon. */
function ImageLayer({
  cat,
  active,
  reduceMotion,
}: {
  cat: Category
  active: boolean
  reduceMotion: boolean
}) {
  return (
    <div
      className="absolute inset-0 transition-opacity duration-[600ms] ease-out"
      style={{ opacity: active ? 1 : 0 }}
    >
      {cat.image ? (
        <img
          src={cat.image}
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
          style={{
            transform: active && !reduceMotion ? 'scale(1.025)' : 'scale(1)',
            transition: reduceMotion ? 'none' : 'transform 7s ease-out',
          }}
        />
      ) : (
        <div
          aria-hidden
          className="flex h-full w-full items-center justify-center"
          style={{
            background: `radial-gradient(120% 90% at 30% 15%, ${cat.accent}55 0%, ${cat.accent}22 30%, #170a2e 70%), #140a2c`,
            transform: active && !reduceMotion ? 'scale(1.025)' : 'scale(1)',
            transition: reduceMotion ? 'none' : 'transform 7s ease-out',
          }}
        >
          <div className="flex flex-col items-center gap-2 opacity-40">
            <cat.Icon className="h-14 w-14 text-white" aria-hidden />
            <span className="font-geist-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/80">
              {cat.badge}
            </span>
            <span className="font-geist text-[0.62rem] text-white/50">
              image placeholder
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

function NotifCard({ cat, stage }: { cat: Category; stage: 0 | 1 | 2 }) {
  const label =
    stage === 0 ? 'Incoming call' : stage === 1 ? cat.answering.title : cat.result.title
  const StageIcon = stage === 0 ? PhoneIncoming : stage === 1 ? AudioLines : CheckCircle2
  const iconTint =
    stage === 0 ? 'text-white' : stage === 1 ? 'text-violet-200' : 'text-emerald-300'
  const primary =
    stage === 0 ? cat.incoming.name : stage === 1 ? cat.answering.body : cat.result.body
  const secondary = stage === 0 ? cat.incoming.loc : null

  return (
    <div
      className="flex items-center gap-3 rounded-2xl border border-white/[0.12] px-3.5 py-3 backdrop-blur-md"
      style={{ background: 'rgba(18,8,34,0.62)' }}
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{ background: 'rgba(255,255,255,0.08)' }}
        aria-hidden
      >
        <StageIcon className={`h-4 w-4 ${iconTint}`} />
      </span>
      <div className="min-w-0">
        <p className="font-geist-mono text-[0.6rem] font-medium uppercase tracking-[0.16em] text-white/55">
          {label}
        </p>
        <p
          className="font-geist text-[0.9rem] font-semibold leading-snug text-white"
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
          }}
        >
          {primary}
          {secondary && (
            <span className="font-normal text-white/60"> · {secondary}</span>
          )}
        </p>
      </div>
    </div>
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.14] px-3 py-1.5 text-white backdrop-blur-md"
      style={{ background: 'rgba(18,8,34,0.5)' }}
    >
      {children}
    </span>
  )
}
