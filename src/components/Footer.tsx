import { Container } from './ui/Container'
import { Logo } from './Logo'
import { site } from '../data/site'

export function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <Container>
        <div className="grid grid-cols-1 gap-12 py-20 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-mist-400">
              The 24/7 multilingual AI receptionist that turns every restaurant
              call into captured revenue.
            </p>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-mist-500">
              Product
            </h4>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li><a href="#features" className="text-mist-200 transition-colors hover:text-violet-300">Features</a></li>
              <li><a href="#pricing" className="text-mist-200 transition-colors hover:text-violet-300">Pricing</a></li>
              <li><a href="#faq" className="text-mist-200 transition-colors hover:text-violet-300">FAQ</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-mist-500">
              Company
            </h4>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li>
                <a href={site.cta.bookDemo} className="text-mist-200 transition-colors hover:text-violet-300">
                  Book a Demo
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="text-mist-200 transition-colors hover:text-violet-300">
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.contact.phone.replace(/\D/g, '')}`} className="text-mist-200 transition-colors hover:text-violet-300">
                  {site.contact.phone}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-mist-500">
              Legal
            </h4>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li>
                <a
                  href="/rezflo-privacy-policy.pdf"
                  target="_blank"
                  rel="noopener"
                  className="text-mist-200 transition-colors hover:text-violet-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/rezflo-terms.pdf"
                  target="_blank"
                  rel="noopener"
                  className="text-mist-200 transition-colors hover:text-violet-300"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-white/5 py-6 md:flex-row md:items-center">
          <p className="text-[0.85rem] text-mist-500">
            © 2026 {site.brand}. All rights reserved.
          </p>
          <p className="text-[0.85rem] text-mist-500">
            Built for restaurants. Engineered for revenue.
          </p>
        </div>
      </Container>
    </footer>
  )
}
