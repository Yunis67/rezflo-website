import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionAura } from '../ui/SectionAura'
import { plans } from '../../data/pricing'
import { site } from '../../data/site'

/**
 * Pricing — light RezFlo palette. White plan cards on the warm-white
 * ground; the highlighted plan gets a violet border, a soft lift, and
 * a "Most Popular" tab that sits over its top edge (ribbon style).
 */
export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-28 md:py-36">
      <SectionAura position="top-center" color="rgba(169,147,255,0.38)" size={72} opacity={0.45} />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-[#A993FF]/45 bg-[#5B41DA]/[0.06] px-4 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-[#5B41DA]">
            Pricing
          </span>
          <h2 className="font-display mt-7 text-[2.25rem] font-medium leading-[1.1] tracking-[-0.02em] text-[#201B33] sm:text-[2.85rem] lg:text-[3.5rem]">
            Two plans. One promise:{' '}
            <GradText>no missed revenue.</GradText>
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-[#201B33]/60">
            Pricing is custom and quoted on the demo call based on locations and
            call volume.
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 items-start gap-7 md:grid-cols-2">
          {plans.map((plan, i) => {
            const featured = !!plan.highlight
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
                className={`relative h-full rounded-[26px] p-9 md:p-11 ${
                  featured ? 'lg:-translate-y-2' : ''
                }`}
                style={
                  featured
                    ? {
                        background: '#FFFFFF',
                        border: '1.5px solid rgba(91,65,218,0.55)',
                        boxShadow:
                          '0 40px 80px -34px rgba(91,65,218,0.45), 0 8px 24px -14px rgba(32,27,51,0.14)',
                      }
                    : {
                        background: '#FFFFFF',
                        border: '1px solid rgba(32,27,51,0.08)',
                        boxShadow:
                          '0 24px 54px -34px rgba(32,27,51,0.22), 0 6px 18px -14px rgba(32,27,51,0.1)',
                      }
                }
              >
                {featured && (
                  <span
                    className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 inline-flex items-center rounded-full px-5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white"
                    style={{
                      background: 'linear-gradient(180deg, #6E52E8 0%, #5B41DA 100%)',
                      boxShadow: '0 12px 26px -8px rgba(91,65,218,0.6)',
                    }}
                  >
                    Most Popular
                  </span>
                )}

                <h3 className="font-display text-[1.6rem] font-medium tracking-tight text-[#201B33]">
                  {plan.name}
                </h3>
                <p className="mt-2 max-w-xs text-[0.95rem] leading-relaxed text-[#201B33]/55">
                  {plan.tagline}
                </p>

                <div className="mt-8 flex items-baseline gap-2">
                  <span className="font-display text-[2.4rem] font-medium tracking-tight text-[#201B33]">
                    Custom
                  </span>
                  <span className="text-[0.9rem] text-[#201B33]/45">quoted on demo</span>
                </div>

                <ul className="mt-8 space-y-3.5">
                  {plan.bullets.map(b => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-[0.9375rem] text-[#201B33]/80"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5B41DA]/12 text-[#5B41DA] ring-1 ring-[#5B41DA]/20">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  {featured ? (
                    <a
                      href={site.cta.bookDemo}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.95rem] font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
                      style={{
                        background: 'linear-gradient(180deg, #6E52E8 0%, #5B41DA 100%)',
                        boxShadow:
                          '0 16px 34px -12px rgba(91,65,218,0.6), inset 0 1px 0 rgba(255,255,255,0.28)',
                      }}
                    >
                      {plan.ctaLabel}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  ) : (
                    <a
                      href={site.cta.bookDemo}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#A993FF]/45 bg-white px-7 py-3.5 text-[0.95rem] font-semibold text-[#201B33] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5B41DA]/60 hover:text-[#5B41DA]"
                    >
                      {plan.ctaLabel}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        <p className="mt-12 text-center text-[0.95rem] text-[#201B33]/55">
          Multi-location group?{' '}
          <a href={site.cta.bookDemo} className="font-medium text-[#5B41DA] hover:text-[#6E52E8]">
            Talk to us about volume pricing →
          </a>
        </p>
      </Container>
    </section>
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
