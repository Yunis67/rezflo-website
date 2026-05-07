import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Container } from '../ui/Container'
import { GlassCard } from '../ui/GlassCard'
import { SectionLabel } from '../ui/SectionLabel'
import { Button } from '../ui/Button'
import { plans } from '../../data/pricing'
import { site } from '../../data/site'

export function Pricing() {
  return (
    <section id="pricing" className="relative py-28 md:py-36">
      <div aria-hidden className="divider-violet absolute inset-x-0 top-0 h-px" />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="font-display mt-7 text-[2.25rem] font-medium leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.85rem] lg:text-[3.5rem]">
            Two plans. One promise:{' '}
            <span className="gradient-text">no missed revenue.</span>
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-mist-300">
            Pricing is custom and quoted on the demo call based on locations and
            call volume.
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-7 md:grid-cols-2">
          {plans.map((plan, i) => {
            const featured = !!plan.highlight
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <GlassCard
                  featured={featured}
                  className={`h-full p-9 md:p-11 ${
                    featured
                      ? 'lg:-translate-y-2'
                      : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-[1.6rem] font-medium tracking-tight text-white">
                        {plan.name}
                      </h3>
                      <p className="mt-2 max-w-xs text-[0.95rem] leading-relaxed text-mist-300">
                        {plan.tagline}
                      </p>
                    </div>
                    {featured && (
                      <span
                        className="inline-flex items-center rounded-full bg-gradient-to-b from-violet-400 to-violet-600 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white"
                        style={{ boxShadow: '0 8px 24px -4px rgba(124,58,237,0.6)' }}
                      >
                        Most popular
                      </span>
                    )}
                  </div>

                  <div className="mt-8 flex items-baseline gap-2">
                    <span className="font-display text-[2.4rem] font-medium tracking-tight text-white">
                      Custom
                    </span>
                    <span className="text-[0.9rem] text-mist-400">
                      quoted on demo
                    </span>
                  </div>

                  <ul className="mt-8 space-y-3.5">
                    {plan.bullets.map(b => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-[0.9375rem] text-mist-200"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/25 text-violet-100 ring-1 ring-violet-400/40">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10">
                    <Button
                      href={site.cta.bookDemo}
                      variant={featured ? 'primary' : 'secondary'}
                      size="lg"
                      withArrow
                      className="w-full"
                    >
                      {plan.ctaLabel}
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>

        <p className="mt-12 text-center text-[0.95rem] text-mist-400">
          Multi-location group?{' '}
          <a href={site.cta.bookDemo} className="font-medium text-violet-300 hover:text-violet-200">
            Talk to us about volume pricing →
          </a>
        </p>
      </Container>
    </section>
  )
}
