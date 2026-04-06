import { DISCIPLINES } from '../constants/disciplines.js';

const CSS = `
  .dna-reveal { min-height:100vh; padding:112px 40px 80px; max-width:900px; margin:0 auto; }
  .dna-header  { text-align:center; margin-bottom:72px; }
  .dna-big-title {
    font-family:var(--font-display);
    font-size:clamp(36px,6vw,64px); font-weight:900;
    color:var(--white); margin-bottom:12px; line-height:1.0;
  }
  .dna-big-title .g { color:var(--gold); }
  .dna-sub { font-size:18px; font-style:italic; color:var(--text-dim); font-weight:300; }

  .dna-card {
    border:1px solid var(--border); background:var(--surface);
    padding:40px; margin-bottom:16px;
    position:relative; overflow:hidden;
  }
  .dna-card::before {
    content:''; position:absolute; top:0; left:0;
    width:3px; height:100%;
    background:linear-gradient(180deg,var(--gold),transparent);
  }
  .dna-card-label {
    font-family:var(--font-mono); font-size:9px; letter-spacing:0.4em;
    color:var(--gold); text-transform:uppercase; margin-bottom:20px;
  }
  .dna-primary { display:flex; align-items:flex-start; gap:28px; }
  .dna-primary-icon { font-size:52px; line-height:1; flex-shrink:0; }
  .dna-primary-name {
    font-family:var(--font-display); font-size:30px; font-weight:900;
    margin-bottom:4px;
  }
  .dna-primary-tagline { font-size:15px; font-style:italic; color:var(--text-dim); font-weight:300; }
  .dna-primary-science {
    margin-top:12px; font-family:var(--font-mono); font-size:10px;
    color:var(--text-mute); letter-spacing:0.04em; line-height:1.6;
    padding:12px 16px; border:1px solid var(--border); border-radius:2px;
    background:var(--surface2);
  }
  .dna-satellites { display:flex; gap:12px; flex-wrap:wrap; }
  .dna-satellite {
    display:flex; align-items:center; gap:10px;
    padding:14px 20px; border:1px solid var(--border); border-radius:2px;
    background:var(--surface2);
  }
  .dna-satellite-role {
    font-family:var(--font-mono); font-size:9px; letter-spacing:0.15em;
    color:var(--text-mute); text-transform:uppercase;
  }

  .pillars-grid { display:flex; flex-direction:column; gap:16px; }
  .pillar-row { display:flex; align-items:center; gap:16px; }
  .pillar-name {
    font-family:var(--font-mono); font-size:10px; letter-spacing:0.1em;
    color:var(--text-dim); text-transform:uppercase; min-width:130px;
  }
  .pillar-track { flex:1; background:var(--border-bright); height:3px; border-radius:2px; overflow:hidden; }
  .pillar-fill   { height:100%; border-radius:2px; transition:width 1.4s cubic-bezier(0.16,1,0.3,1); }
  .pillar-score  {
    font-family:var(--font-display); font-size:16px; font-weight:700;
    color:var(--white); min-width:24px; text-align:right;
  }

  .dna-two-col { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px; }
  .info-block { padding:24px 28px; background:var(--surface); border:1px solid var(--border); }
  .info-block-label {
    font-family:var(--font-mono); font-size:9px; letter-spacing:0.35em;
    color:var(--gold); text-transform:uppercase; margin-bottom:10px;
  }
  .info-block-val {
    font-family:var(--font-display); font-size:15px; font-weight:700;
    color:var(--white); margin-bottom:6px;
  }
  .info-block-desc { font-size:13px; color:var(--text-dim); font-style:italic; font-weight:300; line-height:1.5; }

  .bio-law-card {
    padding:32px 36px;
    background:var(--gold-glow); border:1px solid rgba(200,169,110,0.2);
    margin-bottom:16px;
  }
  .bio-law-name {
    font-family:var(--font-display); font-size:22px; font-weight:900;
    color:var(--gold); margin-bottom:12px;
  }
  .bio-law-text { font-size:16px; font-style:italic; color:var(--text-dim); line-height:1.7; font-weight:300; }

  .microcycle-days { display:flex; gap:4px; flex-wrap:wrap; margin-top:12px; }
  .microcycle-day {
    padding:6px 14px; border:1px solid var(--border);
    font-family:var(--font-mono); font-size:9px; letter-spacing:0.1em;
    color:var(--text-dim); text-transform:uppercase;
  }
  .microcycle-day.high { border-color:var(--gold); color:var(--gold); background:var(--gold-glow); }

  @media (max-width:640px) {
    .dna-reveal { padding:88px 20px 60px; }
    .dna-two-col { grid-template-columns:1fr; }
    .dna-primary { flex-direction:column; }
  }
`;

