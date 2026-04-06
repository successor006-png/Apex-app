import { DISCIPLINES, SATELLITE_PAIRINGS, MICROCYCLE_TEMPLATES } from '../constants/disciplines.js';

// ─── TRAINING DNA ENGINE ───────────────────────────────────────────────────────
// Implements the biological laws and assessment logic from APEX_Deep_Research_V.docx:
//   - SAID Principle (Specific Adaptation to Imposed Demand)
//   - Wolff's Law (connective tissue remodels under load)
//   - Davis's Law (soft tissue follows lines of stress)
//   - HERITAGE Study findings (all individuals adapt; rate varies, direction doesn't)
//   - Football Entangled's 5 Pillars (Vitality, Skill, Athleticism, Mental, Strategy)

export function generateTrainingDNA(answers) {
  const primary = routePrimary(answers);
  const level = calculateLevel(answers);
  const satellites = SATELLITE_PAIRINGS[primary];
  const microcycle = buildMicrocycle(answers, primary);
  const pillars = scoreFivePillars(answers);
  const fasciaPhase = routeFasciaPhase(answers);
  const nutritionProtocol = routeNutrition(answers);
  const heightProtocol = shouldIncludeHeightProtocol(answers);
  const communicationStyle = routeCommunicationStyle(answers);
  const weeklyLoad = routeWeeklyLoad(answers);
  const biologicalLaw = selectPrimaryLaw(primary);

  return {
    primary,
    satellites,
    level,
    microcycle,
    pillars,
    fasciaPhase,
    nutritionProtocol,
    heightProtocol,
    communicationStyle,
    weeklyLoad,
    biologicalLaw,
    // Raw metrics
    pushups:  parseInt(answers.pushups)  || 0,
    pullups:  parseInt(answers.pullups)  || 0,
    deadhang: parseInt(answers.deadhang) || 0,
    age:      parseInt(answers.age)      || 20,
    trainingDays: parseInt((answers.trainingDays || "3").replace(/\D+.*/, '')) || 3,
  };
}

// ── PRIMARY DISCIPLINE ROUTING ─────────────────────────────────────────────
function routePrimary(a) {
  // The discipline-attraction answer is the strongest signal — it captures
  // intrinsic motivation, the single strongest predictor of adherence (SDT research)
  if (a.disciplineAttraction && DISCIPLINES[a.disciplineAttraction]) {
    return a.disciplineAttraction;
  }

  // Goal text parsing (implementation intentions research — Gollwitzer)
  const goal = ((a.primaryGoal || '') + ' ' + (a.vision || '')).toLowerCase();

  if (/fight|combat|spar|martial|dangerous|protect|warrior|mma|boxer|kick/.test(goal))  return 'martial_arts';
  if (/anime|aesthetic|look|physique|lean|shredded|vein|abs|v.taper|protagonist/.test(goal)) return 'anime_physique';
  if (/tall|posture|height|spine|decompress|upright/.test(goal)) return 'height_growth';
  if (/fascia|elastic|flexible|injury|stiff|tissue|connective|movement|pain.free/.test(goal)) return 'fascia';
  if (/handstand|muscle.up|planche|lever|calisthen|skill|bar|rings/.test(goal)) return 'calisthenics';

  // Secondary goals as tie-breaker
  const sec = a.secondaryGoals || [];
  if (sec.includes('Learn to fight')) return 'martial_arts';
  if (sec.includes('Build visible muscle')) return 'anime_physique';
  if (sec.includes('Grow taller / improve posture')) return 'height_growth';
  if (sec.includes('Master bodyweight skills')) return 'calisthenics';

  return 'calisthenics'; // default: most universally applicable
}

// ── LEVEL CALCULATION ─────────────────────────────────────────────────────
function calculateLevel(a) {
  const pushups  = parseInt(a.pushups)  || 0;
  const pullups  = parseInt(a.pullups)  || 0;
  const deadhang = parseInt(a.deadhang) || 0;
  const years    = a.trainingYears || 'Never trained seriously';

  // Weighted composite score (from the assessment architecture document)
  const score = (pushups * 2) + (pullups * 5) + (deadhang * 0.5);
  const yearBonus = {
    'Never trained seriously': 0,
    'Under 6 months': 10,
    '6 months – 2 years': 25,
    '2–5 years': 50,
    '5+ years': 80,
  }[years] || 0;

  const total = score + yearBonus;

  if (total >= 250) return { label: 'Advanced',      desc: 'Strong foundation. Ready for elite progressions.',   color: '#f97316' };
  if (total >= 100) return { label: 'Intermediate',   desc: 'Solid base. Time to unlock the next tier of skill.',  color: '#c8a96e' };
  if (total >= 30)  return { label: 'Developing',     desc: 'Foundation phase. Every rep rewires your system.',    color: '#38bdf8' };
  return              { label: 'Foundation',    desc: 'Day one. The most powerful place to start.',          color: '#4ade80' };
}

