import { useState } from 'react';
import { DISCIPLINES } from '../constants/disciplines.js';
import { LADDERS } from '../constants/progressionLadders.js';

const CSS = `
  .dashboard { padding:100px 40px 80px; max-width:1100px; margin:0 auto; }
  .db-header { margin-bottom:52px; display:flex; align-items:flex-end; justify-content:space-between; gap:20px; flex-wrap:wrap; }
  .db-grid   { display:grid; grid-template-columns:1fr 320px; gap:2px; background:var(--border); margin-bottom:2px; }
  .db-main   { display:flex; flex-direction:column; gap:2px; background:var(--border); }
  .db-side   { display:flex; flex-direction:column; gap:2px; background:var(--border); }
  .panel     { background:var(--surface); padding:28px 32px; }
  .panel-label {
    font-family:var(--font-mono); font-size:9px; letter-spacing:0.35em;
    color:var(--gold); text-transform:uppercase; margin-bottom:18px;
    display:flex; align-items:center; gap:12px;
  }
  .panel-label::after { content:''; flex:1; height:1px; background:var(--border); }

  .today-session-type { font-family:var(--font-display); font-size:22px; font-weight:700; color:var(--white); margin-bottom:10px; }
  .session-meta { display:flex; gap:18px; flex-wrap:wrap; margin-bottom:20px; }
  .session-meta-item {
    font-family:var(--font-mono); font-size:10px; letter-spacing:0.1em;
    color:var(--text-mute); display:flex; align-items:center; gap:6px;
  }
  .meta-dot { width:4px; height:4px; border-radius:50%; background:var(--gold); flex-shrink:0; }

  .ex-list { display:flex; flex-direction:column; gap:2px; background:var(--border); }
  .ex-row  {
    background:var(--surface2); padding:14px 18px;
    display:flex; align-items:center; justify-content:space-between; gap:16px;
    cursor:pointer; transition:background 0.2s;
  }
  .ex-row:hover { background:#1e1e26; }
  .ex-name { font-size:15px; color:var(--text); }
  .ex-sets { font-family:var(--font-mono); font-size:10px; color:var(--text-mute); letter-spacing:0.05em; }
  .ex-status { width:8px; height:8px; border-radius:50%; border:1px solid var(--border-bright); flex-shrink:0; }
  .ex-status.done { background:var(--green); border-color:var(--green); }

  .btn-start {
    font-family:var(--font-display); font-size:11px; font-weight:600;
    letter-spacing:0.2em; text-transform:uppercase;
    color:var(--bg); background:var(--gold);
    padding:13px 26px; border-radius:2px; border:none;
    cursor:pointer; transition:all 0.2s;
  }
  .btn-start:hover { transform:translateY(-1px); box-shadow:0 4px 16px rgba(200,169,110,0.2); }

  .milestone-list { display:flex; flex-direction:column; gap:10px; }
  .milestone-item { display:flex; align-items:center; gap:12px; padding:12px 0; border-bottom:1px solid var(--border); }
  .milestone-item:last-child { border-bottom:none; padding-bottom:0; }
  .milestone-check {
    width:20px; height:20px; border:1px solid var(--border-bright); border-radius:2px;
    display:flex; align-items:center; justify-content:center; flex-shrink:0;
    font-size:10px; color:var(--green); transition:all 0.2s;
  }
  .milestone-text { font-size:14px; color:var(--text-dim); flex:1; }
  .milestone-text.done { color:var(--text); }

  .stats-grid { display:grid; grid-template-columns:1fr 1fr; gap:2px; background:var(--border); }
  .stat-cell  { background:var(--surface2); padding:18px 20px; text-align:center; }
  .stat-val   { font-family:var(--font-display); font-size:26px; font-weight:700; color:var(--white); display:block; }
  .stat-lbl   { font-family:var(--font-mono); font-size:9px; letter-spacing:0.15em; color:var(--text-mute); text-transform:uppercase; }

  .progression-tabs { display:flex; gap:2px; background:var(--border); margin-bottom:2px; }
  .prog-tab {
    flex:1; padding:10px; text-align:center;
    font-family:var(--font-mono); font-size:9px; letter-spacing:0.1em;
    color:var(--text-mute); text-transform:uppercase; cursor:pointer;
    background:var(--surface2); border:none; transition:all 0.2s;
  }
  .prog-tab.active { color:var(--gold); background:var(--gold-glow); }

  .ladder-level {
    background:var(--surface2); border-bottom:1px solid var(--border);
    padding:16px 20px; cursor:pointer; transition:background 0.2s;
  }
  .ladder-level:hover   { background:#1e1e26; }
  .ladder-level.current { background:var(--gold-glow); border-left:2px solid var(--gold); }
  .level-num  { font-family:var(--font-mono); font-size:9px; color:var(--text-mute); letter-spacing:0.15em; margin-bottom:4px; }
  .level-name { font-size:14px; font-weight:400; color:var(--white); margin-bottom:2px; }
  .level-desc { font-size:12px; color:var(--text-dim); font-style:italic; }
  .level-target { font-family:var(--font-mono); font-size:10px; color:var(--gold); margin-top:4px; }

  @media (max-width:900px) {
    .db-grid { grid-template-columns:1fr; }
    .db-side { flex-direction:row; flex-wrap:wrap; }
    .db-side .panel { flex:1; min-width:240px; }
  }
  @media (max-width:640px) {
    .dashboard { padding:88px 20px 60px; }
    .progression-tabs { overflow-x:auto; }
  }
`;

