import { useEffect, useState } from 'react'

/**
 * Treat a viewport as "mobile" if it's a phone — in either portrait
 * OR landscape. The original (max-width: 767px) check missed phones
 * in landscape (e.g. iPhone 14 Pro Max is 932×430), causing the page
 * to switch to the desktop branch on rotation: WebGL shader
 * background + autoplay hero video + 180vh sticky scroll-expand
 * video all kicked in on phone hardware, which crashed/lagged the
 * page.
 *
 * Coverage:
 *   - Portrait phones: width <= 767px
 *   - Landscape phones: short height + landscape + coarse pointer
 *     (the pointer:coarse hint excludes laptops with short windows)
 */
const MOBILE_QUERY =
  '(max-width: 767px), (max-height: 500px) and (orientation: landscape) and (pointer: coarse)'

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(MOBILE_QUERY).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY)
    const onChange = () => setIsMobile(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isMobile
}

export function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduce(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return reduce
}
