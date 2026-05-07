import React from 'react'
import { motion } from 'framer-motion'

export interface MarqueeTestimonial {
  text: string
  name: string
  role: string
  /** Two-letter initials shown in the avatar circle. */
  initials: string
}

interface ColumnProps {
  className?: string
  testimonials: MarqueeTestimonial[]
  duration?: number
}

/**
 * Single vertical column that scrolls upward forever. The list is
 * duplicated so the loop is seamless when motion translates Y by -50%.
 * Each card is a dark-glass quote with a gradient-bordered avatar.
 */
export function TestimonialsColumn({ className = '', testimonials, duration = 16 }: ColumnProps) {
  return (
    <div className={className}>
      <motion.ul
        animate={{ translateY: '-50%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        className="flex flex-col gap-6 pb-6 list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, dupeIndex) => (
            <React.Fragment key={dupeIndex}>
              {testimonials.map((t, i) => (
                <motion.li
                  key={`${dupeIndex}-${i}`}
                  aria-hidden={dupeIndex === 1 ? 'true' : 'false'}
                  tabIndex={dupeIndex === 1 ? -1 : 0}
                  whileHover={{
                    scale: 1.02,
                    y: -6,
                    transition: { type: 'spring', stiffness: 320, damping: 22 },
                  }}
                  whileFocus={{
                    scale: 1.02,
                    y: -6,
                    transition: { type: 'spring', stiffness: 320, damping: 22 },
                  }}
                  className="glow-border glass-card cursor-default select-none p-8 md:p-9 max-w-xs w-full focus:outline-none focus:ring-2 focus:ring-violet-400/40"
                >
                  <blockquote className="m-0 p-0">
                    <p className="font-display text-[1.05rem] leading-[1.6] text-mist-50 m-0">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <footer className="mt-7 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                      <Avatar initials={t.initials} />
                      <div className="flex min-w-0 flex-col">
                        <cite className="not-italic text-[0.9rem] font-semibold tracking-tight text-white">
                          {t.name}
                        </cite>
                        <span className="mt-0.5 text-[0.78rem] tracking-tight text-mist-400">
                          {t.role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  )
}

function Avatar({ initials }: { initials: string }) {
  return (
    <span
      aria-hidden
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[0.8rem] font-semibold text-white ring-2 ring-violet-400/30"
      style={{
        background:
          'linear-gradient(135deg, var(--color-violet-400) 0%, var(--color-violet-700) 100%)',
        boxShadow:
          '0 6px 18px -4px rgba(124, 58, 237, 0.55), inset 0 1px 0 rgba(255,255,255,0.18)',
      }}
    >
      {initials}
    </span>
  )
}