// ── MICROCYCLE BUILDER ────────────────────────────────────────────────────
function buildMicrocycle(a, primary) {
  const days = parseInt((a.trainingDays || '3 days').replace(/\D+.*/, '')) || 3;
  const clampedDays = Math.min(6, Math.max(3, days));
  const template = MICROCYCLE_TEMPLATES[clampedDays];

  return {
    days: clampedDays,
    template,
    today: template.days[0], // first day label
    highLowPrinciple: `High-demand days cluster all neurological load (heavy ${DISCIPLINES[primary].name} + strength). Low days rebuild tissue quality and technical refinement. This protects the nervous system while maximising adaptation signal.`,
  };
}

// ── FIVE PILLARS SCORING (Football Entangled framework) ───────────────────
// Vitality, Skill, Athleticism, Mental Mastery, Strategy
function scoreFivePillars(a) {
  const sleep   = { 'Under 5 hours': 2, '5–6 hours': 4, '6–7 hours': 6, '7–8 hours': 8, '8+ hours': 10 }[a.sleepHours] || 5;
  const stress  = 10 - (parseInt(a.stressLevel) || 5);
  const pushups = Math.min(10, ((parseInt(a.pushups) || 0) / 3));
  const pullups = Math.min(10, ((parseInt(a.pullups) || 0) * 1.2));
  const years   = { 'Never trained seriously': 1, 'Under 6 months': 3, '6 months – 2 years': 5, '2–5 years': 7, '5+ years': 9 }[a.trainingYears] || 3;
  const psych   = { 'I push through — feel great afterward': 9, 'I usually quit and feel bad about it': 3, 'Depends on the day and my mood': 6, 'I modify it and keep going at a lower level': 7 }[a.difficultyResponse] || 6;

  return [
    { pillar: 'Vitality',       score: Math.round((sleep + stress) / 2),       desc: 'Sleep quality, recovery capacity, biological energy reserves' },
    { pillar: 'Athleticism',    score: Math.round((pushups + pullups) / 2),     desc: 'Current physical output capacity and movement quality' },
    { pillar: 'Skill',          score: Math.round(years),                       desc: 'Accumulated movement intelligence and training maturity' },
    { pillar: 'Mental Mastery', score: Math.round(psych),                       desc: 'Psychological relationship with difficulty and resilience' },
    { pillar: 'Strategy',       score: 5,                                       desc: 'Program intelligence — improves as your Training DNA deepens' },
  ];
}

// ── FASCIA PHASE ROUTING (Hyperarch Fascia Training — Chong Xie) ──────────
function routeFasciaPhase(a) {
  const symptoms    = a.fasciaSymptoms || [];
  const desk        = a.deskTime || '2–4 hours sitting';
  const background  = a.fasciaExposure || 'None — completely new to this';
  const pastInjury  = (a.pastInjuries || []).length > 0 && !a.pastInjuries?.includes('None significant');

  if (background === 'Significant — trained this before' && !pastInjury) {
    return { phase: 3, name: 'Sport Integration', desc: 'You have fascial awareness. Begin integrating HFT protocols into your primary training.' };
  }
  if (symptoms.length >= 2 || pastInjury || desk === '8+ hours sitting') {
    return { phase: 1, name: 'Mind-Fascia Connection', desc: 'Start with Phase 1: activating the mind-fascia connection and plantar chain. This builds the proprioceptive foundation HFT requires before any loading can be effective.', urgent: true };
  }
  return { phase: 2, name: 'Tissue Quality & Remodelling', desc: 'Begin Phase 2: improving fascial tissue quality, clearing adhesions, and building the foot-to-glute chain that powers all elastic movement.' };
}

