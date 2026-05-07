export interface FAQ {
  q: string
  a: string
}

export const faqs: FAQ[] = [
  {
    q: 'Does it work with my POS?',
    a: "We natively integrate with Clover today, with Toast, Square, and others coming soon. If you don't see your system listed, reach out — we're adding partners monthly.",
  },
  {
    q: 'What languages does it support?',
    a: "English, Arabic, Spanish, French, and more. RezFlo detects the caller's language and responds in kind automatically.",
  },
  {
    q: 'Can it take reservations and modify or cancel them?',
    a: 'Yes. RezFlo books new reservations, handles modification requests, and processes cancellations — synced with your reservation platform.',
  },
  {
    q: "What happens if the AI isn't sure?",
    a: "RezFlo is designed to handle the vast majority of calls autonomously. For edge cases it can't confidently resolve, it captures the caller's details and flags the call for your team to follow up.",
  },
  {
    q: 'How fast can we go live?',
    a: 'Most restaurants are live within a few days of signing up. No hardware. No complex setup.',
  },
  {
    q: 'Do I keep my phone number?',
    a: 'Yes. You forward your existing number to RezFlo. Your number stays yours.',
  },
  {
    q: 'Can it handle rush hour volume?',
    a: 'Yes. RezFlo handles concurrent calls simultaneously — no hold music, no queues, no dropped calls at 7pm on a Friday.',
  },
]
