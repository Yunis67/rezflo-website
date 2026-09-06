import {
  useMemo,
  useState,
  useRef,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, Phone, TrendingUp, Users } from 'lucide-react'
import { Container } from '../ui/Container'
import { Logo } from '../Logo'

/**
 * ROI Calculator — toggle between two estimators (missed phone calls,
 * labor savings). Layout mirrors the Certus reference: top tab pills
 * switch the active calculator, then a two-column card pair (inputs
 * on the left, full-color result on the right) renders.
 *
 * Theme palette per tab:
 *   • Missing Phone Calls → blue
 *   • Cut Labour Costs    → purple
 */
type TabKey = 'calls' | 'labour'

interface Theme {
  pillActiveBg: string // gradient for active pill
  pillIdleText: string // text for inactive pill
  pillIdleBorder: string
  resultBg: string // gradient bg for the colored result card
  resultRing: string
  ctaText: string // text color for button label / accent text inside result card
  sliderTrack: string // primary track gradient
  numberAccent: string // accent text for slider readouts
  bookBtnTextClass: string
}

const THEMES: Record<TabKey, Theme> = {
  calls: {
    pillActiveBg:
      'linear-gradient(180deg, #6E52E8 0%, #5B41DA 100%)',
    pillIdleText: 'text-[#5B41DA]',
    pillIdleBorder: 'border-[#A993FF]/50',
    resultBg:
      'linear-gradient(160deg, #6E52E8 0%, #5B41DA 55%, #4A34BE 100%)',
    resultRing: 'ring-1 ring-white/15',
    ctaText: 'text-[#5B41DA]',
    sliderTrack: '#5B41DA',
    numberAccent: 'text-[#5B41DA]',
    bookBtnTextClass: 'text-[#5B41DA]',
  },
  labour: {
    pillActiveBg:
      'linear-gradient(180deg, #8b5cf6 0%, #6d28d9 100%)',
    pillIdleText: 'text-[#5B41DA]',
    pillIdleBorder: 'border-[#A993FF]/50',
    resultBg:
      'linear-gradient(160deg, #8b5cf6 0%, #6d28d9 55%, #4c1d95 100%)',
    resultRing: 'ring-1 ring-white/15',
    ctaText: 'text-violet-700',
    sliderTrack: '#8b5cf6',
    numberAccent: 'text-violet-700',
    bookBtnTextClass: 'text-violet-700',
  },
}

