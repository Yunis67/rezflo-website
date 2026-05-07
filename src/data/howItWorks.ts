import { PhoneIncoming, MessageCircle, ChefHat } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Step {
  number: string
  title: string
  description: string
  Icon: LucideIcon
}

export const steps: Step[] = [
  {
    number: '01',
    title: 'Caller rings the restaurant',
    description:
      'Forward your existing line. Keep your number. RezFlo picks up instantly, every time.',
    Icon: PhoneIncoming,
  },
  {
    number: '02',
    title: 'RezFlo answers and handles it',
    description:
      "Confirms reservations, answers menu/FAQs, takes phone orders — in the caller's language.",
    Icon: MessageCircle,
  },
  {
    number: '03',
    title: 'Order lands in your POS',
    description:
      'Orders inject directly into Clover (and other POS). Confirmations sent. Staff stays focused.',
    Icon: ChefHat,
  },
]
