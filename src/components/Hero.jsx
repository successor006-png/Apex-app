const HERO_CSS = `
  .hero {
    min-height: 100vh;
    display: flex; flex-direction:column;
    align-items: center; justify-content:center;
    text-align: center;
    padding: 120px 40px 80px;
    position: relative; overflow:hidden;
  }
  .hero-bg {
    position: absolute; inset:0;
    background:
      radial-gradient(ellipse 70% 50% at 50% 40%, rgba(200,169,110,0.04) 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 20% 80%, rgba(74,222,128,0.02) 0%, transparent 60%),
      radial-gradient(ellipse 40% 60% at 80% 20%, rgba(167,139,250,0.02) 0%, transparent 60%);
    pointer-events: none;
  }
  .hero-eyebrow {
    font-family: var(--font-mono);
    font-size: 10px; letter-spacing:0.45em;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 40px;
    display: flex; align-items:center; gap:16px;
    animation: fadeUp 0.8s ease forwards 0.2s; opacity:0;
  }
  .hero-eyebrow::before, .hero-eyebrow::after {
    content:''; width:40px; height:1px; background:var(--gold-dim);
  }
  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(56px,9vw,108px);
    font-weight: 900;
    line-height: 0.92;
    letter-spacing: -0.02em;
    color: var(--white);
    margin-bottom: 10px;
    animation: fadeUp 0.8s ease forwards 0.35s; opacity:0;
  }
  .hero-title .g { color:var(--gold); }
  .hero-title-sub {
    font-family: var(--font-display);
    font-size: clamp(13px,1.8vw,17px);
    font-weight: 400;
    letter-spacing: 0.45em;
    color: var(--text-mute);
    text-transform: uppercase;
    margin-bottom: 44px;
    animation: fadeUp 0.8s ease forwards 0.45s; opacity:0;
  }
  .hero-desc {
    font-size: 19px; font-weight:300; font-style:italic;
    color: var(--text-dim);
    max-width: 520px;
    margin: 0 auto 60px;
    line-height: 1.65;
    animation: fadeUp 0.8s ease forwards 0.55s; opacity:0;
  }
  .hero-cta {
    display: flex; gap:16px; align-items:center;
    flex-wrap:wrap; justify-content:center;
    animation: fadeUp 0.8s ease forwards 0.65s; opacity:0;
  }
  .hero-stats {
    display: flex; gap:48px;
    margin-top: 88px;
    padding-top: 48px;
    border-top: 1px solid var(--border);
    animation: fadeUp 0.8s ease forwards 1.0s; opacity:0;
  }
  .hero-stat { text-align:center; }
  .hero-stat-num {
    font-family:var(--font-display); font-size:30px; font-weight:700;
    color:var(--white); display:block;
  }
  .hero-stat-label {
    font-family:var(--font-mono); font-size:9px; letter-spacing:0.2em;
    color:var(--text-mute); text-transform:uppercase;
  }
  .hero-laws {
    display: flex; gap:4px;
    margin-top: 48px;
    animation: fadeUp 0.8s ease forwards 1.1s; opacity:0;
  }
  .hero-law {
    padding: 8px 16px;
    border: 1px solid var(--border);
    font-family: var(--font-mono);
    font-size: 9px; letter-spacing:0.12em;
    color: var(--text-mute);
    text-transform: uppercase;
  }

  @media (max-width:640px) {
    .hero { padding: 100px 20px 60px; }
    .hero-stats { gap:24px; }
    .hero-laws { flex-wrap:wrap; justify-content:center; }
  }
`;

export default function Hero({ onStart }) {
  return (
    <>
      <style>{HERO_CSS}</style>
      <section className="hero">
        <div className="hero-bg" />

        <div className="hero-eyebrow">Elite Training System</div>

        <h1 className="hero-title">
          APEX<br /><span className="g">Elite</span>
        </h1>
        <div className="hero-title-sub">Five Disciplines. One System. Your Body.</div>

        <p className="hero-desc">
          Not a workout library. Not a tracker. A scientific coaching system that adapts
          to your biology, your life, and your evolution.
        </p>

        <div className="hero-cta">
          <button className="btn-primary" onClick={onStart}>Build Your Training DNA →</button>
          <button className="btn-ghost" onClick={() => document.getElementById('disciplines-section')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Disciplines
          </button>
        </div>

        <div className="hero-laws">
          {['SAID Principle', "Wolff's Law", "Davis's Law", 'HFT Protocol', '5 Pillars'].map(l => (
            <div key={l} className="hero-law">{l}</div>
          ))}
        </div>

        <div className="hero-stats">
          {[
            ['5', 'Disciplines'],
            ['15', 'Levels Each'],
            ['6', 'Assessment Layers'],
            ['∞', 'Adaptation'],
          ].map(([n, l]) => (
            <div key={l} className="hero-stat">
              <span className="hero-stat-num">{n}</span>
              <span className="hero-stat-label">{l}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
