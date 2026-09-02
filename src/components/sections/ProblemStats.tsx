import { motion } from 'framer-motion'
import { PhoneOff, Receipt, Users, Play } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionAura } from '../ui/SectionAura'
import { SectionLabel } from '../ui/SectionLabel'
import { ContainerScroll } from '../ui/container-scroll-animation'

interface MissedCallCard {
  value: string
  title: string
  description: string
  Icon: LucideIcon
  /** Tailwind background + ring + icon color for the icon tile. */
  tile: { bg: string; ring: string; icon: string }
}

const cards: MissedCallCard[] = [
  {
    value: '1 in 3',
    title: 'Restaurants miss calls during peak hours',
    description:
      'Customers hang up and call the next place on the list.',
    Icon: PhoneOff,
    tile: {
      bg: 'bg-amber-400/15',
      ring: 'ring-amber-300/40',
      icon: 'text-amber-300',
    },
  },
  {
    value: '$40+',
    title: 'Every missed call can mean a lost order',
    description:
      'One missed phone order can cost the business a full ticket, tip, and repeat customer.',
    Icon: Receipt,
    tile: {
      bg: 'bg-orange-500/15',
      ring: 'ring-orange-400/40',
      icon: 'text-orange-300',
    },
  },
  {
    value: '–15%',
    title: 'Staff get pulled off the floor to answer phones',
    description:
      'Service quality drops when servers leave guests to handle calls.',
    Icon: Users,
    tile: {
      bg: 'bg-sky-500/15',
      ring: 'ring-sky-400/40',
      icon: 'text-sky-300',
    },
  },
]

