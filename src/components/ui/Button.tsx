import { forwardRef, type ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  withArrow?: boolean
  className?: string
}

interface AnchorProps
  extends BaseProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  href: string
  children: ReactNode
}

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium select-none whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform'

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-[0.9rem]',
  lg: 'px-7 py-3.5 text-[0.95rem]',
}

const variants: Record<Variant, string> = {
  primary:
    'cta-aura bg-gradient-to-b from-violet-500 to-violet-700 text-white border border-violet-400/40 hover:from-violet-400 hover:to-violet-600 hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'bg-white/[0.04] text-mist-100 border border-white/10 backdrop-blur-md hover:bg-white/[0.08] hover:border-violet-400/40 hover:text-white',
  ghost:
    'bg-transparent text-mist-200 hover:text-white hover:bg-white/[0.04]',
}

/**
 * Primary CTA. Renders as <a> so it works for both internal anchors
 * and external links (Calendly etc.). The primary variant pairs a
 * vertical gradient surface with a soft violet aura behind it.
 */
export const Button = forwardRef<HTMLAnchorElement, AnchorProps>(function Button(
  { variant = 'primary', size = 'md', withArrow, className = '', children, ...rest },
  ref
) {
  return (
    <a
      ref={ref}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      style={
        variant === 'primary'
          ? { boxShadow: 'var(--shadow-glow-violet)' }
          : undefined
      }
      {...rest}
    >
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <ArrowRight
          aria-hidden
          className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </a>
  )
})
