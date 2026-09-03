import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { AnthonyFloatingButton } from './components/ui/AnthonyFloatingButton'
import { AnthonyAgentMount } from './components/ui/AnthonyAgentMount'
import { RezFloShaderBackground } from './components/ui/rezflo-shader-background'
import { ScrollLogoMarqueeSection } from './components/sections/ScrollLogoMarqueeSection'
import { Hero } from './components/sections/Hero'
import { ProblemStats } from './components/sections/ProblemStats'
import { HowItWorks } from './components/sections/HowItWorks'
import { Features } from './components/sections/Features'
import { BentoShowcase } from './components/sections/BentoShowcase'
import { Testimonials } from './components/sections/Testimonials'
import { Pricing } from './components/sections/Pricing'
import { ROICalculator } from './components/sections/ROICalculator'
import { FAQ } from './components/sections/FAQ'

export default function App() {
  return (
    <div className="relative min-h-screen bg-black text-white antialiased">
      <Nav />
      {/* Bottom padding reserves space for the floating "Talk to Anthony"
          CTA so it never covers section content on mobile. Desktop has
          plenty of negative space already, so the reservation is small. */}
      <main className="relative pb-24 md:pb-8">
        <Hero />

        {/* Scroll-driven logo marquee — light section directly under hero. */}
        <ScrollLogoMarqueeSection />

        {/* Light white + violet sections that continue the hero palette. */}
        <div className="relative" style={{ background: '#F8F7FC' }}>
          <ProblemStats />
          <HowItWorks />
          <BentoShowcase />
          <Features />
        </div>

        {/* Smooth handoff from the light sections into the dark shader. */}
        <div
          aria-hidden
          style={{
            height: '160px',
            background: 'linear-gradient(180deg, #F8F7FC 0%, #1A0F2E 100%)',
          }}
        />

        {/* Non-hero sections share the animated mesh-gradient bg. */}
        <RezFloShaderBackground>
          <Testimonials />
          <ROICalculator />
          <Pricing />
          <FAQ />
        </RezFloShaderBackground>
      </main>
      <Footer />
      <AnthonyFloatingButton />
      <AnthonyAgentMount />
    </div>
  )
}
