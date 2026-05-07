import ScrollExpandMedia from '../blocks/scroll-expansion-hero'

/**
 * Premium scroll-expanding video showcase. Replaces the legacy
 * Integrations section. Wraps ScrollExpandMedia with RezFlo copy and
 * the split-screen product video.
 */
export function ScrollExpandShowcase() {
  return (
    <section id="watch" className="relative">
      <ScrollExpandMedia
        mediaSrc="/videos/rezflo-split-screen-v2.mp4"
        title={
          <>
            Watch <KeywordGlow>RezFlo</KeywordGlow> handle the calls your team
            can&rsquo;t.
          </>
        }
        subtitle={
          <>
            From missed calls to bookings, orders, and follow-ups —{' '}
            <KeywordGlow soft>RezFlo</KeywordGlow> keeps your restaurant moving{' '}
            <KeywordGlow soft>24/7</KeywordGlow>.
          </>
        }
        scrollToExpand="Scroll to expand"
      />
    </section>
  )
}

/**
 * KeywordGlow — inline span that paints the wrapped text with a
 * lavender→fuchsia gradient and casts a violet glow, so brand words
 * pop against the white headline.
 */
function KeywordGlow({
  children,
  soft = false,
}: {
  children: React.ReactNode
  soft?: boolean
}) {
  return (
    <span
      className="bg-gradient-to-r from-violet-300 via-violet-200 to-fuchsia-200 bg-clip-text text-transparent"
      style={{
        filter: soft
          ? 'drop-shadow(0 0 10px rgba(196,181,253,0.55))'
          : 'drop-shadow(0 0 16px rgba(167,139,250,0.85)) drop-shadow(0 0 32px rgba(124,58,237,0.55))',
      }}
    >
      {children}
    </span>
  )
}
