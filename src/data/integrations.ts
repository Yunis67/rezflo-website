export type IntegrationStatus = 'live' | 'coming-soon'

export interface Integration {
  name: string
  category: 'POS' | 'Reservations' | 'Telephony'
  status: IntegrationStatus
  note?: string
}

export const integrations: Integration[] = [
  { name: 'Clover', category: 'POS', status: 'live', note: 'Native integration' },
  { name: 'Toast', category: 'POS', status: 'coming-soon' },
  { name: 'Square', category: 'POS', status: 'coming-soon' },
  { name: 'OpenTable', category: 'Reservations', status: 'live' },
  { name: 'Resy', category: 'Reservations', status: 'live' },
  { name: 'Twilio', category: 'Telephony', status: 'live', note: 'Powers the phone layer' },
]
