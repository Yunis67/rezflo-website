import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Standard shadcn-style classname merger. Combines clsx (conditional
 * class composition) with tailwind-merge (deduplicates conflicting
 * Tailwind utilities so the last write wins).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
