import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  /** Reverse the animation direction. */
  reverse?: boolean
  /** Pause the animation while the user hovers anywhere over the row. */
  pauseOnHover?: boolean
  /** Children to scroll. */
  children: ReactNode
  /** Animate vertically rather than horizontally. */
  vertical?: boolean
  /** Number of times to repeat the children for a seamless loop. */
  repeat?: number
  /** Animation speed bucket. */
  speed?: 'slow' | 'normal' | 'fast'
}

/**
 * Generic marquee primitive (per the user-provided spec). It loops
 * any children horizontally (or vertically) by translating a
 * children-flex by 100% and repeating the same children N times so
 * the loop reads as continuous.
 *
 * Animation tokens are defined in src/index.css:
 *   --animate-marquee, --animate-marquee-vertical
 *   keyframes: marquee, marquee-vertical
 */
export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 5,
  speed = 'normal',
  ...props
}: MarqueeProps) {
  const speedVariants = {
    slow:   '[--duration:120s]',
    normal: '[--duration:40s]',
    fast:   '[--duration:18s]',
  }

  return (
    <div
      {...props}
      className={cn(
        'group flex overflow-hidden p-1 [--gap:1rem] [gap:var(--gap)]',
        speedVariants[speed],
        vertical ? 'flex-col' : 'flex-row',
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex shrink-0 justify-around [gap:var(--gap)]',
              vertical
                ? 'animate-marquee-vertical flex-col'
                : 'animate-marquee flex-row',
              pauseOnHover && 'group-hover:[animation-play-state:paused]',
              reverse && '[animation-direction:reverse]',
            )}
          >
            {children}
          </div>
        ))}
    </div>
  )
}
