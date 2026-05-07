import { useState } from 'react'
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
                <div key={f.q}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-6 px-6 py-6 text-left transition-colors hover:bg-white/[0.025] md:px-9 md:py-7"
                  >
                    <span className="text-[1rem] font-medium text-white md:text-[1.0625rem]">
                      {f.q}
                    </span>
                    <span
                      className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
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
                  </button>
                  {/*
                    CSS-only height animation: parent grid animates
                    grid-template-rows from 0fr to 1fr; the inner div
                    has overflow-hidden and content gets clipped during
                    the transition. Hardware-accelerated, no JS layout
                    measurement, no Framer Motion on every frame —
                    massively smoother than the previous height:auto
                    AnimatePresence approach (which was the source of
                    the lag, especially over the .glass-card backdrop
                    blur which had to repaint each frame).
                  */}
                  <div
                    className="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
                    style={{
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-7 pr-16 text-[0.95rem] leading-[1.65] text-mist-300 md:px-9 md:pb-8">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
