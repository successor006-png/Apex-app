import { useState, useEffect, useRef } from "react";

function useFonts() {
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap";
    document.head.appendChild(l);
  }, []);
}

const T = {
  bg:"#050508", panel:"#0A0A12", card:"#0F0F1A", cardHi:"#141425",
  border:"#1C1C30", borderHi:"#2A2A45",
  gold:"#D4A843", goldDim:"#8A6B25", goldBg:"rgba(212,168,67,0.07)",
  green:"#22C97B", greenDim:"#156640", greenBg:"rgba(34,201,123,0.07)",
  red:"#E05252", redBg:"rgba(224,82,82,0.07)",
  blue:"#4A90D9", blueBg:"rgba(74,144,217,0.07)",
  purple:"#9B6FE8", purpleBg:"rgba(155,111,232,0.07)",
  orange:"#E8873A", orangeBg:"rgba(232,135,58,0.07)",
  text:"#F0EDE6", muted:"#6B6880", faint:"#1A1828",
};
const FB = "'Bebas Neue', sans-serif";
const FN = "'DM Sans', sans-serif";
const FM = "'DM Mono', monospace";

// ─── PROGRESSION LADDERS ─────────────────────────────────────────────────────
const LADDERS = {
  push: {
    name: "Push Progression",
    icon: "💪",
    color: T.gold,
    levels: [
      { level:1, name:"Incline Push-Up", desc:"Hands elevated — reduced bodyweight load", target:"3×15 clean reps" },
      { level:2, name:"Standard Push-Up", desc:"Full ROM, chest to floor, body rigid", target:"3×20 clean reps" },
      { level:3, name:"Diamond Push-Up", desc:"Hands form a diamond under chest", target:"3×15 reps" },
      { level:4, name:"Deficit Push-Up", desc:"Hands elevated on surfaces, extra ROM at bottom", target:"3×12 reps" },
      { level:5, name:"Archer Push-Up", desc:"One arm straight to side, unilateral load", target:"3×8 each side" },
      { level:6, name:"Explosive Push-Up", desc:"Leave the ground on every rep", target:"4×8 reps" },
      { level:7, name:"Pseudo Planche Push-Up", desc:"Hands at hip level, body leaned forward", target:"3×10 reps" },
      { level:8, name:"Wall Handstand Hold", desc:"Inverted hold — full bodyweight on shoulders", target:"3×30s holds" },
      { level:9, name:"Wall Handstand Push-Up", desc:"Full range overhead pressing inverted", target:"3×5 reps" },
      { level:10, name:"Free Handstand Push-Up", desc:"Freestanding HSPU — elite skill", target:"5 clean reps" },
    ]
  },
  pull: {
    name: "Pull Progression",
    icon: "🔱",
    color: T.green,
    levels: [
      { level:1, name:"Dead Hang", desc:"Build grip strength and shoulder health", target:"3×60s holds" },
      { level:2, name:"Scapular Pull-Up", desc:"Shoulders only — scapula retraction/depression", target:"3×10 reps" },
      { level:3, name:"Negative Pull-Up", desc:"Jump to top, lower as slowly as possible (5–10s)", target:"3×8 negatives" },
      { level:4, name:"Standard Pull-Up", desc:"Full range, dead hang to chin over bar", target:"3×8 reps" },
      { level:5, name:"Wide-Grip Pull-Up", desc:"Elbows track directly to sides — V-taper builder", target:"4×10 reps" },
      { level:6, name:"Chin-Up (Weighted)", desc:"Add belt weight — supinated grip", target:"4×8 reps +10kg" },
      { level:7, name:"Gironda Pull-Up", desc:"Lean back 30°, bar to upper chest", target:"4×6 reps" },
      { level:8, name:"L-SIT Pull-Up", desc:"Full L-SIT position while pulling — elite core+pull", target:"3×5 reps" },
      { level:9, name:"Front Lever Row", desc:"Horizontal body, row from front lever", target:"3×5 reps" },
      { level:10, name:"One-Arm Chin-Up Negative", desc:"Single arm lowering — elite strength", target:"3×3 each arm" },
    ]
  },
  core: {
    name: "Core Progression",
    icon: "🔥",
    color: T.red,
    levels: [
      { level:1, name:"Dead Bug", desc:"Opposite arm/leg from floor — spinal stability", target:"3×10 each side" },
      { level:2, name:"Hollow Body Hold", desc:"Lower back pressed down, full body tension", target:"3×45s holds" },
      { level:3, name:"Plank", desc:"Perfect straight body tension", target:"3×60s holds" },
      { level:4, name:"Hanging Knee Raise", desc:"From dead hang, knees to chest", target:"3×15 reps" },
      { level:5, name:"Hanging Leg Raise", desc:"Straight legs to 90° — no swinging", target:"3×12 reps" },
      { level:6, name:"Toes to Bar", desc:"Straight legs touch the bar", target:"3×10 reps" },
      { level:7, name:"Ab Wheel Rollout", desc:"Full extension, return with lats", target:"3×12 reps" },
      { level:8, name:"L-SIT (Floor)", desc:"Both legs extended parallel — full hold", target:"3×20s holds" },
      { level:9, name:"Dragon Flag", desc:"Full body rigid plank lowering from bench", target:"3×6 reps" },
      { level:10, name:"Front Lever Hold", desc:"Horizontal body hang — elite gymnastic skill", target:"3×10s holds" },
    ]
  },
  legs: {
    name: "Leg Progression",
    icon: "🦵",
    color: T.blue,
    levels: [
      { level:1, name:"Bodyweight Squat", desc:"Full depth, knees over toes", target:"3×20 reps" },
      { level:2, name:"Reverse Lunge", desc:"Step back, control descent", target:"3×12 each leg" },
      { level:3, name:"Bulgarian Split Squat", desc:"Rear foot elevated — hardest single-leg squat", target:"3×10 each side" },
      { level:4, name:"Box Jump", desc:"Maximum height intent every rep", target:"4×8 reps" },
      { level:5, name:"Romanian Deadlift", desc:"Extreme hamstring stretch under load", target:"4×10 reps" },
      { level:6, name:"Barbell Back Squat", desc:"Below parallel — king of all exercises", target:"4×6 reps @BW" },
      { level:7, name:"Hack Squat", desc:"Bar behind heels — outer quad sweep", target:"4×10 reps" },
      { level:8, name:"Pistol Squat Negative", desc:"Single-leg squat descent — controlled", target:"3×5 each leg" },
      { level:9, name:"Pistol Squat", desc:"Full single-leg squat — athletic mastery", target:"3×8 each leg" },
      { level:10, name:"Sissy Squat", desc:"Extreme quad isolation under full load", target:"3×15 reps" },
    ]
  },
  fascia: {
    name: "Fascia Development",
    icon: "🌀",
    color: T.purple,
    levels: [
      { level:1, name:"Plantar Foam Roll", desc:"Daily fascial prep — foot adhesion release", target:"2 min/foot daily" },
      { level:2, name:"Elevated Towel Curl", desc:"Plantar fascia activation — THE foundation", target:"2–5 min/foot daily" },
      { level:3, name:"Barefoot Balance", desc:"Foot intelligence reactivation", target:"60s each leg, 3×/week" },
      { level:4, name:"Standing Retracted Hold", desc:"Full-body tensegrity from foot arch", target:"3×60s holds" },
      { level:5, name:"Hyperarch Hop (Bilateral)", desc:"Elastic spring system development", target:"3×2 min, 3×/week" },
      { level:6, name:"Deep Lunge Hold", desc:"Anterior hip fascial chain opening", target:"3×90s each side" },
      { level:7, name:"Marble Toe Grip", desc:"Foot-glute-core neural pathway", target:"2×3 min each side" },
      { level:8, name:"Single-Leg Hyperarch Hop", desc:"Single-leg elastic fascial loading", target:"2×60s each leg" },
      { level:9, name:"Spiral Walk", desc:"Full spiral/diagonal line integration", target:"3×3 min" },
      { level:10, name:"Silk Reiling (Tai Chi)", desc:"Complete fascial web in continuous motion", target:"10 min continuous" },
    ]
  },
  martial: {
    name: "Martial Arts Progression",
    icon: "🥋",
    color: T.orange,
    levels: [
      { level:1, name:"Shadowboxing Basics", desc:"Fundamental footwork and stance drills", target:"3×3 min" },
      { level:2, name:"Heavy Bag Work", desc:"Power generation and combination practice", target:"3×2 min rounds" },
      { level:3, name:"Speed Bag Drills", desc:"Hand-eye coordination and shoulder endurance", target:"3×2 min" },
      { level:4, name:"Mitt Work Fundamentals", desc:"Accuracy and timing with partner feedback", target:"3×2 min rounds" },
      { level:5, name:"Grappling Basics", desc:"Takedowns and positional control drills", target:"3×5 min" },
      { level:6, name:"Combination Chains", desc:"Complex striking sequences at tempo", target:"4×2 min rounds" },
      { level:7, name:"Sparring Light Contact", desc:"Technical sparring with controlled intensity", target:"3×3 min rounds" },
      { level:8, name:"Grappling Submission Drills", desc:"Submission escapes and counters", target:"3×5 min" },
      { level:9, name:"Advanced Sparring", desc:"Full-intensity technical sparring", target:"4×3 min rounds" },
      { level:10, name:"Competition Ready", desc:"Full-contact simulation with all techniques", target:"5×3 min rounds" },
    ]
  }
};

