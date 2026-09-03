import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface CardItem {
  id: string
  title: string
  description: string
  imgSrc: string
  icon: ReactNode
  linkHref?: string
  /** Per-card object-position override. Default 'center'. Accepts the
   *  CSS object-position keywords (`left`, `right`, `center`) or any
   *  custom value like `'40% center'` for fine-grained nudges. */
  imgPosition?: string
}

interface ExpandingCardsProps {
  items: CardItem[]
  defaultActiveIndex?: number
  /** Height in px for desktop. Default 580. */
  desktopHeight?: number
  /** Height per inactive card on mobile. Default 88. */
  mobileCompactHeight?: number
  /** Height of the active card on mobile. Default 480. */
  mobileActiveHeight?: number
}

/**
 * Expanding image accordion — premium glassmorphism revision.
 *
 * Animation logic — UNCHANGED:
 *   - activeIndex state controls which card is wide
 *   - desktop: gridTemplateColumns 5fr (active) vs 1fr (inactive)
 *   - mobile:  gridTemplateRows 480px (active) vs 88px (inactive)
 *   - hover/focus/click activates a card
 *   - 700ms cubic-bezier transition on grid template
 *
 * Visual treatment (this revision):
 *   INACTIVE — frosted purple-glass column
 *     - heavy blur + darken on the image
 *     - violet glow border, soft inner highlight
 *     - ONLY a centered icon (no text)
 *
 *   ACTIVE — cinematic full reveal
 *     - sharp, saturated image
 *     - dark vertical gradient for legibility
 *     - icon top-left, title + description + LEARN MORE bottom
 *     - title in Plus Jakarta Sans, description in Open Sans
 */
export function ExpandingCards({
  items,
  defaultActiveIndex = 0,
  desktopHeight = 580,
  mobileCompactHeight = 88,
  mobileActiveHeight = 480,
}: ExpandingCardsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex)
  const [isDesktop, setIsDesktop] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const gridTemplateColumns = isDesktop
    ? items.map((_, i) => (i === activeIndex ? '5fr' : '1fr')).join(' ')
    : '1fr'

  const gridTemplateRows = isDesktop
    ? '1fr'
    : items
        .map((_, i) =>
          i === activeIndex ? `${mobileActiveHeight}px` : `${mobileCompactHeight}px`,
        )
        .join(' ')

  const containerHeight = isDesktop
    ? `${desktopHeight}px`
    : `${mobileActiveHeight + mobileCompactHeight * (items.length - 1)}px`

  return (
    <div
      ref={containerRef}
      role="list"
      // Shorter transition on mobile (300ms) to feel responsive on
      // tap; the desktop 700ms reads better when columns expand.
      className="grid w-full gap-3 transition-[grid-template-columns,grid-template-rows] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] md:duration-[700ms]"
      style={{ gridTemplateColumns, gridTemplateRows, height: containerHeight }}
    >
      {items.map((item, i) => (
        <ExpandingCard
          key={item.id}
          item={item}
          active={i === activeIndex}
          onActivate={() => setActiveIndex(i)}
        />
      ))}
    </div>
  )
}

interface ExpandingCardProps {
  item: CardItem
  active: boolean
  onActivate: () => void
}

