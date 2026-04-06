import { DISCIPLINES } from '../constants/disciplines.js';

const CSS = `
  .session-complete {
    min-height:100vh; padding:112px 40px 80px;
    max-width:680px; margin:0 auto; text-align:center;
  }
  .complete-stats { display:flex; gap:48px; justify-content:center; margin:40px 0; flex-wrap:wrap; }
  .complete-stat-num { font-family:var(--font-display); font-size:40px; font-weight:900; color:var(--white); display:block; }
  .complete-stat-lbl { font-family:var(--font-mono); font-size:9px; letter-spacing:0.2em; color:var(--text-mute); text-transform:uppercase; }
  .adapt-note {
    background:var(--surface); border:1px solid var(--border);
    padding:28px 32px; margin:32px auto; max-width:480px; text-align:left;
    border-left:3px solid var(--gold);
  }
`;

export default function SessionComplete({ data, dna, onDashboard }) {
  const primary = DISCIPLINES[dna?.primary] || DISCIPLINES.calisthenics;

  return (
    <>
      <style>{CSS}</style>
      <div className="session-complete">
        <div className="complete-ring fade-up">✓</div>

        <h1 className="fade-up-d1" style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,5vw,52px)', fontWeight:900, color:'var(--white)', marginBottom:12 }}>
          Session Complete.
        </h1>
        <p className="fade-up-d2" style={{ fontSize:17, fontStyle:'italic', color:'var(--text-dim)', fontWeight:300, lineHeight:1.65, maxWidth:440, margin:'0 auto' }}>
          The adaptation signal has been sent. Your body is already responding.
          Every session compounds on the last. The SAID principle does not negotiate.
        </p>

        <div className="complete-stats fade-up-d3">
          {[
            [data?.exercises || 6, 'Exercises'],
            [data?.duration  || 55, 'Minutes'],
            [(data?.exercises || 6) * 3, 'Sets Logged'],
          ].map(([v, l]) => (
            <div key={l}>
              <span className="complete-stat-num">{v}</span>
              <span className="complete-stat-lbl">{l}</span>
            </div>
          ))}
        </div>

        <div className="adapt-note fade-up-d4">
          <div className="mono-label" style={{ marginBottom:10, display:'block' }}>Adaptation Engine</div>
          <p style={{ fontStyle:'italic', color:'var(--text-dim)', fontSize:15, lineHeight:1.65, fontWeight:300 }}>
            Session logged. Your {primary.name} progression data is being tracked.
            {' '}Complete 3 sessions to activate the adaptation engine's first assessment window.
            {' '}<span style={{ color:'var(--gold)' }}>Next milestone: {primary.milestones?.[0]}</span>.
          </p>
        </div>

        <div className="adapt-note fade-up-d5" style={{ borderColor:'var(--purple)', background:'rgba(167,139,250,0.04)' }}>
          <div className="mono-label" style={{ marginBottom:10, display:'block', color:'var(--purple)' }}>HFT Note</div>
          <p style={{ fontStyle:'italic', color:'var(--text-dim)', fontSize:15, lineHeight:1.65, fontWeight:300 }}>
            The Hyperarch and Marble drills logged today contribute to Phase {dna?.fasciaPhase?.phase || 1} of your fascial remodelling protocol.
            {' '}Connective tissue adaptation requires 3–4× longer than muscle — but it's happening.
            {' '}Davis's Law is active.
          </p>
        </div>

        <div className="fade-up-d6">
          <button className="btn-primary" onClick={onDashboard}>Return to Dashboard</button>
        </div>
      </div>
    </>
  );
}