// ─── EXERCISE DATABASE BY EQUIPMENT ─────────────────────────────────────────
const EXERCISE_DB = {
  none: {
    push: ["Standard Push-Up", "Diamond Push-Up", "Incline Push-Up", "Explosive Push-Up", "Pike Push-Up", "Pseudo Planche Push-Up"],
    pull: ["Dead Hang", "Scapular Pull-Up", "Negative Pull-Up", "Inverted Rows (on low bar)"],
    legs: ["Bodyweight Squat", "Reverse Lunge", "Bulgarian Split Squat", "Pistol Squat Progression", "Jump Squats", "Single-Leg Deadlift"],
    core: ["Plank", "Dead Bug", "Hollow Body Hold", "Hanging Knee Raise", "Mountain Climbers", "Leg Raises"],
    martial: ["Shadowboxing", "Bodyweight Drills", "Footwork Patterns", "Stance Practice"]
  },
  pullup_bar: {
    push: ["Standard Push-Up", "Diamond Push-Up", "Pseudo Planche Push-Up", "Dips (if bar allows)", "Explosive Push-Up"],
    pull: ["Dead Hang", "Scapular Pull-Up", "Negative Pull-Up", "Standard Pull-Up", "Wide-Grip Pull-Up", "Chin-Up", "L-SIT Pull-Up", "Front Lever Rows"],
    legs: ["Bodyweight Squat", "Reverse Lunge", "Bulgarian Split Squat", "Hanging Knee Raise", "Toes to Bar"],
    core: ["Dead Bug", "Hollow Body Hold", "Plank", "Hanging Knee Raise", "Hanging Leg Raise", "Toes to Bar", "L-SIT (Floor)"],
    martial: ["Shadowboxing", "Heavy Bag Work", "Speed Bag Drills"]
  },
  dumbbells: {
    push: ["Dumbbell Bench Press", "Dumbbell Floor Press", "Dumbbell Shoulder Press", "Dumbbell Push-Ups", "Incline Dumbbell Press"],
    pull: ["Dumbbell Rows", "Single-Arm Rows", "Renegade Rows", "Dumbbell Pullovers", "Farmer's Carries"],
    legs: ["Dumbbell Goblet Squat", "Dumbbell Lunges", "Dumbbell Romanian Deadlift", "Dumbbell Step-Ups", "Single-Leg Deadlifts"],
    core: ["Dumbbell Pullovers", "Dumbbell Woodchops", "Farmer's Carries", "Suitcase Carries", "Dumbbell Twists"],
    martial: ["Dumbbell Shadowboxing", "Weighted Footwork", "Conditioning"]
  },
  barbell: {
    push: ["Barbell Bench Press", "Incline Bench Press", "Overhead Press", "Close-Grip Bench", "Floor Press"],
    pull: ["Barbell Rows", "Pendlay Rows", "Yates Rows", "Deadlifts", "Rack Pulls", "Barbell Curls"],
    legs: ["Barbell Back Squat", "Front Squat", "Romanian Deadlift", "Leg Press", "Hack Squat", "Leg Curls"],
    core: ["Weighted Planks", "Barbell Rollouts", "Landmine Rotations", "Ab Wheel Rollouts"],
    martial: ["Barbell Complex Training", "Olympic Lift Conditioning"]
  },
  full_gym: {
    push: ["Barbell Bench Press", "Incline Bench Press", "Dumbbell Press", "Machine Press", "Cable Flyes", "Overhead Press", "Weighted Dips"],
    pull: ["Lat Pulldown", "Seated Rows", "Cable Rows", "Barbell Rows", "Deadlifts", "Assisted Pull-Ups", "Barbell Curls", "Cable Curls"],
    legs: ["Leg Press", "Barbell Squat", "Leg Curl Machine", "Leg Extension", "Romanian Deadlift", "Hack Squat", "Smith Machine Squat"],
    core: ["Cable Woodchops", "Machine Crunches", "Landmine Rotations", "Ab Machine", "Weighted Planks"],
    martial: ["Heavy Bag Work", "Speed Bag", "Mitt Work", "Conditioning Equipment"]
  }
};

// ─── PHASE SYSTEM ─────────────────────────────────────────────────────────────
const PHASES = [
  {
    id:1, name:"Foundation", weeks:"Weeks 1–4", color:T.blue,
    focus:"Build the base — form mastery, fascia activation, joint health",
    intensity:"60–70%", volume:"Low–Medium",
    progressionKey:"Perfect form on all movements. Introduce fascia protocol. Build the morning ritual habit.",
    overloadMethod:"Add 1 rep per set each week. Focus on feeling the target muscle.",
    deloadWeek:4,
    reps:"12-15", sets:3, rpe:"5-6",
  },
  {
    id:2, name:"Build", weeks:"Weeks 5–10", color:T.gold,
    focus:"Progressive overload — increase volume and intensity systematically",
    intensity:"70–80%", volume:"Medium–High",
    progressionKey:"Increase weight or difficulty every 1–2 weeks. Move up skill ladders. Track PRs.",
    overloadMethod:"Add weight or progress to next ladder level when you hit the top of the rep range.",
    deloadWeek:10,
    reps:"8-12", sets:4, rpe:"6-7",
  },
  {
    id:3, name:"Strength", weeks:"Weeks 11–16", color:T.orange,
    focus:"Heavy compound work — maximum strength stimulus across all movements",
    intensity:"80–90%", volume:"High",
    progressionKey:"Lower rep ranges, higher intensity. This is where real strength is built.",
    overloadMethod:"Work in 3–5 rep ranges on main lifts. Add weight every session if possible.",
    deloadWeek:16,
    reps:"5-8", sets:5, rpe:"7-8",
  },
  {
    id:4, name:"Peak", weeks:"Weeks 17–20", color:T.red,
    focus:"Maximum performance — test your limits, skill display, body composition peak",
    intensity:"90–100%", volume:"Medium (quality over quantity)",
    progressionKey:"Showcase phase. Test 1RMs, demonstrate skills, push fascia work to advanced protocols.",
    overloadMethod:"Max effort on compound lifts. Advanced ladder skills. Full fascia integration.",
    deloadWeek:20,
    reps:"3-6", sets:5, rpe:"8-9",
  }
];

