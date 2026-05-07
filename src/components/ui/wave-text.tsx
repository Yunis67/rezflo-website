import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

/* =============================================================
   Text_03 — exact spec from the user-provided component.
   Per-letter pop on hover. Use for short page-title text.
   ============================================================= */

interface AnimatedTextProps {
  text?: string
  className?: string
}

export function Text_03({ text = 'Hover me', className = '' }: AnimatedTextProps) {
  return (
    <motion.span
      className={cn(
        'inline-block w-full text-center cursor-pointer text-3xl transition-all',
        className,
      )}
      whileHover="hover"
      initial="initial"
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            initial: { y: 0, scale: 1 },
            hover: {
              y: -4,
              scale: 1.2,
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 15,
                delay: index * 0.03,
              },
            },
          }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

/* =============================================================
   WaveText — extended variant that accepts segmented children
   so we can apply the per-letter wave to multi-styled headings
   (e.g. white text + a gradient phrase). Each segment renders
   its own letters and inherits its own className.
   ============================================================= */

export type WaveSegment = string | { text: string; className?: string }

interface WaveTextProps {
  segments: WaveSegment[]
  className?: string
  /** Hover scale for individual letters. Default 1.15. */
  hoverScale?: number
  /** Hover translateY (px). Default -4. */
  hoverY?: number
  /** Per-letter delay multiplier. Default 0.015. */
  stagger?: number
  children?: ReactNode
}

export function WaveText({
  segments,
  className,
  hoverScale = 1.15,
  hoverY = -4,
  stagger = 0.015,
}: WaveTextProps) {
  let globalIndex = 0
  return (
    <motion.span
      className={cn('inline-block', className)}
      whileHover="hover"
      initial="initial"
    >
      {segments.flatMap((seg, segIdx) => {
        const text = typeof seg === 'string' ? seg : seg.text
        const segCls = typeof seg === 'string' ? '' : seg.className ?? ''
        return text.split('').map((char, i) => {
          const idx = globalIndex++
          return (
            <motion.span
              key={`${segIdx}-${i}`}
              className={cn('inline-block', segCls)}
              variants={{
                initial: { y: 0, scale: 1 },
                hover: {
                  y: hoverY,
                  scale: hoverScale,
                  transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 15,
                    delay: idx * stagger,
                  },
                },
              }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          )
        })
      })}
    </motion.span>
  )
}
