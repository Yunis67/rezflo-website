import { useState } from 'react'
import { motion } from 'framer-motion'
import { PhoneCall, Sparkles, Globe2, CheckCircle2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Container } from '../ui/Container'
import { GlassCard } from '../ui/GlassCard'
import { SectionLabel } from '../ui/SectionLabel'
import { Button } from '../ui/Button'
import { site } from '../../data/site'

export function TryItLive() {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [restaurant, setRestaurant] = useState('')
  const [phone, setPhone] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="try" className="relative py-28 md:py-36">
      <div aria-hidden className="divider-violet absolute inset-x-0 top-0 h-px" />
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Left: pitch */}
          <div>
            <SectionLabel icon={<Sparkles size={14} />}>Hear it live</SectionLabel>
            <h2 className="font-display mt-7 text-[2.25rem] font-medium leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.85rem] lg:text-[3.5rem]">
              60 seconds with{' '}
              <span className="gradient-text">your AI receptionist.</span>
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-mist-300">
              Drop in your name and number. RezFlo will call you in seconds and
              handle a sample order on your menu.
            </p>

            <ul className="mt-9 space-y-3.5">
              <Bullet Icon={PhoneCall}>No setup. No credit card.</Bullet>
              <Bullet Icon={Globe2}>Try it in your own language.</Bullet>
              <Bullet Icon={CheckCircle2}>Real call, real flow — 60 seconds.</Bullet>
            </ul>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <GlassCard interactive={false} className="p-8 md:p-10">
              {submitted ? (
                <SuccessState name={name} />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Field
                    label="Your name"
                    id="name"
                    value={name}
                    onChange={setName}
                    placeholder="Marco D."
                    required
                  />
                  <Field
                    label="Restaurant"
                    id="restaurant"
                    value={restaurant}
                    onChange={setRestaurant}
                    placeholder="Bella Pasta"
                    required
                  />
                  <Field
                    label="Phone number"
                    id="phone"
                    value={phone}
                    onChange={setPhone}
                    placeholder="(555) 123-4567"
                    type="tel"
                    required
                  />

                  <button
                    type="submit"
                    className="cta-aura group relative w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-violet-500 to-violet-700 border border-violet-400/40 px-6 py-3.5 text-[0.95rem] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:from-violet-400 hover:to-violet-600"
                    style={{ boxShadow: 'var(--shadow-glow-violet)' }}
                  >
                    {site.cta.tryItLabel}
                    <PhoneCall className="h-4 w-4 transition-transform group-hover:rotate-12" />
                  </button>

                  <p className="text-[0.78rem] leading-relaxed text-mist-400">
                    {site.consent}
                  </p>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

function Bullet({ Icon, children }: { Icon: LucideIcon; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 text-[0.95rem] text-mist-200">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-violet-200 ring-1 ring-violet-400/30">
        <Icon className="h-4 w-4" />
      </span>
      <span>{children}</span>
    </li>
  )
}

interface FieldProps {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  type?: string
  required?: boolean
}

function Field({ label, id, value, onChange, placeholder, type = 'text', required }: FieldProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-[0.78rem] font-medium uppercase tracking-[0.12em] text-mist-300">
        {label}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 text-[0.95rem] text-white placeholder:text-mist-500 transition-all duration-300 focus:border-violet-400/60 focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:bg-white/[0.06]"
      />
    </label>
  )
}

function SuccessState({ name }: { name: string }) {
  return (
    <div className="text-center py-6">
      <div className="cta-aura mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-violet-700 text-white"
           style={{ boxShadow: 'var(--shadow-glow-violet)' }}>
        <PhoneCall className="h-7 w-7" />
      </div>
      <h3 className="font-display mt-6 text-[1.4rem] font-medium tracking-tight text-white">
        Calling you now{name ? `, ${name}` : ''}.
      </h3>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-mist-300">
        Pick up — RezFlo will introduce itself and walk a sample order. Want to
        skip the sample and talk to our team?
      </p>
      <Button
        href="https://cal.com/rez-flo-7vgkz1/15min"
        variant="primary"
        size="md"
        withArrow
        className="mt-7"
      >
        Book a Demo
      </Button>
    </div>
  )
}
