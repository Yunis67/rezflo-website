import type { HTMLAttributes, ReactNode } from 'react'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** Hover lift + brighter border. Default true. */
  interactive?: boolean
  /** Featured: persistent stronger glow + border. */
  featured?: boolean
  /** Drop the gradient hairline — useful for nested cards. */
  noBorder?: boolean
}

/**
 * Premium dark glass card. Translucent violet-tinted surface with
 * backdrop blur, gradient violet hairline, dual shadow (depth +
 * violet glow), and a hover state that lifts and brightens both.
 *
 * Composition:
 *   .glow-border  → the gradient hairline (::before)
 *   .glass-card   → blur, surface gradient, shadow, transitions
 */
export function GlassCard({
  children,
  interactive = true,
  featured = false,
  noBorder = false,
  className = '',
  ...rest
}: GlassCardProps) {
  const border = noBorder ? '' : 'glow-border'
  const interactiveCls = interactive ? '' : '[&]:hover:transform-none [&]:hover:shadow-[var(--shadow-card)]'
  const featuredCls = featured
    ? 'shadow-[var(--shadow-card-hover)] before:bg-[linear-gradient(135deg,rgba(167,139,250,0.85)_0%,rgba(167,139,250,0.2)_30%,rgba(167,139,250,0.2)_70%,rgba(167,139,250,0.85)_100%)]'
    : ''
  return (
    <div
      className={`glass-card ${border} ${interactiveCls} ${featuredCls} ${className}`}
      {...rest}
    >
      <div className="relative z-[2] h-full">{children}</div>
    </div>
  )
}
