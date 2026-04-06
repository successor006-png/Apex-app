import { useState } from 'react';

const CSS = `
  .readiness { min-height:100vh; padding:112px 40px 80px; max-width:680px; margin:0 auto; }
  .readiness-sliders { display:flex; flex-direction:column; gap:32px; margin:40px 0; }
  .readiness-score-card {
    background:var(--surface); border:1px solid var(--border);
    padding:28px 32px; margin-bottom:32px;
    display:flex; align-items:center; gap:24px;
  }
  .readiness-num { font-family:var(--font-display); font-size:64px; font-weight:900; color:var(--gold); line-height:1; }
  .readiness-label {
    font-family:var(--font-mono); font-size:10px; letter-spacing:0.2em;
    color:var(--text-mute); text-transform:uppercase; margin-bottom:6px;
  }
  .readiness-adapt { font-size:15px; font-style:italic; color:var(--text-dim); line-height:1.5; }
  .slider-row { display:flex; flex-direction:column; gap:8px; }
  .slider-meta { display:flex; justify-content:space-between; align-items:center; }
  .slider-meta-label { font-family:var(--font-mono); font-size:10px; letter-spacing:0.1em; color:var(--text-dim); text-transform:uppercase; }
  .slider-meta-val   { font-family:var(--font-display); font-size:18px; font-weight:700; color:var(--gold); }
  .slider-ends { display:flex; align-items:center; gap:12px; }
  .slider-end { font-family:var(--font-mono); font-size:9px; color:var(--text-mute); letter-spacing:0.1em; flex-shrink:0; }
`;

const SLIDERS = [
  { key:'sleep',    label:'Sleep quality last night',  low:'Terrible',  high:'Perfect',   invert:false },
  { key:'energy',   label:'Current energy level',      low:'Depleted',  high:'Electric',  invert:false },
  { key:'mood',     label:'Mental state',              low:'Dark',      high:'Sharp',     invert:false },
  { key:'soreness', label:'Muscle soreness',           low:'None',      high:"Can't move", invert:true },
];

export default function ReadinessCheck({ onComplete }) {
  const [scores, setScores] = useState({ sleep:7, energy:7, mood:7, soreness:3 });

  const readiness = Math.round(
    (scores.sleep + scores.energy + scores.mood + (10 - scores.soreness)) / 4
  );

  const getAdaptation = () => {
    if (readiness >= 8) return { text:"Full session. Nervous system primed. Push the prescription.", color:'var(--green)' };
    if (readiness >= 6) return { text:"Standard session. Warm-up extended slightly. Full adaptation stimulus maintained.", color:'var(--gold)' };
    if (readiness >= 4) return { text:"Reduced intensity. Same movements, managed load. The habit is more important than the number.", color:'var(--orange)' };
    return { text:"Recovery session. HFT protocol only. Coming in anyway is the win.", color:'var(--red)' };
  };

  const adapt = getAdaptation();

  return (
    <>
      <style>{CSS}</style>
      <div className="readiness">
        <div className="mono-label fade-up" style={{ marginBottom:14 }}>Daily Check-In</div>
        <h2 className="fade-up-d1" style={{ fontFamily:'var(--font-display)', fontSize:'clamp(26px,4vw,40px)', fontWeight:700, color:'var(--white)', marginBottom:8, lineHeight:1.1 }}>
          How are you<br />showing up today?
        </h2>
        <p className="fade-up-d2" style={{ fontSize:16, fontStyle:'italic', color:'var(--text-dim)', fontWeight:300, marginBottom:0 }}>
          This adjusts your session — not to let you off, but to keep the adaptation signal clean.
        </p>

        <div className="readiness-sliders fade-up-d3">
          {SLIDERS.map(s => (
            <div key={s.key} className="slider-row">
              <div className="slider-meta">
                <span className="slider-meta-label">{s.label}</span>
                <span className="slider-meta-val">{scores[s.key]}/10</span>
              </div>
              <div className="slider-ends">
                <span className="slider-end">{s.low}</span>
                <input
                  className="q-range"
                  type="range" min={1} max={10}
                  value={scores[s.key]}
                  onChange={e => setScores(prev => ({ ...prev, [s.key]: parseInt(e.target.value) }))}
                />
                <span className="slider-end">{s.high}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="readiness-score-card fade-up-d4">
          <div>
            <div className="readiness-num" style={{ color: adapt.color }}>{readiness}</div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'var(--text-mute)', letterSpacing:'0.15em' }}>/10</div>
          </div>
          <div>
            <div className="readiness-label">Today's Session Adaptation</div>
            <div className="readiness-adapt" style={{ color: readiness >= 6 ? 'var(--text-dim)' : adapt.color }}>
              {adapt.text}
            </div>
          </div>
        </div>

        <button className="btn-primary fade-up-d5" onClick={() => onComplete(readiness)}>
          Begin Session →
        </button>
      </div>
    </>
  );
}
