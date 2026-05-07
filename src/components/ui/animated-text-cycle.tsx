import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface AnimatedTextCycleProps {
  words: string[]
  interval?: number
  className?: string
}

/**
 * AnimatedTextCycle — inline word cycler with smooth width animation
 * and a blur/slide transition.
 *
 * Renders all candidate words in a hidden measurement layer so the
 * container can animate its width to fit each word exactly. This
 * prevents the surrounding sentence from jumping when words of
 * different lengths cycle in.
 */
export function AnimatedTextCycle({
  words,
  interval = 2500,
  className = '',
}: AnimatedTextCycleProps) {
  const [index, setIndex] = useState(0)
  const [width, setWidth] = useState<number | 'auto'>('auto')
  const measureRefs = useRef<(HTMLSpanElement | null)[]>([])

  // Measure each word's width once mounted, then on resize.
  useEffect(() => {
    const measure = () => {
      const el = measureRefs.current[index]
      if (el) setWidth(el.getBoundingClientRect().width)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [index])

  // Cycle through words on the given interval.
  useEffect(() => {
    if (words.length <= 1) return
    const id = window.setInterval(() => {
      setIndex(prev => (prev + 1) % words.length)
    }, interval)
    return () => window.clearInterval(id)
  }, [words.length, interval])

  return (
    <>
      {/* Hidden measurement layer — renders every word so we can grab
          its exact pixel width. aria-hidden + sr-only-style positioning
          keeps it invisible and out of the a11y tree. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -z-10 opacity-0"
        style={{
          position: 'absolute',
          visibility: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {words.map((word, i) => (
          <span
            key={word}
            ref={el => {
              measureRefs.current[i] = el
            }}
            className={className}
          >
            {word}
          </span>
        ))}
      </span>

      <motion.span
        className="relative inline-block align-baseline"
        animate={{ width }}
        transition={{ type: 'spring', stiffness: 220, damping: 28, mass: 0.6 }}
        style={{
          whiteSpace: 'nowrap',
          // Give the inline-block enough vertical room for descenders
          // (g, y, p…) so bg-clip-text doesn't clip the bottom of the
          // glyph. Negative margin compensates so surrounding lines
          // aren't pushed apart.
          paddingBottom: '0.2em',
          marginBottom: '-0.2em',
          lineHeight: 1.2,
          overflow: 'visible',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[index]}
            className={`inline-block ${className}`}
            initial={{ y: '0.4em', opacity: 0, filter: 'blur(8px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: '-0.4em', opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              whiteSpace: 'nowrap',
              paddingBottom: '0.2em',
              marginBottom: '-0.2em',
              lineHeight: 1.2,
            }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  )
}
