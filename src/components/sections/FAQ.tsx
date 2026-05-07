import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionLabel } from '../ui/SectionLabel'
import { faqs } from '../../data/faqs'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-28 md:py-36">
      <div aria-hidden className="divider-violet absolute inset-x-0 top-0 h-px" />
      <Container narrow>
        <div className="text-center">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="font-display mt-7 text-[2.25rem] font-medium leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.85rem] lg:text-[3.5rem]">
            Quick answers, <span className="gradient-text">no fluff.</span>
          </h2>
        </div>

        <div className="glow-border glass-card mt-16 overflow-hidden rounded-3xl">
          <div className="divide-y divide-white/[0.06]">
            {faqs.map((f, i) => {
              const isOpen = openIndex === i
              return (
                <button
                  key={f.q}
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="block w-full text-left transition-colors hover:bg-white/[0.025]"
                >
                  <div className="flex items-start justify-between gap-6 px-6 py-6 md:px-9 md:py-7">
                    <span className="text-[1rem] font-medium text-white md:text-[1.0625rem]">
                      {f.q}
                    </span>
                    <span
                      className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? 'bg-gradient-to-b from-violet-400 to-violet-600 text-white'
                          : 'bg-violet-500/15 text-violet-200 ring-1 ring-violet-400/25'
                      }`}
                      style={
                        isOpen
                          ? { boxShadow: '0 8px 24px -4px rgba(124,58,237,0.5)' }
                          : undefined
                      }
                    >
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-7 pr-16 text-[0.95rem] leading-[1.65] text-mist-300 md:px-9 md:pb-8">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