function ExpandingCard({ item, active, onActivate }: ExpandingCardProps) {
  return (
    <button
      type="button"
      role="listitem"
      aria-pressed={active}
      aria-label={item.title}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      className={cn(
        'group relative isolate overflow-hidden rounded-3xl text-left transition-[border-color,box-shadow,transform] duration-500',
        'border',
        active
          ? 'border-[#A993FF]/55'
          : 'border-[#A993FF]/35 hover:border-[#A993FF]/55',
      )}
      style={{
        boxShadow: active
          ? '0 34px 70px -28px rgba(91,65,218,0.40), 0 10px 26px -14px rgba(32,27,51,0.18)'
          : '0 16px 34px -20px rgba(91,65,218,0.28), 0 8px 20px -14px rgba(32,27,51,0.12)',
      }}
    >
      {/* === Background image ============================================
           Active: sharp, brightness/contrast/saturation lifted.
           Inactive: heavy blur + darken so the image hints through
           the frosted glass without competing with content. */}
      <img
        src={item.imgSrc}
        alt=""
        aria-hidden
        draggable={false}
        decoding="async"
        loading="eager"
        // Mobile: only animate transform (cheap, GPU-composited).
        // CSS filter transitions are extremely expensive on mobile —
        // they were the cause of the buffering/stutter when tapping
        // a card to expand. Desktop keeps the full smooth transform
        // + filter cross-fade for the premium look.
        className={cn(
          'absolute inset-0 h-full w-full select-none object-cover transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] md:transition-[transform,filter] md:duration-[900ms]',
          active
            ? 'scale-100 md:brightness-105 md:contrast-[1.08] md:saturate-[1.18]'
            : 'scale-110 md:blur-[6px] md:saturate-[0.9]',
        )}
        style={{
          imageRendering: 'auto',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          objectPosition: item.imgPosition ?? 'center',
        }}
      />

      {/* === Dark / violet overlay ====================================== */}
      <div
        aria-hidden
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: active
            ? // Active: light at top, deep at bottom for text readability
              'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.55) 60%, rgba(7,5,26,0.95) 100%)'
            : // Inactive: light lavender frosted wash on the warm-white section
              'linear-gradient(180deg, rgba(169,147,255,0.30) 0%, rgba(248,247,252,0.74) 100%)',
        }}
      />

      {/* Inactive — extra frosted-glass layer with backdrop blur over
          the (already blurred) image. This is what gives the soft
          "frosted purple panel" feel. */}
      {!active && (
        <div
          aria-hidden
          className="absolute inset-0 backdrop-blur-md"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.60) 0%, rgba(233,228,255,0.58) 100%)',
          }}
        />
      )}

      {/* Active violet halo — soft glow at the bottom edge */}
      {active && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 100%, rgba(124,58,237,0.32), transparent 70%)',
          }}
        />
      )}

      {/* === INACTIVE — centered icon only ============================== */}
      {!active && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            aria-hidden
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#5B41DA] ring-1 ring-[#5B41DA]/20 backdrop-blur-md"
            style={{
              boxShadow:
                '0 10px 22px -10px rgba(91,65,218,0.45), inset 0 1px 0 rgba(255,255,255,0.6)',
            }}
          >
            {item.icon}
          </div>
        </div>
      )}

      {/* === ACTIVE — full content ====================================== */}
      {active && (
        <>
          {/* Icon — top-left */}
          <div
            aria-hidden
            className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.1] text-violet-100 ring-1 ring-violet-300/45 backdrop-blur-md md:left-6 md:top-6"
            style={{
              boxShadow:
                '0 8px 22px -8px rgba(124,58,237,0.55), inset 0 1px 0 rgba(255,255,255,0.18)',
            }}
          >
            {item.icon}
          </div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1], delay: 0.18 }}
            className="absolute inset-x-0 bottom-0 p-5 md:p-7 lg:p-8"
          >
            <h3
              className="font-stack-sans text-[1.45rem] font-semibold leading-tight tracking-tight text-white sm:text-[1.65rem] md:text-[1.85rem] lg:text-[2rem]"
              style={{ textShadow: '0 4px 24px rgba(0,0,0,0.6)' }}
            >
              {item.title}
            </h3>
            <p
              className="font-open-sans mt-3 max-w-lg text-[0.95rem] leading-relaxed text-white/88 md:text-[1rem]"
              style={{ textShadow: '0 2px 14px rgba(0,0,0,0.55)' }}
            >
              {item.description}
            </p>
            {item.linkHref && (
              <span
                role="link"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation()
                  window.open('https://cal.com/rez-flo-7vgkz1/15min', '_blank', 'noopener,noreferrer')
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    e.stopPropagation()
                    window.open('https://cal.com/rez-flo-7vgkz1/15min', '_blank', 'noopener,noreferrer')
                  }
                }}
                className="mt-5 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-violet-100 backdrop-blur-md transition-all duration-300 hover:border-violet-300/60 hover:bg-white/[0.12] hover:text-white md:text-[0.72rem]"
              >
                Learn more
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            )}
          </motion.div>
        </>
      )}
    </button>
  )
}
