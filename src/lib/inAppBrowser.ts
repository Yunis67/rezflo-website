/**
 * Detect known mobile in-app browsers (embedded WKWebViews) where
 * getUserMedia is blocked or unreliable. We never even attempt the
 * mic in these — we route the user to a real browser instead, the
 * same way Alven.ai does.
 */
export type InAppBrowser =
  | 'instagram'
  | 'facebook'
  | 'tiktok'
  | 'snapchat'
  | 'twitter'
  | 'linkedin'
  | 'pinterest'
  | 'other-inapp'
  | null

export function detectInAppBrowser(): InAppBrowser {
  if (typeof navigator === 'undefined') return null
  const ua = navigator.userAgent || ''

  if (/Instagram/i.test(ua)) return 'instagram'
  if (/FBAN|FBAV|FB_IAB|FBIOS|FBDV/i.test(ua)) return 'facebook'
  if (/BytedanceWebview|musical_ly|TikTok|Trill/i.test(ua)) return 'tiktok'
  if (/Snapchat/i.test(ua)) return 'snapchat'
  if (/\bTwitter\b/i.test(ua)) return 'twitter'
  if (/LinkedInApp/i.test(ua)) return 'linkedin'
  if (/\bPinterest\b/i.test(ua)) return 'pinterest'

  return null
}

export function isInAppBrowser(): boolean {
  return detectInAppBrowser() !== null
}

/** Per-app instruction for getting to a real browser. */
export function inAppExitHint(b: InAppBrowser): string {
  switch (b) {
    case 'instagram':
    case 'facebook':
      return 'Tap the ••• menu in the top-right, then “Open in external browser”.'
    case 'tiktok':
      return 'Tap the ••• (or share) button, then “Open in browser”.'
    case 'snapchat':
      return 'Tap the ••• menu, then “Open in Safari / Chrome”.'
    case 'twitter':
    case 'linkedin':
    case 'pinterest':
      return 'Tap the ••• (or share) icon, then “Open in browser”.'
    default:
      return 'Open the menu in this app’s browser, then choose “Open in Safari / Chrome”.'
  }
}
