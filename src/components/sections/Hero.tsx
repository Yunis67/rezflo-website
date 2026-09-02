import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, PhoneCall, CheckCircle2 } from 'lucide-react'
import { Container } from '../ui/Container'
import { site } from '../../data/site'
import { triggerAnthonyWidget } from '../ui/anthonyAgent'

/**
 * Hero V2 — light, editorial, centered composition inspired by
 * bookedworks.com's structure but on RezFlo's violet accent (not
 * amber) and Geist typography. Replaces the previous dark cinematic
 * hero. Self-contained light section; fades into the darker sections
 * below via a soft gradient at its base.
 */
export function Hero() {
  const reveal = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden"
      style={{ background: '#FBFAF8' }}
    >
      {/* Soft violet glow at the top + faint grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%]"
        style={{
          background:
            'radial-gradient(60% 55% at 50% 0%, rgba(124,58,237,0.16) 0%, rgba(124,58,237,0.05) 35%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(20,10,40,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(20,10,40,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(80% 60% at 50% 0%, black 0%, transparent 75%)',
        }}
      />

      <Container className="relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center pt-32 pb-20 text-center md:pt-40 md:pb-28">
          {/* Eyebrow */}
          <motion.span
            {...reveal}
            transition={{ duration: 0.5 }}
            className="font-geist-mono inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/70 px-3.5 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-violet-700 shadow-sm backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            AI Phone Agents for Restaurants
          </motion.span>

          {/* Headline */}
          <motion.h1
            {...reveal}
            transition={{ duration: 0.7, delay: 0.06 }}
            className="font-geist mt-7 font-extrabold tracking-[-0.03em] text-neutral-950"
            style={{
              fontSize: 'clamp(2.5rem, 7.5vw, 5rem)',
              lineHeight: 1.02,
            }}
          >
            Every call answered.
            <br />
            <span
              style={{
                background:
                  'linear-gradient(100deg, #7c3aed 0%, #a855f7 45%, #6d28d9 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Every order captured.
            </span>
          </motion.h1>

          {/* Pain line */}
          <motion.p
            {...reveal}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="font-geist mt-6 text-[1.05rem] font-medium text-neutral-500 md:text-[1.15rem]"
          >
            Missed calls. Busy signals. Lost reservations — revenue walking
            out the door.
          </motion.p>

          {/* Subhead */}
          <motion.p
            {...reveal}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-geist mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-neutral-600"
          >
            RezFlo picks up every call, takes the order, books the table, and
            filters spam — 24/7, in your customer&rsquo;s language.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...reveal}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          >
            <a
              href={site.cta.bookDemo}
              className="font-geist group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.95rem] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 sm:w-auto"
              style={{
                background: 'linear-gradient(180deg, #8b5cf6 0%, #7c3aed 100%)',
                boxShadow:
                  '0 14px 30px -10px rgba(124,58,237,0.55), inset 0 1px 0 rgba(255,255,255,0.25)',
              }}
            >
              Book a Free Demo
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <button
              type="button"
              onClick={triggerAnthonyWidget}
              className="font-geist group inline-flex w-full items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-7 py-3.5 text-[0.95rem] font-semibold text-neutral-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-[0_14px_30px_-14px_rgba(124,58,237,0.4)] sm:w-auto"
              aria-label="Talk to Flo — open the live voice demo"
            >
              <Sparkles className="h-4 w-4 text-violet-600" aria-hidden />
              Talk to Flo
            </button>
          </motion.div>

          {/* Trust row */}
          <motion.div
            {...reveal}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="font-geist mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.82rem] font-medium text-neutral-500"
          >
            <TrustItem>Live in days, not months</TrustItem>
            <span aria-hidden className="text-neutral-300">·</span>
            <TrustItem>Works with your POS</TrustItem>
            <span aria-hidden className="text-neutral-300">·</span>
            <TrustItem>0 missed calls, 24/7</TrustItem>
          </motion.div>

          {/* Hero visual — light "incoming call → Flo answers" card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-16 w-full max-w-2xl"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 rounded-[40px] opacity-70 blur-3xl"
              style={{
                background:
                  'radial-gradient(60% 60% at 50% 20%, rgba(124,58,237,0.28), transparent 70%)',
              }}
            />
            <CallDemoCard />
          </motion.div>
        </div>
      </Container>

      {/* Fade from the light hero into the darker sections below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            'linear-gradient(180deg, rgba(251,250,248,0) 0%, rgba(251,250,248,0.6) 40%, #FBFAF8 100%)',
        }}
      />
    </section>
  )
}

function TrustItem({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <CheckCircle2 className="h-3.5 w-3.5 text-violet-500" aria-hidden />
      {children}
    </span>
  )
}

/* Light call-demo card echoing bookedworks' PhoneDemoSection preview. */
function CallDemoCard() {
  return (
    <div
      className="relative overflow-hidden rounded-[28px] border border-neutral-200 bg-white p-5 text-left md:p-7"
      style={{ boxShadow: '0 40px 80px -32px rgba(46,16,101,0.35)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full text-white"
            style={{
              background: 'linear-gradient(160deg, #a855f7, #6d28d9)',
            }}
            aria-hidden
          >
            <PhoneCall className="h-4 w-4" />
          </span>
          <span className="font-geist">
            <span className="block text-[0.9rem] font-semibold text-neutral-900">
              RezFlo · Flo
            </span>
            <span className="block text-[0.72rem] text-neutral-400">
              Answering now
            </span>
          </span>
        </span>
        <span className="font-geist-mono inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-wide text-emerald-600 ring-1 ring-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live
        </span>
      </div>

      {/* Transcript */}
      <div className="font-geist mt-5 space-y-2.5 text-[0.92rem]">
        <Bubble side="ai">
          &ldquo;Thanks for calling Bella Pasta — how can I help?&rdquo;
        </Bubble>
        <Bubble side="caller">
          &ldquo;Hi, I&rsquo;d like a table for 4 at 7pm.&rdquo;
        </Bubble>
        <Bubble side="ai">
          &ldquo;Booked for 7pm. Anything else I can grab for you?&rdquo;
        </Bubble>
      </div>

      {/* Footer status chips */}
      <div className="font-geist mt-5 flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-4">
        <Chip tint="emerald">
          <CheckCircle2 className="h-3.5 w-3.5" /> Reservation booked
        </Chip>
        <Chip tint="violet">Sent to POS</Chip>
        <Chip tint="neutral">Caller details captured</Chip>
      </div>
    </div>
  )
}

function Bubble({
  side,
  children,
}: {
  side: 'ai' | 'caller'
  children: React.ReactNode
}) {
  const ai = side === 'ai'
  return (
    <div className={ai ? 'flex' : 'flex justify-end'}>
      <p
        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 leading-snug ${
          ai
            ? 'rounded-tl-sm bg-violet-50 text-neutral-800 ring-1 ring-violet-100'
            : 'rounded-tr-sm bg-neutral-100 text-neutral-700'
        }`}
      >
        {children}
      </p>
    </div>
  )
}

function Chip({
  tint,
  children,
}: {
  tint: 'emerald' | 'violet' | 'neutral'
  children: React.ReactNode
}) {
  const map = {
    emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    violet: 'bg-violet-50 text-violet-700 ring-violet-200',
    neutral: 'bg-neutral-50 text-neutral-600 ring-neutral-200',
  } as const
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.72rem] font-medium ring-1 ${map[tint]}`}
    >
      {children}
    </span>
  )
}
