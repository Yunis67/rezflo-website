import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { site } from '../../data/site'

export function FinalCTA() {
  return (
    <section className="relative py-28 md:py-36">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="glow-border relative isolate overflow-hidden rounded-[2.25rem] px-8 py-20 text-center md:px-16 md:py-28"
          style={{
            background:
              'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(139, 92, 246, 0.22) 0%, transparent 60%), linear-gradient(180deg, rgba(35, 25, 70, 0.6) 0%, rgba(15, 10, 35, 0.85) 100%)',
            boxShadow:
              '0 60px 120px -40px rgba(124, 58, 237, 0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
            backdropFilter: 'blur(20px) saturate(140%)',
            WebkitBackdropFilter: 'blur(20px) saturate(140%)',
          }}
        >
          {/* Cafe scene faded behind for atmosphere */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage: 'url(/images/final-cta-bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.85,
            }}
          />
          {/* Soft purple wash for text legibility over the new bg */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                'linear-gradient(180deg, rgba(15,8,40,0.55) 0%, rgba(20,10,50,0.65) 55%, rgba(10,5,28,0.8) 100%)',
            }}
          />

          {/* Drifting aurora */}
          <div
            aria-hidden
            className="aurora-drift absolute -top-1/2 left-1/2 -translate-x-1/2 h-[80%] w-[80%] rounded-full"
            style={{
              background:
                'radial-gradient(closest-side, rgba(167, 139, 250, 0.35), transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          <div className="relative">
            <h2 className="font-display mx-auto max-w-3xl text-[2.25rem] font-medium leading-[1.1] tracking-[-0.02em] text-white sm:text-[3rem] lg:text-[3.75rem]">
              Stop missing calls.{' '}
              <span className="gradient-text">Start booking revenue.</span>
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-mist-300">
              See it answer your phone in a 15-minute demo on your own menu.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button
                href={site.cta.bookDemo}
                size="lg"
                variant="primary"
                withArrow
              >
                {site.cta.bookDemoLabel}
              </Button>
              <Button href="#top" size="lg" variant="secondary">
                {site.cta.tryItLabel}
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