// ─── ONBOARDING ───────────────────────────────────────────────────────────────
const QUESTIONS = [
  { id:"name", type:"text", q:"What's your name?", sub:"Let's make this personal.", ph:"Your first name" },
  { id:"age", type:"number", q:"How old are you?", ph:"e.g. 21" },
  { id:"height", type:"text", q:"Current height?", sub:"ft/in or cm", ph:"e.g. 5'9\" or 175cm" },
  { id:"weight", type:"text", q:"Current weight?", sub:"lbs or kg", ph:"e.g. 160 lbs or 72 kg" },
  {
    id:"primary_goal", type:"single", q:"Your #1 goal?", sub:"This shapes everything.",
    opts:[
      { v:"physique", l:"🔱 Aesthetic Physique", s:"V-taper, visible abs, proportional" },
      { v:"strength", l:"⚡ Raw Strength", s:"Compound power on the big lifts" },
      { v:"height", l:"📏 Maximize Height", s:"Posture, spine, growth protocols" },
      { v:"calisthenics", l:"🤸 Calisthenics Skills", s:"Handstands, L-SIT, front lever" },
      { v:"martial", l:"🥋 Martial Arts", s:"Combat sports training & conditioning" },
      { v:"all", l:"🏆 Complete Athlete", s:"Physique + Strength + Fascia + Height" },
    ]
  },
  {
    id:"experience", type:"single", q:"Experience level?",
    opts:[
      { v:"beginner", l:"🌱 Beginner", s:"< 1 year consistent" },
      { v:"intermediate", l:"🔥 Intermediate", s:"1–3 years" },
      { v:"advanced", l:"⚔️ Advanced", s:"3+ years" },
    ]
  },
  {
    id:"days", type:"single", q:"Days/week to train?",
    opts:[
      { v:"3", l:"3 days", s:"Sustainable sweet spot" },
      { v:"4", l:"4 days", s:"Serious progress territory" },
      { v:"5", l:"5 days", s:"Full system — athlete mode" },
    ]
  },
  {
    id:"duration", type:"single", q:"Session length?",
    opts:[
      { v:"45", l:"45 min", s:"Focused and efficient" },
      { v:"60", l:"60 min", s:"Standard full session" },
      { v:"90", l:"90 min", s:"Deep work, max volume" },
    ]
  },
  {
    id:"equipment", type:"multi", q:"Equipment available?",
    opts:[
      { v:"none", l:"🏃 Bodyweight only" },
      { v:"pullup_bar", l:"🔄 Pull-up bar" },
      { v:"dumbbells", l:"🏋️ Dumbbells" },
      { v:"barbell", l:"⚡ Barbell + plates" },
      { v:"full_gym", l:"🏟️ Full gym" },
    ]
  },
  {
    id:"weaknesses", type:"multi", q:"Biggest weak points?",
    opts:[
      { v:"back_width", l:"Back width / V-taper" },
      { v:"shoulders", l:"Shoulder width & caps" },
      { v:"arms", l:"Arms — bi & triceps" },
      { v:"core", l:"Core & abs" },
      { v:"legs", l:"Legs & glutes" },
      { v:"posture", l:"Posture & spine" },
      { v:"explosiveness", l:"Speed & explosiveness" },
    ]
  },
  { id:"injuries", type:"textarea", q:"Injuries or limitations?", sub:"We'll work around everything.", ph:"e.g. left knee pain... or 'None'" },
];

// ─── STORAGE ──────────────────────────────────────────────────────────────────
const STORE = {
  save: (key, val) => { try { localStorage.setItem(`apex_${key}`, JSON.stringify(val)); } catch(e){} },
  load: (key, def) => { try { const v = localStorage.getItem(`apex_${key}`); return v ? JSON.parse(v) : def; } catch(e){ return def; } },
};

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function PBar({ pct, color=T.gold, h=4 }) {
  return (
    <div style={{ background:T.faint, borderRadius:100, height:h, overflow:"hidden" }}>
      <div style={{ background:color, height:"100%", width:`${Math.min(100,Math.max(0,pct))}%`, borderRadius:100, transition:"width 0.4s ease" }}/>
    </div>
  );
}

function Card({ children, style={}, onClick, accent }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:hov&&onClick?T.cardHi:T.card, border:`1px solid ${hov&&onClick?T.borderHi:T.border}`, borderRadius:12,
        ...(accent ? { borderLeft:`3px solid ${accent}` } : {}),
        cursor:onClick?"pointer":"default", transition:"all 0.15s", ...style }}>
      {children}
    </div>
  );
}

function Tag({ children, color=T.muted }) {
  return <span style={{ background:`${color}18`, border:`1px solid ${color}35`, color, borderRadius:100, padding:"2px 10px", fontSize:10, fontFamily:FM }}>{children}</span>;
}

function Btn({ children, onClick, color=T.gold, full, small, disabled, ghost }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} disabled={disabled}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8,
        width:full?"100%":"auto", padding:small?"8px 16px":"14px 28px",
        background:disabled?T.faint:ghost?"transparent":h?`${color}22`:`${color}12`,
        border:`1px solid ${disabled?T.border:ghost?T.border:h?color:`${color}50`}`,
        borderRadius:8, color:disabled?T.muted:color, fontFamily:FN, fontSize:small?12:14,
        fontWeight:600, cursor:disabled?"not-allowed":"pointer", letterSpacing:"0.04em", transition:"all 0.15s" }}>
      {children}
    </button>
  );
}