export function ROICalculator() {
  const [tab, setTab] = useState<TabKey>('calls')
  const theme = THEMES[tab]

  return (
    <section id="roi" className="relative py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#A993FF]/45 bg-[#5B41DA]/[0.06] px-4 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-[#5B41DA]">
            <Calculator className="h-3 w-3" />
            ROI Calculator
          </span>
          <h2 className="font-display mt-6 text-[2.1rem] font-medium leading-[1.06] tracking-[-0.02em] text-[#201B33] sm:text-[2.6rem] md:text-[3.25rem] lg:text-[3.75rem]">
            Calculate your potential
            <br />
            <span
              style={{
                background: 'linear-gradient(180deg, #6E52E8 0%, #A993FF 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ROI with RezFlo
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-[1rem] leading-relaxed text-[#201B33]/60 md:text-[1.05rem]">
            Use this quick calculator to estimate how much revenue your
            restaurant loses to missed calls — and how much RezFlo could
            recover or save, automatically.
          </p>
        </div>

        {/* Tab toggles */}
        <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-3">
          <TabPill
            active={tab === 'calls'}
            theme={THEMES.calls}
            onClick={() => setTab('calls')}
            icon={<Phone className="h-3.5 w-3.5" />}
          >
            Missing Phone Calls?
          </TabPill>
          <TabPill
            active={tab === 'labour'}
            theme={THEMES.labour}
            onClick={() => setTab('labour')}
            icon={<Users className="h-3.5 w-3.5" />}
          >
            Cut Labour Costs?
          </TabPill>
        </div>

        {/* Calculator content */}
        <div className="mx-auto mt-10 max-w-6xl">
          <AnimatePresence mode="wait">
            {tab === 'calls' ? (
              <motion.div
                key="calls"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <MissedCallsCalculator theme={theme} />
              </motion.div>
            ) : (
              <motion.div
                key="labour"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <LabourCalculator theme={theme} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Brand mark — sits below the calculators with a soft violet
            halo so the empty space below the cards reads as intentional
            section close rather than dead air. */}
        <div className="relative mt-20 flex flex-col items-center justify-center md:mt-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 mx-auto h-full w-[420px] max-w-full"
            style={{
              background:
                'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(124,58,237,0.30) 0%, rgba(76,29,149,0.12) 40%, transparent 75%)',
              filter: 'blur(28px)',
            }}
          />
          <div className="opacity-90 transition-opacity hover:opacity-100">
            <Logo />
          </div>
          <p className="font-display mt-3 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-[#5B41DA]/70">
            Built for restaurants
          </p>
        </div>
      </Container>
    </section>
  )
}

/* ============================================================
   Calculator 1 — Missing phone calls (blue theme)
   ============================================================ */
function MissedCallsCalculator({ theme }: { theme: Theme }) {
  const [callsPerDay, setCallsPerDay] = useState(25)
  const [orderPct, setOrderPct] = useState(47)
  const [missedPerDay, setMissedPerDay] = useState(8)
  const [avgOrderValue, setAvgOrderValue] = useState(45)
  const [daysOpen, setDaysOpen] = useState(30)
  const [locations, setLocations] = useState(3)

  // A call can't be missed if it was never received, so the effective
  // missed calls are capped by the calls received per day. This makes
  // the "Calls Received Per Day" slider actually drive the numbers.
  const effectiveMissed = Math.min(missedPerDay, callsPerDay)

  const stats = useMemo(() => {
    // Of missed calls, fraction that would have ordered
    const lostOrdersPerDay = effectiveMissed * (orderPct / 100)
    const monthlyLoss = lostOrdersPerDay * daysOpen * avgOrderValue
    const yearlyLoss = monthlyLoss * 12
    const locationsMonthly = monthlyLoss * locations
    return { monthlyLoss, yearlyLoss, locationsMonthly }
  }, [effectiveMissed, orderPct, avgOrderValue, daysOpen, locations])

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-7">
      {/* === Inputs card === */}
      <InputCard>
        <Slider
          label="Calls Received Per Day"
          value={callsPerDay}
          min={0}
          max={100}
          step={1}
          onChange={setCallsPerDay}
          accent={theme.numberAccent}
          trackColor={theme.sliderTrack}
        />
        <Slider
          label="Call to Order %"
          value={orderPct}
          min={0}
          max={100}
          step={1}
          onChange={setOrderPct}
          accent={theme.numberAccent}
          trackColor={theme.sliderTrack}
        />
        <Slider
          label="Missed Calls Per Day"
          value={effectiveMissed}
          min={0}
          max={Math.max(callsPerDay, 1)}
          step={1}
          onChange={setMissedPerDay}
          accent={theme.numberAccent}
          trackColor={theme.sliderTrack}
        />
        <NumberField
          label="Average Order Value"
          value={avgOrderValue}
          onChange={setAvgOrderValue}
          prefix="$"
        />
        <div className="grid grid-cols-2 gap-4">
          <NumberField
            label="Days Open Per Month"
            value={daysOpen}
            onChange={setDaysOpen}
            min={1}
            max={31}
          />
          <NumberField
            label="No. Of Locations"
            value={locations}
            onChange={setLocations}
            min={1}
          />
        </div>
      </InputCard>

      {/* === Result card === */}
      <ResultCard
        theme={theme}
        primary={{
          label: 'Revenue Lost Per Month',
          value: fmtMoney(stats.monthlyLoss),
        }}
        secondary={[
          {
            label: 'Revenue Lost Per Year',
            value: fmtMoney(stats.yearlyLoss),
          },
          {
            label: 'Locations Total Monthly Loss',
            value: fmtMoney(stats.locationsMonthly),
          },
        ]}
      />
    </div>
  )
}

/* ============================================================
   Calculator 2 — Cut labour costs (purple theme)
   ============================================================ */
function LabourCalculator({ theme }: { theme: Theme }) {
  const [callsPerDay, setCallsPerDay] = useState(25)
  const [callLength, setCallLength] = useState(3)
  const [labourCost, setLabourCost] = useState(17)
  const [daysOpen, setDaysOpen] = useState(30)
  const [locations, setLocations] = useState(3)

  const stats = useMemo(() => {
    const minutesPerMonth = callsPerDay * callLength * daysOpen
    const hoursPerMonth = minutesPerMonth / 60
    const labourCostSaved = hoursPerMonth * labourCost
    const locationsHours = hoursPerMonth * locations
    const locationsCost = labourCostSaved * locations
    return { hoursPerMonth, labourCostSaved, locationsHours, locationsCost }
  }, [callsPerDay, callLength, labourCost, daysOpen, locations])

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-7">
      <InputCard>
        <Slider
          label="Calls Received Per Day"
          value={callsPerDay}
          min={0}
          max={100}
          step={1}
          onChange={setCallsPerDay}
          accent={theme.numberAccent}
          trackColor={theme.sliderTrack}
        />
        <Slider
          label="Average Call Length (mins)"
          value={callLength}
          min={0}
          max={20}
          step={0.5}
          onChange={setCallLength}
          accent={theme.numberAccent}
          trackColor={theme.sliderTrack}
        />
        <NumberField
          label="Labour Cost Per Hour"
          value={labourCost}
          onChange={setLabourCost}
          prefix="$"
        />
        <div className="grid grid-cols-2 gap-4">
          <NumberField
            label="Days Open Per Month"
            value={daysOpen}
            onChange={setDaysOpen}
            min={1}
            max={31}
          />
          <NumberField
            label="No. Of Locations"
            value={locations}
            onChange={setLocations}
            min={1}
          />
        </div>
      </InputCard>

      <ResultCard
        theme={theme}
        primary={{
          label: 'Staff Time Saved Per Month (hours)',
          value: `${stats.hoursPerMonth.toFixed(1)} h`,
        }}
        secondary={[
          {
            label: 'Equivalent Labour Cost Saved',
            value: fmtMoney(stats.labourCostSaved),
          },
          {
            label: 'Locations Total Monthly Time Saved',
            value: `${stats.locationsHours.toFixed(1)} h`,
          },
          {
            label: 'Locations Total Monthly Labour Cost Saved',
            value: fmtMoney(stats.locationsCost),
          },
        ]}
      />
    </div>
  )
}

/* ============================================================
   Shared building blocks
   ============================================================ */
function TabPill({
  active,
  theme,
  onClick,
  children,
  icon,
}: {
  active: boolean
  theme: Theme
  onClick: () => void
  children: ReactNode
  icon?: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.95rem] font-semibold tracking-tight transition-all duration-300 ${
        active
          ? 'text-white shadow-[0_18px_40px_-16px_rgba(91,65,218,0.5)]'
          : `border bg-white ${theme.pillIdleText} ${theme.pillIdleBorder} hover:bg-[#5B41DA]/[0.06]`
      }`}
      style={
        active
          ? {
              background: theme.pillActiveBg,
              boxShadow:
                '0 18px 40px -16px rgba(91,65,218,0.5), inset 0 1px 0 rgba(255,255,255,0.22)',
            }
          : { boxShadow: '0 6px 16px -12px rgba(32,27,51,0.2)' }
      }
    >
      {icon}
      {children}
    </button>
  )
}

function InputCard({ children }: { children: ReactNode }) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rx = (y - cy) / 36
    const ry = (cx - x) / 36
    card.style.setProperty('--holo-x', `${x}px`)
    card.style.setProperty('--holo-y', `${y}px`)
    card.style.setProperty('--holo-opacity', '0.7')
    card.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`
  }
  const handleLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)'
    card.style.setProperty('--holo-opacity', '0')
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative overflow-hidden rounded-[28px] border border-[#A993FF]/35 p-7 transition-transform duration-150 ease-out will-change-transform md:p-9"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FCFBFF 100%)',
        boxShadow:
          '0 30px 70px -34px rgba(91,65,218,0.35), 0 6px 18px -14px rgba(32,27,51,0.12)',
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="space-y-6">{children}</div>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] transition-opacity duration-200"
        style={{
          opacity: 'var(--holo-opacity, 0)',
          background:
            'radial-gradient(circle 240px at var(--holo-x, 50%) var(--holo-y, 50%), rgba(169,147,255,0.22) 0%, rgba(91,65,218,0.08) 40%, transparent 70%)',
        }}
      />
    </div>
  )
}

