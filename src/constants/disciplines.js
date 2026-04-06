import { T } from '../theme.js';

export const DISCIPLINES = {
  calisthenics: {
    id: "calisthenics",
    name: "Calisthenics",
    tagline: "Bodyweight Mastery",
    icon: "⬡",
    color: T.green,
    glow: T.greenBg,
    description: "Handstands. Muscle-ups. Human flag. Total body control through progressive skill.",
    scienceBrief: "Progressive bodyweight training triggers SAID adaptations in both muscular and connective tissue systems. Skill acquisition activates long-term potentiation in motor cortex pathways.",
    phases: ["Fundamental Movement", "Skill Acquisition", "Advanced Expression"],
    milestones: ["10 clean push-ups", "First pull-up", "15s dead hang", "L-sit 5s", "Muscle-up attempt"],
    satelliteRole: "Provides bodyweight strength, body control, and joint health that transfers to every other discipline.",
    weeklyAllocation: { high: ["Strength & Skill"], low: ["Mobility & Holds"] },
  },
  martial_arts: {
    id: "martial_arts",
    name: "Martial Arts",
    tagline: "Combat Intelligence",
    icon: "◈",
    color: T.orange,
    glow: T.orangeBg,
    description: "Fight-specific conditioning. Explosive power. Mental toughness forged through pressure.",
    scienceBrief: "High/Low training system maximises technical quality while managing neurological fatigue. Ecological dynamics framework creates adaptive skill under constraint.",
    phases: ["Foundation & Conditioning", "Technical Integration", "Fight Preparation"],
    milestones: ["3 min shadowbox", "100 kicks/day", "Grappling entry", "Live drilling", "Controlled spar"],
    satelliteRole: "Contributes conditioning methodology, explosive power development, and mental toughness protocols.",
    weeklyAllocation: { high: ["Sparring & Hard Drilling"], low: ["Technique & Shadow Work"] },
  },
  fascia: {
    id: "fascia",
    name: "Fascia Training",
    tagline: "Connective Tissue System",
    icon: "◎",
    color: T.purple,
    glow: T.purpleBg,
    description: "Train the web that connects everything. Elastic. Resilient. Injury-proof from the ground up.",
    scienceBrief: "Davis's Law governs soft tissue remodelling under load. HFT (Chong Xie) builds fascia-driven movement from the plantar fascia upward — the foot as a fascial launching pad.",
    phases: ["Mind-Fascia Connection", "Tissue Quality & Remodelling", "Sport Integration"],
    milestones: ["Hyperarch hop bilateral", "Single-leg balance 30s", "Marble drill mastery", "Toe-to-glute chain", "Full sport integration"],
    satelliteRole: "Mandatory recovery and injury-prevention layer. Fascial health maintains the tissue quality all other disciplines depend on.",
    weeklyAllocation: { high: ["Plyometric Fascia Work"], low: ["Slow-Load Remodelling & HFT"] },
  },
  anime_physique: {
    id: "anime_physique",
    name: "Anime Physique",
    tagline: "Aesthetic Performance",
    icon: "◇",
    color: T.pink,
    glow: T.pinkBg,
    description: "V-taper. Capped delts. Low body fat. The protagonist physique — built on real exercise science.",
    scienceBrief: "V-taper priority (shoulder-to-waist ratio) combined with body recomposition protocols. Hypertrophy-focused training at tempo with integrated body composition management.",
    phases: ["Foundation & Recomp", "Sculpting Phase", "Advanced Body Control"],
    milestones: ["Body fat baseline logged", "V-taper visible", "Shoulder width +2cm", "Abs consistently visible", "Full aesthetic achieved"],
    satelliteRole: "Contributes body composition management and proportional aesthetics to any primary discipline.",
    weeklyAllocation: { high: ["Hypertrophy Training"], low: ["Isolation & Conditioning"] },
  },
  height_growth: {
    id: "height_growth",
    name: "Height & Posture",
    tagline: "Structural Optimisation",
    icon: "△",
    color: T.blue,
    glow: T.blueBg,
    description: "Spinal decompression. Postural dominance. IGF-1 optimisation. Stand taller — for real.",
    scienceBrief: "Wolff's Law governs bone remodelling under mechanical stress. IGF-1 and Growth Hormone pulsatility respond to sleep and specific exercise. Daily decompression counters gravitational compression.",
    phases: ["Spinal Decompression", "Postural Reprogramming", "Height Maximisation"],
    milestones: ["Morning height logged", "Posture score 8/10", "Decompression routine established", "IGF-1 protocol active", "Full optimisation"],
    satelliteRole: "Integrates into warm-up/cool-down of every discipline. Posture work transfers directly to visual presence and movement efficiency.",
    weeklyAllocation: { high: ["Inversion & Decompression"], low: ["Mobility Flows & Posture Drills"] },
  },
};

// Discipline blending logic: which satellites pair best with each primary
export const SATELLITE_PAIRINGS = {
  calisthenics:  ["fascia", "anime_physique"],
  martial_arts:  ["fascia", "calisthenics"],
  fascia:        ["calisthenics", "height_growth"],
  anime_physique:["calisthenics", "fascia"],
  height_growth: ["fascia", "anime_physique"],
};

// High/Low day labels per primary discipline
export const MICROCYCLE_TEMPLATES = {
  3: {
    days: ["High Demand", "Technical/Moderate", "Conditioning & Integration"],
    description: "3-day High/Low structure. High-demand work clusters all neurological load. Low days build tissue quality and technical refinement.",
  },
  4: {
    days: ["High Demand", "Technical/Moderate", "High Demand", "Recovery & Mobility"],
    description: "4-day structure. Two high-demand days separated by technical work. Active recovery on Day 4.",
  },
  5: {
    days: ["High Demand", "Technical/Moderate", "High Demand", "Conditioning", "Recovery & Mobility"],
    description: "5-day structure. Alternating intensity with dedicated conditioning and active recovery.",
  },
  6: {
    days: ["High Demand", "Technical", "High Demand", "Moderate", "High Demand", "Recovery"],
    description: "6-day structure. Three high-demand days with recovery woven between. Elite-level volume.",
  },
};
