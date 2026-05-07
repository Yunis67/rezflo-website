import type { CSSProperties } from 'react'

type AuraPosition =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'left'
  | 'right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center'

interface SectionAuraProps {
  /** Where to anchor the aura within its parent section. */
  position?: AuraPosition
  /** Tailwind color or any valid CSS color for the glow. */
  color?: string
  /** Aura diameter as a viewport-width percentage. Default 65. */
  size?: number
  /** Gaussian blur in px. Default 80. */
  blur?: number
  /** Final opacity 0..1. Default 0.5. */
  opacity?: number
  className?: string
}

const POSITIONS: Record<AuraPosition, CSSProperties> = {
  'top-left':     { top: '-10%', left: '-10%' },
  'top-right':    { top: '-12%', right: '-10%' },
  'top-center':   { top: '-15%', left: '50%', transform: 'translateX(-50%)' },
  'left':         { top: '30%',  left: '-15%' },
  'right':        { top: '20%',  right: '-15%' },
  'bottom-left':  { bottom: '-10%', left: '-12%' },
  'bottom-right': { bottom: '-15%', right: '-10%' },
  'center':       { top: '40%', left: '50%', transform: 'translate(-50%, -50%)' },
}

/**
 * Atmospheric radial-gradient glow. Drops into a `relative` section
 * to add a localised "shaft of light" so the shader background reads
 * differently per section instead of looking flat. Pointer-events
 * are off so it never blocks interaction.
 */
export function SectionAura({
  position = 'top-right',
  color = 'rgba(168, 85, 247, 0.55)',
  size = 65,
  blur = 80,
  opacity = 0.5,
  className = '',
}: SectionAuraProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -z-[1] aspect-square rounded-full ${className}`}
      style={{
        ...POSITIONS[position],
        width: `${size}vw`,
        height: `${size}vw`,
        background: `radial-gradient(closest-side, ${color}, transparent 70%)`,
        filter: `blur(${blur}px)`,
        opacity,
      }}
    />
  )
}