const LADDER_KEYS = Object.keys(LADDERS);

export default function Dashboard({ dna, onStartSession }) {
  const [activeLadder, setActiveLadder] = useState(0);
  const [currentLevel, setCurrentLevel] = useState({ 0:1, 1:1, 2:1, 3:1, 4:1, 5:1 });

  const primary = DISCIPLINES[dna?.primary] || DISCIPLINES.calisthenics;
  const lKey = LADDER_KEYS[activeLadder];
  const ladder = LADDERS[lKey];
  const levels = ladder?.levels || [];

  // Demo session from dna
  const sessionName = `${primary.name} — ${dna?.microcycle?.template?.days?.[0] || 'High Demand'}`;
  const demoExercises = [
    { name: 'Activation: Scapular Circles + Shoulder CARs', sets:'2', reps:'8 each' },
    { name: 'Hyperarch Hop + Marble Drill (HFT Phase Activation)', sets:'2', reps:'90s' },
    { name: primary.milestones?.[2] || 'Primary Skill Work', sets:'3', reps:'Target reps' },
    { name: 'Strength Superset A', sets:'4', reps:'8–10' },
    { name: 'Satellite: Fascia Integration Hold', sets:'2', reps:'60s' },
    { name: 'Cool-down: Decompression + Height Protocol', sets:'1', reps:'8 min' },
  ];

  return (
    <>
      <style>{CSS}</style>
      <div className="dashboard">
        {/* Header */}
        <div className="db-header">
          <div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.3em', color:'var(--text-mute)', textTransform:'uppercase', marginBottom:6 }}>
              Week 1 · Phase 1 · Foundation
            </div>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(22px,3vw,32px)', fontWeight:700, color:'var(--white)' }}>
              Today is a <span style={{ color:primary.color }}>High Demand</span> day.
            </h2>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text-mute)', marginTop:6, letterSpacing:'0.06em' }}>
              {dna?.microcycle?.highLowPrinciple?.split('.')[0]}.
            </div>
          </div>
          <button className="btn-start" onClick={onStartSession}>Begin Session →</button>
        </div>

        <div className="db-grid">
          {/* Left: Main content */}
          <div className="db-main">
            {/* Today's session */}
            <div className="panel">
              <div className="panel-label">Today's Session</div>
              <div className="today-session-type">{sessionName}</div>
              <div className="session-meta">
                <div className="session-meta-item"><div className="meta-dot" style={{ background:primary.color }} />{primary.name} + Fascia HFT</div>
                <div className="session-meta-item"><div className="meta-dot" />55–65 min</div>
                <div className="session-meta-item"><div className="meta-dot" />{demoExercises.length} exercises</div>
                <div className="session-meta-item"><div className="meta-dot" />{dna?.weeklyLoad?.load} load</div>
              </div>
              <div className="ex-list">
                {demoExercises.slice(0,5).map((e, i) => (
                  <div key={i} className="ex-row">
                    <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                      <div className="ex-status" />
                      <span className="ex-name">{e.name}</span>
                    </div>
                    <span className="ex-sets">{e.sets} × {e.reps}</span>
                  </div>
                ))}
                <div className="ex-row" style={{ justifyContent:'center', color:'var(--text-mute)', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.1em' }}>
                  + 1 more exercise
                </div>
              </div>
              <div style={{ marginTop:20 }}>
                <button className="btn-start" onClick={onStartSession}>Start Session →</button>
              </div>
            </div>

            {/* Training DNA summary */}
            <div className="panel">
              <div className="panel-label">Training DNA</div>
              <div style={{ display:'flex', alignItems:'center', gap:20, marginBottom:20 }}>
                <span style={{ fontSize:40, color:primary.color }}>{primary.icon}</span>
                <div>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:700, color:'var(--white)' }}>{primary.name}</div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.15em', color:primary.color, textTransform:'uppercase' }}>Primary Discipline</div>
                </div>
                <div style={{ marginLeft:'auto' }}>
                  <span className="level-badge" style={{ borderColor:dna?.level?.color, color:dna?.level?.color, background:`${dna?.level?.color}12` }}>
                    {dna?.level?.label}
                  </span>
                </div>
              </div>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:16 }}>
                {(dna?.satellites || []).map(sid => {
                  const d = DISCIPLINES[sid];
                  if (!d) return null;
                  return (
                    <div key={sid} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 14px', border:'1px solid var(--border)', borderRadius:2, background:'var(--surface2)' }}>
                      <span style={{ color:d.color }}>{d.icon}</span>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.05em', color:'var(--text-dim)' }}>{d.name}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ padding:'14px 18px', background:'var(--surface2)', border:'1px solid var(--border)', fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text-mute)', lineHeight:1.6 }}>
                <span style={{ color:'var(--gold)' }}>Governing Law: </span>{dna?.biologicalLaw?.law} — {dna?.biologicalLaw?.detail?.split('.')[0]}.
              </div>
            </div>

            {/* Progression Ladders */}
            <div className="panel">
              <div className="panel-label">Progression Ladders</div>
              <div className="progression-tabs">
                {LADDER_KEYS.map((k, i) => (
                  <button key={k} className={`prog-tab${activeLadder === i ? ' active' : ''}`} onClick={() => setActiveLadder(i)}>
                    {LADDERS[k].icon} {LADDERS[k].name.replace(' Progression','').replace(' Development','').replace(' Protocol','')}
                  </button>
                ))}
              </div>
              <div style={{ maxHeight:320, overflowY:'auto' }}>
                {levels.map(lv => {
                  const isCurrent = lv.level === currentLevel[activeLadder];
                  return (
                    <div
                      key={lv.level}
                      className={`ladder-level${isCurrent ? ' current' : ''}`}
                      onClick={() => setCurrentLevel(c => ({ ...c, [activeLadder]: lv.level }))}
                    >
                      <div className="level-num">Level {lv.level} · {lv.duration}</div>
                      <div className="level-name">{lv.name}</div>
                      <div className="level-desc">{lv.desc}</div>
                      <div className="level-target">{lv.target}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Side panels */}
          <div className="db-side">
            <div className="panel">
              <div className="panel-label">Phase Milestones</div>
              <div className="milestone-list">
                {(primary.milestones || []).map((m, i) => (
                  <div key={m} className="milestone-item">
                    <div className="milestone-check" style={{ background:i<2?'rgba(74,222,128,0.1)':'transparent', borderColor:i<2?'var(--green)':'var(--border-bright)' }}>
                      {i < 2 ? '✓' : ''}
                    </div>
                    <span className={`milestone-text${i<2?' done':''}`}>{m}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="panel-label">This Week</div>
              <div className="stats-grid">
                {[['1','Sessions Done'],['2','Remaining'],['—','Adherence'],['0d','Streak']].map(([v,l]) => (
                  <div key={l} className="stat-cell">
                    <span className="stat-val">{v}</span>
                    <span className="stat-lbl">{l}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="panel-label">Adaptation Engine</div>
              <p style={{ fontStyle:'italic', color:'var(--text-dim)', fontSize:13, lineHeight:1.6, fontWeight:300 }}>
                Complete your first session to begin generating adaptation signals. The engine reads performance vs. prescription across every set.
              </p>
            </div>

            <div className="panel">
              <div className="panel-label">HFT Daily Protocol</div>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {[
                  ['Phase ' + (dna?.fasciaPhase?.phase || 1), dna?.fasciaPhase?.name || 'Mind-Fascia Connection'],
                  ['Daily', 'Hyperarch Hop — 2×90s'],
                  ['Daily', 'Marble Drill — 3min/side'],
                  ['Weekly', 'Slow-Load Fascial Hold'],
                ].map(([badge, label], i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom:i<3?'1px solid var(--border)':'none' }}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:8, letterSpacing:'0.15em', color:'var(--purple)', background:'rgba(167,139,250,0.1)', padding:'3px 8px', borderRadius:2, whiteSpace:'nowrap' }}>{badge}</span>
                    <span style={{ fontSize:13, color:'var(--text-dim)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