// ── NUTRITION PROTOCOL ROUTING ────────────────────────────────────────────
function routeNutrition(a) {
  const bodyType = a.bodyType || '';
  const goal     = a.physiqueFocus || '';
  const primary  = routePrimary(a);

  if (bodyType.includes('Ectomorph') || bodyType.includes('lean')) {
    return { protocol: 'Lean Bulk', detail: '150–300 kcal surplus. 2.2g protein per kg bodyweight. Prioritise carbohydrate timing around training windows.' };
  }
  if (bodyType.includes('Endomorph') || bodyType.includes('fat')) {
    return { protocol: 'Recomposition', detail: '300–500 kcal deficit with calorie cycling. 2g protein per kg. Anti-inflammatory whole foods to optimise fascial tissue quality.' };
  }
  if (goal === 'Build muscle mass (bulk)') {
    return { protocol: 'Hypertrophy Surplus', detail: '300–500 kcal surplus. 2.2g protein per kg. Carb-heavy post-workout meals.' };
  }
  if (goal === 'Lose fat (cut)') {
    return { protocol: 'Fat Loss', detail: '400–600 kcal deficit. 2.4g protein per kg to preserve muscle during deficit.' };
  }
  return { protocol: 'Performance Fuel', detail: 'Maintenance calories with high protein (2g/kg). Focus on food quality over quantity — anti-inflammatory baseline.' };
}

// ── HEIGHT PROTOCOL ────────────────────────────────────────────────────────
function shouldIncludeHeightProtocol(a) {
  const age      = parseInt(a.age) || 20;
  const sex      = a.sex || 'Male';
  const growth   = a.growthPlate || '';
  const postural = (a.postureIssues || []).length > 0;

  if (growth === 'Yes (under 18)') {
    return { active: true, mode: 'Growth Optimisation', desc: 'Open growth plates — IGF-1 and GH optimisation protocols active. Sleep quality is your primary lever. Spinal decompression integrated into all warm-ups.' };
  }
  if (growth === 'Possibly (18–22, male)' || age <= 22) {
    return { active: true, mode: 'Maximum Potential Window', desc: 'Late growth window — daily decompression and sleep protocol are high priority. This window closes. Use it.' };
  }
  if (postural) {
    return { active: true, mode: 'Postural Optimisation', desc: 'Growth plates closed — focus shifts to posture maximisation. Correct structural dysfunction adds 1–2 inches of apparent height and dramatically improves visual proportions.' };
  }
  return { active: false, mode: 'Integrated Posture Work', desc: 'Posture and decompression work integrated into your daily warm-up and cool-down.' };
}

// ── COMMUNICATION STYLE ROUTING ────────────────────────────────────────────
// Based on motivation type and psychological profile (Self-Determination Theory)
function routeCommunicationStyle(a) {
  const motivation = a.motivationType || '';
  const difficulty = a.difficultyResponse || '';

  if (motivation.includes('technically better'))  return { style: 'Technical Coach', tone: 'Precise, analytical, data-forward. You get the why behind every prescription.' };
  if (motivation.includes('body change'))         return { style: 'Aesthetic Guide', tone: 'Visual progress, body composition metrics, and clear transformation milestones.' };
  if (motivation.includes('Testing myself'))      return { style: 'Competition Coach', tone: 'Direct, challenging, performance-metric focused. No softening of difficult truths.' };
  if (motivation.includes('ritual'))              return { style: 'Discipline Architect', tone: 'Consistency-first. Systems over motivation. The ritual is the result.' };
  if (motivation.includes('science'))             return { style: 'Research Partner', tone: 'Mechanism-level explanations. You understand what\'s happening at the cellular level.' };
  return { style: 'Adaptive Coach', tone: 'Calibrated to your responses. Becomes more precise as your data builds.' };
}

// ── WEEKLY LOAD ROUTING ────────────────────────────────────────────────────
function routeWeeklyLoad(a) {
  const sleep   = a.sleepHours || '7–8 hours';
  const stress  = parseInt(a.stressLevel) || 5;
  const active  = a.activePain || 'No active pain';

  if (active !== 'No active pain') {
    return { load: 'Cautious', note: 'Active pain detected. Volume is reduced and injury-sensitive movements are substituted until pain resolves.' };
  }
  if (sleep === 'Under 5 hours' || stress >= 8) {
    return { load: 'Conservative', note: 'High life stress + low sleep = reduced recovery capacity. Volume is below standard to prevent overtraining.' };
  }
  if (sleep === '8+ hours' && stress <= 3) {
    return { load: 'Aggressive', note: 'Excellent recovery conditions. Full volume prescribed. The adaptation signal can be pushed hard.' };
  }
  return { load: 'Standard', note: 'Balanced volume and recovery. Readiness checks will fine-tune daily intensity.' };
}

