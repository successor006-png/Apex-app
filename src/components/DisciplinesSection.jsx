import { DISCIPLINES } from '../constants/disciplines.js';

const CSS = `
  .disciplines { padding: 100px 40px; max-width:1100px; margin:0 auto; }
  .disc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px,1fr));
    gap: 2px;
    background: var(--border);
    border: 1px solid var(--border);
  }
  .disc-card {
    background: var(--surface);
    padding: 40px 36px;
    cursor: pointer;
    transition: all 0.3s;
    position: relative; overflow:hidden;
  }
  .disc-card::before {
    content:''; position:absolute;
    inset:0;
    background: var(--disc-glow, transparent);
    opacity:0; transition:opacity 0.3s;
  }
  .disc-card:hover::before { opacity:1; }
  .disc-card:hover { transform:translateY(-2px); }
  .disc-icon {
    font-size:28px; margin-bottom:20px;
    display:block;
    transition: all 0.3s;
    opacity:0.7;
  }
  .disc-card:hover .disc-icon { opacity:1; transform:scale(1.12); }
  .disc-name {
    font-family:var(--font-display); font-size:16px; font-weight:700;
    letter-spacing:0.05em; color:var(--white); margin-bottom:4px;
  }
  .disc-tagline {
    font-family:var(--font-mono); font-size:9px; letter-spacing:0.2em;
    text-transform:uppercase; margin-bottom:16px;
  }
  .disc-desc {
    font-size:15px; font-weight:300; font-style:italic;
    color:var(--text-dim); line-height:1.6; margin-bottom:20px;
  }
  .disc-science {
    font-size:13px; color:var(--text-mute); line-height:1.5;
    margin-bottom:20px; font-family:var(--font-mono);
    font-size:10px; letter-spacing:0.03em;
  }
  .disc-phases { display:flex; flex-direction:column; gap:6px; }
  .disc-phase {
    font-family:var(--font-mono); font-size:10px; letter-spacing:0.1em;
    color:var(--text-mute); display:flex; align-items:center; gap:8px;
  }
  .disc-phase::before {
    content:''; width:16px; height:1px;
    background:var(--border-bright); flex-shrink:0;
  }

  @media (max-width:640px) {
    .disciplines { padding:60px 20px; }
  }
`;

export default function DisciplinesSection({ onStart }) {
  return (
    <>
      <style>{CSS}</style>
      <section className="disciplines" id="disciplines-section">
        <div className="section-eyebrow">Five Disciplines</div>
        <h2 className="section-title">The Orchestra.</h2>
        <p className="section-sub">
          Each instrument is complete on its own. The most profound performance happens when they play together — guided by your Training DNA.
        </p>

        <div className="disc-grid">
          {Object.values(DISCIPLINES).map(d => (
            <div
              key={d.id}
              className="disc-card"
              style={{ '--disc-glow': d.glow }}
              onClick={onStart}
            >
              <span className="disc-icon" style={{ color: d.color }}>{d.icon}</span>
              <div className="disc-name">{d.name}</div>
              <div className="disc-tagline" style={{ color: d.color }}>{d.tagline}</div>
              <div className="disc-desc">{d.description}</div>
              <div className="disc-science">{d.scienceBrief}</div>
              <div className="disc-phases">
                {d.phases.map(p => (
                  <div key={p} className="disc-phase">{p}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, padding: '32px 40px', background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '3px solid var(--gold)' }}>
          <div className="mono-label" style={{ marginBottom: 12 }}>The Governing Principle</div>
          <p style={{ fontStyle: 'italic', color: 'var(--text-dim)', fontSize: 16, lineHeight: 1.7 }}>
            "Think of the five disciplines as instruments in an orchestra. Each instrument is complete and beautiful on its own, but the most profound music happens when they play together, guided by a composer who understands both the individual character of each instrument and the harmonics that emerge when they combine. The app is the composer."
          </p>
        </div>
      </section>
    </>
  );
}
