import { useState } from 'react';
import GlobalStyles   from './components/GlobalStyles.jsx';
import Nav            from './components/Nav.jsx';
import Hero           from './components/Hero.jsx';
import DisciplinesSection from './components/DisciplinesSection.jsx';
import Assessment     from './components/Assessment.jsx';
import DNAReveal      from './components/DNAReveal.jsx';
import Dashboard      from './components/Dashboard.jsx';
import ReadinessCheck from './components/ReadinessCheck.jsx';
import SessionView    from './components/SessionView.jsx';
import SessionComplete from './components/SessionComplete.jsx';
import { generateTrainingDNA } from './utils/dnaEngine.js';

// ─── PERSISTENCE ──────────────────────────────────────────────────────────────
const store = {
  save: (k, v) => { try { localStorage.setItem(`apex2_${k}`, JSON.stringify(v)); } catch(e){} },
  load: (k, d) => { try { const v = localStorage.getItem(`apex2_${k}`); return v ? JSON.parse(v) : d; } catch(e){ return d; } },
};

// ─── GENERATING SCREEN ────────────────────────────────────────────────────────
function GeneratingScreen({ answers, onDone }) {
  const [step, setStep] = useState(0);
  const steps = [
    'Analyzing your 6-layer profile…',
    'Routing primary discipline via goal architecture…',
    'Calculating Five Pillars baseline…',
    'Mapping HFT fascia entry phase…',
    'Applying SAID · Wolff\'s · Davis\'s Laws…',
    'Building your High/Low microcycle…',
    'Forging your Training DNA…',
  ];

  // Run instantly from dnaEngine — no API call needed for DNA generation
  // The AI program generation happens later inside the Dashboard via API
  useState(() => {
    let i = 0;
    const iv = setInterval(() => {
      i++;
      if (i < steps.length) setStep(i);
    }, 500);

    setTimeout(() => {
      clearInterval(iv);
      const dna = generateTrainingDNA(answers);
      store.save('dna', dna);
      store.save('answers', answers);
      onDone(dna);
    }, steps.length * 500 + 200);
  });

  return (
    <div style={{
      minHeight:'100vh', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      padding:'40px', textAlign:'center'
    }}>
      <div style={{ fontFamily:'var(--font-display)', fontSize:64, color:'var(--gold)', marginBottom:40, animation:'breathe 2s infinite' }}>
        ◆
      </div>
      <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(20px,3vw,32px)', fontWeight:700, color:'var(--white)', marginBottom:20 }}>
        Forging your Training DNA
      </div>
      {steps.map((s, i) => (
        <div key={i} style={{
          fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.1em',
          color: i <= step ? (i === step ? 'var(--gold)' : 'var(--text-dim)') : 'var(--text-mute)',
          marginBottom:8, transition:'color 0.4s',
          display:'flex', alignItems:'center', gap:12,
        }}>
          <span style={{ color: i < step ? 'var(--green)' : i === step ? 'var(--gold)' : 'var(--border-bright)' }}>
            {i < step ? '✓' : i === step ? '●' : '○'}
          </span>
          {s}
        </div>
      ))}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [view,      setView]      = useState('home');
  const [activeTab, setActiveTab] = useState('home');
  const [answers,   setAnswers]   = useState(() => store.load('answers', null));
  const [dna,       setDna]       = useState(() => store.load('dna', null));
  const [readiness, setReadiness] = useState(null);
  const [sessionResult, setSessionResult] = useState(null);

  const navigateTo = (v) => {
    setView(v);
    setActiveTab(['home','disciplines','assessment','program'].includes(v) ? v : activeTab);
    window.scrollTo({ top:0, behavior:'smooth' });
  };

  const handleAssessmentComplete = (ans) => {
    setAnswers(ans);
    setView('generating');
  };

  const handleDNAReady = (d) => {
    setDna(d);
    setView('dna');
    setActiveTab('home');
  };

  const handleDNAContinue = () => {
    setView('program');
    setActiveTab('program');
  };

  const handleStartSession = () => setView('readiness');

  const handleReadinessDone = (r) => {
    setReadiness(r);
    setView('session');
  };

  const handleSessionDone = (data) => {
    setSessionResult(data);
    setView('complete');
  };

  const handleReturnDashboard = () => {
    setView('program');
    setActiveTab('program');
  };

  const renderView = () => {
    switch (view) {
      case 'home':
        return (
          <>
            <Hero onStart={() => navigateTo('assessment')} />
            <DisciplinesSection onStart={() => navigateTo('assessment')} />
          </>
        );
      case 'disciplines':
        return (
          <div style={{ paddingTop:80 }}>
            <DisciplinesSection onStart={() => navigateTo('assessment')} />
          </div>
        );
      case 'assessment':
        return <Assessment onComplete={handleAssessmentComplete} />;
      case 'generating':
        return <GeneratingScreen answers={answers} onDone={handleDNAReady} />;
      case 'dna':
        return <DNAReveal dna={dna} onContinue={handleDNAContinue} />;
      case 'program':
        return <Dashboard dna={dna} onStartSession={handleStartSession} />;
      case 'readiness':
        return <ReadinessCheck onComplete={handleReadinessDone} />;
      case 'session':
        return <SessionView dna={dna} readiness={readiness} onComplete={handleSessionDone} />;
      case 'complete':
        return <SessionComplete data={sessionResult} dna={dna} onDashboard={handleReturnDashboard} />;
      default:
        return null;
    }
  };

  return (
    <>
      <GlobalStyles />
      <Nav
        view={view}
        activeTab={activeTab}
        navigateTo={navigateTo}
        hasDNA={!!dna}
      />
      <main style={{ minHeight:'100vh' }}>
        {renderView()}
      </main>
    </>
  );
}
