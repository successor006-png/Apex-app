import { useState, useEffect, useRef } from 'react';
import { generateDemoSession } from '../utils/dnaEngine.js';
import { DISCIPLINES } from '../constants/disciplines.js';

const CSS = `
  .session-view { min-height:100vh; padding:112px 40px 80px; max-width:720px; margin:0 auto; }
  .session-prog-bar { height:2px; background:var(--border); margin-bottom:48px; position:relative; overflow:hidden; }
  .session-prog-fill { position:absolute; top:0; left:0; bottom:0; background:var(--gold); transition:width 0.5s ease; }
  .ex-card {
    background:var(--surface); border:1px solid var(--border);
    padding:44px; margin-bottom:24px; position:relative;
  }
  .ex-number { font-family:var(--font-mono); font-size:10px; letter-spacing:0.3em; color:var(--text-mute); margin-bottom:8px; }
  .ex-big-name {
    font-family:var(--font-display); font-size:clamp(22px,4vw,36px); font-weight:900;
    color:var(--white); margin-bottom:20px; line-height:1.1;
  }
  .ex-prescription {
    font-family:var(--font-mono); font-size:10px; letter-spacing:0.2em;
    color:var(--text-mute); text-transform:uppercase; margin-bottom:20px;
  }
  .sets-row { display:flex; gap:12px; margin-bottom:28px; flex-wrap:wrap; }
  .ex-cue {
    font-size:15px; font-style:italic; color:var(--text-dim); font-weight:300; line-height:1.65;
    margin-bottom:28px; padding:16px 20px;
    border-left:2px solid var(--gold-dim); background:var(--gold-glow);
  }
  .btn-log {
    width:100%; padding:18px;
    font-family:var(--font-display); font-size:13px; font-weight:700;
    letter-spacing:0.15em; text-transform:uppercase;
    background:var(--gold); color:var(--bg);
    border:none; border-radius:2px; cursor:pointer; transition:all 0.2s; margin-bottom:10px;
  }
  .btn-log:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(200,169,110,0.25); }
  .btn-log.secondary {
    background:transparent; color:var(--gold);
    border:1px solid var(--gold-dim);
  }
  .btn-skip {
    width:100%; padding:10px;
    font-family:var(--font-mono); font-size:10px; letter-spacing:0.1em;
    color:var(--text-mute); border:none; background:none; cursor:pointer; transition:color 0.2s;
  }
  .btn-skip:hover { color:var(--text-dim); }
  .rest-block { text-align:center; padding:60px 20px; }
  .rest-label { font-family:var(--font-mono); font-size:10px; letter-spacing:0.35em; color:var(--text-mute); text-transform:uppercase; margin-bottom:12px; }
  .rest-count { font-family:var(--font-display); font-size:96px; font-weight:900; color:var(--gold); line-height:1; animation:pulse 1s infinite; }
  .rest-sub   { font-family:var(--font-mono); font-size:10px; letter-spacing:0.2em; color:var(--text-mute); margin-top:8px; }
  .session-queue { margin-top:32px; }
`;