const PILLAR_COLORS = ['#4ade80','#f97316','#c8a96e','#a78bfa','#38bdf8'];

export default function DNAReveal({ dna, onContinue }) {
  if (!dna) return null;
  const primary = DISCIPLINES[dna.primary];

  return (
    <>
      <style>{CSS}</style>
      <div className="dna-reveal">

        {/* Header */}
        <div className="dna-header fade-up">
          <div className="mono-label" style={{ display:'flex', justifyContent:'center', marginBottom:16 }}>Training DNA</div>
          <h1 className="dna-big-title">
            Your program<br />has been <span className="g">forged.</span>
          </h1>
          <p className="dna-sub" style={{ marginTop:12 }}>
            Built from your biology. Calibrated to your life. Backed by universal law.
          </p>
        </div>

        {/* Primary Discipline */}
        <div className="dna-card fade-up-d1">
          <div className="dna-card-label">Primary Discipline</div>
          <div className="dna-primary">
            <span className="dna-primary-icon" style={{ color: primary.color }}>{primary.icon}</span>
            <div style={{ flex:1 }}>
              <div className="dna-primary-name" style={{ color: primary.color }}>{primary.name}</div>
              <div className="dna-primary-tagline">{primary.tagline}</div>
              <div style={{ marginTop:12 }}>
                <span className="level-badge" style={{ borderColor: dna.level.color, color: dna.level.color, background: `${dna.level.color}12` }}>
                  {dna.level.label}
                </span>
              </div>
              <div className="dna-primary-science">{primary.scienceBrief}</div>
            </div>
          </div>
        </div>

        {/* Satellite Disciplines */}
        <div className="dna-card fade-up-d2">
          <div className="dna-card-label">Satellite Disciplines</div>
          <div className="dna-satellites">
            {dna.satellites.map(sid => {
              const d = DISCIPLINES[sid];
              return (
                <div key={sid} className="dna-satellite" style={{ borderColor:`${d.color}30` }}>
                  <span style={{ fontSize:20, color:d.color }}>{d.icon}</span>
                  <div>
                    <div style={{ fontFamily:'var(--font-display)', fontSize:14, fontWeight:600, color:'var(--white)' }}>{d.name}</div>
                    <div className="dna-satellite-role">{d.satelliteRole.split('.')[0]}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop:20, padding:'16px 20px', background:'var(--surface2)', border:'1px solid var(--border)', fontSize:14, color:'var(--text-dim)', fontStyle:'italic', lineHeight:1.6 }}>
            {primary.satelliteRole}
          </div>
        </div>

        {/* Physical Metrics */}
        <div className="fade-up-d2">
          <div className="metrics-row">
            {[
              [dna.pushups || '—', 'Push-up Max'],
              [dna.pullups || '—', 'Pull-up Max'],
              [dna.deadhang ? `${dna.deadhang}s` : '—', 'Dead Hang'],
            ].map(([v, l]) => (
              <div key={l} className="metric-cell">
                <span className="metric-value">{v}</span>
                <span className="metric-label">{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Five Pillars */}
        <div className="dna-card fade-up-d3">
          <div className="dna-card-label">Five Pillars Assessment — Football Entangled Framework</div>
          <div className="pillars-grid">
            {dna.pillars.map((p, i) => (
              <div key={p.pillar}>
                <div className="pillar-row">
                  <div className="pillar-name">{p.pillar}</div>
                  <div className="pillar-track">
                    <div className="pillar-fill" style={{ width:`${p.score * 10}%`, background:PILLAR_COLORS[i] }} />
                  </div>
                  <div className="pillar-score">{p.score}</div>
                </div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'var(--text-mute)', letterSpacing:'0.04em', marginLeft:146, marginTop:3 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Microcycle + Communication Style */}
        <div className="dna-two-col fade-up-d3">
          <div className="info-block">
            <div className="info-block-label">Weekly Structure</div>
            <div className="info-block-val">{dna.microcycle.days}-Day High/Low System</div>
            <div className="info-block-desc">{dna.microcycle.template?.description}</div>
            <div className="microcycle-days">
              {(dna.microcycle.template?.days || []).map((d, i) => (
                <div key={i} className={`microcycle-day${d.includes('High') ? ' high' : ''}`}>{d}</div>
              ))}
            </div>
          </div>
          <div className="info-block">
            <div className="info-block-label">Communication Style</div>
            <div className="info-block-val">{dna.communicationStyle?.style}</div>
            <div className="info-block-desc">{dna.communicationStyle?.tone}</div>
          </div>
        </div>

        {/* Fascia Phase */}
        <div className="dna-two-col fade-up-d4">
          <div className="info-block">
            <div className="info-block-label">HFT Entry Point — Chong Xie Protocol</div>
            <div className="info-block-val">Phase {dna.fasciaPhase?.phase} — {dna.fasciaPhase?.name}</div>
            <div className="info-block-desc">{dna.fasciaPhase?.desc}</div>
          </div>
          <div className="info-block">
            <div className="info-block-label">Height & Posture Protocol</div>
            <div className="info-block-val">{dna.heightProtocol?.mode}</div>
            <div className="info-block-desc">{dna.heightProtocol?.desc}</div>
          </div>
        </div>

        {/* Nutrition */}
        <div className="dna-card fade-up-d4">
          <div className="dna-card-label">Nutrition Protocol</div>
          <div style={{ display:'flex', gap:20, alignItems:'flex-start' }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:700, color:'var(--gold)', minWidth:180 }}>
              {dna.nutritionProtocol?.protocol}
            </div>
            <div style={{ fontSize:15, color:'var(--text-dim)', fontStyle:'italic', lineHeight:1.6 }}>
              {dna.nutritionProtocol?.detail}
            </div>
          </div>
        </div>

        {/* Biological Law */}
        <div className="bio-law-card fade-up-d5">
          <div className="dna-card-label">Your Governing Biological Law</div>
          <div className="bio-law-name">{dna.biologicalLaw?.law}</div>
          <div className="bio-law-text">{dna.biologicalLaw?.detail}</div>
        </div>

        {/* Weekly Load Note */}
        <div className="fade-up-d5" style={{ padding:'20px 24px', border:'1px solid var(--border)', background:'var(--surface)', marginBottom:16, display:'flex', gap:16, alignItems:'flex-start' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.3em', color:'var(--gold)', textTransform:'uppercase', minWidth:80, paddingTop:2 }}>
            Load Setting
          </div>
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:15, fontWeight:700, color:'var(--white)', marginBottom:4 }}>{dna.weeklyLoad?.load}</div>
            <div style={{ fontSize:14, color:'var(--text-dim)', fontStyle:'italic' }}>{dna.weeklyLoad?.note}</div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign:'center', marginTop:56 }} className="fade-up-d6">
          <div className="mono-label" style={{ marginBottom:20, display:'block' }}>
            The SAID Principle does not guarantee identical outcomes. It guarantees directional ones.
          </div>
          <button className="btn-primary" onClick={onContinue}>Enter Your Program →</button>
        </div>
      </div>
    </>
  );
}
