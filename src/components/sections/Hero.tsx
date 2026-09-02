import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { Container } from '../ui/Container'
import { site } from '../../data/site'
import { triggerAnthonyWidget } from '../ui/anthonyAgent'
import { HeroShowcase } from './HeroShowcase'

/**
 * Hero V2 — light, editorial, two-column composition inspired by
 * bookedworks.com: copy on the left, an auto-rotating restaurant
 * showcase on the right. RezFlo violet accent (not amber), Geist
 * typography. On mobile the copy stacks above the showcase.
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
            'radial-gradient(55% 50% at 50% 0%, rgba(124,58,237,0.16) 0%, rgba(124,58,237,0.05) 35%, transparent 70%)',
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
        <div className="grid grid-cols-1 items-center gap-12 pt-32 pb-20 md:pt-36 md:pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:pt-40 lg:pb-28">
          {/* ===== Left: copy ===== */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
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

            <motion.h1
              {...reveal}
              transition={{ duration: 0.7, delay: 0.06 }}
              className="font-geist mt-6 font-extrabold tracking-[-0.03em] text-neutral-950"
              style={{ fontSize: 'clamp(2.4rem, 5.4vw, 4.25rem)', lineHeight: 1.03 }}
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

            <motion.p
              {...reveal}
              transition={{ duration: 0.6, delay: 0.14 }}
              className="font-geist mt-5 max-w-md text-[1.02rem] font-medium text-neutral-500 md:text-[1.1rem]"
            >
              Missed calls. Busy signals. Lost reservations — revenue walking
              out the door.
            </motion.p>

            <motion.p
              {...reveal}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-geist mt-3 max-w-md text-[1.0125rem] leading-relaxed text-neutral-600"
            >
              RezFlo picks up every call, takes the order, books the table, and
              filters spam — 24/7, in your customer&rsquo;s language.
            </motion.p>

            <motion.div
              {...reveal}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row lg:items-start"
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

            <motion.div
              {...reveal}
              transition={{ duration: 0.6, delay: 0.36 }}
              className="font-geist mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.82rem] font-medium text-neutral-500 lg:justify-start"
            >
              <TrustItem>Live in days, not months</TrustItem>
              <span aria-hidden className="text-neutral-300">·</span>
              <TrustItem>Works with your POS</TrustItem>
              <span aria-hidden className="text-neutral-300">·</span>
              <TrustItem>0 missed calls, 24/7</TrustItem>
            </motion.div>
          </div>

          {/* ===== Right: auto-rotating restaurant showcase ===== */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full"
          >
            <HeroShowcase />
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
