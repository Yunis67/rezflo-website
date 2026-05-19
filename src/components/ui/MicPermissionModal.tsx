import { useEffect } from 'react'
import { useMicState, setMicState, requestMicPermission } from '../../lib/micPermission'

/**
 * RezFlo-branded microphone permission card. Shown when the user taps
 * "Talk to Flo" — BEFORE any ElevenLabs code touches the mic. This is
 * the Alven.ai-style flow: the agent is never initialised on page
 * load, only after a real click + an explicit permission grant.
 *
 * States it renders for:
 *  - "asking": the Allow / Not Now card
 *  - "denied": a clean fallback message (no broken widget error)
 * It renders nothing for "idle" / "granted".
 */
export function MicPermissionModal() {
  const state = useMicState()
  const visible = state === 'asking' || state === 'denied'

  useEffect(() => {
    if (!visible) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMicState('idle')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible])

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Microphone Access"
      className="fixed inset-0 z-[120] flex items-center justify-center p-5"
      style={{ background: 'rgba(8,4,20,0.66)', backdropFilter: 'blur(6px)' }}
      onClick={() => setMicState('idle')}
    >
      <div
        className="w-full max-w-sm rounded-3xl bg-white p-7 text-center"
        style={{
          boxShadow:
            '0 40px 90px -30px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.04)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{ background: 'rgba(124,58,237,0.12)' }}
          aria-hidden
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden>
            <path
              d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Z"
              fill="#7c3aed"
            />
            <path
              d="M6.5 11a5.5 5.5 0 0 0 11 0M12 16.5V20m-3 0h6"
              stroke="#7c3aed"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h3 className="mt-5 text-[1.25rem] font-semibold tracking-tight text-neutral-900">
          Microphone Access
        </h3>

        {state === 'asking' ? (
          <>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-neutral-500">
              To talk with Flo, please allow microphone access. This lets you
              have a live voice conversation with our AI host.
            </p>
            <div className="mt-7 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  // Called synchronously inside the click so iOS
                  // counts it as a user gesture.
                  void requestMicPermission()
                }}
                className="w-full rounded-full bg-gradient-to-b from-violet-500 to-violet-700 px-6 py-3.5 text-[0.95rem] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                style={{ boxShadow: '0 14px 30px -10px rgba(124,58,237,0.6)' }}
              >
                Allow Microphone
              </button>
              <button
                type="button"
                onClick={() => setMicState('idle')}
                className="w-full rounded-full px-6 py-3 text-[0.9rem] font-medium text-neutral-500 transition-colors hover:text-neutral-800"
              >
                Not Now
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-neutral-500">
              Microphone access was blocked. Please allow microphone access or
              open this page in Safari/Chrome.
            </p>
            <button
              type="button"
              onClick={() => setMicState('idle')}
              className="mt-7 w-full rounded-full bg-neutral-900 px-6 py-3.5 text-[0.95rem] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  )
}
