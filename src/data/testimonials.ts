export interface Testimonial {
  quote: string
  name: string
  role: string
  caseStudyTitle?: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'During busy café rushes, calls used to pull our team away from guests. RezFlo helps answer questions quickly so staff can stay focused.',
    name: 'Bassam Ahmed',
    role: 'Qamaria Café Edmonton',
  },
  {
    quote:
      'Customers now get answers about hours, seating, and menu items without waiting for someone at the counter to pick up.',
    name: 'Bassam Ahmed',
    role: 'Qamaria Café Edmonton',
  },
  {
    quote:
      'Our Arabic-speaking customers get a much smoother experience, especially when asking about the menu, group seating, or store details.',
    name: 'Salem',
    role: 'Qamaria Café Mississauga',
  },
  {
    quote:
      'RezFlo helps us capture inquiries that would normally get missed during peak hours or after closing.',
    name: 'Salem',
    role: 'Qamaria Café Mississauga',
  },
  {
    quote:
      'The system handles repeated questions about parking, upstairs seating, and café hours without slowing down the team.',
    name: 'Ali',
    role: 'Qamaria Café Mississauga',
  },
  {
    quote:
      'Our staff can focus more on the guest experience while calls are still being handled professionally in the background.',
    name: 'Ali',
    role: 'Qamaria Café Mississauga',
  },
]