export function ProblemStats() {
  return (
    <section id="problem" className="relative overflow-hidden py-28 md:py-36">
      <SectionAura position="top-right" color="rgba(192, 132, 252, 0.55)" size={70} opacity={0.45} />
      <SectionAura position="bottom-left" color="rgba(124, 58, 237, 0.5)" size={55} opacity={0.4} blur={100} />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>The cost of a missed call</SectionLabel>
          <h2 className="font-display mt-7 text-[2.25rem] font-medium leading-[1.05] tracking-[-0.018em] text-white sm:text-[2.85rem] lg:text-[3.5rem]">
            Every missed call ={' '}
            <span className="gradient-text">lost revenue.</span>
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-white/75">
            Three numbers from real operators. They&rsquo;re the reason RezFlo exists.
          </p>
        </div>

        {/* Bold dark cards. Stack on mobile, three-column on md+.
            Each card: colored icon tile top-left, big value top-right,
            bold white title below, supporting line under that. */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-3 md:gap-7">
          {cards.map((c, i) => (
            <motion.div
              key={c.value}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              className="group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0B0716] p-7 md:p-9"
              style={{
                boxShadow:
                  '0 30px 80px -30px rgba(124,58,237,0.45), 0 0 0 1px rgba(255,255,255,0.04) inset',
              }}
            >
              {/* Soft violet glow that lifts the card off the bg */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(60% 50% at 50% 0%, rgba(124,58,237,0.20), transparent 70%)',
                }}
              />

              <div className="relative flex items-start justify-between gap-4">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ${c.tile.bg} ${c.tile.ring}`}
                  aria-hidden
                >
                  <c.Icon className={`h-5 w-5 ${c.tile.icon}`} />
                </span>

                <span
                  className="font-display text-[2.5rem] font-semibold leading-none tracking-[-0.02em] text-white md:text-[3rem]"
                  aria-label={c.value}
                >
                  {c.value}
                </span>
              </div>

              <h3 className="relative mt-8 text-[1.15rem] font-semibold leading-snug text-white md:text-[1.2rem]">
                {c.title}
              </h3>
              <p className="relative mt-3 text-[0.95rem] leading-relaxed text-white/65">
                {c.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Scroll-driven tablet reveal. The tall ContainerScroll runway
          gives the rotate/scale animation room to play without
          causing layout shift in the rest of the page. The "tablet"
          is a styled div, not an image — renders sharp at any DPR
          and stays editable. */}
      <ContainerScroll
        titleComponent={
          <div className="px-6">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-violet-300/85">
              Meet the fix
            </p>
            <h3 className="font-display mt-4 text-[1.85rem] font-medium leading-[1.05] tracking-[-0.018em] text-white sm:text-[2.5rem] md:text-[3.5rem]">
              An <span className="gradient-text">AI Host</span> that answers
              every call.
            </h3>
          </div>
        }
      >
        <RezFloTabletMock />
      </ContainerScroll>
    </section>
  )
}

/* ============================================================
   Blue chat tablet mock — lives inside the ContainerScroll card.
   Mirrors the design reference: blue background, RezFlo logo
   top-right, alternating speaker bubbles, "Watch demo" pill
   bottom-right. Renders as styled HTML so it's crisp at every
   resolution and easy to edit without re-exporting a PNG.
   ============================================================ */
function RezFloTabletMock() {
  return (
    <div className="relative h-full w-full bg-[#2540ff] p-6 md:p-12">
      {/* RezFlo wordmark + R logo top-right */}
      <div className="absolute right-5 top-5 flex items-center gap-3 md:right-10 md:top-10">
        <div
          aria-hidden
          className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-[#2540ff] md:h-12 md:w-12"
          style={{ fontFamily: 'inherit' }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 md:h-7 md:w-7" aria-hidden>
            <path
              d="M5 4h8a5 5 0 0 1 1.6 9.74l4.4 6.26h-3.7l-4.1-5.9H8V20H5V4Zm3 7.1h4.8a2.1 2.1 0 0 0 0-4.2H8v4.2Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <span className="text-[1rem] font-semibold tracking-tight text-white md:text-[1.4rem]">
          RezFlo
        </span>
      </div>

      {/* Chat transcript */}
      <div className="flex h-full max-w-xl flex-col justify-center gap-5 pr-0 md:max-w-2xl md:gap-7">
        <Line speaker="ai">
          <span className="text-white/70">Hi, this is RezFlo&rsquo;s AI Host.</span>{' '}
          How can I help you?
        </Line>
        <Line speaker="guest">I&rsquo;d like to place an order.</Line>
        <Line speaker="ai">
          <span className="text-white/70">Great.</span> What can I get you?
        </Line>

        {/* Typing indicator */}
        <span className="mt-3 inline-flex h-8 w-14 items-center justify-center gap-1.5 rounded-full bg-white/20">
          <Dot delay="0s" />
          <Dot delay="0.18s" />
          <Dot delay="0.36s" />
        </span>
      </div>

      {/* Watch demo pill bottom-right */}
      <button
        type="button"
        className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-[#facc15] px-4 py-2 text-[0.85rem] font-semibold text-[#1f1500] shadow-[0_10px_24px_-8px_rgba(250,204,21,0.6)] transition-transform hover:scale-[1.03] active:scale-95 md:bottom-10 md:right-10 md:px-5 md:py-3 md:text-[1rem]"
      >
        <Play className="h-3.5 w-3.5 fill-current md:h-4 md:w-4" aria-hidden />
        Watch demo
      </button>
    </div>
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
    <div className="flex items-start gap-3 md:gap-4">
      <SpeakerAvatar speaker={speaker} />
      <p className="font-display text-[1.05rem] font-semibold leading-snug text-white sm:text-[1.35rem] md:text-[1.75rem]">
        {children}
      </p>
    </div>
  )
}

function SpeakerAvatar({ speaker }: { speaker: 'ai' | 'guest' }) {
  if (speaker === 'guest') {
    return (
      <span
        aria-hidden
        className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e3d3b5] text-[0.7rem] font-semibold text-[#2540ff] ring-2 ring-white/40 md:h-9 md:w-9 md:text-[0.85rem]"
      >
        S
      </span>
    )
  }
  return (
    <span
      aria-hidden
      className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#facc15] text-[0.7rem] font-semibold text-[#1f1500] md:h-9 md:w-9 md:text-[0.85rem]"
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden>
        <path
          d="M5 4h8a5 5 0 0 1 1.6 9.74l4.4 6.26h-3.7l-4.1-5.9H8V20H5V4Zm3 7.1h4.8a2.1 2.1 0 0 0 0-4.2H8v4.2Z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      aria-hidden
      className="block h-1.5 w-1.5 rounded-full bg-white"
      style={{
        animation: 'tabletTypingDot 1.2s ease-in-out infinite',
        animationDelay: delay,
      }}
    />
  )
}
