import { Calendar, Users, Clock } from 'lucide-react'
import { Container } from '../ui/Container'

/**
 * BentoShowcase — a five-card bento grid that tells the RezFlo story:
 *   1 (white, large)  Phone orders → POS, with a call→RezFlo→POS diagram
 *   2 (dark, tall)    Handles multiple calls at once (staff photo)
 *   3 (purple)        Knows your menu — mini chat exchange
 *   4 (white, wide)   Connects with leading POS systems (device shot)
 *   5 (lavender)      Books reservations 24/7 (confirmation card)
 *
 * Built as real responsive components. On desktop it lays out as the
 * 12-column bento; below 1024px every card stacks to a single column.
 */
export function BentoShowcase() {
  return (
    <section id="bento" className="bento relative overflow-hidden py-24 md:py-28">
      <style>{styles}</style>
      {/* faint graph-paper grid, matches the reference */}
      <div aria-hidden className="bento-grid-tex" />

      <Container className="relative">
        <div className="bento-grid">
          {/* ── Card 1 ───────────────────────────────── */}
          <article className="bento-card card-white c1">
            <p className="lead">
              RezFlo takes phone orders and sends them straight to your POS—{' '}
              <span className="pp">so your staff can stay focused on guests.</span>
            </p>

            <div className="c1-diagram">
              <img
                src="/images/bento-diagram.png"
                alt="A phone call flowing through RezFlo into Square, Toast and Clover POS systems"
                loading="lazy"
                decoding="async"
              />
            </div>
          </article>

          {/* ── Card 2 ───────────────────────────────── */}
          <article className="bento-card card-dark c2">
            <img
              className="c2-photo"
              src="/images/bento-calls.png"
              alt="Restaurant staff greeting guests"
              loading="lazy"
              decoding="async"
            />
            <div className="c2-fade" aria-hidden />
            <p className="c2-text">
              RezFlo handles multiple calls at once—so no customer is left waiting.
            </p>
          </article>

          {/* ── Card 3 ───────────────────────────────── */}
          <article className="bento-card card-purple c3">
            <p className="c3-head">
              RezFlo knows your menu and answers every question{' '}
              <span className="dim">instantly.</span>
            </p>
            <div className="c3-chat" aria-hidden>
              <span className="q">What time do you close?</span>
              <span className="a">
                We close at 8 PM.
                <img src="/logos/rezflo-logo.png" alt="" className="a-mark" />
              </span>
            </div>
          </article>

          {/* ── Card 4 ───────────────────────────────── */}
          <article className="bento-card card-white c4">
            <p className="lead c4-lead">
              RezFlo connects with leading POS systems to streamline phone orders{' '}
              <span className="pp">from call to kitchen.</span>
            </p>
            <div className="c4-media">
              <img
                src="/images/bento-pos.png"
                alt="RezFlo running on a restaurant POS device"
                loading="lazy"
                decoding="async"
              />
            </div>
          </article>

          {/* ── Card 5 ───────────────────────────────── */}
          <article className="bento-card card-lav c5">
            <div className="resv" aria-hidden>
              <span className="resv-stack" />
              <div className="resv-card">
                <span className="resv-ic">
                  <Calendar className="h-6 w-6" />
                </span>
                <div className="resv-body">
                  <div className="resv-title">Confirmed</div>
                  <div className="resv-row">
                    <Users className="h-3.5 w-3.5" /> Table for 4
                  </div>
                  <div className="resv-row">
                    <Clock className="h-3.5 w-3.5" /> 7:30 PM
                  </div>
                </div>
              </div>
            </div>
            <p className="lead c5-lead">
              RezFlo books reservations 24/7—{' '}
              <span className="pp">reducing wait times and keeping every table organized.</span>
            </p>
          </article>
        </div>
      </Container>
    </section>
  )
}