// ── PRIMARY BIOLOGICAL LAW SELECTOR ───────────────────────────────────────
function selectPrimaryLaw(primary) {
  const lawMap = {
    calisthenics:  { law: 'SAID Principle', detail: 'Your nervous system adapts with extraordinary specificity to whatever mechanical demands are consistently imposed. Every skill attempt rewires motor cortex pathways. Rate varies by individual. Direction does not.' },
    martial_arts:  { law: 'SAID Principle', detail: 'Fight-specific adaptation is not optional — it is biological law. The body adapts to the exact nature of the stress imposed. Generic conditioning produces generic athletes.' },
    fascia:        { law: "Davis's Law", detail: "Soft tissue remodels along lines of mechanical stress. The fascial web responds to slow, loaded tension — fibroblasts synthesise new collagen in the direction of that tension. This process is universal across all human bodies." },
    anime_physique:{ law: 'SAID Principle + Hormonal Science', detail: 'Muscle protein synthesis responds to mechanical overload with extraordinary precision. Given correct protein, caloric context, and progressive overload, hypertrophy is guaranteed by the SAID principle.' },
    height_growth: { law: "Wolff's Law", detail: "Bone and connective tissue remodel in direct proportion to the mechanical stresses placed upon them. Spinal decompression, traction, and loading stimulate the mechanoreceptors that govern disc height and vertebral spacing." },
  };
  return lawMap[primary] || lawMap.calisthenics;
}

