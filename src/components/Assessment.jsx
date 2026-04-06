import { useState } from 'react';
import { ASSESSMENT_STEPS, DISCIPLINE_DEEP_QUESTIONS } from '../constants/assessmentSteps.js';
import { DISCIPLINES } from '../constants/disciplines.js';

const CSS = `
  .assessment { min-height:100vh; padding:112px 40px 80px; max-width:720px; margin:0 auto; }
  .assessment-progress { display:flex; align-items:center; gap:8px; margin-bottom:64px; flex-wrap:wrap; }
  .progress-step {
    display:flex; align-items:center; gap:8px;
    font-family:var(--font-mono); font-size:10px; letter-spacing:0.15em;
    color:var(--text-mute); transition:color 0.3s;
  }
  .progress-step.active { color:var(--gold); }
  .progress-step.done   { color:var(--text-dim); }
  .progress-dot {
    width:6px; height:6px; border-radius:50%;
    background:var(--border-bright); transition:all 0.3s; flex-shrink:0;
  }
  .progress-step.active .progress-dot { background:var(--gold); box-shadow:0 0 8px var(--gold); }
  .progress-step.done   .progress-dot { background:var(--text-dim); }
  .progress-line { flex:1; height:1px; background:var(--border); max-width:24px; }

  .q-group { display:flex; flex-direction:column; gap:28px; margin-bottom:48px; }
  .q-item  { display:flex; flex-direction:column; gap:8px; }
  .q-label {
    font-family:var(--font-mono); font-size:11px; letter-spacing:0.1em;
    color:var(--text-dim); text-transform:uppercase;
  }
  .q-input-wrap { position:relative; display:flex; align-items:center; }
  .q-unit {
    position:absolute; right:16px;
    font-family:var(--font-mono); font-size:11px; color:var(--text-mute);
    pointer-events:none;
  }
  .q-range-wrap { display:flex; align-items:center; gap:20px; }
  .range-val {
    font-family:var(--font-display); font-size:22px; font-weight:700;
    color:var(--gold); min-width:32px; text-align:right;
  }
  .assessment-nav { display:flex; align-items:center; justify-content:space-between; }
  .btn-next {
    font-family:var(--font-display); font-size:12px; font-weight:600;
    letter-spacing:0.2em; text-transform:uppercase;
    color:var(--bg); background:var(--gold);
    padding:14px 36px; border-radius:2px; border:none;
    cursor:pointer; transition:all 0.2s;
  }
  .btn-next:hover { transform:translateY(-1px); box-shadow:0 6px 24px rgba(200,169,110,0.25); }
  .btn-next:disabled { opacity:0.4; cursor:not-allowed; transform:none; box-shadow:none; }
  .btn-back {
    font-family:var(--font-mono); font-size:11px; letter-spacing:0.1em;
    color:var(--text-mute); padding:14px 20px; border:none;
    background:none; cursor:pointer; transition:color 0.2s;
  }
  .btn-back:hover { color:var(--text-dim); }

  @media (max-width:640px) {
    .assessment { padding:88px 20px 60px; }
    .assessment-progress { gap:4px; }
  }
`;

