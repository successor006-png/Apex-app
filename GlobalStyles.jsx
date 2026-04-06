import { useEffect } from 'react';
import { GOOGLE_FONTS } from '../theme.js';

// Grain overlay SVG (inline to avoid external request)
const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`;

const CSS = `
  @import url('${GOOGLE_FONTS}');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #080809;
    --surface: #0f0f11;
    --surface2: #15151a;
    --surface3: #1a1a22;
    --border: rgba(255,255,255,0.07);
    --border-bright: rgba(255,255,255,0.14);
    --gold: #c8a96e;
    --gold-dim: #7a6540;
    --gold-glow: rgba(200,169,110,0.10);
    --text: #ddd8cf;
    --text-dim: #8a8478;
    --text-mute: #524e48;
    --white: #f0ece4;
    --green: #4ade80;
    --blue: #38bdf8;
    --purple: #a78bfa;
    --orange: #f97316;
    --pink: #f472b6;
    --red: #e05454;
    --font-display: 'Cinzel', serif;
    --font-body: 'Crimson Pro', serif;
    --font-mono: 'DM Mono', monospace;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    font-size: 18px;
    line-height: 1.7;
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* ── GRAIN TEXTURE ── */
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    background-image: ${GRAIN_SVG};
    pointer-events: none;
    z-index: 9999;
    opacity: 0.45;
  }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--gold-dim); border-radius: 2px; }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp   { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
  @keyframes pulse    { 0%,100% { opacity:1; } 50% { opacity:0.35; } }
  @keyframes spin     { to { transform: rotate(360deg); } }
  @keyframes breathe  { 0%,100% { transform:scale(1); opacity:0.7; } 50% { transform:scale(1.04); opacity:1; } }
  @keyframes shimmer  { 0% { background-position:-200% center; } 100% { background-position:200% center; } }
  @keyframes slideIn  { from { opacity:0; transform:translateX(-16px); } to { opacity:1; transform:translateX(0); } }
  @keyframes scaleIn  { from { opacity:0; transform:scale(0.94); } to { opacity:1; transform:scale(1); } }

  .fade-up    { animation: fadeUp 0.6s ease forwards; }
  .fade-up-d1 { animation: fadeUp 0.6s ease forwards 0.08s; opacity:0; }
  .fade-up-d2 { animation: fadeUp 0.6s ease forwards 0.16s; opacity:0; }
  .fade-up-d3 { animation: fadeUp 0.6s ease forwards 0.24s; opacity:0; }
  .fade-up-d4 { animation: fadeUp 0.6s ease forwards 0.32s; opacity:0; }
  .fade-up-d5 { animation: fadeUp 0.6s ease forwards 0.40s; opacity:0; }
  .fade-up-d6 { animation: fadeUp 0.6s ease forwards 0.48s; opacity:0; }

  button { cursor:pointer; border:none; background:none; font:inherit; color:inherit; }
  input, textarea, select { font:inherit; color:inherit; }
  a { color:inherit; text-decoration:none; }

  /* ── REUSABLE LAYOUT ── */
  .page-pad   { padding: 112px 40px 80px; }
  .max-720    { max-width: 720px;  margin: 0 auto; }
  .max-860    { max-width: 860px;  margin: 0 auto; }
  .max-1100   { max-width: 1100px; margin: 0 auto; }

  /* ── SECTION LABELS ── */
  .section-eyebrow {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.4em;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .section-eyebrow::after { content:''; flex:1; height:1px; background:var(--border); }

  .section-title {
    font-family: var(--font-display);
    font-size: clamp(28px,4vw,44px);
    font-weight: 700;
    color: var(--white);
    margin-bottom: 8px;
    line-height: 1.1;
  }

  .section-sub {
    font-size: 17px;
    font-style: italic;
    color: var(--text-dim);
    margin-bottom: 56px;
    font-weight: 300;
  }

  /* ── MONO LABEL ── */
  .mono-label {
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.35em;
    color: var(--gold);
    text-transform: uppercase;
  }

  /* ── SURFACE CARDS ── */
  .surface-card {
    background: var(--surface);
    border: 1px solid var(--border);
  }

  .surface-card-accent {
    background: var(--surface);
    border: 1px solid var(--border);
    position: relative;
    overflow: hidden;
  }

  .surface-card-accent::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px; height: 100%;
    background: linear-gradient(180deg, var(--gold), transparent);
  }

  /* ── PRIMARY BUTTON ── */
  .btn-primary {
    font-family: var(--font-display);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--bg);
    background: var(--gold);
    padding: 18px 40px;
    border-radius: 2px;
    border: none;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }
  .btn-primary::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.18) 50%,transparent 100%);
    background-size: 200% 100%;
    animation: shimmer 3s infinite;
  }
  .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(200,169,110,0.28); }

  /* ── GHOST BUTTON ── */
  .btn-ghost {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.15em;
    color: var(--text-dim);
    padding: 18px 32px;
    border: 1px solid var(--border);
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s;
    background: none;
  }
  .btn-ghost:hover { border-color:var(--border-bright); color:var(--text); }

  /* ── QUESTION INPUTS (used in Assessment) ── */
  .q-input {
    width: 100%;
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 14px 20px;
    font-size: 17px;
    color: var(--white);
    outline: none;
    transition: border-color 0.2s;
    border-radius: 2px;
    appearance: none;
    -webkit-appearance: none;
  }
  .q-input:focus { border-color: var(--gold-dim); }
  .q-input.textarea { resize:vertical; min-height:100px; line-height:1.5; padding-top:16px; }

  .q-range {
    flex: 1;
    -webkit-appearance: none;
    height: 2px;
    background: var(--border-bright);
    outline: none;
    border-radius: 1px;
  }
  .q-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px; height: 18px;
    border-radius: 50%;
    background: var(--gold);
    cursor: pointer;
    box-shadow: 0 0 8px rgba(200,169,110,0.35);
  }

  /* ── MULTISELECT ── */
  .multiselect-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px,1fr));
    gap: 8px;
  }
  .ms-option {
    padding: 10px 14px;
    border: 1px solid var(--border);
    border-radius: 2px;
    font-size: 13px;
    color: var(--text-dim);
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
    background: var(--surface);
    font-family: var(--font-mono);
    letter-spacing: 0.04em;
  }
  .ms-option:hover { border-color:var(--border-bright); color:var(--text); }
  .ms-option.selected { border-color:var(--gold-dim); color:var(--gold); background:var(--gold-glow); }

  /* ── DISCIPLINE SELECT GRID ── */
  .disc-select-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
  .disc-select-card {
    padding: 20px;
    border: 1px solid var(--border);
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s;
    background: var(--surface);
  }
  .disc-select-card:hover { border-color:var(--border-bright); }
  .disc-select-card.selected { border-color:rgba(200,169,110,0.4); background:var(--gold-glow); }

  /* ── METRICS ROW ── */
  .metrics-row {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 2px;
    background: var(--border);
    border: 1px solid var(--border);
    margin-bottom: 2px;
  }
  .metric-cell { background:var(--surface); padding:28px 24px; text-align:center; }
  .metric-value { font-family:var(--font-display); font-size:36px; font-weight:900; color:var(--white); display:block; margin-bottom:4px; }
  .metric-label { font-family:var(--font-mono); font-size:9px; letter-spacing:0.2em; color:var(--text-mute); text-transform:uppercase; }

  /* ── LEVEL BADGE ── */
  .level-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 5px 14px;
    border: 1px solid var(--gold-dim);
    color: var(--gold);
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    background: var(--gold-glow);
    border-radius: 2px;
  }

  /* ── SESSION ELEMENTS ── */
  .set-circle {
    width: 44px; height: 44px;
    border-radius: 50%;
    border: 1px solid var(--border-bright);
    display: flex; align-items:center; justify-content:center;
    font-family: var(--font-display);
    font-size: 13px; font-weight:700;
    color: var(--text-mute);
    cursor: pointer;
    transition: all 0.2s;
  }
  .set-circle.done    { background:var(--gold); border-color:var(--gold); color:var(--bg); }
  .set-circle.current { border-color:var(--gold); color:var(--gold); box-shadow:0 0 12px rgba(200,169,110,0.2); animation:breathe 2s infinite; }

  /* ── PILLAR BAR ── */
  .pillar-bar-track { background:var(--border-bright); height:3px; border-radius:2px; overflow:hidden; margin-top:6px; }
  .pillar-bar-fill  { height:100%; border-radius:2px; transition:width 1.2s cubic-bezier(0.16,1,0.3,1); }

  /* ── READINESS SLIDER LABEL ── */
  .readiness-slider-label {
    display: flex; justify-content:space-between; align-items:center;
    font-family: var(--font-mono); font-size:10px; letter-spacing:0.1em; color:var(--text-dim);
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  /* ── COMPLETE RING ── */
  .complete-ring {
    width: 120px; height: 120px;
    border-radius: 50%;
    border: 2px solid var(--gold);
    display: flex; align-items:center; justify-content:center;
    font-family: var(--font-display);
    font-size: 48px; color:var(--gold);
    margin: 0 auto 32px;
    box-shadow: 0 0 40px rgba(200,169,110,0.15), inset 0 0 40px rgba(200,169,110,0.05);
    animation: breathe 3s infinite;
  }

  /* ── MOBILE SAFE ZONES ── */
  @media (max-width: 640px) {
    .page-pad { padding: 88px 20px 60px; }
    .disc-select-grid { grid-template-columns: 1fr; }
    .metrics-row { grid-template-columns: repeat(3,1fr); }
    .multiselect-grid { grid-template-columns: 1fr 1fr; }
  }
`;

export default function GlobalStyles() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = GOOGLE_FONTS;
    document.head.appendChild(link);
  }, []);

  return <style>{CSS}</style>;
}
