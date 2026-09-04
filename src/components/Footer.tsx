import { Container } from './ui/Container'
import { Logo } from './Logo'
import { site } from '../data/site'

export function Footer() {
  return (
    <footer
      className="relative border-t border-[#A993FF]/30"
      style={{ background: 'linear-gradient(180deg, #F1EFFB 0%, #E9E6F4 100%)' }}
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 py-20 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-[#201B33]/70">
              The 24/7 multilingual AI receptionist that turns every restaurant
              call into captured revenue.
            </p>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#5B41DA]">
              Product
            </h4>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li><a href="#features" className="text-[#201B33] transition-colors hover:text-[#5B41DA]">Features</a></li>
              <li><a href="#pricing" className="text-[#201B33] transition-colors hover:text-[#5B41DA]">Pricing</a></li>
              <li><a href="#roi" className="text-[#201B33] transition-colors hover:text-[#5B41DA]">ROI Calculator</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#5B41DA]">
              Company
            </h4>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li>
                <a href={site.cta.bookDemo} className="text-[#201B33] transition-colors hover:text-[#5B41DA]">
                  Book a Demo
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="text-[#5B41DA] transition-colors hover:text-[#6E52E8]">
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.contact.phone.replace(/\D/g, '')}`} className="text-[#5B41DA] transition-colors hover:text-[#6E52E8]">
                  {site.contact.phone}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#5B41DA]">
              Legal
            </h4>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li>
                <a
                  href="/rezflo-privacy-policy.pdf"
                  target="_blank"
                  rel="noopener"
                  className="text-[#201B33] transition-colors hover:text-[#5B41DA]"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/rezflo-terms.pdf"
                  target="_blank"
                  rel="noopener"
                  className="text-[#201B33] transition-colors hover:text-[#5B41DA]"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-[#201B33]/10 py-6 md:flex-row md:items-center">
          <p className="text-[0.85rem] text-[#201B33]/55">
            © 2026 {site.brand}. All rights reserved.
          </p>
          <p className="text-[0.85rem] text-[#201B33]/55">
            Built for restaurants. Engineered for revenue.
          </p>
        </div>
      </Container>
    </footer>
  )
}
