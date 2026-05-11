import { useEffect, useState } from 'react'

/**
 * Tiny pub/sub for "the Anthony voice agent is active right now".
 *
 * The ElevenLabs ConvAI widget runs a real-time WebRTC audio session.
 * On mobile, that session has to share CPU/GPU/decoder time and
 * network bandwidth with anything else doing decode or animation —
 * the hero/scroll-expand/qamaria videos, the testimonials marquee,
 * and the desktop shader background. When those are running at the
 * same time as a live voice call the audio comes through choppy and
 * static-y.
 *
 * Components subscribe via useVoiceMode() and stop their heavy work
 * while the call is active. anthonyAgent.ts flips the flag on/off.
 */
const listeners = new Set<(active: boolean) => void>()
let active = false

export function setVoiceMode(value: boolean): void {
  if (active === value) return
  active = value
  if (typeof document !== 'undefined') {
    document.body.dataset.voiceActive = value ? 'true' : 'false'
  }
  for (const fn of listeners) fn(value)
}

export function isVoiceModeActive(): boolean {
  return active
}

export function subscribeVoiceMode(fn: (active: boolean) => void): () => void {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

export function useVoiceMode(): boolean {
  const [value, setValue] = useState(active)
  useEffect(() => {
    setValue(active)
    return subscribeVoiceMode(setValue)
  }, [])
  return value
}
