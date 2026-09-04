import { Calendar, Users, Clock, ArrowRight } from 'lucide-react'
import { Container } from '../ui/Container'
import { site } from '../../data/site'

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
      {/* Warm-white ground with a soft violet glow (no grid). */}
      <div aria-hidden className="bento-glow" />

      <Container className="relative">
        {/* Two-column title header — big title left, blurb + CTA right */}
        <div className="bento-head">
          <h2 className="bento-title">
            <span className="muted">The AI phone answering platform</span>{' '}
            for all of your restaurant&rsquo;s needs
          </h2>
          <div className="bento-head-right">
            <p className="bento-sub">
              RezFlo is 24/7 voice AI phone answering for restaurants. It takes
              orders and reservations, answers FAQs, and syncs tickets and
              payments to your POS &amp; booking systems. Built for single,
              multi-unit, and enterprise brands.
            </p>
            <a className="bento-cta" href={site.cta.bookDemo}>
              Get your demo now
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>

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

/* Warm-white ground + soft violet glow (slightly more purple, no grid) */
.bento-glow {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(70% 55% at 50% 24%, rgba(91,65,218,0.18) 0%, rgba(139,112,246,0.12) 32%, rgba(248,247,252,0) 70%),
    radial-gradient(60% 60% at 88% 78%, rgba(169,147,255,0.16) 0%, rgba(248,247,252,0) 60%);
}

/* Two-column title header — big title left, blurb + CTA right */
.bento-head {
  position: relative;
  display: grid; grid-template-columns: 1.12fr 0.88fr; gap: 44px;
  align-items: start; margin-bottom: 44px;
}
.bento-title {
  font-family: var(--font-display, "Plus Jakarta Sans", sans-serif);
  font-weight: 500; letter-spacing:-0.018em; color:#201B33;
  font-size: clamp(2rem, 3.9vw, 3.4rem); line-height: 1.08;
}
.bento-title .muted { color:#A19BB8; }
.bento-head-right { padding-top: 6px; }
.bento-sub {
  color:#4b465e; font-size: clamp(1rem, 1.05vw, 1.1rem); line-height: 1.55;
}
.bento-cta {
  display:inline-flex; align-items:center; gap:8px; margin-top: 22px;
  background: linear-gradient(180deg,#6E52E8 0%, #5B41DA 100%); color:#fff;
  font-weight: 700; font-size: 0.95rem; padding: 13px 26px; border-radius: 999px;
  text-decoration:none;
  box-shadow: 0 16px 34px -12px rgba(91,65,218,0.6), inset 0 1px 0 rgba(255,255,255,0.28);
  transition: transform .25s ease;
}
.bento-cta:hover { transform: translateY(-2px); }

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
.c1 { display:flex; flex-direction:column; padding: 26px 28px 22px; min-height: 330px; }
.c1 .lead { font-size: clamp(1.02rem, 1.2vw, 1.24rem); }
.c1-diagram { margin-top:auto; padding-top: 14px; display:flex; align-items:center; justify-content:center; }
.c1-diagram img { width:100%; max-width:400px; height:auto; object-fit:contain; }

/* ── Card 2 — full-bleed darkened photo background ─────── */
.c2 { min-height: 330px; }
.c2-photo { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position: 32% center;
  filter: brightness(0.72) saturate(0.95) contrast(1.02); opacity: 0.94; }
.c2-fade { position:absolute; inset:0; background:
  linear-gradient(180deg, rgba(20,15,40,0.28) 0%, rgba(20,15,40,0.35) 42%, rgba(18,12,36,0.78) 74%, rgba(15,10,32,0.94) 100%); }
.c2-text {
  position:absolute; left:0; right:0; bottom:0; padding: 26px 26px 28px;
  font-family: var(--font-display, "Plus Jakarta Sans", sans-serif);
  font-weight: 800; letter-spacing:-0.022em; color:#fff;
  font-size: clamp(1.0rem, 1.2vw, 1.24rem); line-height:1.16;
  text-shadow: 0 2px 18px rgba(0,0,0,0.5);
}

/* ── Card 3 ─────────────────────────── */
.c3 { display:flex; flex-direction:column; justify-content:space-between; padding: 24px 24px; min-height:330px; }
.c3-head {
  font-family: var(--font-display, "Plus Jakarta Sans", sans-serif);
  font-weight: 800; letter-spacing:-0.022em; color:#fff;
  font-size: clamp(1.05rem, 1.28vw, 1.3rem); line-height:1.16;
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
  .bento-head { grid-template-columns: 1fr; gap: 18px; margin-bottom: 34px; }
  .bento-grid { grid-template-columns: 1fr; }
  .c1,.c2,.c3,.c4,.c5 { grid-column: 1 / -1; grid-row: auto; }
  .c1,.c2,.c3 { min-height: 300px; }
  .c4 { min-height: 0; }
}
@media (max-width: 560px) {
  .c4 { flex-direction: column; align-items: stretch; text-align: left; }
  .c4-media img { max-width: 300px; margin: 6px auto 0; }
  .c1,.c2,.c3 { min-height: 300px; }
  .bento-card { border-radius: 20px; }
  .c1 { padding: 26px; }
}
`