function renderQuestion(q, value, onChange) {
  if (q.type === 'number' || q.type === 'text') {
    return (
      <div className="q-input-wrap">
        <input
          type={q.type === 'number' ? 'number' : 'text'}
          className="q-input"
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          placeholder={q.placeholder || ''}
          min={0}
        />
        {q.unit && <span className="q-unit">{q.unit}</span>}
      </div>
    );
  }

  if (q.type === 'textarea') {
    return (
      <textarea
        className="q-input textarea"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={q.placeholder || ''}
      />
    );
  }

  if (q.type === 'select') {
    return (
      <select className="q-input" value={value || ''} onChange={e => onChange(e.target.value)}>
        <option value="">— select —</option>
        {(q.options || []).map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  }

  if (q.type === 'range') {
    return (
      <div className="q-range-wrap">
        <span style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'var(--text-mute)', letterSpacing:'0.1em' }}>Low</span>
        <input
          className="q-range"
          type="range"
          min={q.min || 1}
          max={q.max || 10}
          value={value || Math.floor(((q.min || 1) + (q.max || 10)) / 2)}
          onChange={e => onChange(parseInt(e.target.value))}
        />
        <span style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'var(--text-mute)', letterSpacing:'0.1em' }}>High</span>
        <span className="range-val">{value || 5}</span>
      </div>
    );
  }

  if (q.type === 'multiselect') {
    const selected = value || [];
    return (
      <div className="multiselect-grid">
        {(q.options || []).map(o => (
          <div
            key={o}
            className={`ms-option${selected.includes(o) ? ' selected' : ''}`}
            onClick={() => onChange(selected.includes(o) ? selected.filter(x => x !== o) : [...selected, o])}
          >
            {o}
          </div>
        ))}
      </div>
    );
  }

  if (q.type === 'discipline-select') {
    return (
      <div className="disc-select-grid">
        {Object.values(DISCIPLINES).map(d => (
          <div
            key={d.id}
            className={`disc-select-card${value === d.id ? ' selected' : ''}`}
            onClick={() => onChange(d.id)}
            style={value === d.id ? { borderColor: d.color, background: d.glow } : {}}
          >
            <span style={{ fontSize:22, marginBottom:8, display:'block', color: d.color }}>{d.icon}</span>
            <div style={{ fontFamily:'var(--font-display)', fontSize:13, fontWeight:600, color:'var(--white)' }}>{d.name}</div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.15em', color:'var(--text-mute)', textTransform:'uppercase', marginTop:2 }}>{d.tagline}</div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default function Assessment({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  // Build full step list: base 6 + discipline-specific step
  const allSteps = [...ASSESSMENT_STEPS];
  const attraction = answers.disciplineAttraction;
  if (attraction && DISCIPLINE_DEEP_QUESTIONS[attraction]) {
    const deep = DISCIPLINE_DEEP_QUESTIONS[attraction];
    allSteps.push({
      id: 'discipline_deep',
      label: deep.label,
      title: deep.title,
      subtitle: `Routing you into your ${DISCIPLINES[attraction]?.name} track.`,
      questions: deep.questions,
    });
  }

  const currentStep = allSteps[step];

  const setAnswer = (id, val) => setAnswers(a => ({ ...a, [id]: val }));

  const canNext = () => {
    // Soft validation — require at least 60% of questions answered
    const answered = currentStep.questions.filter(q => {
      const v = answers[q.id];
      if (q.type === 'multiselect') return Array.isArray(v) && v.length > 0;
      if (q.type === 'range') return true; // always has a value
      return v !== undefined && v !== '' && v !== null;
    }).length;
    const required = Math.ceil(currentStep.questions.filter(q => q.type !== 'text').length * 0.6);
    return answered >= required;
  };

  const next = () => {
    if (!canNext()) return;
    if (step < allSteps.length - 1) {
      setStep(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onComplete(answers);
    }
  };

  const back = () => {
    if (step > 0) {
      setStep(s => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="assessment">
        {/* Progress indicator */}
        <div className="assessment-progress">
          {allSteps.map((s, i) => (
            <div key={s.id} style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div className={`progress-step${i === step ? ' active' : i < step ? ' done' : ''}`}>
                <div className="progress-dot" />
                {i === step && (
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.2em' }}>
                    {s.label.split(' — ')[1]}
                  </span>
                )}
              </div>
              {i < allSteps.length - 1 && <div className="progress-line" />}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div key={step} className="fade-up">
          <div className="mono-label" style={{ marginBottom:14 }}>{currentStep.label}</div>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(24px,4vw,36px)', fontWeight:700, color:'var(--white)', marginBottom:8, lineHeight:1.15 }}>
            {currentStep.title}
          </h2>
          <p style={{ fontSize:16, fontStyle:'italic', color:'var(--text-dim)', marginBottom:48, fontWeight:300 }}>
            {currentStep.subtitle}
          </p>

          <div className="q-group">
            {currentStep.questions.map((q, i) => (
              <div key={q.id} className="q-item" style={{ animationDelay:`${i * 0.05}s` }}>
                <label className="q-label">{q.label}</label>
                {renderQuestion(q, answers[q.id], val => setAnswer(q.id, val))}
              </div>
            ))}
          </div>

          <div className="assessment-nav">
            {step > 0
              ? <button className="btn-back" onClick={back}>← Back</button>
              : <span />
            }
            <button className="btn-next" onClick={next} disabled={!canNext()}>
              {step === allSteps.length - 1 ? 'Generate Training DNA →' : 'Continue →'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
