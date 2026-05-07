import {
  Phone,
  CalendarCheck,
  Languages,
  HelpCircle,
  Moon,
  ClipboardList,
  Shield,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Feature {
  title: string
  description: string
  Icon: LucideIcon
}

export const features: Feature[] = [
  {
    title: 'Phone Orders → POS Injection',
    description:
      'Orders flow directly into Clover and other POS systems. No re-typing, no errors.',
    Icon: Phone,
  },
  {
    title: 'Reservations & Changes',
    description:
      'Books, modifies, and cancels reservations across the booking system.',
    Icon: CalendarCheck,
  },
  {
    title: 'Multilingual Calls',
    description: 'Speaks English, Arabic, Spanish, French, and more.',
    Icon: Languages,
  },
  {
    title: 'Menu & FAQ Answers',
    description:
      'Hours, location, menu, allergens, specials — answered accurately, every time.',
    Icon: HelpCircle,
  },
  {
    title: 'After-hours Coverage',
    description:
      'Captures orders and bookings while the restaurant sleeps. Never lose a late-night caller.',
    Icon: Moon,
  },
  {
    title: 'Call Summaries Captured',
    description:
      'Every call logs name, phone, pickup time, special notes — ready for the team.',
    Icon: ClipboardList,
  },
  {
    title: 'Spam & Solicitor Filter',
    description:
      'Built-in protection that blocks robocalls and solicitors before they waste staff time.',
    Icon: Shield,
  },
]
