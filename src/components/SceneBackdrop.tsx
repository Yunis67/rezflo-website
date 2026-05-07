/**
 * Site-wide cinematic backdrop. Stacks four layers behind every
 * section so the rainy-cafe aesthetic flows through the entire page:
 *
 *   1. Deep ink base color (always there)
 *   2. The hero image at low opacity, vignetted to the edges
 *   3. Two large drifting violet auroras (radial gradients)
 *   4. A grain texture for that filmic premium feel
 *
 * Kept as `fixed` so it stays put while the user scrolls — sections
 * effectively float over a single continuous scene. Sections render
 * their own surface treatments on top.
 */
export function SceneBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950"
    >
      {/* Layer 1: cafe image, very subtle, tinted */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px) saturate(0.75)',
        }}
      />

      {/* Layer 2: deep violet→ink gradient on top of image */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,5,26,0.45) 0%, rgba(7,5,26,0.85) 60%, rgba(7,5,26,0.97) 100%)',
        }}
      />

      {/* Layer 3a: drifting upper-right aurora — desktop only */}
      <div
        className="aurora-drift absolute -top-[20%] -right-[10%] h-[80vh] w-[70vw] rounded-full hidden md:block"
        style={{
          background:
            'radial-gradient(closest-side, rgba(139, 92, 246, 0.32), transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Layer 3b: drifting lower-left aurora — desktop only */}
      <div
        className="aurora-drift absolute -bottom-[15%] -left-[15%] h-[70vh] w-[70vw] rounded-full hidden md:block"
        style={{
          background:
            'radial-gradient(closest-side, rgba(91, 33, 182, 0.28), transparent 70%)',
          filter: 'blur(50px)',
          animationDelay: '-9s',
        }}
      />

      {/* Mobile-only static violet wash so the backdrop doesn't go pure black */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 70% 25%, rgba(124, 58, 237, 0.18), transparent 65%), radial-gradient(ellipse 90% 60% at 20% 85%, rgba(91, 33, 182, 0.16), transparent 65%)',
        }}
      />

      {/* Layer 4: grain */}
      <div className="bg-grain absolute inset-0 opacity-[0.06] mix-blend-overlay" />

      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 40%, rgba(7,5,26,0.6) 100%)',
        }}
      />
    </div>
  )
}