// ── DEMO SESSION GENERATOR ─────────────────────────────────────────────────
// Generates a contextual demo session based on DNA
export function generateDemoSession(dna) {
  const sessions = {
    calisthenics: {
      type: 'High Demand — Skill & Strength',
      duration: 55,
      phase: 'Activation → Skill Work → Strength → Fascia Recovery',
      exercises: [
        { name: 'Activation: Scapular Circles + Shoulder CARs', sets: 2, reps: '8 each direction', cue: 'Proprioceptive warm-up. Feel the shoulder blade move independently from the arm.' },
        { name: 'Hyperarch Hop + Marble Drill (HFT)', sets: 2, reps: '90 seconds', cue: 'Phase 1 fascia activation. Feel the connection from toe to glute before every session.' },
        { name: dna.level.label === 'Advanced' ? 'Freestanding Handstand Negatives' : 'Wall Handstand Hold', sets: 3, reps: '20s hold', cue: 'Active shoulders pushing into the floor. Hollow body throughout.' },
        { name: dna.level.label === 'Advanced' ? 'Weighted Pull-Up' : 'Scapular Pull-Up Holds', sets: 4, reps: dna.level.label === 'Advanced' ? '4–6 reps' : '8 reps', cue: 'Initiate from shoulder depression, not arm flexion.' },
        { name: 'Pike Push-Up (Slow Tempo 3-1-2)', sets: 3, reps: '8–10 reps', cue: '3-second descent, 1-second pause at bottom, 2-second press. Tempo is the load.' },
        { name: 'L-Sit Hold (Parallettes or Floor)', sets: 3, reps: '10–15s', cue: 'Press the floor away. Legs must stay parallel — a diagonal L-sit is not an L-sit.' },
        { name: 'Standing Retracted Hold (HFT Phase 2)', sets: 2, reps: '60 seconds', cue: 'Feel the whole-body tensegrity. The arch feeds the glutes feeds the core.' },
      ],
    },
    martial_arts: {
      type: 'Technical / Moderate — Striking & Movement',
      duration: 50,
      phase: 'Activation → Shadowboxing → Conditioning → Fascia',
      exercises: [
        { name: 'Dynamic Hip Mobility Sequence', sets: 1, reps: '5 minutes', cue: 'Leg swings, hip circles, lateral lunges. Warm the hip complex for kicking mechanics.' },
        { name: 'Shadowboxing Rounds (Technique Focus)', sets: 3, reps: '3 minutes each', cue: 'This is LOW day — perfect technique at 60% intensity. Every combination ends with head movement.' },
        { name: 'Hyperarch Hop (HFT — Footwork Foundation)', sets: 2, reps: '90 seconds', cue: 'The elastic spring of the plantar fascia is your footwork engine. Feel the rebound.' },
        { name: 'Combination Chains — Heavy Bag', sets: 4, reps: '90-second rounds', cue: '5-punch combination, reset, repeat. Focus on hip rotation transferring power through the kinetic chain.' },
        { name: 'Single-Leg Balance (HFT)', sets: 3, reps: '30s each leg', cue: 'Build the proprioceptive foundation that makes agile footwork automatic.' },
        { name: 'Ground & Pound Positional Drilling', sets: 3, reps: '5 minutes', cue: 'Transitions not power. Mount → side control → mount. Smooth is fast.' },
      ],
    },
    fascia: {
      type: 'Fascia Activation + Slow-Load Remodelling',
      duration: 45,
      phase: 'Mind-Fascia Connection → Tissue Loading → Integration',
      exercises: [
        { name: 'Plantar Fascia Release (Ball Roll)', sets: 1, reps: '2–3 min each foot', cue: 'Work from heel to ball methodically. Find the sensitive spots and pause on them — 15 seconds.' },
        { name: 'Marble Drill — Toe Grip to Glute Activation', sets: 3, reps: '3 min each side', cue: 'The marble forces toe engagement which travels up the posterior chain. You should feel glute and core activate WITHOUT cueing them.' },
        { name: 'Hyperarch Hop Bilateral', sets: 3, reps: '90 seconds', cue: 'Minimal knee bend. The energy comes from the arch, not the leg. Think spring, not squat.' },
        { name: 'Standing Retracted Hold (Full Body Tensegrity)', sets: 3, reps: '60 seconds', cue: 'Activate from foot arch upward. This is the whole-body fascia switch — you are feeling your own tensegrity structure.' },
        { name: 'Deep Lunge Hold (Anterior Hip Chain)', sets: 2, reps: '90s each side', cue: 'Anterior hip line loading. Slow collagen remodelling requires 90-second minimum holds.' },
        { name: 'Spiral Walk (Full Integration)', sets: 2, reps: '5 minutes', cue: 'Slow, deliberate movement. Feel the spiral line from outer foot through opposite hip. This is the whole fascial system in motion.' },
      ],
    },
    anime_physique: {
      type: 'High Demand — V-Taper Hypertrophy',
      duration: 60,
      phase: 'Activation → V-Taper Push-Pull → Aesthetic Finishing',
      exercises: [
        { name: 'Shoulder CARs + Banded Pull-Aparts', sets: 2, reps: '10 each', cue: 'Controlled articular rotations prepare the shoulder for hypertrophy work without the inflammatory cost of static stretching.' },
        { name: 'Wide-Grip Pull-Up (3-0-2 Tempo)', sets: 4, reps: '8–10 reps', cue: 'The lat is the primary aesthetic muscle. Initiate by depressing the shoulder blade — the arm follows, it does not lead.' },
        { name: 'Pike Push-Up / Overhead Press (Shoulder Priority)', sets: 4, reps: '10–12 reps', cue: 'Capped deltoids build the shoulder width that creates the V-taper. Drive through the thumb side.' },
        { name: 'Hyperarch Hop (HFT — Daily Protocol)', sets: 2, reps: '90 seconds', cue: 'Fascia training is mandatory alongside aesthetic work. Low body fat without fascial health creates a tight, flat look instead of 3D muscle.' },
        { name: 'Diamond Push-Up (Tricep Isolation)', sets: 3, reps: '12–15 reps', cue: '55% of upper arm mass. The arm aesthetics live here, not in biceps alone.' },
        { name: 'Hanging Leg Raise (Core/V-Line)', sets: 3, reps: '12 reps', cue: 'No swinging. The core does ALL the work. A visible V-line requires both low body fat AND developed lower ab insertions.' },
      ],
    },
    height_growth: {
      type: 'Decompression + Posture Reprogramming',
      duration: 40,
      phase: 'Morning Decompression → Postural Activation → IGF-1 Protocol',
      exercises: [
        { name: 'Dead Hang (Spinal Decompression)', sets: 3, reps: '45–60 seconds', cue: 'Let gravity work. Relax the entire spine. Feel the vertebrae separate. This reverses the compression you accumulate every waking hour.' },
        { name: 'Hyperarch Hop + Marble Drill (HFT)', sets: 2, reps: '2 minutes total', cue: 'The foot-to-spine fascial chain. Activating this chain correctly improves spinal alignment from the ground up.' },
        { name: 'Cat-Cow Spinal Mobilisation', sets: 1, reps: '3 minutes', cue: 'Maximum range at both ends. Feel each vertebra articulate individually.' },
        { name: 'Wall Posture Drill (Back to Wall)', sets: 3, reps: '2 minutes each', cue: 'Heels, calves, glutes, upper back, and back of head must all touch the wall. This is what upright actually feels like.' },
        { name: 'Cobra Press (Thoracic Extension)', sets: 3, reps: '10 reps + 30s hold', cue: 'Thoracic kyphosis is the single biggest postural thief of apparent height. This reverses it.' },
        { name: 'Inversion / Traction Hold', sets: 2, reps: '3–5 minutes', cue: 'Full spinal traction. Combined with adequate sleep, this is the primary daily decompression tool.' },
      ],
    },
  };

  return sessions[dna.primary] || sessions.calisthenics;
}
