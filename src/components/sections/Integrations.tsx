import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { GlassCard } from '../ui/GlassCard'
import { SectionLabel } from '../ui/SectionLabel'
import { integrations } from '../../data/integrations'
import { Check, Clock } from 'lucide-react'

const groups: { title: string; category: 'POS' | 'Reservations' | 'Telephony' }[] = [
  { title: 'POS Systems', category: 'POS' },
  { title: 'Reservations', category: 'Reservations' },
  { title: 'Telephony', category: 'Telephony' },
]

export function Integrations() {
  return (
    <section id="integrations" className="relative py-28 md:py-36">
      <div aria-hidden className="divider-violet absolute inset-x-0 top-0 h-px" />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Integrations</SectionLabel>
          <h2 className="font-display mt-7 text-[2.25rem] font-medium leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.85rem] lg:text-[3.5rem]">
            Plays nicely with your{' '}
            <span className="gradient-text">existing stack.</span>
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-mist-300">
            Native Clover today. Toast and Square coming soon. New POS and booking
            partners added every month.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {groups.map((g, gi) => (
            <motion.div
              key={g.category}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: gi * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <GlassCard className="h-full p-7 md:p-8">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-violet-300">
                  {g.title}
                </p>
                <ul className="mt-6 space-y-3">
                  {integrations
                    .filter(i => i.category === g.category)
                    .map(i => (
                      <li
                        key={i.name}
                        className="hover-lift flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-3 hover:bg-white/[0.05]"
                      >
                        <div className="min-w-0">
                          <p className="text-[0.95rem] font-medium text-white">
                            {i.name}
                          </p>
                          {i.note && (
                            <p className="mt-0.5 text-[0.78rem] text-mist-400">{i.note}</p>
                          )}
                        </div>
                        {i.status === 'live' ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/20 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-violet-200 ring-1 ring-violet-400/40">
                            <Check className="h-3 w-3" /> Live
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.06] px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-mist-300 ring-1 ring-white/10">
                            <Clock className="h-3 w-3" /> Soon
                          </span>
                        )}
                      </li>
                    ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-center text-[0.95rem] text-mist-400">
          Don&rsquo;t see your POS?{' '}
          <a href="#try" className="font-medium text-violet-300 hover:text-violet-200">
            Ask us about it →
          </a>
        </p>
      </Container>
    </section>
  )
}