// ─── ONBOARDING ───────────────────────────────────────────────────────────────
function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const q = QUESTIONS[step];
  const total = QUESTIONS.length;
  const val = answers[q.id];

  const canNext = () => {
    if (q.type==="text"||q.type==="number"||q.type==="textarea") return val&&String(val).trim().length>0;
    if (q.type==="single") return !!val;
    if (q.type==="multi") return val&&val.length>0;
    return true;
  };

  const setVal = v => setAnswers(a=>({...a,[q.id]:v}));
  const toggleMulti = v => { const c=val||[]; setVal(c.includes(v)?c.filter(x=>x!==v):[...c,v]); };
  const next = () => { if(!canNext())return; if(step<total-1) setStep(s=>s+1); else onComplete(answers); };
  const back = () => { if(step>0) setStep(s=>s-1); };

  return (
    <div style={{ minHeight:"100vh", background:T.bg, display:"flex", flexDirection:"column" }}>
      <div style={{ padding:"20px 24px 0" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <span style={{ fontFamily:FB, fontSize:24, color:T.gold, letterSpacing:"0.05em" }}>APEX</span>
          <span style={{ fontFamily:FM, fontSize:11, color:T.muted }}>{step+1}/{total}</span>
        </div>
        <PBar pct={(step/total)*100} />
      </div>
      <div style={{ flex:1, padding:"32px 24px 24px", display:"flex", flexDirection:"column", gap:24, overflowY:"auto" }}>
        <div>
          <div style={{ fontFamily:FM, fontSize:10, color:T.gold, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:10 }}>STEP {step+1}</div>
          <h2 style={{ fontFamily:FB, fontSize:34, color:T.text, margin:"0 0 6px", lineHeight:1.1 }}>{q.q}</h2>
          {q.sub && <p style={{ fontFamily:FN, fontSize:13, color:T.muted, margin:0 }}>{q.sub}</p>}
        </div>
        {(q.type==="text"||q.type==="number") && (
          <input type={q.type} value={val||""} onChange={e=>setVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&canNext()&&next()} placeholder={q.ph}
            style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:10, padding:"16px 18px", color:T.text, fontFamily:FN, fontSize:16, width:"100%", outline:"none" }}/>
        )}
        {q.type==="textarea" && (
          <textarea value={val||""} onChange={e=>setVal(e.target.value)} placeholder={q.ph} rows={4}
            style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:10, padding:"16px 18px", color:T.text, fontFamily:FN, fontSize:14, width:"100%", outline:"none", resize:"vertical", lineHeight:1.6 }}/>
        )}
        {q.type==="single" && (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {q.opts.map(opt=>{
              const active=val===opt.v;
              return (
                <div key={opt.v} onClick={()=>setVal(opt.v)} style={{ background:active?T.goldBg:T.card, border:`1.5px solid ${active?T.gold:T.border}`, borderRadius:10, padding:"14px 18px", cursor:"pointer", transition:"all 0.15s" }}>
                  <div style={{ fontFamily:FN, fontSize:15, fontWeight:600, color:active?T.gold:T.text }}>{opt.l}</div>
                  {opt.s && <div style={{ fontFamily:FN, fontSize:12, color:T.muted, marginTop:3 }}>{opt.s}</div>}
                </div>
              );
            })}
          </div>
        )}
        {q.type==="multi" && (
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {q.opts.map(opt=>{
              const active=(val||[]).includes(opt.v);
              return (
                <div key={opt.v} onClick={()=>toggleMulti(opt.v)} style={{ background:active?T.greenBg:T.card, border:`1.5px solid ${active?T.green:T.border}`, borderRadius:10, padding:"12px 18px", cursor:"pointer", display:"flex", alignItems:"center", gap:12, transition:"all 0.15s" }}>
                  <div style={{ width:20, height:20, borderRadius:6, border:`2px solid ${active?T.green:T.border}`, background:active?T.green:"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    {active && <span style={{ color:"#000", fontSize:12, fontWeight:800 }}>✓</span>}
                  </div>
                  <span style={{ fontFamily:FN, fontSize:14, fontWeight:500, color:active?T.green:T.text }}>{opt.l}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div style={{ padding:"16px 24px 32px", display:"flex", gap:12 }}>
        {step>0 && <Btn onClick={back} color={T.muted}>← Back</Btn>}
        <Btn onClick={next} disabled={!canNext()} color={T.gold} full>{step===total-1?"Build My System →":"Next →"}</Btn>
      </div>
    </div>
  );
}

// ─── GENERATING ───────────────────────────────────────────────────────────────
function Generating({ profile, onDone }) {
  const [statusIdx, setStatusIdx] = useState(0);
  const steps = ["Analyzing your profile…","Designing 4-phase progression…","Building skill ladders…","Calibrating weekly loads…","Programming deload weeks…","Finalizing your 20-week system…"];

  useEffect(() => {
    let i=0;
    const iv = setInterval(()=>{ i++; if(i<steps.length) setStatusIdx(i); }, 1400);
    generate();
    return ()=>clearInterval(iv);
  }, []);

  const generate = async () => {
    const equipmentList = (profile.equipment||[]).join(", ");
    const prompt = `You are an elite athletic programmer creating a complete 20-week periodized training system.

ATHLETE PROFILE:
- Name: ${profile.name}, Age: ${profile.age}
- Height: ${profile.height}, Weight: ${profile.weight}
- Primary Goal: ${profile.primary_goal}
- Experience: ${profile.experience}
- Training Days/Week: ${profile.days}
- Session Duration: ${profile.duration} min
- Equipment: ${equipmentList}
- Weak Points: ${(profile.weaknesses||[]).join(", ")}
- Injuries: ${profile.injuries||"None"}

CRITICAL RULES:
1. ONLY use exercises that match available equipment: ${equipmentList}
2. NEVER suggest exercises requiring unavailable equipment
3. If equipment is "bodyweight only", use ONLY bodyweight exercises
4. If equipment includes "pullup_bar", you can use pull-ups, dead hangs, etc.
5. Match exercise difficulty to ${profile.experience} level
6. Each phase must be progressively harder
7. Use real, proven exercise names only

Create a personalized 20-week system with 4 phases. Return ONLY valid JSON:
{
  "programName": "Dramatic custom name including their name",
  "tagline": "One powerful line",
  "primaryColor": "gold|green|red|blue|purple|orange",
  "analysis": "2-3 sentences on why this design",
  "keyInsight": "The single most important principle for this specific athlete",
  "phases": [
    {
      "id": 1,
      "name": "Foundation",
      "weeks": "Weeks 1–4",
      "focus": "what this phase builds",
      "intensityPct": 65,
      "weeklySchedule": [
        {
          "day": "Monday",
          "sessionName": "Session name",
          "exercises": [
            {"name":"Exercise Name","sets":3,"reps":"8-12","rpe":"6-7","progression":"How to progress this exercise each week","note":"Brief coaching cue"}
          ]
        }
      ]
    },
    {
      "id": 2,
      "name": "Build",
      "weeks": "Weeks 5–10",
      "focus": "...",
      "intensityPct": 75,
      "weeklySchedule": [...]
    },
    {
      "id": 3,
      "name": "Strength",
      "weeks": "Weeks 11–16",
      "focus": "...",
      "intensityPct": 85,
      "weeklySchedule": [...]
    },
    {
      "id": 4,
      "name": "Peak",
      "weeks": "Weeks 17–20",
      "focus": "...",
      "intensityPct": 92,
      "weeklySchedule": [...]
    }
  ],
  "fasciaProgression": {
    "phase1": ["exercise 1", "exercise 2"],
    "phase2": ["exercise 1", "exercise 2", "exercise 3"],
    "phase3": ["exercise 1", "exercise 2", "exercise 3", "exercise 4"],
    "phase4": ["exercise 1", "exercise 2", "exercise 3", "exercise 4", "exercise 5"]
  },
  "milestones": [
    {"week":4,"title":"Phase 1 Complete","description":"What they should achieve"},
    {"week":8,"title":"Build Midpoint","description":"..."},
    {"week":12,"title":"Strength Phase","description":"..."},
    {"week":16,"title":"Strength Complete","description":"..."},
    {"week":20,"title":"PEAK","description":"The final transformation"}
  ],
  "morningRitual": [
    {"name":"practice name","duration":"X min","note":"why for this person"}
  ],
  "nutritionNote": "Personalized guidance",
  "sleepNote": "Sleep guidance",
  "weeklyStructure": "Logic behind the split"
}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:4000, messages:[{role:"user",content:prompt}] })
      });
      const data = await res.json();
      const text = data.content[0].text;
      const clean = text.replace(/```json|```/g,"").trim();
      const parsed = JSON.parse(clean);
      setTimeout(()=>onDone(parsed), 800);
    } catch(err) {
      setTimeout(()=>onDone(buildFallback(profile)), 800);
    }
  };

  const buildFallback = (p) => {
    const days = parseInt(p.days)||3;
    const dayNames = ["Monday","Wednesday","Friday","Saturday","Tuesday"].slice(0,days);
    const equipment = p.equipment || [];
    
    // Get exercises based on equipment
    const getExercises = (category) => {
      for (let eq of equipment) {
        if (EXERCISE_DB[eq] && EXERCISE_DB[eq][category]) {
          return EXERCISE_DB[eq][category];
        }
      }
      return EXERCISE_DB.none[category] || [];
    };

    const makeSchedule = (intensity, exSets) => dayNames.map((day,i)=>({
      day, sessionName:["Pull","Push","Legs","Power","Fascia"][i%5],
      exercises: exSets[i%exSets.length]
    }));

    const phase1Exs = [
      [
        {name: getExercises("pull")[0] || "Dead Hang", sets:3, reps:"5-8", rpe:"6", progression:"Add 1 rep per set each week", note:"Perfect form only"},
        {name: "Hollow Body Hold", sets:3, reps:"3×30s", rpe:"5", progression:"Extend hold time by 5s weekly", note:"Golden era waist"},
        {name: getExercises("core")[0] || "Plank", sets:3, reps:"30s", rpe:"4", progression:"Add 5s per week", note:"Decompress the spine"}
      ],
      [
        {name: getExercises("push")[0] || "Standard Push-Up", sets:3, reps:"10-15", rpe:"6", progression:"Add 2 reps per set each week", note:"Chest to floor"},
        {name: getExercises("push")[1] || "Diamond Push-Up", sets:3, reps:"8-10", rpe:"6", progression:"Add 2 reps per set each week", note:"Core tight throughout"},
        {name: getExercises("push")[2] || "Incline Push-Up", sets:3, reps:"15", rpe:"5", progression:"Add 1 rep per set each week", note:"Lead with chest"}
      ],
      [
        {name: getExercises("legs")[0] || "Bodyweight Squat", sets:3, reps:"8-10", rpe:"6", progression:"Add 1 rep per set each week", note:"Front shin stays vertical"},
        {name: getExercises("core")[1] || "Hollow Body Hold", sets:3, reps:"30s", rpe:"6", progression:"Add 10s per week", note:"Lower back to floor"},
        {name: "Cat-Cow", sets:2, reps:"2 min", rpe:"3", progression:"Add 30s each week", note:"Every spinal segment"}
      ],
      [
        {name: getExercises("legs")[1] || "Reverse Lunge", sets:3, reps:"10", rpe:"6", progression:"Add 5 reps each week", note:"Push hips back not down"},
        {name: "Bear Crawl", sets:3, reps:"20m", rpe:"6", progression:"Add 5m per week", note:"Hips LOW at all times"},
        {name: "Farmer's Walk", sets:3, reps:"20m", rpe:"6", progression:"Add 5kg each week", note:"Chest up walk fast"}
      ],
      [
        {name: "Elevated Towel Curl", sets:1, reps:"2 min/foot", rpe:"3", progression:"Add 30s per week", note:"Eyes closed at end"},
        {name: "Hyperarch Hop (Bilateral)", sets:2, reps:"2 min", rpe:"4", progression:"Add 30s per set each week", note:"Soft elastic hops"},
        {name: "Deep Lunge Hold", sets:3, reps:"60s/side", rpe:"4", progression:"Arms overhead week 2", note:"Breathe into the hip"}
      ],
    ];

    return {
      programName:`${p.name}'s 20-Week APEX System`, tagline:"Four phases. One transformation.", primaryColor:"gold",
      analysis:`Built around your ${p.days} training days, ${p.experience} level, and available equipment. Progressively harder across 4 phases over 20 weeks. Every session builds on the last.`,
      keyInsight:"Consistency over 20 weeks beats intensity over 4. Trust the phases.",
      phases: PHASES.map((ph,pi)=>({
        id:ph.id, name:ph.name, weeks:ph.weeks, focus:ph.focus, intensityPct:ph.intensity.split("–")[0].replace("%",""),
        weeklySchedule: makeSchedule(ph.intensityPct, phase1Exs)
      })),
      fasciaProgression:{ phase1:["Elevated Towel Curl","Barefoot Balance"], phase2:["Elevated Towel Curl","Hyperarch Hop (Bilateral)","Standing Retracted Hold"], phase3:["Elevated Towel Curl","Hyperarch Hop (Bilateral)","Deep Lunge Hold","Marble Toe Grip"], phase4:["Elevated Towel Curl","Hyperarch Hop (Bilateral)","Single-Leg Hyperarch Hop","Spiral Walk","Silk Reiling (Tai Chi)"] },
      milestones:[{week:4,title:"Foundation Complete",description:"Consistent with morning ritual, form mastered on all Phase 1 lifts"},{week:8,title:"Build Midpoint",description:"Noticeable strength gains, fascia protocol feels natural"},{week:12,title:"Strength Phase",description:"PRs on all major lifts, visible physique changes"},{week:16,title:"Strength Complete",description:"Full Phase 3 completion — peak strength base built"},{week:20,title:"TRANSFORMATION COMPLETE",description:"20 weeks in. This is who you are now."}],
      morningRitual:[{name:"Elevated Towel Curl",duration:"4 min",note:"Activate the entire fascial chain"},{name:"Dead Hang",duration:"3×30s",note:"Spine decompression before the day"},{name:"Stomach Vacuum",duration:"3×30s",note:"The Golden Era waist builder"},{name:"Mountain Pose",duration:"1 min",note:"Own your full height every morning"}],
      nutritionNote:"1g protein per pound of bodyweight. Add Vitamin C to support fascia/collagen synthesis.",
      sleepNote:"Before 10PM targets peak HGH release (10PM–12AM). This is when your body rebuilds everything.",
      weeklyStructure:`Your ${p.days}-day split alternates push/pull/legs to maximize recovery between sessions.`
    };
  };

  return (
    <div style={{ minHeight:"100vh", background:T.bg, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ textAlign:"center", maxWidth:340 }}>
        <div style={{ width:80, height:80, margin:"0 auto 28px", position:"relative" }}>
          <svg viewBox="0 0 80 80" style={{ width:80, height:80, animation:"spin 1.8s linear infinite" }}>
            <circle cx="40" cy="40" r="34" fill="none" stroke={T.faint} strokeWidth="5"/>
            <circle cx="40" cy="40" r="34" fill="none" stroke={T.gold} strokeWidth="5" strokeDasharray="55 160" strokeLinecap="round"/>
          </svg>
          <span style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:FB, fontSize:24, color:T.gold }}>A</span>
        </div>
        <div style={{ fontFamily:FB, fontSize:30, color:T.text, marginBottom:10, letterSpacing:"0.03em" }}>Designing Your System</div>
        <div style={{ fontFamily:FN, fontSize:14, color:T.muted, lineHeight:1.6 }}>{steps[statusIdx]}</div>
        <div style={{ display:"flex", gap:6, justifyContent:"center", marginTop:20 }}>
          {steps.map((_,i)=>(
            <div key={i} style={{ width:6, height:6, borderRadius:"50%", background:i<=statusIdx?T.gold:T.faint, transition:"background 0.3s" }}/>
          ))}
        </div>
        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
function MainApp({ profile, program, onReset }) {
  const [view, setView] = useState("home");
  const [currentWeek, setCurrentWeek] = useState(() => STORE.load("week", 1));
  const [currentPhaseId, setCurrentPhaseId] = useState(() => STORE.load("phase", 1));
  const [loggedSets, setLoggedSets] = useState(() => STORE.load("sets", {}));
  const [metrics, setMetrics] = useState(() => STORE.load("metrics", []));
  const [modalEx, setModalEx] = useState(null);
  const [showTimer, setShowTimer] = useState(false);
  const [timerSec, setTimerSec] = useState(90);
  const [timerPreset, setTimerPreset] = useState(90);
  const [timerRunning, setTimerRunning] = useState(false);
  const [ladderLevels, setLadderLevels] = useState(() => STORE.load("ladders", { push:1, pull:1, core:1, legs:1, fascia:1, martial:1 }));
  const [activeSessionDay, setActiveSessionDay] = useState(null);
  const [showWeekly, setShowWeekly] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState(() => STORE.load("selectedExercises", null));
  const [useManualSelection, setUseManualSelection] = useState(() => STORE.load("useManualSelection", false));
  const [addMetric, setAddMetric] = useState(false);
  const [newWeight, setNewWeight] = useState("");
  const [newNote, setNewNote] = useState("");

  const colKey = program.primaryColor || "gold";
  const col = {gold:T.gold,green:T.green,red:T.red,blue:T.blue,purple:T.purple,orange:T.orange}[colKey] || T.gold;
  const colBg = {gold:T.goldBg,green:T.greenBg,red:T.redBg,blue:T.blueBg,purple:T.purpleBg,orange:T.orangeBg}[colKey] || T.goldBg;

  const currentPhase = program.phases?.find(p=>p.id===currentPhaseId) || program.phases?.[0];
  const totalWeeks = 20;
  const overallPct = Math.round((currentWeek/totalWeeks)*100);

  // Timer
  const timerRef = useRef(null);
  useEffect(()=>{
    if(timerRunning&&timerSec>0){ timerRef.current=setInterval(()=>setTimerSec(s=>s-1),1000); }
    else{ clearInterval(timerRef.current); if(timerSec===0) setTimerRunning(false); }
    return ()=>clearInterval(timerRef.current);
  },[timerRunning,timerSec]);

  useEffect(()=>{ STORE.save("week",currentWeek); },[currentWeek]);
  useEffect(()=>{ STORE.save("phase",currentPhaseId); },[currentPhaseId]);
  useEffect(()=>{ STORE.save("sets",loggedSets); },[loggedSets]);
  useEffect(()=>{ STORE.save("ladders",ladderLevels); },[ladderLevels]);
  useEffect(()=>{ STORE.save("metrics",metrics); },[metrics]);
  useEffect(()=>{ STORE.save("selectedExercises",selectedExercises); },[selectedExercises]);
  useEffect(()=>{ STORE.save("useManualSelection",useManualSelection); },[useManualSelection]);

  const advanceWeek = () => {
    const newWeek = currentWeek + 1;
    setCurrentWeek(newWeek);
    if(newWeek<=4) setCurrentPhaseId(1);
    else if(newWeek<=10) setCurrentPhaseId(2);
    else if(newWeek<=16) setCurrentPhaseId(3);
    else setCurrentPhaseId(4);
    setLoggedSets({});
    setShowWeekly(true);
  };

  const toggleSet = (dayIdx, exIdx, setIdx) => {
    const key=`${dayIdx}-${exIdx}-${setIdx}`;
    setLoggedSets(p=>({...p,[key]:!p[key]}));
  };

  const getPhaseColor = (id) => [T.blue,T.gold,T.orange,T.red][id-1]||T.gold;

  // ─── EXERCISE MODAL ──
  const ExModal = () => {
    if(!modalEx) return null;
    const pc = getPhaseColor(currentPhaseId);
    return (
      <div style={{ position:"fixed",inset:0,zIndex:600,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"flex-end" }} onClick={()=>setModalEx(null)}>
        <div onClick={e=>e.stopPropagation()} style={{ background:T.panel,border:`1px solid ${T.borderHi}`,borderRadius:"20px 20px 0 0",padding:"24px 20px 44px",width:"100%",maxWidth:600,maxHeight:"80vh",overflowY:"auto" }}>
          <div style={{ width:36,height:3,background:T.border,borderRadius:2,margin:"0 auto 20px" }}/>
          <h2 style={{ fontFamily:FB,fontSize:28,color:T.text,margin:"0 0 8px",letterSpacing:"0.02em" }}>{modalEx.name}</h2>
          {(modalEx.sets||modalEx.reps) && (
            <div style={{ display:"flex",gap:10,marginBottom:14 }}>
              {modalEx.sets && <div style={{ padding:"8px 14px",background:T.card,borderRadius:8,textAlign:"center" }}><div style={{ fontFamily:FM,fontSize:18,color:T.text }}>{modalEx.sets}</div><div style={{ fontFamily:FN,fontSize:9,color:T.muted }}>SETS</div></div>}
              {modalEx.reps && <div style={{ padding:"8px 14px",background:T.card,borderRadius:8,textAlign:"center" }}><div style={{ fontFamily:FM,fontSize:14,color:T.text }}>{modalEx.reps}</div><div style={{ fontFamily:FN,fontSize:9,color:T.muted }}>REPS</div></div>}
              {modalEx.rpe && <div style={{ padding:"8px 14px",background:T.card,borderRadius:8,textAlign:"center" }}><div style={{ fontFamily:FM,fontSize:14,color:T.text }}>RPE {modalEx.rpe}</div><div style={{ fontFamily:FN,fontSize:9,color:T.muted }}>EFFORT</div></div>}
            </div>
          )}
          {modalEx.note && (
            <div style={{ background:colBg,border:`1px solid ${col}30`,borderLeft:`3px solid ${col}`,borderRadius:8,padding:"12px 14px",marginBottom:12 }}>
              <div style={{ fontFamily:FM,fontSize:9,color:col,letterSpacing:"0.1em",marginBottom:4 }}>COACHING CUE</div>
              <p style={{ fontFamily:FN,fontSize:13,color:T.text,lineHeight:1.7,margin:0 }}>{modalEx.note}</p>
            </div>
          )}
          {modalEx.progression && (
            <div style={{ background:T.greenBg,border:`1px solid ${T.green}30`,borderLeft:`3px solid ${T.green}`,borderRadius:8,padding:"12px 14px",marginBottom:12 }}>
              <div style={{ fontFamily:FM,fontSize:9,color:T.green,letterSpacing:"0.1em",marginBottom:4 }}>HOW TO PROGRESS</div>
              <p style={{ fontFamily:FN,fontSize:13,color:T.text,lineHeight:1.7,margin:0 }}>{modalEx.progression}</p>
            </div>
          )}
          {modalEx.description && (
            <div style={{ background:T.card,border:`1px solid ${T.border}`,borderRadius:8,padding:"12px 14px" }}>
              <div style={{ fontFamily:FM,fontSize:9,color:T.muted,letterSpacing:"0.1em",marginBottom:4 }}>LADDER DESCRIPTION</div>
              <p style={{ fontFamily:FN,fontSize:13,color:T.muted,lineHeight:1.7,margin:0 }}>{modalEx.description}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── REST TIMER ──
  const Timer = () => (
    <div style={{ position:"fixed",bottom:74,right:14,zIndex:400,background:T.panel,border:`1px solid ${T.borderHi}`,borderRadius:16,padding:16,width:180,boxShadow:"0 8px 32px rgba(0,0,0,0.7)" }}>
      <div style={{ display:"flex",justifyContent:"space-between",marginBottom:10 }}>
        <span style={{ fontFamily:FM,fontSize:9,color:T.muted,letterSpacing:"0.1em" }}>REST TIMER</span>
        <button onClick={()=>setShowTimer(false)} style={{ background:"none",border:"none",color:T.muted,cursor:"pointer",fontSize:14,padding:0 }}>✕</button>
      </div>
      <div style={{ textAlign:"center",marginBottom:12 }}>
        <span style={{ fontFamily:FB,fontSize:52,color:timerSec>20?T.green:timerSec>5?T.gold:T.red,letterSpacing:"0.02em" }}>{timerSec}</span>
        <div style={{ fontFamily:FN,fontSize:11,color:T.muted }}>seconds</div>
      </div>
      <div style={{ display:"flex",gap:5,marginBottom:8 }}>
        {[60,90,120].map(s=>(
          <button key={s} onClick={()=>{setTimerSec(s);setTimerPreset(s);setTimerRunning(true);}} style={{ flex:1,padding:"5px 0",background:timerPreset===s?colBg:T.card,border:`1px solid ${timerPreset===s?col:T.border}`,borderRadius:5,color:timerPreset===s?col:T.muted,fontFamily:FM,fontSize:9,cursor:"pointer" }}>{s}s</button>
        ))}
      </div>
      <button onClick={()=>{ if(timerRunning){setTimerRunning(false);}else if(timerSec===0){setTimerSec(timerPreset);setTimerRunning(true);}else{setTimerRunning(true);} }} style={{ width:"100%",padding:"8px 0",background:colBg,border:`1px solid ${col}40`,borderRadius:6,color:col,fontFamily:FN,fontSize:12,fontWeight:600,cursor:"pointer" }}>
        {timerRunning?"PAUSE":timerSec===0?"RESET":"START"}
      </button>
    </div>
  );

  // ─── WEEKLY CHECK-IN MODAL ──
  const WeeklyCheckIn = () => {
    const [feeling, setFeeling] = useState(null);
    const [weight, setWeight] = useState("");
    const done = () => {
      if(weight) { setMetrics(m=>[...m,{week:currentWeek,weight,feeling,date:new Date().toLocaleDateString()}]); }
      setShowWeekly(false);
    };
    return (
      <div style={{ position:"fixed",inset:0,zIndex:700,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}>
        <div style={{ background:T.panel,border:`1px solid ${T.borderHi}`,borderRadius:20,padding:"28px 24px",width:"100%",maxWidth:400 }}>
          <div style={{ fontFamily:FM,fontSize:10,color:col,letterSpacing:"0.12em",marginBottom:6 }}>WEEK {currentWeek} COMPLETE</div>
          <h2 style={{ fontFamily:FB,fontSize:28,color:T.text,margin:"0 0 20px" }}>Weekly Check-In</h2>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontFamily:FN,fontSize:13,color:T.muted,marginBottom:8 }}>How did this week feel?</div>
            <div style={{ display:"flex",gap:8 }}>
              {["😴 Rough","😐 OK","💪 Strong","🔥 Beast"].map((f,i)=>(
                <div key={i} onClick={()=>setFeeling(f)} style={{ flex:1,padding:"10px 4px",background:feeling===f?colBg:T.card,border:`1px solid ${feeling===f?col:T.border}`,borderRadius:8,cursor:"pointer",textAlign:"center",fontFamily:FN,fontSize:11,color:feeling===f?col:T.muted }}>
                  {f.split(" ")[0]}<div style={{ fontSize:9,marginTop:3 }}>{f.split(" ")[1]}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom:20 }}>
            <div style={{ fontFamily:FN,fontSize:13,color:T.muted,marginBottom:8 }}>Current weight (optional)</div>
            <input value={weight} onChange={e=>setWeight(e.target.value)} placeholder="e.g. 165 lbs" style={{ width:"100%",background:T.card,border:`1px solid ${T.border}`,borderRadius:8,padding:"12px 14px",color:T.text,fontFamily:FN,fontSize:14,outline:"none" }}/>
          </div>
          <Btn onClick={done} color={col} full>Enter Week {currentWeek+1} →</Btn>
        </div>
      </div>
    );
  };

  // ─── VIEWS ─────────────────────
  const HomeView = () => (
    <div style={{ padding:"20px 16px" }}>
      <div style={{ marginBottom:24 }}>
        <div style={{ fontFamily:FM,fontSize:10,color:T.muted,letterSpacing:"0.12em",marginBottom:8 }}>WEEK {currentWeek} OF 20</div>
        <h1 style={{ fontFamily:FB,fontSize:36,color:T.text,margin:"0 0 8px" }}>{currentPhase.name}</h1>
        <p style={{ fontFamily:FN,fontSize:13,color:T.muted,margin:0 }}>{currentPhase.focus}</p>
      </div>
      <Card style={{ background:colBg,border:`1px solid ${col}40`,padding:"16px 18px",marginBottom:16 }}>
        <div style={{ fontFamily:FM,fontSize:9,color:col,letterSpacing:"0.1em",marginBottom:6 }}>OVERALL PROGRESS</div>
        <PBar pct={overallPct} color={col} h={6}/>
        <div style={{ fontFamily:FN,fontSize:12,color:T.text,marginTop:8 }}>{overallPct}% Complete</div>
      </Card>
      <div style={{ marginBottom:16 }}>
        <div style={{ fontFamily:FM,fontSize:10,color:T.muted,letterSpacing:"0.12em",marginBottom:10 }}>THIS PHASE</div>
        <div style={{ display:"flex",gap:8 }}>
          <Card style={{ flex:1,padding:"12px 14px" }}>
            <div style={{ fontFamily:FM,fontSize:9,color:T.muted,marginBottom:4 }}>INTENSITY</div>
            <div style={{ fontFamily:FB,fontSize:16,color:T.text }}>{currentPhase.intensity}</div>
          </Card>
          <Card style={{ flex:1,padding:"12px 14px" }}>
            <div style={{ fontFamily:FM,fontSize:9,color:T.muted,marginBottom:4 }}>VOLUME</div>
            <div style={{ fontFamily:FB,fontSize:16,color:T.text }}>{currentPhase.volume}</div>
          </Card>
        </div>
      </div>
      <div style={{ marginBottom:16 }}>
        <div style={{ fontFamily:FM,fontSize:10,color:T.muted,letterSpacing:"0.12em",marginBottom:10 }}>KEY PRINCIPLE</div>
        <Card style={{ padding:"12px 14px" }}>
          <p style={{ fontFamily:FN,fontSize:13,color:T.text,lineHeight:1.6,margin:0 }}>{currentPhase.progressionKey}</p>
        </Card>
      </div>
      <Btn onClick={advanceWeek} color={col} full>Advance to Week {currentWeek+1} →</Btn>
    </div>
  );

  const PhasesView = () => (
    <div style={{ padding:"20px 16px" }}>
      <h1 style={{ fontFamily:FB,fontSize:28,color:T.text,margin:"0 0 20px" }}>4-Phase System</h1>
      {program.phases?.map((ph,i)=>{
        const phCol = getPhaseColor(ph.id);
        const isCurrent = ph.id===currentPhaseId;
        return (
          <Card key={i} accent={phCol} style={{ marginBottom:12,padding:"14px 16px",background:isCurrent?`${phCol}12`:"transparent" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:FM,fontSize:9,color:phCol,letterSpacing:"0.08em",marginBottom:4 }}>{ph.weeks}</div>
                <h3 style={{ fontFamily:FB,fontSize:18,color:T.text,margin:"0 0 6px" }}>{ph.name}</h3>
                <p style={{ fontFamily:FN,fontSize:12,color:T.muted,margin:0,lineHeight:1.5 }}>{ph.focus}</p>
              </div>
              {isCurrent && <div style={{ fontFamily:FM,fontSize:10,color:phCol,marginLeft:12 }}>CURRENT</div>}
            </div>
          </Card>
        );
      })}
      {program.milestones && (
        <div style={{ marginTop:24 }}>
          <div style={{ fontFamily:FM,fontSize:10,color:T.muted,letterSpacing:"0.12em",marginBottom:12 }}>MILESTONES</div>
          {program.milestones.map((m,i)=>{
            const done = currentWeek > m.week;
            const curr = currentWeek === m.week;
            return (
              <div key={i} style={{ background:T.card,border:`1px solid ${done?T.green:curr?col:T.border}`,borderLeft:`3px solid ${done?T.green:curr?col:T.border}`,borderRadius:10,padding:"14px 18px",opacity:!done&&!curr?0.5:1,marginBottom:8 }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <div>
                    <div style={{ fontFamily:FM,fontSize:10,color:done?T.green:curr?col:T.muted,letterSpacing:"0.08em",marginBottom:4 }}>WEEK {m.week}{done?" ✓":curr?" ←":""}</div>
                    <div style={{ fontFamily:FN,fontSize:14,fontWeight:600,color:T.text,marginBottom:3 }}>{m.title}</div>
                    <div style={{ fontFamily:FN,fontSize:12,color:T.muted }}>{m.description}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const TrainView = () => {
    if (!currentPhase || !currentPhase.weeklySchedule) {
      return <div style={{ padding:"20px 16px", fontFamily:FN, color:T.muted }}>No training data available</div>;
    }

    return (
      <div style={{ padding:"20px 16px" }}>
        <h1 style={{ fontFamily:FB,fontSize:28,color:T.text,margin:"0 0 20px" }}>This Week's Training</h1>
        {currentPhase.weeklySchedule.map((day,dayIdx)=>(
          <div key={dayIdx} style={{ marginBottom:20 }}>
            <div onClick={()=>setActiveSessionDay(activeSessionDay===dayIdx?null:dayIdx)} style={{ fontFamily:FB,fontSize:16,color:col,marginBottom:10,cursor:"pointer",letterSpacing:"0.02em" }}>
              {day.day} — {day.sessionName}
            </div>
            {activeSessionDay===dayIdx && (
              <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                {day.exercises?.map((ex,exIdx)=>{
                  const sets = ex.sets || 3;
                  return (
                    <Card key={exIdx} onClick={()=>setModalEx(ex)} style={{ padding:"12px 14px",cursor:"pointer" }}>
                      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8 }}>
                        <div style={{ fontFamily:FN,fontSize:14,fontWeight:600,color:T.text }}>{ex.name}</div>
                        <div style={{ display:"flex",gap:6 }}>
                          {Array.from({length:sets}).map((_,setIdx)=>{
                            const key=`${dayIdx}-${exIdx}-${setIdx}`;
                            const done=loggedSets[key];
                            return (
                              <div key={setIdx} onClick={e=>{e.stopPropagation();toggleSet(dayIdx,exIdx,setIdx);}} style={{ width:24,height:24,borderRadius:4,background:done?col:T.card,border:`1px solid ${done?col:T.border}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontFamily:FM,fontSize:10,color:done?T.bg:T.muted }}>
                                {setIdx+1}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                        {ex.reps && <Tag color={col}>{ex.reps}</Tag>}
                        {ex.rpe && <Tag color={T.green}>RPE {ex.rpe}</Tag>}
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        ))}
        <Btn onClick={()=>setShowTimer(true)} color={col} full>Start Rest Timer</Btn>
      </div>
    );
  };

  const LaddersView = () => (
    <div style={{ padding:"20px 16px" }}>
      <h1 style={{ fontFamily:FB,fontSize:28,color:T.text,margin:"0 0 20px" }}>Skill Ladders</h1>
      {Object.entries(LADDERS).map(([key,ladder])=>{
        const level = ladderLevels[key] || 1;
        const currentLevel = ladder.levels.find(l=>l.level===level);
        const nextLevel = ladder.levels.find(l=>l.level===level+1);
        return (
          <Card key={key} accent={ladder.color} style={{ marginBottom:16,padding:"14px 16px" }}>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:12 }}>
              <span style={{ fontSize:24 }}>{ladder.icon}</span>
              <div style={{ flex:1 }}>
                <h3 style={{ fontFamily:FB,fontSize:16,color:T.text,margin:0 }}>{ladder.name}</h3>
                <div style={{ fontFamily:FM,fontSize:10,color:ladder.color }}>Level {level}/10</div>
              </div>
            </div>
            <PBar pct={(level/10)*100} color={ladder.color}/>
            {currentLevel && (
              <div onClick={()=>setModalEx(currentLevel)} style={{ background:T.card,border:`1px solid ${T.border}`,borderRadius:8,padding:"10px 12px",marginTop:10,cursor:"pointer" }}>
                <div style={{ fontFamily:FM,fontSize:9,color:T.muted,marginBottom:4 }}>CURRENT LEVEL</div>
                <div style={{ fontFamily:FN,fontSize:13,fontWeight:600,color:T.text }}>{currentLevel.name}</div>
                <div style={{ fontFamily:FM,fontSize:10,color:T.muted,marginTop:4 }}>{currentLevel.target}</div>
              </div>
            )}
            {nextLevel && (
              <div style={{ background:`${ladder.color}12`,border:`1px solid ${ladder.color}30`,borderRadius:8,padding:"10px 12px",marginTop:8 }}>
                <div style={{ fontFamily:FM,fontSize:9,color:ladder.color,marginBottom:4 }}>NEXT LEVEL</div>
                <div style={{ fontFamily:FN,fontSize:13,fontWeight:600,color:T.text }}>{nextLevel.name}</div>
              </div>
            )}
            <Btn onClick={()=>setLadderLevels(l=>({...l,[key]:Math.min(10,level+1)}))} color={ladder.color} small full style={{ marginTop:10 }}>Progress →</Btn>
          </Card>
        );
      })}
    </div>
  );

  const ProgressView = () => {
    return (
      <div style={{ padding:"20px 16px" }}>
        <h1 style={{ fontFamily:FB,fontSize:28,color:T.text,margin:"0 0 20px" }}>Progress Tracking</h1>

        {/* Milestones */}
        <div style={{ marginBottom:24 }}>
          <div style={{ fontFamily:FM,fontSize:10,color:T.muted,letterSpacing:"0.12em",marginBottom:12 }}>MILESTONES</div>
          {program.milestones?.map((m,i)=>{
            const done = currentWeek > m.week;
            const curr = currentWeek === m.week;
            return (
              <div key={i} style={{ background:T.card,border:`1px solid ${done?T.green:curr?col:T.border}`,borderLeft:`3px solid ${done?T.green:curr?col:T.border}`,borderRadius:10,padding:"14px 18px",opacity:!done&&!curr?0.5:1 }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <div>
                    <div style={{ fontFamily:FM,fontSize:10,color:done?T.green:curr?col:T.muted,letterSpacing:"0.08em",marginBottom:4 }}>WEEK {m.week}{done?" ✓":curr?" ←":""}</div>
                    <div style={{ fontFamily:FN,fontSize:14,fontWeight:600,color:T.text,marginBottom:3 }}>{m.title}</div>
                    <div style={{ fontFamily:FN,fontSize:12,color:T.muted }}>{m.description}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Weight Log */}
        <div style={{ fontFamily:FM,fontSize:10,color:T.muted,letterSpacing:"0.12em",marginBottom:12 }}>WEIGHT LOG</div>
        {metrics.length>0&&(
          <div style={{ display:"flex",flexDirection:"column",gap:6,marginBottom:12 }}>
            {metrics.slice(-5).reverse().map((m,i)=>(
              <div key={i} style={{ background:T.card,border:`1px solid ${T.border}`,borderRadius:8,padding:"10px 14px",display:"flex",justifyContent:"space-between" }}>
                <span style={{ fontFamily:FN,fontSize:13,color:T.text }}>{m.weight}</span>
                <div style={{ textAlign:"right" }}>
                  <span style={{ fontFamily:FM,fontSize:10,color:T.muted }}>Week {m.week}</span>
                  {m.feeling&&<span style={{ fontFamily:FN,fontSize:10,color:T.muted,marginLeft:8 }}>{m.feeling}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
        {addMetric?(
          <div style={{ background:T.card,border:`1px solid ${T.border}`,borderRadius:10,padding:"16px" }}>
            <input value={newWeight} onChange={e=>setNewWeight(e.target.value)} placeholder="Weight (e.g. 165 lbs)" style={{ width:"100%",background:T.panel,border:`1px solid ${T.border}`,borderRadius:8,padding:"10px 12px",color:T.text,fontFamily:FN,fontSize:14,outline:"none",marginBottom:10 }}/>
            <input value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Note (optional)" style={{ width:"100%",background:T.panel,border:`1px solid ${T.border}`,borderRadius:8,padding:"10px 12px",color:T.text,fontFamily:FN,fontSize:14,outline:"none",marginBottom:10 }}/>
            <div style={{ display:"flex",gap:8 }}>
              <Btn onClick={()=>setAddMetric(false)} color={T.muted} small ghost>Cancel</Btn>
              <Btn onClick={()=>{ if(newWeight){setMetrics(m=>[...m,{week:currentWeek,weight:newWeight,note:newNote,date:new Date().toLocaleDateString()}]); setNewWeight("");setNewNote("");setAddMetric(false); }}} color={col} small full>Save Entry</Btn>
            </div>
          </div>
        ):(
          <Btn onClick={()=>setAddMetric(true)} color={col} full>+ Log Today's Weight</Btn>
        )}
      </div>
    );
  };

  const ExerciseListView = () => {
    const equipment = profile.equipment || [];
    const categories = ["push", "pull", "legs", "core", "martial"];
    
    const getAvailableExercises = (category) => {
      const exercises = new Set();
      for (let eq of equipment) {
        if (EXERCISE_DB[eq] && EXERCISE_DB[eq][category]) {
          EXERCISE_DB[eq][category].forEach(ex => exercises.add(ex));
        }
      }
      return Array.from(exercises).sort();
    };

    return (
      <div style={{ padding:"20px 16px" }}>
        <h1 style={{ fontFamily:FB,fontSize:28,color:T.text,margin:"0 0 8px" }}>Available Exercises</h1>
        <p style={{ fontFamily:FN,fontSize:13,color:T.muted,margin:"0 0 20px" }}>Based on your equipment: {equipment.map(e=>e.replace(/_/g," ")).join(", ")}</p>
        
        {categories.map(cat=>{
          const exs = getAvailableExercises(cat);
          const catColor = {push:T.gold,pull:T.green,legs:T.blue,core:T.red,martial:T.orange}[cat];
          const catName = {push:"Push",pull:"Pull",legs:"Legs",core:"Core",martial:"Martial Arts"}[cat];
          const catIcon = {push:"💪",pull:"🔱",legs:"🦵",core:"🔥",martial:"🥋"}[cat];
          
          return (
            <div key={cat} style={{ marginBottom:24 }}>
              <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:12 }}>
                <span style={{ fontSize:20 }}>{catIcon}</span>
                <h2 style={{ fontFamily:FB,fontSize:18,color:catColor,margin:0,letterSpacing:"0.02em" }}>{catName}</h2>
                <span style={{ fontFamily:FM,fontSize:10,color:T.muted }}>{exs.length} exercises</span>
              </div>
              <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                {exs.map((ex,i)=>(
                  <Card key={i} style={{ padding:"12px 14px",cursor:"pointer" }} onClick={()=>setModalEx({name:ex,note:"This exercise is available for your current equipment setup."})}>
                    <div style={{ fontFamily:FN,fontSize:13,fontWeight:500,color:T.text }}>{ex}</div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const nav = [
    {id:"home",l:"Home",ic:"⚡"},
    {id:"phases",l:"Phases",ic:"◈"},
    {id:"train",l:"Train",ic:"✦"},
    {id:"ladders",l:"Ladder",ic:"△"},
    {id:"exercises",l:"Exercises",ic:"📋"},
    {id:"progress",l:"Progress",ic:"◉"},
  ];

  return (
    <div style={{ background:T.bg,minHeight:"100vh",color:T.text,fontFamily:FN }}>
      {modalEx&&<ExModal/>}
      {showWeekly&&<WeeklyCheckIn/>}
      {showTimer&&<Timer/>}
      <style>{`*{box-sizing:border-box;}::-webkit-scrollbar{width:2px;}::-webkit-scrollbar-thumb{background:${T.faint};}input,textarea{outline:none;}input::placeholder,textarea::placeholder{color:${T.faint};}`}</style>
      <div style={{ paddingBottom:68 }}>
        {view==="home"&&<HomeView/>}
        {view==="phases"&&<PhasesView/>}
        {view==="train"&&<TrainView/>}
        {view==="ladders"&&<LaddersView/>}
        {view==="exercises"&&<ExerciseListView/>}
        {view==="progress"&&<ProgressView/>}
      </div>
      <nav style={{ position:"fixed",bottom:0,left:0,right:0,height:64,background:T.panel,borderTop:`1px solid ${T.border}`,display:"flex",zIndex:300 }}>
        {nav.map(item=>{
          const active=view===item.id;
          return (
            <button key={item.id} onClick={()=>{setView(item.id);if(item.id!=="train")setActiveSessionDay(null);}} style={{ flex:1,background:active?`${col}10`:"transparent",border:"none",borderTop:`2px solid ${active?col:"transparent"}`,color:active?col:T.muted,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,fontFamily:FN,fontSize:8,letterSpacing:"0.04em",textTransform:"uppercase",transition:"all 0.15s" }}>
              <span style={{ fontSize:16 }}>{item.ic}</span>
              <span>{item.l}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  useFonts();
  const [phase, setPhase] = useState(()=>STORE.load("appPhase","onboard"));
  const [profile, setProfile] = useState(()=>STORE.load("profile",null));
  const [program, setProgram] = useState(()=>STORE.load("program",null));

  const handleOnboard = (answers) => {
    STORE.save("profile",answers);
    setProfile(answers);
    setPhase("generating");
    STORE.save("appPhase","generating");
  };
  const handleGenDone = (prog) => {
    STORE.save("program",prog);
    setProgram(prog);
    setPhase("app");
    STORE.save("appPhase","app");
  };
  const handleReset = () => {
    ["appPhase","profile","program","week","phase","sets","ladders","metrics","selectedExercises","useManualSelection"].forEach(k=>{ try{localStorage.removeItem(`apex_${k}`);}catch(e){} });
    setPhase("onboard"); setProfile(null); setProgram(null);
  };

  return (
    <>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}body{background:${T.bg};}`}</style>
      {phase==="onboard"&&<Onboarding onComplete={handleOnboard}/>}
      {phase==="generating"&&<Generating profile={profile} onDone={handleGenDone}/>}
      {phase==="app"&&program&&<MainApp profile={profile} program={program} onReset={handleReset}/>}
      {phase==="app"&&!program&&<Generating profile={profile} onDone={handleGenDone}/>}
    </>
  );
}