function ResultCard({
  theme,
  primary,
  secondary,
}: {
  theme: Theme
  primary: { label: string; value: string }
  secondary: { label: string; value: string }[]
}) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rx = (y - cy) / 36
    const ry = (cx - x) / 36
    card.style.setProperty('--holo-x', `${x}px`)
    card.style.setProperty('--holo-y', `${y}px`)
    card.style.setProperty('--holo-opacity', '0.55')
    card.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`
  }
  const handleLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)'
    card.style.setProperty('--holo-opacity', '0')
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative flex flex-col overflow-hidden rounded-[28px] p-7 text-white transition-transform duration-150 ease-out will-change-transform md:p-9 ${theme.resultRing}`}
      style={{
        background: theme.resultBg,
        boxShadow:
          '0 40px 100px -28px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.10)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Top label pill */}
      <span className="inline-flex w-fit items-center gap-2 rounded-md bg-white/15 px-2.5 py-1 text-[0.72rem] font-semibold tracking-tight text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-sm">
        <TrendingUp className="h-3 w-3" />
        Estimate
      </span>

      {/* Primary metric */}
      <div className="mt-7">
        <div className="text-[0.92rem] font-medium text-white/85">
          {primary.label}
        </div>
        <motion.div
          key={primary.value}
          initial={{ opacity: 0.6, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="font-display mt-1 text-[3rem] font-bold leading-[1] tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)] md:text-[3.4rem]"
        >
          {primary.value}
        </motion.div>
      </div>

      {/* Secondary metrics — translucent panels */}
      <div className="mt-6 space-y-3">
        {secondary.map(item => (
          <div
            key={item.label}
            className="rounded-2xl bg-white/15 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-sm"
          >
            <div className="text-[0.78rem] font-medium text-white/85">
              {item.label}
            </div>
            <motion.div
              key={item.value}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="font-display mt-1 text-[1.5rem] font-bold tracking-tight text-white md:text-[1.7rem]"
            >
              {item.value}
            </motion.div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[0.78rem] leading-relaxed text-white/85">
        This is an automated estimate based on average restaurant metrics.
        Actual results may vary by menu, call volume, and operations.
      </p>

      <a
        href="#pricing"
        className={`mt-6 inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 text-[1rem] font-semibold tracking-tight ${theme.bookBtnTextClass} transition-transform hover:scale-[1.01]`}
        style={{ boxShadow: '0 18px 40px -16px rgba(0,0,0,0.45)' }}
      >
        Book a demo
      </a>

      <div className="mt-3 flex items-center justify-center gap-2 text-[0.78rem] text-white/85">
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
        27 operators booked a call this week
      </div>

      {/* Holographic shimmer over the colored card */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] mix-blend-overlay transition-opacity duration-200"
        style={{
          opacity: 'var(--holo-opacity, 0)',
          background:
            'radial-gradient(circle 280px at var(--holo-x, 50%) var(--holo-y, 50%), rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.10) 35%, transparent 70%)',
        }}
      />
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  accent,
  trackColor,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  accent: string
  trackColor: string
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-[0.9rem] font-medium tracking-tight text-[#201B33]/85">
          {label}
        </span>
        <span
          className={`font-display text-[1rem] font-semibold tabular-nums ${accent}`}
        >
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="roi-slider mt-2 w-full"
        style={
          {
            '--slider-pct': `${pct}%`,
            '--slider-color': trackColor,
          } as React.CSSProperties
        }
      />
      <div className="mt-1 flex justify-between text-[0.7rem] text-[#201B33]/40">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

function NumberField({
  label,
  value,
  onChange,
  prefix,
  min,
  max,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  prefix?: string
  min?: number
  max?: number
}) {
  return (
    <div>
      <label className="text-[0.85rem] font-medium tracking-tight text-[#201B33]/85">
        {label}
      </label>
      <div className="mt-2 flex items-center rounded-xl border border-[#201B33]/12 bg-[#F6F4FF] px-3 py-2.5 transition-colors focus-within:border-[#5B41DA]/50 focus-within:bg-white">
        {prefix && (
          <span className="mr-1.5 text-[0.95rem] text-[#201B33]/55">{prefix}</span>
        )}
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={e => {
            const n = parseFloat(e.target.value)
            if (!Number.isNaN(n)) onChange(n)
          }}
          className="font-display w-full bg-transparent text-[1rem] font-semibold tabular-nums text-[#201B33] outline-none"
        />
      </div>
    </div>
  )
}

function fmtMoney(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(n))
}
