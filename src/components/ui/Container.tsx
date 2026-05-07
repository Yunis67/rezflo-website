import type { HTMLAttributes, ReactNode } from 'react'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** Apply tighter max-width for prose-style sections. */
  narrow?: boolean
}

export function Container({ children, narrow, className = '', ...rest }: ContainerProps) {
  const max = narrow ? 'max-w-[58rem]' : 'max-w-[78rem]'
  return (
    <div className={`mx-auto w-full ${max} px-6 sm:px-8 lg:px-12 ${className}`} {...rest}>
      {children}
    </div>
  )
}
