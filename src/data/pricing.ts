export interface Plan {
  name: string
  tagline: string
  highlight?: boolean   // "Most Popular"
  bullets: string[]
  ctaLabel: string
}

export const plans: Plan[] = [
  {
    name: 'Starter',
    tagline: 'For single-location restaurants that want to stop missing calls.',
    bullets: [
      '24/7 multilingual call answering',
      'Reservations: book / modify / cancel',
      'Menu, hours & FAQ answers',
      'Auto solicitor & spam blocking',
      'Call summaries to team',
    ],
    ctaLabel: 'Get a quote',
  },
  {
    name: 'Pro',
    tagline: 'For busy restaurants taking real phone-order volume.',
    highlight: true,
    bullets: [
      'Everything in Starter',
      'Phone orders → POS injection (Clover & more)',
      'Unlimited languages',
      'Multi-location support',
      'Priority onboarding & SLA',
      'Custom voice & escalation rules',
    ],
    ctaLabel: 'Talk to sales',
  },
]
