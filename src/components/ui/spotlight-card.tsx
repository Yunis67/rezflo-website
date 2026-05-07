import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

export type SpotlightGlow = 'blue' | 'purple' | 'green' | 'red' | 'orange'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  glowColor?: SpotlightGlow
  /** Spotlight radius in px. Default 320. */
  spotlightSize?: number
  /** Border thickness in px. Default 1. */
  borderWidth?: number
  /** Border-radius in px. Default 24. */
  radius?: number
  /** ARIA props pass-through. */
  role?: string
  ariaLabel?: string
}

/**
 * Pointer-tracking spotlight card. The whole document's cursor
 * position is broadcast via CSS variables (--x, --y, --xp, --yp)
 * on this card root so the radial gradient backgrounds (surface,
 * border, accent) follow the cursor smoothly.
 *
 * Adapted from the user-provided GlowCard; modernised so it can
 * wrap arbitrary content (the original locked sizing into an
 * aspect ratio). We dropped the size preset map in favor of free
 * sizing via `className` — this lets us drop it into any layout.
 *
 * Three radial layers compose the effect (matches the spec):
 *   - Body — soft tinted glow inside the card surface (subtle)
 *   - Border ::before — strong colored highlight on the border
 *   - White ::after — bright cursor specular spot on the border
 */
const COLOR_MAP: Record<SpotlightGlow, { base: number; spread: number }> = {
  blue:   { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green:  { base: 120, spread: 200 },
  red:    { base:   0, spread: 200 },
  orange: { base:  30, spread: 200 },
}

export function SpotlightCard({
  children,
  className = '',
  glowColor = 'purple',
  spotlightSize = 320,
  borderWidth = 1,
  radius = 24,
  role,
  ariaLabel,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const node = cardRef.current
      if (!node) return
      // Track in viewport coords so the gradient is consistent
      // even when the card is anywhere on the page.
      const rect = node.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      node.style.setProperty('--x', x.toFixed(2))
      node.style.setProperty('--y', y.toFixed(2))
      node.style.setProperty('--xp', (e.clientX / window.innerWidth).toFixed(3))
      node.style.setProperty('--yp', (e.clientY / window.innerHeight).toFixed(3))
    }
    document.addEventListener('pointermove', onMove)
    return () => document.removeEventListener('pointermove', onMove)
  }, [])

  const { base, spread } = COLOR_MAP[glowColor]

  return (
    <div
      ref={cardRef}
      data-glow
      role={role}
      aria-label={ariaLabel}
      className={cn(
        'relative isolate rounded-3xl backdrop-blur-md transition-transform duration-500 will-change-transform',
        // Glass surface
        'bg-[linear-gradient(180deg,rgba(46,16,101,0.55)_0%,rgba(18,0,31,0.78)_100%)]',
        className,
      )}
      style={
        {
          // CSS custom properties consumed by the radial gradients
          ['--base' as string]: String(base),
          ['--spread' as string]: String(spread),
          ['--radius' as string]: String(radius),
          ['--border' as string]: String(borderWidth),
          ['--size' as string]: String(spotlightSize),
          ['--saturation' as string]: '95',
          ['--lightness' as string]: '70',
          ['--bg-spot-opacity' as string]: '0.16',
          ['--border-spot-opacity' as string]: '0.95',
          ['--border-light-opacity' as string]: '0.85',
          ['--border-size' as string]: 'calc(var(--border, 1) * 1px)',
          ['--spotlight-size' as string]: 'calc(var(--size, 320) * 1px)',
          ['--hue' as string]: 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
          borderRadius: `calc(var(--radius) * 1px)`,
          border: 'var(--border-size) solid rgba(168, 85, 247, 0.16)',
          // Soft body glow that follows cursor
          backgroundImage: `radial-gradient(
            var(--spotlight-size) var(--spotlight-size) at
            calc(var(--x, 0) * 1px)
            calc(var(--y, 0) * 1px),
            hsl(var(--hue, 280) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.16)),
            transparent
          )`,
          boxShadow:
            '0 1px 0 rgba(255,255,255,0.05) inset, 0 30px 60px -20px rgba(0,0,0,0.55)',
        } as React.CSSProperties
      }
    >
      {/* Border-glow layers — generated via the global stylesheet
          below so they share state with the data-glow element. */}
      <SpotlightStyles />

      <div className="relative z-[2] h-full">{children}</div>
    </div>
  )
}

/**
 * Global pseudo-element styles for the border + specular spotlight.
 * Injected once per app render — multiple cards just reuse the
 * same stylesheet block. This is fine because the rules are scoped
 * to the [data-glow] attribute selector.
 */
function SpotlightStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
        [data-glow] { position: relative; }
        [data-glow]::before,
        [data-glow]::after {
          pointer-events: none;
          content: "";
          position: absolute;
          inset: calc(var(--border-size) * -1);
          border: var(--border-size) solid transparent;
          border-radius: calc(var(--radius) * 1px);
          background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
          background-repeat: no-repeat;
          background-position: 50% 50%;
          -webkit-mask:
            linear-gradient(transparent, transparent),
            linear-gradient(#fff, #fff);
          -webkit-mask-clip: padding-box, border-box;
          -webkit-mask-composite: xor;
          mask:
            linear-gradient(transparent, transparent),
            linear-gradient(#fff, #fff);
          mask-clip: padding-box, border-box;
          mask-composite: exclude;
        }
        [data-glow]::before {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.7) calc(var(--spotlight-size) * 0.7) at
            calc(var(--x, 0) * 1px)
            calc(var(--y, 0) * 1px),
            hsl(var(--hue, 280) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 60) * 1%) / var(--border-spot-opacity, 1)),
            transparent 100%
          );
          filter: brightness(1.6);
        }
        [data-glow]::after {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.45) calc(var(--spotlight-size) * 0.45) at
            calc(var(--x, 0) * 1px)
            calc(var(--y, 0) * 1px),
            hsl(0 100% 100% / var(--border-light-opacity, 1)),
            transparent 100%
          );
        }
      `,
      }}
    />
  )
}
