const NAV_CSS = `
  .nav {
    position: fixed; top:0; left:0; right:0; z-index:100;
    display: flex; align-items:center; justify-content:space-between;
    padding: 18px 40px;
    background: rgba(8,8,9,0.85);
    backdrop-filter: blur(24px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: var(--font-display);
    font-size: 13px; font-weight:700;
    letter-spacing: 0.38em; color:var(--gold);
    text-transform: uppercase;
    cursor: pointer;
  }
  .nav-logo span { opacity:0.4; }
  .nav-tabs {
    display: flex; gap:2px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 3px; padding:3px;
  }
  .nav-tab {
    font-family: var(--font-mono);
    font-size: 10px; letter-spacing:0.1em;
    color: var(--text-mute);
    padding: 6px 14px;
    border-radius: 2px;
    transition: all 0.2s;
    cursor: pointer;
    border: none; background:none;
  }
  .nav-tab.active { background:var(--gold-glow); color:var(--gold); border:1px solid rgba(200,169,110,0.2); }
  .nav-tab:hover:not(.active) { color:var(--text-dim); }
  .nav-status {
    font-family: var(--font-mono);
    font-size: 10px; letter-spacing:0.08em;
    color: var(--text-mute);
  }
  .nav-status.active { color:var(--gold); }
  .nav-status.active::before { content:'● '; }

  @media (max-width: 640px) {
    .nav { padding: 14px 20px; }
    .nav-tab { padding: 5px 10px; font-size:9px; }
  }
`;

export default function Nav({ view, activeTab, navigateTo, hasDNA }) {
  const tabs = [
    { id: 'home',        label: 'Overview' },
    { id: 'disciplines', label: 'Disciplines' },
    { id: 'assessment',  label: 'Assess' },
    { id: 'program',     label: 'Dashboard', locked: !hasDNA },
  ];

  return (
    <>
      <style>{NAV_CSS}</style>
      <nav className="nav">
        <div className="nav-logo" onClick={() => navigateTo('home')}>
          APEX<span> ◆</span>
        </div>

        <div className="nav-tabs">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`nav-tab${activeTab === t.id ? ' active' : ''}`}
              onClick={() => { if (!t.locked) navigateTo(t.id); }}
              style={{ opacity: t.locked ? 0.4 : 1, cursor: t.locked ? 'not-allowed' : 'pointer' }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className={`nav-status${hasDNA ? ' active' : ''}`}>
          {hasDNA ? 'Active Program' : 'v2.0'}
        </div>
      </nav>
    </>
  );
}
