import type { ReactNode } from 'react'

/**
 * Pill-shaped label that sits above section headings. Uppercase
 * tracking. Dark glass surface with violet inner text.
 */
export function SectionLabel({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <span className="section-pill">
      {icon && <span aria-hidden className="-ml-0.5 text-violet-300">{icon}</span>}
      <span className="text-violet-200">{children}</span>
    </span>
  )
}
