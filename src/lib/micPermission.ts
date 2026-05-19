import { useEffect, useState } from 'react'

/**
 * Mic permission flow state for the Flo voice agent.
 *
 * idle    — page loaded, nothing happening. ElevenLabs widget NOT
 *           mounted yet.
 * asking  — user clicked "Talk to Flo"; the white permission card is
 *           on screen waiting for them to choose Allow / Not Now.
 * granted — user clicked Allow and getUserMedia() resolved
 *           successfully. The widget is allowed to mount.
 * denied  — getUserMedia() rejected in a real browser. The card
 *           shows a friendly fallback message.
 * needs-browser — we detected an in-app browser (Instagram, etc.)
 *           where the mic is blocked at the platform level. We never
 *           attempt getUserMedia; instead the card guides the user
 *           to open the page in Safari/Chrome.
 */
export type MicState =
  | 'idle'
  | 'asking'
  | 'granted'
  | 'denied'
  | 'needs-browser'

const listeners = new Set<(s: MicState) => void>()
let state: MicState = 'idle'

export function getMicState(): MicState {
  return state
}

export function setMicState(value: MicState): void {
  if (state === value) return
  state = value
  for (const fn of listeners) fn(value)
}

export function subscribeMicState(fn: (s: MicState) => void): () => void {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

export function useMicState(): MicState {
  const [value, setValue] = useState(state)
  useEffect(() => {
    setValue(state)
    return subscribeMicState(setValue)
  }, [])
  return value
}

/**
 * Request the microphone with a fresh user gesture. Stops the
 * temporary stream immediately after acquiring it (we only need the
 * permission grant, not the audio — the ElevenLabs widget will open
 * its own stream once mounted).
 *
 * Must be called synchronously inside a click handler so iOS Safari
 * counts it as a user gesture.
 */
export async function requestMicPermission(): Promise<boolean> {
  if (
    typeof navigator === 'undefined' ||
    !navigator.mediaDevices?.getUserMedia
  ) {
    setMicState('denied')
    return false
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    stream.getTracks().forEach(t => t.stop())
    setMicState('granted')
    return true
  } catch {
    setMicState('denied')
    return false
  }
}