const styles = `
.bento { background: #F8F7FC; }
.bento-grid-tex {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(32,27,51,0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(32,27,51,0.045) 1px, transparent 1px);
  background-size: 46px 46px;
  mask-image: radial-gradient(120% 90% at 50% 40%, #000 55%, transparent 100%);
  -webkit-mask-image: radial-gradient(120% 90% at 50% 40%, #000 55%, transparent 100%);
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 18px;
}
.bento-card {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  min-width: 0;
}
.card-white { background:#fff; border:1px solid rgba(32,27,51,0.06);
  box-shadow: 0 20px 44px -30px rgba(32,27,51,0.28), 0 4px 14px -10px rgba(32,27,51,0.10); }
.card-dark  { background:#1B1533; }
.card-purple{ background: linear-gradient(157deg,#5B41DA 0%, #4A34BE 100%); }
.card-lav   { background:#EBE7FA; border:1px solid rgba(169,147,255,0.35); }

/* placement */
.c1 { grid-column: 1 / 7;  grid-row: 1; }
.c2 { grid-column: 7 / 10; grid-row: 1; }
.c3 { grid-column: 10 / 13;grid-row: 1; }
.c4 { grid-column: 1 / 7;  grid-row: 2; }
.c5 { grid-column: 7 / 13; grid-row: 2; }

/* shared typography */
.lead {
  font-family: var(--font-display, "Plus Jakarta Sans", system-ui, sans-serif);
  font-weight: 800; letter-spacing: -0.022em; color:#0F1020;
  font-size: clamp(1.3rem, 1.6vw, 1.62rem); line-height: 1.16;
}
.pp { color:#5B41DA; }

/* ── Card 1 ─────────────────────────── */
.c1 { display:flex; flex-direction:column; padding: 34px 34px 30px; min-height: 470px; }
.c1-diagram { margin-top:auto; padding-top: 22px; display:flex; align-items:center; justify-content:center; }
.c1-diagram img { width:100%; max-width:560px; height:auto; object-fit:contain; }

/* ── Card 2 ─────────────────────────── */
.c2 { min-height: 470px; }
.c2-photo { position:absolute; inset:0 0 auto 0; width:100%; height:60%; object-fit:cover; object-position: center 30%; }
.c2-fade { position:absolute; inset:0; background:
  linear-gradient(180deg, rgba(27,21,51,0) 34%, rgba(27,21,51,0.75) 52%, #1B1533 66%); }
.c2-text {
  position:absolute; left:0; right:0; bottom:0; padding: 26px 26px 28px;
  font-family: var(--font-display, "Plus Jakarta Sans", sans-serif);
  font-weight: 800; letter-spacing:-0.022em; color:#fff;
  font-size: clamp(1.15rem, 1.4vw, 1.44rem); line-height:1.16;
}

/* ── Card 3 ─────────────────────────── */
.c3 { display:flex; flex-direction:column; justify-content:space-between; padding: 30px 28px; min-height:470px; }
.c3-head {
  font-family: var(--font-display, "Plus Jakarta Sans", sans-serif);
  font-weight: 800; letter-spacing:-0.022em; color:#fff;
  font-size: clamp(1.2rem, 1.5vw, 1.5rem); line-height:1.16;
}
.c3-head .dim { color: rgba(255,255,255,0.5); }
.c3-chat { display:flex; flex-direction:column; gap:14px; align-items:flex-start; }
.c3 .q {
  align-self:flex-start; background: rgba(255,255,255,0.16); color:#fff;
  padding: 11px 17px; border-radius: 16px; font-weight:600; font-size:0.92rem;
  white-space: nowrap; backdrop-filter: blur(4px);
}
.c3 .a {
  align-self:flex-start; display:inline-flex; align-items:center; gap:10px;
  background:#fff; color:#4A34BE; font-weight:800;
  padding: 12px 16px; border-radius: 16px; font-size:1rem;
  box-shadow: 0 14px 30px -14px rgba(0,0,0,0.35);
}
.c3 .a-mark { width:22px; height:22px; object-fit:contain; }

/* ── Card 4 ─────────────────────────── */
.c4 { display:flex; align-items:center; gap:20px; padding: 34px; min-height: 360px; }
.c4-lead { flex: 1 1 42%; }
.c4-media { flex: 1 1 58%; display:flex; align-items:center; justify-content:center; }
.c4-media img { width:100%; max-width:420px; height:auto; object-fit:contain;
  filter: drop-shadow(0 26px 40px rgba(32,27,51,0.28)); }

/* ── Card 5 ─────────────────────────── */
.c5 { display:flex; flex-direction:column; justify-content:space-between; gap:22px; padding: 30px 30px 32px; min-height: 360px; }
.resv { position:relative; padding-top:6px; }
.resv-stack { position:absolute; left:14px; right:14px; top:16px; height:74px; border-radius:18px;
  background:#fff; opacity:0.55; box-shadow: 0 10px 24px -16px rgba(32,27,51,0.3); }
.resv-card {
  position:relative; display:flex; align-items:center; gap:16px;
  background:#fff; border-radius:18px; padding: 18px 20px;
  box-shadow: 0 20px 40px -22px rgba(32,27,51,0.3), 0 0 0 1px rgba(32,27,51,0.04);
}
.resv-ic { flex:none; width:52px; height:52px; border-radius:14px; background:#5B41DA; color:#fff;
  display:flex; align-items:center; justify-content:center; }
.resv-title { font-family: var(--font-display, sans-serif); font-weight:800; color:#201B33; font-size:1.05rem; }
.resv-row { display:flex; align-items:center; gap:7px; color:#4b465e; font-size:0.9rem; margin-top:4px; font-weight:500; }
.resv-row svg { color:#8a83a3; }

/* ── Responsive ───────────────────────
   Below 1024px every card becomes full width and stacks in order. */
@media (max-width: 1023px) {
  .bento-grid { grid-template-columns: 1fr; }
  .c1,.c2,.c3,.c4,.c5 { grid-column: 1 / -1; grid-row: auto; }
  .c1,.c2,.c3 { min-height: 420px; }
  .c4 { min-height: 0; }
}
@media (max-width: 560px) {
  .c4 { flex-direction: column; align-items: stretch; text-align: left; }
  .c4-media img { max-width: 300px; margin: 6px auto 0; }
  .c1,.c2,.c3 { min-height: 380px; }
  .bento-card { border-radius: 20px; }
  .c1 { padding: 26px; }
}
`
