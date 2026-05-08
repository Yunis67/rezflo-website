import {
  PhoneCall,
  CalendarCheck,
  Languages,
  CircleHelp,
  Moon,
  ShieldCheck,
  ClipboardList,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionLabel } from '../ui/SectionLabel'
import { SectionAura } from '../ui/SectionAura'
import { ExpandingCards, type CardItem } from '../ui/ExpandingCards'

/**
 * Card order matches the user's spec exactly:
 *   1. Phone Orders → POS Injection
 *   2. Reservations & Changes
 *   3. Multilingual Calls
 *   4. Menu & FAQ Answers
 *   5. After-hours Coverage
 *   6. Spam & Solicitor Filter
 *   7. Call Summaries Captured  (image kept from previous revision)
 */
// Object-position values used across the photo cards. Tiny nudges
// (42% / 58%) keep crops feeling intentional without flipping the
// composition. Call Summaries uses 'left' so the dashboard mockup's
// brand header stays in frame.
const NUDGE_LEFT = '35% center'
const NUDGE_RIGHT = '65% center'

const rezfloFeatures: CardItem[] = [
  {
    id: 'phone-orders-pos-injection',
    title: 'Phone Orders → POS Injection',
    description:
      'Orders flow directly into Clover and other POS systems. No re-typing, no errors.',
    imgSrc: '/images/phone-orders-pos.png',
    icon: <PhoneCall size={20} />,
    linkHref: '#',
    imgPosition: NUDGE_RIGHT,
  },
  {
    id: 'reservations-changes',
    title: 'Reservations & Changes',
    description:
      'Books, modifies, and cancels reservations across the booking system.',
    imgSrc: '/images/reservations-changes.png',
    icon: <CalendarCheck size={20} />,
    linkHref: '#',
    imgPosition: NUDGE_RIGHT,
  },
  {
    id: 'multilingual-calls',
    title: 'Multilingual Calls',
    description: 'Speaks English, Arabic, Spanish, French, and more.',
    imgSrc: '/images/multilingual-calls.png',
    icon: <Languages size={20} />,
    linkHref: '#',
    imgPosition: NUDGE_LEFT,
  },
  {
    id: 'menu-faq-answers',
    title: 'Menu & FAQ Answers',
    description:
      'Hours, location, menu, allergens, specials — answered accurately, every time.',
    imgSrc: '/images/menu-faq-answers.png',
    icon: <CircleHelp size={20} />,
    linkHref: '#',
    imgPosition: NUDGE_RIGHT,
  },
  {
    id: 'after-hours-coverage',
    title: 'After-hours Coverage',
    description:
      'Captures orders and bookings while the restaurant sleeps. Never lose a late-night caller.',
    imgSrc: '/images/after-hours-coverage.png',
    icon: <Moon size={20} />,
    linkHref: '#',
    imgPosition: NUDGE_RIGHT,
  },
  {
    id: 'spam-solicitor-filter',
    title: 'Spam & Solicitor Filter',
    description:
      'Built-in protection that blocks robocalls and solicitors before they waste staff time.',
    imgSrc: '/images/spam-filter.png',
    icon: <ShieldCheck size={20} />,
    linkHref: '#',
    imgPosition: NUDGE_RIGHT,
  },
  {
    id: 'call-summaries-captured',
    title: 'Call Summaries Captured',
    description:
      'Every call logs name, phone, pickup time, special notes — ready for the team.',
    imgSrc: '/images/a6f34786-a750-498c-8f4b-b423fad18f9a.png',
    icon: <ClipboardList size={20} />,
    linkHref: '#',
    imgPosition: 'left',
  },
]

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-28 md:py-36">
      <div aria-hidden className="divider-violet absolute inset-x-0 top-0 h-px" />
      <SectionAura position="top-center" color="rgba(168, 85, 247, 0.5)" size={75} opacity={0.4} />
      <SectionAura position="bottom-right" color="rgba(124, 58, 237, 0.5)" size={55} opacity={0.5} blur={90} />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Features</SectionLabel>
          <h2 className="font-display mt-7 pb-2 text-[2.25rem] font-medium leading-[1.1] tracking-[-0.018em] text-white sm:text-[2.85rem] lg:text-[3.5rem]">
            A full-time employee that{' '}
            <span className="gradient-text italic">never sleeps.</span>
          </h2>
          <p className="font-open-sans mt-6 text-[1.0625rem] leading-relaxed text-white/75">
            Built specifically for restaurants. Tuned for orders, reservations, and
            the questions guests actually ask.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-20"
        >
          <ExpandingCards items={rezfloFeatures} defaultActiveIndex={0} />
        </motion.div>
      </Container>
    </section>
  )
}