export default function SessionView({ dna, readiness, onComplete }) {
  const session = generateDemoSession(dna || { primary:'calisthenics', level:{ label:'Foundation' } });
  const exercises = session.exercises;

  const [exIdx, setExIdx]     = useState(0);
  const [doneSets, setDoneSets] = useState({});
  const [resting, setResting]   = useState(false);
  const [restSec, setRestSec]   = useState(60);
  const [doneEx, setDoneEx]     = useState(new Set());
  const timerRef = useRef(null);

  const ex       = exercises[exIdx];
  const totalSets = ex?.sets || 3;
  const setsHere  = doneSets[exIdx] || 0;
  const progress  = (exIdx / exercises.length) * 100;

  const logSet = () => {
    const next = setsHere + 1;
    setDoneSets(d => ({ ...d, [exIdx]: next }));
    if (next >= totalSets) {
      setDoneEx(s => new Set([...s, exIdx]));
    } else {
      const restDuration = readiness >= 8 ? 45 : readiness >= 6 ? 60 : 90;
      setRestSec(restDuration);
      setResting(true);
    }
  };

  useEffect(() => {
    if (resting) {
      timerRef.current = setInterval(() => {
        setRestSec(c => {
          if (c <= 1) { clearInterval(timerRef.current); setResting(false); return 60; }
          return c - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [resting]);

  const nextEx = () => {
    if (exIdx < exercises.length - 1) {
      setExIdx(i => i + 1);
      setResting(false);
      window.scrollTo({ top:0, behavior:'smooth' });
    } else {
      onComplete({ exercises: exercises.length, duration: session.duration, session });
    }
  };

  const primary = DISCIPLINES[dna?.primary] || DISCIPLINES.calisthenics;

  return (
    <>
      <style>{CSS}</style>
      <div className="session-view">
        <div className="session-prog-bar">
          <div className="session-prog-fill" style={{ width:`${progress}%` }} />
        </div>

        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:40, flexWrap:'wrap', gap:12 }}>
          <div>
            <div className="mono-label" style={{ color: primary.color, marginBottom:4 }}>Today's Session</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:700, color:'var(--white)' }}>{session.type}</div>
          </div>
          <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text-mute)', letterSpacing:'0.1em' }}>
              ● {exercises.length} exercises · {session.duration} min
            </div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--gold)', letterSpacing:'0.1em' }}>
              Readiness {readiness || 7}/10
            </div>
          </div>
        </div>

        {/* Phase label */}
        <div style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'var(--text-mute)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:20, padding:'8px 0', borderBottom:'1px solid var(--border)' }}>
          {session.phase}
        </div>

        {/* Rest or Exercise */}
        {resting ? (
          <div className="ex-card">
            <div className="rest-block">
              <div className="rest-label">Rest Period</div>
              <div className="rest-count">{restSec}</div>
              <div className="rest-sub">seconds remaining</div>
            </div>
            <button className="btn-log secondary" onClick={() => setResting(false)}>
              Skip Rest — Ready Now
            </button>
          </div>
        ) : (
          <div className="ex-card fade-up" key={exIdx}>
            <div className="ex-number">Exercise {exIdx + 1} of {exercises.length}</div>
            <div className="ex-big-name">{ex?.name}</div>
            <div className="ex-prescription">
              {typeof ex?.sets === 'number' ? ex.sets : 3} sets × {ex?.reps || '8–12 reps'}
            </div>

            <div className="sets-row">
              {Array.from({ length: totalSets }).map((_, i) => (
                <div key={i} className={`set-circle${i < setsHere ? ' done' : i === setsHere ? ' current' : ''}`}>
                  {i < setsHere ? '✓' : i + 1}
                </div>
              ))}
            </div>

            <div className="ex-cue">{ex?.cue}</div>

            {setsHere < totalSets ? (
              <button className="btn-log" onClick={logSet}>Log Set {setsHere + 1} ✓</button>
            ) : (
              <button className="btn-log secondary" onClick={nextEx}>
                {exIdx < exercises.length - 1 ? 'Next Exercise →' : 'Complete Session ✓'}
              </button>
            )}
            <button className="btn-skip" onClick={nextEx}>Skip exercise</button>
          </div>
        )}

        {/* Queue */}
        <div className="session-queue">
          <div className="mono-label" style={{ marginBottom:12, display:'block' }}>Session Queue</div>
          <div className="ex-list">
            {exercises.map((e, i) => (
              <div key={i} className="ex-row" onClick={() => { setExIdx(i); setResting(false); }}>
                <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                  <div className={`ex-status${doneEx.has(i) ? ' done' : ''}`} />
                  <span className="ex-name" style={{ color: i === exIdx ? 'var(--gold)' : 'var(--text)' }}>{e.name}</span>
                </div>
                <span className="ex-sets">{typeof e.sets === 'number' ? e.sets : 3} × {e.reps}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
