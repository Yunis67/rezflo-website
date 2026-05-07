import { useState } from 'react'

interface LogoProps {
  className?: string
  /** Path to a PNG/SVG logo. Default points at the brand asset
      slot — drop a file at public/logos/rezflo-logo.png and it
      will appear automatically. If the file is missing, the
      SVG fallback below renders. */
  imgSrc?: string
  /** Hide the "RezFlo" wordmark inside the box. */
  iconOnly?: boolean
  /** Logo box pixel size. Default 56. */
  size?: number
}

/**
 * RezFlo brand mark. Tries to load the literal logo image first;
 * if that fails (file missing) it falls back to the inline SVG
 * recreation. This means the moment you save the PNG to
 * /public/logos/rezflo-logo.png, the site picks it up — no code
 * change required.
 */
export function Logo({
  className = '',
  imgSrc = '/logos/rezflo-logo.png',
  iconOnly = false,
  size = 56,
}: LogoProps) {
  const [failed, setFailed] = useState(false)

  if (imgSrc && !failed) {
    return (
      <img
        src={imgSrc}
        alt="RezFlo"
        className={`select-none object-contain ${className}`}
        style={{ height: size, width: 'auto' }}
        draggable={false}
        onError={() => setFailed(true)}
      />
    )
  }
  return <RezFloMark className={className} size={size} iconOnly={iconOnly} />
}

function RezFloMark({
  className = '',
  size = 56,
  iconOnly = false,
}: {
  className?: string
  size?: number
  iconOnly?: boolean
}) {
  return (
    <span
      aria-label="RezFlo"
      className={`relative inline-flex flex-col items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        background: '#FFFFFF',
        borderRadius: size * 0.2,
        padding: size * 0.1,
        boxShadow:
          '0 4px 12px -2px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.5)',
      }}
    >
      {/* Mark */}
      <svg
        viewBox="0 0 100 80"
        width={size * 0.7}
        height={size * (iconOnly ? 0.7 : 0.45)}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* Gray "R" outline — sits behind, offset slightly right */}
        <g transform="translate(6, 0)">
          <RGlyph fill="#8B95A8" />
        </g>
        {/* Violet "R" — primary, angular geometric strokes */}
        <RGlyph fill="#5B46F0" />
      </svg>

      {/* Wordmark */}
      {!iconOnly && (
        <span
          style={{
            fontFamily:
              '"Plus Jakarta Sans", Inter, system-ui, sans-serif',
            fontWeight: 800,
            color: '#5B46F0',
            fontSize: size * 0.18,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            marginTop: size * 0.02,
          }}
        >
          RezFlo
        </span>
      )}
    </span>
  )
}

/**
 * Single-path geometric "R". Sharp 45° cuts on the top and the leg,
 * angular bowl rather than curved — matches the custom letterform.
 *
 * Built from two stroke planes joined into one fill-rule:evenodd
 * path so we can recolor the whole letter as a single layer.
 */
function RGlyph({ fill }: { fill: string }) {
  return (
    <path
      d="
        M 8 10
        L 50 10
        L 64 22
        L 64 36
        L 50 46
        L 38 46
        L 56 70
        L 42 70
        L 24 46
        L 22 46
        L 22 70
        L 8 70
        Z
        M 22 22
        L 22 36
        L 44 36
        L 50 30
        L 50 28
        L 44 22
        Z
      "
      fill={fill}
      fillRule="evenodd"
    />
  )
}
