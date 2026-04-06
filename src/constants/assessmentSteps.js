// ─── 6-LAYER ASSESSMENT SYSTEM ────────────────────────────────────────────────
// Based on the assessment architecture from Training_Program_part_2.docx
// Layer 1: Foundation (demographics + physical baseline)
// Layer 2: Goals & Motivation Architecture
// Layer 3: Lifestyle, Recovery, Constraints
// Layer 4: Injury History & Health Screening
// Layer 5: Psychological & Identity Profile
// Layer 6: Discipline-Specific Routing

export const ASSESSMENT_STEPS = [
  {
    id: "identity",
    layer: 1,
    label: "01 — Foundation",
    title: "Let's start at the foundation.",
    subtitle: "This isn't a form. It's how we build your Training DNA.",
    questions: [
      { id: "age",       type: "number",   label: "Age",                    placeholder: "22",  unit: "years" },
      { id: "sex",       type: "select",   label: "Biological sex",         options: ["Male", "Female", "Other"] },
      { id: "height",    type: "number",   label: "Height",                 placeholder: "178", unit: "cm" },
      { id: "weight",    type: "number",   label: "Weight",                 placeholder: "75",  unit: "kg" },
      { id: "bodyType",  type: "select",   label: "Body type tendency",
        options: ["Stays lean naturally (Ectomorph)", "Gains fat easily (Endomorph)", "Builds muscle easily (Mesomorph)", "Unsure / Mixed"] },
    ],
  },
  {
    id: "capacity",
    layer: 1,
    label: "02 — Physical Reality",
    title: "What can your body actually do right now?",
    subtitle: "Not what you think you could do. What you can do today.",
    questions: [
      { id: "pushups",       type: "number", label: "Max push-ups (clean form)",             placeholder: "15", unit: "reps" },
      { id: "pullups",       type: "number", label: "Max pull-ups",                          placeholder: "0",  unit: "reps" },
      { id: "deadhang",      type: "number", label: "Dead hang hold",                        placeholder: "20", unit: "seconds" },
      { id: "flexibility",   type: "select", label: "Standing toe touch",
        options: ["Full palms on floor", "Fingertips touch toes", "Hands mid-shin", "Can't reach shins"] },
      { id: "trainingYears", type: "select", label: "Consistent training history",
        options: ["Never trained seriously", "Under 6 months", "6 months – 2 years", "2–5 years", "5+ years"] },
    ],
  },
  {
    id: "goals",
    layer: 2,
    label: "03 — What You Want",
    title: "Tell us what this is actually for.",
    subtitle: "The real answer. Not the socially acceptable one.",
    questions: [
      { id: "primaryGoal",     type: "textarea", label: "In your own words — what do you want this training to do for you?",
        placeholder: "I want to feel powerful and look like I could handle myself in any situation…" },
      { id: "vision",          type: "textarea", label: "If you achieve exactly what you want in 12 months, what does a typical day look like?",
        placeholder: "I wake up and actually look forward to training. My body feels…" },
      { id: "secondaryGoals",  type: "multiselect", label: "Beyond your main goal, which of these also matter to you?",
        options: ["Build visible muscle", "Improve flexibility", "Get leaner / lose fat", "Grow taller / improve posture", "Learn to fight", "Master bodyweight skills", "Recover from injury"] },
      { id: "urgency",         type: "text", label: "Is there a specific date or event you're working toward?",
        placeholder: "Summer in 6 months / No specific deadline" },
    ],
  },
  {
    id: "lifestyle",
    layer: 3,
    label: "04 — Your Life",
    title: "A perfect program that doesn't fit your life is useless.",
    subtitle: "Be honest. The system adjusts to reality, not the other way around.",
    questions: [
      { id: "trainingDays",   type: "select", label: "Days per week you can realistically train",
        options: ["2 days", "3 days", "4 days", "5 days", "6 days"] },
      { id: "sessionLength",  type: "select", label: "Max session length on most days",
        options: ["30 minutes", "45 minutes", "60 minutes", "75 minutes", "90+ minutes"] },
      { id: "equipment",      type: "multiselect", label: "Equipment access",
        options: ["Full gym", "Pull-up bar", "Gymnastics rings", "Resistance bands", "Foam roller / massage tools", "Open outdoor space", "Bodyweight only"] },
      { id: "sleepHours",     type: "select", label: "Average nightly sleep",
        options: ["Under 5 hours", "5–6 hours", "6–7 hours", "7–8 hours", "8+ hours"] },
      { id: "stressLevel",    type: "range",  label: "Daily life stress level", min: 1, max: 10 },
      { id: "nutritionBase",  type: "select", label: "Current eating habits",
        options: ["Track macros carefully", "Generally eat well", "Eat whatever feels right", "Diet is inconsistent"] },
    ],
  },
  {
    id: "injury",
    layer: 4,
    label: "05 — Injury & Health",
    title: "Safety and accuracy live in this layer.",
    subtitle: "Old injuries create compensatory patterns that change your entire entry point.",
    questions: [
      { id: "activePain",      type: "select", label: "Are you currently experiencing pain or discomfort that affects movement?",
        options: ["No active pain", "Mild discomfort in one area", "Moderate pain limiting some movements", "Significant pain / recovering from injury"] },
      { id: "painLocation",    type: "text",   label: "If yes — where, and what triggers it?",
        placeholder: "Lower back when bending, shoulder when pressing overhead…" },
      { id: "pastInjuries",    type: "multiselect", label: "Significant past injuries",
        options: ["Shoulder / rotator cuff", "Lower back", "Knee (ACL, meniscus)", "Hip / groin", "Ankle / foot", "Neck / cervical", "None significant"] },
      { id: "growthPlate",     type: "select", label: "Are you still in your teenage years and actively growing?",
        options: ["Yes (under 18)", "Possibly (18–22, male)", "No — fully grown"] },
    ],
  },
  {
    id: "psychology",
    layer: 5,
    label: "06 — Your Mind",
    title: "The most honest part of the assessment.",
    subtitle: "This determines how your program thinks, speaks, and challenges you.",
    questions: [
      { id: "motivationType",     type: "select", label: "What genuinely keeps you training?",
        options: ["Getting technically better at something", "Seeing my body change in the mirror", "Testing myself against others or competition", "The ritual — showing up regardless of how I feel", "Understanding the science and seeing data improve"] },
      { id: "difficultyResponse", type: "select", label: "When a session is brutally hard and you want to quit…",
        options: ["I push through — feel great afterward", "I usually quit and feel bad about it", "Depends on the day and my mood", "I modify it and keep going at a lower level"] },
      { id: "communityPref",      type: "select", label: "Training preference",
        options: ["Alone — pure focus", "With one training partner", "In a group or class"] },
      { id: "disciplineAttraction", type: "discipline-select", label: "Which discipline excites you most right now?" },
    ],
  },
];

