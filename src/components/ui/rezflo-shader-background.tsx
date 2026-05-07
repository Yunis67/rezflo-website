import type { ReactNode } from 'react'
import { MeshGradient } from '@paper-design/shaders-react'

interface RezFloShaderBackgroundProps {
  children: ReactNode
  className?: string
}

/**
 * Premium animated mesh-gradient backdrop for all non-hero sections.
 *
 * Three layered shaders give the page a cinematic, premium feel
 * that's clearly visible without overwhelming the foreground:
 *
 *   1. SLOW BASE (opacity 90, speed 0.22)
 *      Black → deep violet → mid violet → lavender → white wash.
 *      Provides the dominant atmosphere and section-to-section drift.
 *
 *   2. MID ACCENT (opacity 55, speed 0.4, mix-blend-screen)
 *      Highlights with brighter violets + a touch of white. Adds the
 *      "shifting light" feel between sections.
 *
 *   3. SOFT WASH (opacity 28, speed 0.12, mix-blend-overlay)
 *      Slow neutrals — black/gray/cool white — keeps the palette
 *      from feeling monochromatic.
 *
 * A 28% black overlay protects readability without flattening the
 * effect. All layers are pointer-events-none so CTAs underneath
 * remain clickable.
 *
 * Top edge gets a fade-in mask so the hero blends seamlessly down
 * into the shader rather than abrupting at a horizontal seam.
 */
export function RezFloShaderBackground({
  children,
  className = '',
}: RezFloShaderBackgroundProps) {
  return (
    <section className={`relative bg-black ${className}`}>
      {/* Layer 1 — slow deep-violet base. Brightest stop is mid
          violet (#5B21B6) so the page never washes light. */}
      <MeshGradient
        className="pointer-events-none absolute inset-0 h-full w-full opacity-85"
        colors={[
          '#000000',
          '#0A0418',
          '#170A2E',
          '#2E1065',
          '#4C1D95',
          '#5B21B6',
        ]}
        speed={0.22}
        distortion={0.85}
      />

      {/* Layer 2 — subtle mid-violet highlights only (no white).
          Lower opacity so it accents rather than brightens. */}
      <MeshGradient
        className="pointer-events-none absolute inset-0 h-full w-full opacity-35 mix-blend-screen"
        colors={[
          '#0A0418',
          '#3B0D8A',
          '#5B21B6',
          '#7C3AED',
          '#2E1065',
        ]}
        speed={0.4}
        distortion={0.6}
        swirl={0.55}
      />

      {/* Layer 3 — neutral darks for variety. Caps at #423856
          (deep cool gray) so it never lifts the overall brightness. */}
      <MeshGradient
        className="pointer-events-none absolute inset-0 h-full w-full opacity-22 mix-blend-overlay"
        colors={[
          '#000000',
          '#1A1424',
          '#2A2438',
          '#423856',
        ]}
        speed={0.12}
      />

      {/* Readability overlay — slightly stronger to deepen the bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-black/45"
      />

      {/* Top blend strip — sits ABOVE the readability overlay so the
          violet at the very top isn't darkened. Starts fully opaque
          at #1A0F2E (matching the marquee section's bottom color),
          then fades to transparent so the shader takes over. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80"
        style={{
          background:
            'linear-gradient(180deg, #1A0F2E 0%, #1A0F2E 12%, rgba(26,15,46,0.85) 35%, rgba(26,15,46,0.5) 60%, rgba(26,15,46,0.2) 85%, transparent 100%)',
        }}
      />

      {/* Bottom blend strip — fade the shader OUT into the footer's
          black background so there's no horizontal seam where the
          purple mesh meets the footer. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(10,4,24,0.45) 45%, rgba(5,2,14,0.85) 80%, #000000 100%)',
        }}
      />

      {/* Subtle grain so it never feels too "digital" */}
      <div
        aria-hidden
        className="bg-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </section>
  )
}
