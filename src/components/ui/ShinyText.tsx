import type { ReactNode } from 'react'

/**
 * Animated gradient-shine text. Use as inline span inside headlines
 * to draw the eye to a key phrase. Driven by CSS keyframes (no JS).
 */
export function ShinyText({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`shine-text ${className}`}>{children}</span>
}
