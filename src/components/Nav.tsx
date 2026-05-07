import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Container } from './ui/Container'
import { Button } from './ui/Button'
import { Logo } from './Logo'
import { cn } from '../lib/utils'
import { site } from '../data/site'

const links = [
  { label: 'Home', href: '#top' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how' },
  { label: 'Results', href: '#stories' },
  { label: 'ROI Calculator', href: '#roi' },
  { label: 'Pricing', href: '#pricing' },
]

/**
 * Sticky header that:
 *   - At rest: full container width, transparent.
 *   - On scroll (>10px): floats to a narrower max-width "pill" with
 *     glass blur, border, and a soft shadow. Animated via Tailwind
 *     transition-all on the wrapper. Inspired by the header-2 spec.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 z-50 mx-auto transition-all duration-500 ease-out',
        scrolled
          ? // Compact + floating + glass
            'top-3 max-w-5xl rounded-full border border-white/10 bg-black/55 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl'
          : // Full width, flat
            'top-0 max-w-none rounded-none border-b border-transparent bg-transparent backdrop-blur-0',
      )}
    >
      <Container className={cn('transition-all', scrolled ? 'lg:!px-4' : '')}>
        <div
          className={cn(
            'flex items-center justify-between transition-all duration-500',
            scrolled ? 'h-14 md:h-14' : 'h-16 md:h-20',
          )}
        >
          <a href="#top" aria-label={`${site.brand} home`} className="flex items-center">
            <Logo size={56} />
          </a>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-neutral-700/80 bg-white/[0.04] px-2 py-1.5 backdrop-blur-md">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-1.5 text-sm text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button href={site.cta.bookDemo} variant="primary" size="md" withArrow>
              {site.cta.bookDemoLabel}
            </Button>
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 backdrop-blur-md hover:text-white"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300 ease-out',
          open ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <Container>
          <div className="flex flex-col gap-1 pb-6">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base text-white/85 hover:bg-white/[0.05] hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <Button
              href={site.cta.bookDemo}
              variant="primary"
              size="md"
              className="mt-3 w-full"
              withArrow
              onClick={() => setOpen(false)}
            >
              {site.cta.bookDemoLabel}
            </Button>
          </div>
        </Container>
      </div>
    </header>
  )
}