// Discipline-specific questions (rendered conditionally after step 6 based on attraction)
export const DISCIPLINE_DEEP_QUESTIONS = {
  calisthenics: {
    label: "07 — Calisthenics Routing",
    title: "Let's find your exact entry point.",
    questions: [
      { id: "caliTarget",     type: "select", label: "Is there a specific skill you want to achieve?",
        options: ["Muscle-up", "Handstand", "Front Lever", "Planche", "Human Flag", "Just strength and aesthetics"] },
      { id: "caliPriority",   type: "select", label: "What matters more to you within calisthenics?",
        options: ["Mastering impressive skills", "Looking athletic and aesthetic", "Both equally"] },
      { id: "caliBackground", type: "select", label: "Any background in gymnastics, yoga, dance, or martial arts?",
        options: ["Yes, significant experience", "Some exposure", "None at all"] },
    ],
  },
  martial_arts: {
    label: "07 — Martial Arts Routing",
    title: "What are you actually training for?",
    questions: [
      { id: "martialBg",      type: "select", label: "Previous martial arts training?",
        options: ["None — absolute beginner", "Some experience (under 1 year)", "Trained consistently 1–3 years", "3+ years of experience"] },
      { id: "martialGoal",    type: "select", label: "Primary goal within martial arts",
        options: ["Real fighting effectiveness and competition", "Fitness, discipline, and conditioning", "Self-defence capability", "The aesthetic and culture of combat sports"] },
      { id: "partnerAccess",  type: "select", label: "Do you have access to a training partner or martial arts school?",
        options: ["Yes, regular access to a school/gym", "Occasional partner", "Solo training only"] },
    ],
  },
  fascia: {
    label: "07 — Fascia Training Routing",
    title: "Understanding your tissue baseline.",
    questions: [
      { id: "fasciaSymptoms", type: "multiselect", label: "Do you regularly experience any of these?",
        options: ["Tightness or stiffness in specific areas", "Recurring injuries in the same locations", "Feeling stiff after sitting for long periods", "Poor posture that feels hard to correct", "None of these"] },
      { id: "deskTime",       type: "select", label: "How much time do you spend sitting daily?",
        options: ["Mostly standing/moving", "2–4 hours sitting", "4–8 hours sitting", "8+ hours sitting"] },
      { id: "fasciaExposure", type: "select", label: "Previous exposure to fascia training, yoga, or mobility work?",
        options: ["Significant — trained this before", "Some casual exposure", "None — completely new to this"] },
    ],
  },
  anime_physique: {
    label: "07 — Physique Routing",
    title: "Let's map your exact aesthetic starting point.",
    questions: [
      { id: "bodyfatEst",     type: "select", label: "Rough body fat estimate",
        options: ["Lean — muscle definition visible", "Average — some definition", "Above average — minimal definition", "Unsure"] },
      { id: "physiqueFocus",  type: "select", label: "Primary body composition goal",
        options: ["Build muscle mass (bulk)", "Lose fat (cut)", "Both simultaneously (recomp)", "Maintain and refine"] },
      { id: "weakPoint",      type: "multiselect", label: "Which area do you most want to develop?",
        options: ["Shoulders / deltoids", "Back width / lats", "Arms / forearms", "Core definition", "Chest", "Overall proportions"] },
    ],
  },
  height_growth: {
    label: "07 — Height & Posture Routing",
    title: "Understanding your structural baseline.",
    questions: [
      { id: "postureIssues",  type: "multiselect", label: "Current posture or structural issues",
        options: ["Forward head posture", "Rounded shoulders", "Anterior pelvic tilt", "Visible spinal curvature", "Leg length discrepancy", "None noticeable"] },
      { id: "sleepSetup",     type: "select", label: "Current sleep setup",
        options: ["Flat mattress, no pillow", "Flat mattress, one pillow", "Thick pillow or multiple pillows", "Elevated head / adjustable base"] },
      { id: "decompressionExp", type: "select", label: "Experience with inversion, hanging, or decompression work?",
        options: ["Regular practice", "Some experience", "None — completely new"] },
    ],
  },
};
