import { useState } from 'react'
import { Container } from '../ui/Container'
import { SectionLabel } from '../ui/SectionLabel'
import { faqs } from '../../data/faqs'

/**
 * Faq accordion modeled after the supplied snippet. Adapted from the
 * snippet's light slate theme to RezFlo's dark violet theme. Each row
 * uses CSS max-height + opacity transitions (no JS height
 * measurement, no Framer Motion) which is hardware-accelerated and
 * stays smooth even on lower-powered devices.
 */
export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-28 md:py-36">
      <div aria-hidden className="divider-violet absolute inset-x-0 top-0 h-px" />
      <Container narrow>
        <div className="mx-auto flex flex-col items-center justify-center px-4 md:px-0">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="font-display mt-7 text-center text-[2.25rem] font-medium leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.85rem] lg:text-[3.5rem]">
            Looking for an{' '}
            <span className="gradient-text">answer?</span>
          </h2>
          <p className="mt-6 max-w-md text-center text-[1rem] leading-relaxed text-white/70">
            Quick answers, no fluff — everything operators ask before going live with RezFlo.
          </p>

          <div className="mt-12 w-full md:mt-16">
            {faqs.map((f, i) => {
              const isOpen = openIndex === i
              return (
                <div
                  key={f.q}
                  className="w-full cursor-pointer border-b border-white/[0.08] py-5"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <div className="flex items-center justify-between gap-6">
                    <h3 className="text-[1rem] font-medium text-white md:text-[1.0625rem]">
                      {f.q}
                    </h3>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`shrink-0 transition-transform duration-500 ease-in-out ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden
                    >
                      <path
                        d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                        stroke="#c4b5fd"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p
                    className={`max-w-2xl overflow-hidden text-[0.95rem] leading-[1.65] text-white/65 transition-all duration-500 ease-in-out ${
                      isOpen
                        ? 'max-h-[320px] translate-y-0 pt-4 opacity-100'
                        : 'max-h-0 -translate-y-2 pt-0 opacity-0'
                    }`}
                  >
                    {f.a}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
