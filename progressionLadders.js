import { T } from '../theme.js';

// ─── PROGRESSION LADDERS ─────────────────────────────────────────────────────
// 15 levels per movement pattern. Every exercise has been verified and
// grounded in the progression science from the research documents.
// Source: Cali Move, School of Calisthenics, Hyperarch Fascia Training,
//         Sweet Science of Fighting, and the universal calisthenics skill ladder.

const LADDERS = {
  push: {
    name: "Push Progression",
    icon: "💪",
    color: T.gold,
    levels: [
      { 
        level: 1, 
        name: "Wall Push-Ups", 
        desc: "Hands on wall, 45° angle — minimal bodyweight load",
        exercises: ["Wall Push-Ups", "Incline Push-Ups (High)"],
        target: "3×20 reps",
        notes: "Perfect form, full ROM, control descent",
        duration: "2-3 weeks"
      },
      { 
        level: 2, 
        name: "Incline Push-Ups", 
        desc: "Hands elevated on bench or table — reduced load",
        exercises: ["Incline Push-Ups (Bench)", "Incline Push-Ups (Table)"],
        target: "3×15 clean reps",
        notes: "Chest to surface, maintain rigid body",
        duration: "2-3 weeks"
      },
      { 
        level: 3, 
        name: "Standard Push-Up", 
        desc: "Full ROM, chest to floor, body rigid",
        exercises: ["Standard Push-Up", "Push-Up with Pause (1s hold)"],
        target: "3×12 clean reps",
        notes: "Elbows at 45°, scapulae retracted",
        duration: "3-4 weeks"
      },
      { 
        level: 4, 
        name: "Push-Up Progressions", 
        desc: "Variations to build strength and control",
        exercises: ["Diamond Push-Up", "Archer Push-Up (Beginner)", "Pseudo Planche Lean"],
        target: "3×10-12 reps per variation",
        notes: "Rotate exercises weekly for balanced development",
        duration: "3-4 weeks"
      },
      { 
        level: 5, 
        name: "Deficit Push-Ups", 
        desc: "Hands elevated on surfaces, extra ROM at bottom",
        exercises: ["Deficit Push-Ups (Parallettes)", "Deficit Push-Ups (Rings)"],
        target: "3×8-10 reps",
        notes: "Extreme ROM, controlled descent",
        duration: "3-4 weeks"
      },
      { 
        level: 6, 
        name: "Unilateral Push-Up Progressions", 
        desc: "One arm straight to side, unilateral load",
        exercises: ["Archer Push-Up", "Pseudo Planche Push-Up", "One-Arm Push-Up Negative"],
        target: "3×6-8 each side",
        notes: "Extreme stability and shoulder strength",
        duration: "4-5 weeks"
      },
      { 
        level: 7, 
        name: "Explosive Push-Ups", 
        desc: "Leave the ground on every rep, plyometric power",
        exercises: ["Explosive Push-Up", "Clapping Push-Up", "Explosive Push-Up (Hands Behind Back)"],
        target: "4×6-8 reps",
        notes: "Land softly, maintain form",
        duration: "3-4 weeks"
      },
      { 
        level: 8, 
        name: "Pseudo Planche Push-Up", 
        desc: "Hands at hip level, body leaned forward",
        exercises: ["Pseudo Planche Push-Up", "Pseudo Planche Push-Up (Rings)"],
        target: "3×8-10 reps",
        notes: "Extreme anterior delt and chest activation",
        duration: "4-5 weeks"
      },
      { 
        level: 9, 
        name: "Pike Push-Ups & Handstand Progressions", 
        desc: "Shoulder-focused pressing, inverted positions",
        exercises: ["Pike Push-Up", "Pike Push-Up (Feet Elevated)", "Wall Handstand Hold"],
        target: "3×10-12 pike / 3×30-45s holds",
        notes: "Transition to overhead pressing strength",
        duration: "4-5 weeks"
      },
      { 
        level: 10, 
        name: "Wall Handstand Push-Up", 
        desc: "Full range overhead pressing inverted, controlled descent",
        exercises: ["Wall Handstand Push-Up", "Wall Handstand Push-Up (Pause)"],
        target: "3×5-8 reps",
        notes: "Perfect alignment, scapular control",
        duration: "4-6 weeks"
      },
      { 
        level: 11, 
        name: "Freestanding Handstand Progressions", 
        desc: "Freestanding balance and pressing",
        exercises: ["Freestanding Handstand Hold", "Freestanding Handstand Push-Up Negative"],
        target: "3×10-20s holds / 3×3-5 negatives",
        notes: "Elite balance and body awareness",
        duration: "6-8 weeks"
      },
      { 
        level: 12, 
        name: "Freestanding Handstand Push-Up", 
        desc: "Freestanding HSPU — elite skill",
        exercises: ["Freestanding Handstand Push-Up", "Freestanding Handstand Push-Up (Pause)"],
        target: "3×3-5 clean reps",
        notes: "Requires perfect form and balance",
        duration: "6-8 weeks"
      },
      { 
        level: 13, 
        name: "Planche Progressions", 
        desc: "Horizontal pressing strength, extreme difficulty",
        exercises: ["Planche Lean", "Tuck Planche Hold", "Advanced Tuck Planche"],
        target: "3×10-20s holds",
        notes: "Requires years of progressive training",
        duration: "8-12 weeks"
      },
      { 
        level: 14, 
        name: "Advanced Planche", 
        desc: "Straddle Planche and variations",
        exercises: ["Straddle Planche Hold", "Straddle Planche Push-Up"],
        target: "3×5-10s holds / 1-3 reps",
        notes: "Extreme strength and body control",
        duration: "8-12 weeks"
      },
      { 
        level: 15, 
        name: "Full Planche Mastery", 
        desc: "Full Planche hold and push-ups — ultimate achievement",
        exercises: ["Full Planche Hold", "Full Planche Push-Up"],
        target: "5-10s holds / 1-2 reps",
        notes: "Elite gymnastic strength",
        duration: "Ongoing"
      }
    ]
  },

  pull: {
    name: "Pull Progression",
    icon: "🔱",
    color: T.green,
    levels: [
      { 
        level: 1, 
        name: "Dead Hang", 
        desc: "Build grip strength and shoulder health",
        exercises: ["Dead Hang", "Scapular Hang"],
        target: "3×30-60s holds",
        notes: "Shoulders packed, full grip engagement",
        duration: "2-3 weeks"
      },
      { 
        level: 2, 
        name: "Scapular Pull-Up", 
        desc: "Shoulders only — scapula retraction/depression",
        exercises: ["Scapular Pull-Up", "Scapular Pull-Up (Slow)"],
        target: "3×8-10 reps",
        notes: "Minimal arm bend, focus on shoulder blades",
        duration: "2-3 weeks"
      },
      { 
        level: 3, 
        name: "Negative Pull-Up", 
        desc: "Jump to top, lower as slowly as possible (5–10s)",
        exercises: ["Negative Pull-Up (5s descent)", "Negative Pull-Up (10s descent)"],
        target: "3×5-8 negatives",
        notes: "Eccentric strength building, control descent",
        duration: "3-4 weeks"
      },
      { 
        level: 4, 
        name: "Assisted Pull-Up", 
        desc: "Band-assisted or machine-assisted pull-ups",
        exercises: ["Band-Assisted Pull-Up (Heavy Band)", "Machine-Assisted Pull-Up"],
        target: "3×8-10 reps",
        notes: "Gradually reduce band assistance",
        duration: "3-4 weeks"
      },
      { 
        level: 5, 
        name: "Standard Pull-Up", 
        desc: "Full range, dead hang to chin over bar",
        exercises: ["Standard Pull-Up", "Pull-Up with Pause (1s at top)"],
        target: "3×6-8 clean reps",
        notes: "Full ROM, no kipping, controlled descent",
        duration: "3-4 weeks"
      },
      { 
        level: 6, 
        name: "Pull-Up Variations", 
        desc: "Wide grip, close grip, and mixed grip variations",
        exercises: ["Wide-Grip Pull-Up", "Close-Grip Pull-Up", "Commando Pull-Up"],
        target: "3×8-10 reps per variation",
        notes: "Rotate for balanced back development",
        duration: "4-5 weeks"
      },
      { 
        level: 7, 
        name: "Weighted Pull-Up", 
        desc: "Add belt weight — progressive overload",
        exercises: ["Weighted Pull-Up (+5kg)", "Weighted Pull-Up (+10kg)"],
        target: "3×5-8 reps",
        notes: "Gradual weight progression",
        duration: "4-5 weeks"
      },
      { 
        level: 8, 
        name: "Advanced Grip Variations", 
        desc: "Gironda, L-Sit, and specialty grips",
        exercises: ["Gironda Pull-Up", "L-Sit Pull-Up", "Archer Pull-Up"],
        target: "3×5-8 reps",
        notes: "Extreme lat and core engagement",
        duration: "4-6 weeks"
      },
      { 
        level: 9, 
        name: "Muscle-Up Progression", 
        desc: "Transition from pull to dip — explosive skill",
        exercises: ["Muscle-Up Negative", "Assisted Muscle-Up", "Muscle-Up"],
        target: "3×3-5 reps",
        notes: "Requires explosive power and timing",
        duration: "6-8 weeks"
      },
      { 
        level: 10, 
        name: "Front Lever Progression", 
        desc: "Horizontal body position — extreme difficulty",
        exercises: ["Front Lever Tuck", "Front Lever Advanced Tuck", "Front Lever Single Leg"],
        target: "3×10-20s holds",
        notes: "Requires years of progressive training",
        duration: "6-8 weeks"
      },
      { 
        level: 11, 
        name: "Front Lever Row", 
        desc: "Row from front lever position",
        exercises: ["Front Lever Row (Tuck)", "Front Lever Row (Single Leg)"],
        target: "3×3-5 reps",
        notes: "Extreme pulling strength",
        duration: "8-12 weeks"
      },
      { 
        level: 12, 
        name: "One-Arm Pull-Up Progression", 
        desc: "Single arm pulling — elite strength",
        exercises: ["One-Arm Pull-Up Negative", "Assisted One-Arm Pull-Up"],
        target: "3×3-5 negatives / 1-3 reps",
        notes: "Requires immense pulling power",
        duration: "8-12 weeks"
      },
      { 
        level: 13, 
        name: "One-Arm Pull-Up", 
        desc: "Full one-arm pull-up",
        exercises: ["One-Arm Pull-Up", "One-Arm Pull-Up (Weighted)"],
        target: "3×1-3 reps",
        notes: "Ultimate pulling achievement",
        duration: "8-12 weeks"
      },
      { 
        level: 14, 
        name: "Back Lever Progression", 
        desc: "Inverted horizontal body hold",
        exercises: ["Back Lever Tuck", "Back Lever Advanced Tuck"],
        target: "3×10-20s holds",
        notes: "Extreme shoulder and back strength",
        duration: "8-12 weeks"
      },
      { 
        level: 15, 
        name: "Back Lever Mastery", 
        desc: "Full back lever and variations",
        exercises: ["Back Lever Hold", "Back Lever Row"],
        target: "3×10-15s holds / 1-3 reps",
        notes: "Elite gymnastic skill",
        duration: "Ongoing"
      }
    ]
  },

  core: {
    name: "Core Progression",
    icon: "🔥",
    color: T.red,
    levels: [
      { 
        level: 1, 
        name: "Dead Bug", 
        desc: "Opposite arm/leg from floor — spinal stability",
        exercises: ["Dead Bug", "Dead Bug (Slow)"],
        target: "3×10 each side",
        notes: "Lower back to floor, controlled movement",
        duration: "2-3 weeks"
      },
      { 
        level: 2, 
        name: "Hollow Body Hold", 
        desc: "Lower back pressed down, full body tension",
        exercises: ["Hollow Body Hold", "Hollow Body Rock"],
        target: "3×30-45s holds",
        notes: "Foundation for all gymnastics skills",
        duration: "2-3 weeks"
      },
      { 
        level: 3, 
        name: "Plank Progressions", 
        desc: "Perfect straight body tension",
        exercises: ["Plank", "Plank with Shoulder Taps", "Side Plank"],
        target: "3×45-60s holds",
        notes: "Rigid body, no sagging hips",
        duration: "3-4 weeks"
      },
      { 
        level: 4, 
        name: "Lying Leg Raises", 
        desc: "Lower body core strength",
        exercises: ["Lying Leg Raise", "Lying Leg Raise (Slow)"],
        target: "3×10-12 reps",
        notes: "Lower back to floor, control descent",
        duration: "3-4 weeks"
      },
      { 
        level: 5, 
        name: "Hanging Knee Raise", 
        desc: "From dead hang, knees to chest",
        exercises: ["Hanging Knee Raise", "Hanging Knee Raise (Pause)"],
        target: "3×12-15 reps",
        notes: "Avoid swinging, use core not momentum",
        duration: "3-4 weeks"
      },
      { 
        level: 6, 
        name: "Hanging Leg Raise", 
        desc: "Straight legs to 90° — no swinging",
        exercises: ["Hanging Leg Raise", "Hanging Leg Raise (Slow)"],
        target: "3×8-12 reps",
        notes: "Extreme core and hip flexor strength",
        duration: "4-5 weeks"
      },
      { 
        level: 7, 
        name: "Toes to Bar", 
        desc: "Straight legs touch the bar",
        exercises: ["Toes to Bar", "Toes to Bar (Pause)"],
        target: "3×8-10 reps",
        notes: "Requires explosive core power",
        duration: "4-5 weeks"
      },
      { 
        level: 8, 
        name: "Ab Wheel Rollout", 
        desc: "Full extension, return with lats",
        exercises: ["Ab Wheel Rollout (Kneeling)", "Ab Wheel Rollout (Standing)"],
        target: "3×10-12 reps",
        notes: "Extreme core and shoulder strength",
        duration: "4-6 weeks"
      },
      { 
        level: 9, 
        name: "L-SIT Hold", 
        desc: "Both legs extended parallel — full hold",
        exercises: ["L-SIT (Floor)", "L-SIT (Parallettes)", "L-SIT (Rings)"],
        target: "3×20-30s holds",
        notes: "Foundation for advanced skills",
        duration: "4-6 weeks"
      },
      { 
        level: 10, 
        name: "L-SIT Progressions", 
        desc: "L-SIT with movement and variations",
        exercises: ["L-SIT Pull-Up", "L-SIT Dip", "L-SIT Handstand"],
        target: "3×5-10 reps / holds",
        notes: "Extreme core and shoulder integration",
        duration: "6-8 weeks"
      },
      { 
        level: 11, 
        name: "Dragon Flag", 
        desc: "Full body rigid plank lowering from bench",
        exercises: ["Dragon Flag", "Dragon Flag (Slow)"],
        target: "3×5-8 reps",
        notes: "Extreme core and chest strength",
        duration: "6-8 weeks"
      },
      { 
        level: 12, 
        name: "Front Lever Progression", 
        desc: "Horizontal body hang — elite core skill",
        exercises: ["Front Lever Tuck", "Front Lever Advanced Tuck"],
        target: "3×10-20s holds",
        notes: "Requires years of progressive training",
        duration: "8-12 weeks"
      },
      { 
        level: 13, 
        name: "Front Lever Hold", 
        desc: "Full front lever — extreme difficulty",
        exercises: ["Front Lever Hold", "Front Lever Row"],
        target: "3×5-10s holds / 1-3 reps",
        notes: "Elite gymnastic skill",
        duration: "8-12 weeks"
      },
      { 
        level: 14, 
        name: "Back Lever Progression", 
        desc: "Inverted horizontal body hold",
        exercises: ["Back Lever Tuck", "Back Lever Advanced Tuck"],
        target: "3×10-20s holds",
        notes: "Extreme shoulder and core strength",
        duration: "8-12 weeks"
      },
      { 
        level: 15, 
        name: "Back Lever Mastery", 
        desc: "Full back lever — ultimate achievement",
        exercises: ["Back Lever Hold", "Back Lever Row"],
        target: "3×10-15s holds / 1-3 reps",
        notes: "Elite gymnastic strength",
        duration: "Ongoing"
      }
    ]
  },

  legs: {
    name: "Leg Progression",
    icon: "🦵",
    color: T.blue,
    levels: [
      { 
        level: 1, 
        name: "Bodyweight Squat", 
        desc: "Full depth, knees over toes",
        exercises: ["Bodyweight Squat", "Assisted Squat"],
        target: "3×15-20 reps",
        notes: "Full ROM, chest up, weight in heels",
        duration: "2-3 weeks"
      },
      { 
        level: 2, 
        name: "Reverse Lunge", 
        desc: "Step back, control descent",
        exercises: ["Reverse Lunge", "Reverse Lunge (Slow)"],
        target: "3×10-12 each leg",
        notes: "Push hips back not down, front knee over ankle",
        duration: "2-3 weeks"
      },
      { 
        level: 3, 
        name: "Bulgarian Split Squat", 
        desc: "Rear foot elevated — single-leg squat variation",
        exercises: ["Bulgarian Split Squat", "Bulgarian Split Squat (Pause)"],
        target: "3×8-10 each side",
        notes: "Extreme quad and glute activation",
        duration: "3-4 weeks"
      },
      { 
        level: 4, 
        name: "Nordic Curl", 
        desc: "Hamstring-focused eccentric strength",
        exercises: ["Nordic Curl", "Nordic Curl (Assisted)"],
        target: "3×5-8 reps",
        notes: "Extreme hamstring strength, injury prevention",
        duration: "3-4 weeks"
      },
      { 
        level: 5, 
        name: "Box Jump", 
        desc: "Maximum height intent every rep",
        exercises: ["Box Jump", "Box Jump (Higher Box)"],
        target: "4×6-8 reps",
        notes: "Explosive power, soft landing",
        duration: "3-4 weeks"
      },
      { 
        level: 6, 
        name: "Romanian Deadlift", 
        desc: "Extreme hamstring stretch under load",
        exercises: ["Romanian Deadlift (Bodyweight)", "Romanian Deadlift (Dumbbell)"],
        target: "3×10-12 reps",
        notes: "Hip hinge pattern, maintain neutral spine",
        duration: "3-4 weeks"
      },
      { 
        level: 7, 
        name: "Pistol Squat Progression", 
        desc: "Single-leg squat — advanced skill",
        exercises: ["Pistol Squat (Assisted)", "Pistol Squat (Negative)"],
        target: "3×5-8 negatives",
        notes: "Requires extreme mobility and strength",
        duration: "4-6 weeks"
      },
      { 
        level: 8, 
        name: "Shrimp Squat", 
        desc: "Single-leg squat variation with rear leg bent",
        exercises: ["Shrimp Squat", "Shrimp Squat (Pause)"],
        target: "3×6-10 each leg",
        notes: "Extreme quad and hip flexor strength",
        duration: "4-6 weeks"
      },
      { 
        level: 9, 
        name: "Pistol Squat", 
        desc: "Full single-leg squat — athletic mastery",
        exercises: ["Pistol Squat", "Pistol Squat (Pause)"],
        target: "3×5-8 each leg",
        notes: "Requires years of progressive training",
        duration: "6-8 weeks"
      },
      { 
        level: 10, 
        name: "Sissy Squat", 
        desc: "Extreme quad isolation under full load",
        exercises: ["Sissy Squat", "Sissy Squat (Weighted)"],
        target: "3×10-15 reps",
        notes: "Extreme quad and hip flexor activation",
        duration: "4-6 weeks"
      },
      { 
        level: 11, 
        name: "Weighted Pistol Squat", 
        desc: "Pistol squat with added weight",
        exercises: ["Weighted Pistol Squat (Dumbbell)", "Weighted Pistol Squat (Barbell)"],
        target: "3×5-8 each leg",
        notes: "Progressive overload for single-leg strength",
        duration: "6-8 weeks"
      },
      { 
        level: 12, 
        name: "Jump Squat Variations", 
        desc: "Explosive leg power",
        exercises: ["Jump Squat", "Single-Leg Jump Squat"],
        target: "4×6-10 reps",
        notes: "Explosive power, soft landing",
        duration: "4-6 weeks"
      },
      { 
        level: 13, 
        name: "Archer Squat", 
        desc: "Unilateral squat variation",
        exercises: ["Archer Squat", "Archer Squat (Weighted)"],
        target: "3×6-10 each side",
        notes: "Extreme single-leg strength and balance",
        duration: "6-8 weeks"
      },
      { 
        level: 14, 
        name: "Typewriter Squat", 
        desc: "Dynamic single-leg squat transition",
        exercises: ["Typewriter Squat", "Typewriter Squat (Explosive)"],
        target: "3×5-8 reps",
        notes: "Extreme strength and coordination",
        duration: "8-12 weeks"
      },
      { 
        level: 15, 
        name: "Advanced Single-Leg Mastery", 
        desc: "Elite single-leg strength and power",
        exercises: ["Pistol Squat (Weighted)", "Single-Leg Jump Squat (High Box)"],
        target: "3×5-8 reps / 4×6-8 reps",
        notes: "Ultimate leg strength achievement",
        duration: "Ongoing"
      }
    ]
  },

  fascia: {
    name: "Fascia Development",
    icon: "🌀",
    color: T.purple,
    levels: [
      { 
        level: 1, 
        name: "Plantar Fascia Release", 
        desc: "Daily fascial prep — foot adhesion release",
        exercises: ["Plantar Foam Roll", "Plantar Ball Roll"],
        target: "2-3 min/foot daily",
        notes: "Foundation for all fascia work",
        duration: "2-3 weeks"
      },
      { 
        level: 2, 
        name: "Elevated Towel Curl", 
        desc: "Plantar fascia activation — THE foundation",
        exercises: ["Elevated Towel Curl", "Marble Pickup"],
        target: "2-5 min/foot daily",
        notes: "Intrinsic foot muscle activation",
        duration: "2-3 weeks"
      },
      { 
        level: 3, 
        name: "Barefoot Balance", 
        desc: "Foot intelligence reactivation",
        exercises: ["Barefoot Balance (Eyes Open)", "Barefoot Balance (Eyes Closed)"],
        target: "60s each leg, 3×/week",
        notes: "Proprioceptive retraining",
        duration: "3-4 weeks"
      },
      { 
        level: 4, 
        name: "Standing Retracted Hold", 
        desc: "Full-body tensegrity from foot arch",
        exercises: ["Standing Retracted Hold", "Standing Retracted Hold (Arms Overhead)"],
        target: "3×45-60s holds",
        notes: "Whole-body fascial integration",
        duration: "3-4 weeks"
      },
      { 
        level: 5, 
        name: "Hyperarch Hop (Bilateral)", 
        desc: "Elastic spring system development",
        exercises: ["Hyperarch Hop (Bilateral)", "Hyperarch Hop (Forward)"],
        target: "3×1-2 min, 3×/week",
        notes: "Elastic recoil training, minimal knee bend",
        duration: "3-4 weeks"
      },
      { 
        level: 6, 
        name: "Deep Lunge Hold", 
        desc: "Anterior hip fascial chain opening",
        exercises: ["Deep Lunge Hold", "Deep Lunge Hold (Arms Overhead)"],
        target: "3×60-90s each side",
        notes: "Hip flexor and fascia stretching",
        duration: "3-4 weeks"
      },
      { 
        level: 7, 
        name: "Marble Toe Grip", 
        desc: "Foot-glute-core neural pathway",
        exercises: ["Marble Toe Grip", "Marble Toe Grip (Weighted)"],
        target: "2×3-5 min each side",
        notes: "Foot-core connection",
        duration: "4-5 weeks"
      },
      { 
        level: 8, 
        name: "Single-Leg Hyperarch Hop", 
        desc: "Single-leg elastic fascial loading",
        exercises: ["Single-Leg Hyperarch Hop", "Single-Leg Hyperarch Hop (Forward)"],
        target: "2×45-60s each leg",
        notes: "Unilateral elastic power",
        duration: "4-5 weeks"
      },
      { 
        level: 9, 
        name: "Spiral Walk", 
        desc: "Full spiral/diagonal line integration",
        exercises: ["Spiral Walk (Slow)", "Spiral Walk (Dynamic)"],
        target: "3×3-5 min",
        notes: "Full-body fascial spiral integration",
        duration: "4-5 weeks"
      },
      { 
        level: 10, 
        name: "Plyometric Fascia Training", 
        desc: "Explosive elastic power",
        exercises: ["Depth Jump", "Bounding (Forward)", "Bounding (Lateral)"],
        target: "3×5-10 reps",
        notes: "Extreme elastic recoil development",
        duration: "4-6 weeks"
      },
      { 
        level: 11, 
        name: "Tai Chi Basics", 
        desc: "Continuous fascial movement flow",
        exercises: ["Tai Chi Form (Simplified)", "Tai Chi Push Hands"],
        target: "10-15 min continuous",
        notes: "Smooth, integrated movement",
        duration: "6-8 weeks"
      },
      { 
        level: 12, 
        name: "Silk Reiling (Tai Chi)", 
        desc: "Complete fascial web in continuous motion",
        exercises: ["Silk Reiling (Basic)", "Silk Reiling (Advanced)"],
        target: "10-20 min continuous",
        notes: "Full fascial integration",
        duration: "6-8 weeks"
      },
      { 
        level: 13, 
        name: "Advanced Plyometric Sequences", 
        desc: "Complex elastic power combinations",
        exercises: ["Bounding Circuit", "Jump Rope (Double Unders)", "Reactive Agility Drills"],
        target: "3×5-10 min circuits",
        notes: "Extreme elastic power and coordination",
        duration: "6-8 weeks"
      },
      { 
        level: 14, 
        name: "Qigong & Fascia Integration", 
        desc: "Energy and fascia flow",
        exercises: ["Qigong Standing", "Qigong Movement Flow"],
        target: "15-30 min daily",
        notes: "Advanced fascial and energy work",
        duration: "8-12 weeks"
      },
      { 
        level: 15, 
        name: "Complete Fascia Mastery", 
        desc: "Full integration of all fascia techniques",
        exercises: ["Complete Fascia Protocol", "Custom Fascia Flow"],
        target: "30-60 min daily routine",
        notes: "Elite fascial development",
        duration: "Ongoing"
      }
    ]
  },

  martial: {
    name: "Martial Arts Progression",
    icon: "🥋",
    color: T.orange,
    levels: [
      { 
        level: 1, 
        name: "Shadowboxing Basics", 
        desc: "Fundamental footwork and stance drills",
        exercises: ["Shadowboxing", "Stance Work", "Basic Combinations"],
        target: "3×3-5 min",
        notes: "Perfect form, no power yet",
        duration: "2-3 weeks"
      },
      { 
        level: 2, 
        name: "Heavy Bag Work", 
        desc: "Power generation and combination practice",
        exercises: ["Heavy Bag Rounds", "Heavy Bag Combinations"],
        target: "3×2-3 min rounds",
        notes: "Build power and cardio",
        duration: "2-3 weeks"
      },
      { 
        level: 3, 
        name: "Speed Bag Drills", 
        desc: "Hand-eye coordination and shoulder endurance",
        exercises: ["Speed Bag", "Double-End Bag"],
        target: "3×2-3 min",
        notes: "Coordination and timing",
        duration: "2-3 weeks"
      },
      { 
        level: 4, 
        name: "Mitt Work Fundamentals", 
        desc: "Accuracy and timing with partner feedback",
        exercises: ["Mitt Work (Basic)", "Mitt Work (Combinations)"],
        target: "3×2-3 min rounds",
        notes: "Partner-based feedback and timing",
        duration: "3-4 weeks"
      },
      { 
        level: 5, 
        name: "Grappling Basics", 
        desc: "Takedowns and positional control drills",
        exercises: ["Takedown Drills", "Positional Control", "Escape Drills"],
        target: "3×5-10 min",
        notes: "Foundational grappling",
        duration: "3-4 weeks"
      },
      { 
        level: 6, 
        name: "Combination Chains", 
        desc: "Complex striking sequences at tempo",
        exercises: ["Combination Chains (Heavy Bag)", "Combination Chains (Mitt Work)"],
        target: "4×2-3 min rounds",
        notes: "Fluid striking combinations",
        duration: "3-4 weeks"
      },
      { 
        level: 7, 
        name: "Sparring Light Contact", 
        desc: "Technical sparring with controlled intensity",
        exercises: ["Light Contact Sparring", "Technical Sparring"],
        target: "3×3-5 min rounds",
        notes: "Control and technique focus",
        duration: "4-5 weeks"
      },
      { 
        level: 8, 
        name: "Grappling Submission Drills", 
        desc: "Submission escapes and counters",
        exercises: ["Submission Drills", "Escape Drills", "Counter Drills"],
        target: "3×5-10 min",
        notes: "Advanced grappling techniques",
        duration: "4-5 weeks"
      },
      { 
        level: 9, 
        name: "Intermediate Sparring", 
        desc: "Medium-intensity technical sparring",
        exercises: ["Medium Contact Sparring", "Combination Sparring"],
        target: "4×3-5 min rounds",
        notes: "Increased intensity, technique maintained",
        duration: "4-6 weeks"
      },
      { 
        level: 10, 
        name: "Advanced Grappling", 
        desc: "Complex grappling sequences and transitions",
        exercises: ["Advanced Grappling Drills", "Position Transitions"],
        target: "3×10-15 min",
        notes: "Fluid grappling exchanges",
        duration: "4-6 weeks"
      },
      { 
        level: 11, 
        name: "Advanced Sparring", 
        desc: "Full-intensity technical sparring",
        exercises: ["Full Contact Sparring", "Advanced Combination Sparring"],
        target: "4×3-5 min rounds",
        notes: "Full intensity, high technique",
        duration: "4-6 weeks"
      },
      { 
        level: 12, 
        name: "Mixed Striking & Grappling", 
        desc: "Transitions between striking and grappling",
        exercises: ["Clinch Work", "Takedown Defense", "Ground & Pound Drills"],
        target: "3×5-10 min",
        notes: "MMA-style transitions",
        duration: "6-8 weeks"
      },
      { 
        level: 13, 
        name: "Competition Preparation", 
        desc: "Full-contact simulation with all techniques",
        exercises: ["Competition Sparring", "Full Simulation Rounds"],
        target: "5×3-5 min rounds",
        notes: "Match-intensity training",
        duration: "6-8 weeks"
      },
      { 
        level: 14, 
        name: "Advanced Competition Training", 
        desc: "Elite-level training and strategy",
        exercises: ["Strategy Sparring", "Opponent-Specific Training"],
        target: "5×5-10 min rounds",
        notes: "Tactical and strategic focus",
        duration: "8-12 weeks"
      },
      { 
        level: 15, 
        name: "Competition Ready", 
        desc: "Full mastery — ready for sanctioned competition",
        exercises: ["Full Competition Simulation", "Elite Training Rounds"],
        target: "Multiple full rounds",
        notes: "Professional-level readiness",
        duration: "Ongoing"
      }
    ]
  },

  height: {
    name: "Height Growth Protocol",
    icon: "📏",
    color: T.blue,
    levels: [
      { 
        level: 1, 
        name: "Hanging Decompression", 
        desc: "Spinal decompression — reduce daily compression",
        exercises: ["Dead Hang", "Scapular Hang"],
        target: "3×30-45s, 5×/week",
        notes: "Decompress spine before the day",
        duration: "2-3 weeks"
      },
      { 
        level: 2, 
        name: "Cobra Stretch", 
        desc: "Spinal flexibility and anterior chain opening",
        exercises: ["Cobra Stretch", "Upward Dog"],
        target: "3×20-30s, 2×/day",
        notes: "Spinal flexibility activation",
        duration: "2-3 weeks"
      },
      { 
        level: 3, 
        name: "Downward Dog", 
        desc: "Full-body spinal tension relief and inversion",
        exercises: ["Downward Dog", "Downward Dog (Hold)"],
        target: "3×30-45s, 2×/day",
        notes: "Inversion & tension relief",
        duration: "2-3 weeks"
      },
      { 
        level: 4, 
        name: "Masai Jumps", 
        desc: "Create micro-fractures in shin bones via plyometrics",
        exercises: ["Masai Jumps", "High-Intensity Jumps"],
        target: "10×100 jumps, 3-5 days/week",
        notes: "Mechanical stress for bone adaptation",
        duration: "3-4 weeks"
      },
      { 
        level: 5, 
        name: "Sprinting Intervals", 
        desc: "Explosive movement to boost HGH",
        exercises: ["Sprint Intervals (20s)", "Sprint Intervals (30s)"],
        target: "5×20-30s, 3-4×/week",
        notes: "HGH stimulation",
        duration: "3-4 weeks"
      },
      { 
        level: 6, 
        name: "Cycling (High Seat)", 
        desc: "Mechanical stress for vertical leg bone adaptation",
        exercises: ["Cycling (High Seat)", "Stationary Cycling"],
        target: "30-60 min, 3×/week",
        notes: "Mechanical stress for leg elongation",
        duration: "3-4 weeks"
      },
      { 
        level: 7, 
        name: "Ankle Weight Stretch", 
        desc: "Vertical bone stretching during sleep recovery",
        exercises: ["Ankle Weight Stretch (Supine)", "Ankle Weight Stretch (Seated)"],
        target: "Wear 2-3kg, 6-8 hrs/night",
        notes: "Passive vertical stretch stimulus",
        duration: "4-6 weeks"
      },
      { 
        level: 8, 
        name: "Standing Reach Hold", 
        desc: "Full-body elongation and calf activation",
        exercises: ["Standing Reach Hold", "Standing Reach Hold (Pulse)"],
        target: "3×15-20 reps, daily",
        notes: "Full-body elongation",
        duration: "3-4 weeks"
      },
      { 
        level: 9, 
        name: "Calf Stretch Series", 
        desc: "Deep calf flexibility for ankle extension",
        exercises: ["Calf Stretch", "Calf Stretch (Wall)", "Calf Stretch (Stairs)"],
        target: "3×30-45s/leg post-workout",
        notes: "Deep calf flexibility",
        duration: "3-4 weeks"
      },
      { 
        level: 10, 
        name: "Inversion Table Work", 
        desc: "Advanced spinal decompression",
        exercises: ["Inversion Table (Partial)", "Inversion Table (Full)"],
        target: "10-20 min, 3-4×/week",
        notes: "Extreme spinal decompression",
        duration: "4-6 weeks"
      },
      { 
        level: 11, 
        name: "Advanced Plyometrics", 
        desc: "High-intensity jumping for bone adaptation",
        exercises: ["Box Jumps", "Depth Jumps", "Bounding"],
        target: "3×8-10 reps, 3-4×/week",
        notes: "Extreme mechanical stress",
        duration: "4-6 weeks"
      },
      { 
        level: 12, 
        name: "Sleep Optimization", 
        desc: "Peak HGH release during sleep",
        exercises: ["Sleep Protocol", "Pre-Sleep Routine"],
        target: "10 PM–12 AM sleep window",
        notes: "Optimal HGH release timing",
        duration: "8-12 weeks"
      },
      { 
        level: 13, 
        name: "Postural Correction", 
        desc: "Maximize height through posture",
        exercises: ["Wall Slides", "Chin Tucks", "Shoulder Blade Retractions"],
        target: "3×15-20 reps, daily",
        notes: "Own your full height",
        duration: "4-6 weeks"
      },
      { 
        level: 14, 
        name: "Complete Protocol Integration", 
        desc: "All techniques combined for maximum growth",
        exercises: ["Full Morning Routine", "Full Evening Routine"],
        target: "2-3 hours daily",
        notes: "Comprehensive height protocol",
        duration: "8-12 weeks"
      },
      { 
        level: 15, 
        name: "Height Mastery", 
        desc: "Elite height growth protocol mastery",
        exercises: ["Advanced Full Protocol", "Custom Height Optimization"],
        target: "Ongoing daily routine",
        notes: "Maximum vertical growth potential",
        duration: "Ongoing"
      }
    ]
  },

  anime: {
    name: "Anime Physique (V-Taper)",
    icon: "🔱",
    color: T.green,
    levels: [
      { 
        level: 1, 
        name: "Stomach Vacuum", 
        desc: "Golden era waist — core vacuum for narrow midsection",
        exercises: ["Stomach Vacuum", "Stomach Vacuum (Isometric)"],
        target: "3×30-45s, daily",
        notes: "Golden era waist training",
        duration: "2-3 weeks"
      },
      { 
        level: 2, 
        name: "Archer Pull-Up", 
        desc: "Unilateral pulling for V-taper development",
        exercises: ["Archer Pull-Up", "Archer Pull-Up (Explosive)"],
        target: "3×5-8 each side",
        notes: "Unilateral V-taper",
        duration: "3-4 weeks"
      },
      { 
        level: 3, 
        name: "Wide-Grip Pull-Up", 
        desc: "Elbows to sides — maximum lat width",
        exercises: ["Wide-Grip Pull-Up", "Wide-Grip Pull-Up (Weighted)"],
        target: "4×8-12 reps",
        notes: "Maximum lat width",
        duration: "3-4 weeks"
      },
      { 
        level: 4, 
        name: "Commando Pull-Up", 
        desc: "Alternating grip pull-up for back thickness",
        exercises: ["Commando Pull-Up", "Commando Pull-Up (Explosive)"],
        target: "3×6-10 reps",
        notes: "Back thickness development",
        duration: "3-4 weeks"
      },
      { 
        level: 5, 
        name: "Handstand Push-Up", 
        desc: "3D shoulder development — anterior & lateral delts",
        exercises: ["Handstand Push-Up", "Handstand Push-Up (Weighted)"],
        target: "3×6-10 reps",
        notes: "3D shoulder development",
        duration: "4-5 weeks"
      },
      { 
        level: 6, 
        name: "Pike Push-Up", 
        desc: "Shoulder-focused pressing for cap development",
        exercises: ["Pike Push-Up", "Pike Push-Up (Feet Elevated)"],
        target: "3×10-15 reps",
        notes: "Shoulder cap development",
        duration: "3-4 weeks"
      },
      { 
        level: 7, 
        name: "Explosive Pull-Up", 
        desc: "Explosive back power for demon physique",
        exercises: ["Explosive Pull-Up", "Explosive Pull-Up (Clapping)"],
        target: "4×5-8 reps",
        notes: "Explosive back power",
        duration: "4-5 weeks"
      },
      { 
        level: 8, 
        name: "Front Lever Progression", 
        desc: "Elite back thickness and core integration",
        exercises: ["Front Lever Tuck", "Front Lever Advanced Tuck"],
        target: "3×10-20s holds",
        notes: "Elite back thickness",
        duration: "6-8 weeks"
      },
      { 
        level: 9, 
        name: "Pseudo Planche Push-Up", 
        desc: "Extreme chest and shoulder definition",
        exercises: ["Pseudo Planche Push-Up", "Pseudo Planche Push-Up (Rings)"],
        target: "3×8-12 reps",
        notes: "Extreme chest and shoulder",
        duration: "4-5 weeks"
      },
      { 
        level: 10, 
        name: "L-SIT Pull-Up", 
        desc: "L-SIT position while pulling — elite core+pull",
        exercises: ["L-SIT Pull-Up", "L-SIT Pull-Up (Weighted)"],
        target: "3×3-8 reps",
        notes: "Elite core and pull integration",
        duration: "6-8 weeks"
      },
      { 
        level: 11, 
        name: "Planche Progression", 
        desc: "Horizontal pressing strength",
        exercises: ["Planche Lean", "Tuck Planche Hold"],
        target: "3×10-20s holds",
        notes: "Extreme pressing strength",
        duration: "6-8 weeks"
      },
      { 
        level: 12, 
        name: "Back Lever Progression", 
        desc: "Inverted horizontal body hold",
        exercises: ["Back Lever Tuck", "Back Lever Advanced Tuck"],
        target: "3×10-20s holds",
        notes: "Extreme back and shoulder",
        duration: "8-12 weeks"
      },
      { 
        level: 13, 
        name: "Iron Cross Progression", 
        desc: "Rings hold — extreme shoulder strength",
        exercises: ["Iron Cross (Tuck)", "Iron Cross (Advanced Tuck)"],
        target: "3×10-20s holds",
        notes: "Extreme shoulder strength",
        duration: "8-12 weeks"
      },
      { 
        level: 14, 
        name: "Advanced V-Taper Integration", 
        desc: "All techniques combined for perfect V-taper",
        exercises: ["Complete V-Taper Routine", "Custom V-Taper Flow"],
        target: "Full workout integration",
        notes: "Perfect V-taper physique",
        duration: "8-12 weeks"
      },
      { 
        level: 15, 
        name: "Anime Physique Mastery", 
        desc: "Full V-taper with anime villain aesthetics",
        exercises: ["Elite V-Taper Protocol", "Advanced Skill Integration"],
        target: "Advanced skill integration",
        notes: "Ultimate anime physique",
        duration: "Ongoing"
      }
    ]
  }
};


export { LADDERS };
