"use client";

import { useState } from "react";

type Opportunity = {
  name: string;
  category: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  skills: string[];
  interests: string[];
  timeMin: number;
  incomeMin: number;
  incomeMax: number;
  difficulty: string;
  location: string;
  firstSteps: string[];
};

const goals = [
  "Make extra income",
  "Start a business",
  "Build a scalable business",
  "Replace my job",
  "Test an idea",
  "I'm not sure yet",
];

const budgets = [
  "€0–€50",
  "€50–€250",
  "€250–€500",
  "€500–€1,000",
  "€1,000+",
  "I don't want to invest money",
];

const skills = [
  "Sales",
  "Marketing",
  "Customer service",
  "Writing",
  "Design",
  "Photography",
  "Video editing",
  "Coding",
  "AI / Technology",
  "Fitness / Coaching",
  "Teaching",
  "Cars / Mechanics",
  "Construction / Practical work",
  "Social media",
  "Management",
];

const interests = [
  "Technology",
  "AI",
  "Fashion",
  "Fitness",
  "Cars",
  "Sports",
  "Gaming",
  "Food",
  "Travel",
  "Finance",
  "Beauty",
  "Education",
  "Social media",
  "Sustainability",
  "Entertainment",
];

const timeOptions = [
  "Less than 2 hours/week",
  "2–5 hours/week",
  "5–10 hours/week",
  "10–20 hours/week",
  "20+ hours/week",
];

const locations = [
  "Ireland",
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Europe",
  "Other",
];

const ambitions = [
  "€100–€500/month",
  "€500–€1,000/month",
  "€1,000–€2,500/month",
  "€2,500–€5,000/month",
  "€5,000–€10,000/month",
  "€10,000+/month",
];

const opportunities: Opportunity[] = [
  {
    name: "Short-Form Video Editing",
    category: "Digital",
    description:
      "Help businesses and creators turn raw footage into engaging TikToks, Reels and YouTube Shorts.",
    budgetMin: 0,
    budgetMax: 150,
    skills: ["Video editing", "Social media", "Design", "Marketing"],
    interests: ["Social media", "Entertainment", "Technology", "Fashion", "Sports"],
    timeMin: 3,
    incomeMin: 500,
    incomeMax: 3000,
    difficulty: "Moderate",
    location: "Online",
    firstSteps: [
      "Create 3 sample videos.",
      "Build a simple portfolio.",
      "Contact 20 potential clients.",
      "Offer your first client a discounted package.",
      "Collect testimonials and improve your offer.",
    ],
  },
  {
    name: "Mobile Car Valeting",
    category: "Local Service",
    description:
      "Provide mobile car cleaning and detailing services to customers at their homes or workplaces.",
    budgetMin: 100,
    budgetMax: 500,
    skills: ["Cars / Mechanics", "Customer service", "Sales"],
    interests: ["Cars", "Sustainability", "Sports"],
    timeMin: 4,
    incomeMin: 500,
    incomeMax: 3000,
    difficulty: "Easy",
    location: "In person",
    firstSteps: [
      "Research local competitors.",
      "Buy basic cleaning equipment.",
      "Create your service packages.",
      "Create a social media page.",
      "Get your first five customers.",
    ],
  },
  {
    name: "Social Media Management",
    category: "Digital",
    description:
      "Manage social media content and strategy for small businesses that need help growing online.",
    budgetMin: 0,
    budgetMax: 200,
    skills: ["Social media", "Marketing", "Writing", "Design"],
    interests: ["Social media", "Fashion", "Food", "Fitness", "Beauty"],
    timeMin: 4,
    incomeMin: 500,
    incomeMax: 5000,
    difficulty: "Moderate",
    location: "Online",
    firstSteps: [
      "Choose a niche.",
      "Create example social media posts.",
      "Build a simple portfolio.",
      "Contact 20 businesses.",
      "Offer a starter monthly package.",
    ],
  },
  {
    name: "UGC Content Creation",
    category: "Creative",
    description:
      "Create authentic short-form videos that brands can use for advertising and social media.",
    budgetMin: 0,
    budgetMax: 150,
    skills: ["Video editing", "Photography", "Social media", "Writing"],
    interests: ["Fashion", "Beauty", "Fitness", "Food", "Technology"],
    timeMin: 3,
    incomeMin: 300,
    incomeMax: 5000,
    difficulty: "Moderate",
    location: "Online",
    firstSteps: [
      "Create 3 sample UGC videos.",
      "Choose a few product categories.",
      "Create a creator portfolio.",
      "Contact small brands.",
      "Start with affordable packages.",
    ],
  },
  {
    name: "AI Automation Service",
    category: "Technology",
    description:
      "Help small businesses automate repetitive tasks using AI and no-code tools.",
    budgetMin: 0,
    budgetMax: 300,
    skills: ["AI / Technology", "Coding", "Marketing", "Management"],
    interests: ["AI", "Technology", "Finance", "Business"],
    timeMin: 5,
    incomeMin: 1000,
    incomeMax: 10000,
    difficulty: "Advanced",
    location: "Online",
    firstSteps: [
      "Learn one useful automation platform.",
      "Build three example automations.",
      "Choose a business niche.",
      "Create a simple service offer.",
      "Contact businesses with a specific automation idea.",
    ],
  },
  {
    name: "Online Tutoring",
    category: "Education",
    description:
      "Teach a subject or skill you already understand through one-to-one or group sessions.",
    budgetMin: 0,
    budgetMax: 100,
    skills: ["Teaching", "Writing", "Management"],
    interests: ["Education", "Technology", "Fitness", "Finance"],
    timeMin: 2,
    incomeMin: 300,
    incomeMax: 3000,
    difficulty: "Easy",
    location: "Online",
    firstSteps: [
      "Choose a subject.",
      "Define your target student.",
      "Create a simple lesson structure.",
      "Set an introductory price.",
      "Find your first students.",
    ],
  },
  {
    name: "Pressure Washing Service",
    category: "Local Service",
    description:
      "Clean driveways, patios and outdoor surfaces for residential customers.",
    budgetMin: 250,
    budgetMax: 1000,
    skills: ["Sales", "Customer service", "Construction / Practical work"],
    interests: ["Sustainability", "Cars", "Construction"],
    timeMin: 4,
    incomeMin: 700,
    incomeMax: 4000,
    difficulty: "Moderate",
    location: "In person",
    firstSteps: [
      "Research local demand.",
      "Calculate equipment costs.",
      "Create service packages.",
      "Find your first customers.",
      "Take before-and-after photos for marketing.",
    ],
  },
  {
    name: "Graphic Design Service",
    category: "Creative",
    description:
      "Create logos, social media graphics and marketing materials for small businesses.",
    budgetMin: 0,
    budgetMax: 150,
    skills: ["Design", "Marketing", "Social media"],
    interests: ["Fashion", "Technology", "Entertainment", "Social media"],
    timeMin: 3,
    incomeMin: 300,
    incomeMax: 4000,
    difficulty: "Moderate",
    location: "Online",
    firstSteps: [
      "Create five portfolio examples.",
      "Choose a niche.",
      "Create simple service packages.",
      "Contact potential clients.",
      "Turn your first projects into case studies.",
    ],
  },
  {
    name: "Fitness Coaching",
    category: "Health & Fitness",
    description:
      "Provide fitness guidance, accountability and personalised training support.",
    budgetMin: 0,
    budgetMax: 200,
    skills: ["Fitness / Coaching", "Social media", "Customer service"],
    interests: ["Fitness", "Sports", "Education"],
    timeMin: 4,
    incomeMin: 500,
    incomeMax: 5000,
    difficulty: "Moderate",
    location: "Online",
    firstSteps: [
      "Choose a specific target audience.",
      "Create educational content.",
      "Define your coaching offer.",
      "Find your first clients.",
      "Collect feedback and testimonials.",
    ],
  },
  {
    name: "Niche Reselling",
    category: "Commerce",
    description:
      "Buy undervalued products and resell them through online marketplaces.",
    budgetMin: 50,
    budgetMax: 1000,
    skills: ["Sales", "Marketing", "Customer service"],
    interests: ["Fashion", "Gaming", "Cars", "Technology", "Sports"],
    timeMin: 3,
    incomeMin: 300,
    incomeMax: 4000,
    difficulty: "Moderate",
    location: "Either",
    firstSteps: [
      "Choose one product niche.",
      "Research prices and demand.",
      "Find reliable sources.",
      "Start with a small amount of inventory.",
      "Track every sale and reinvest profits.",
    ],
  },
];

function getBudgetNumber(budget: string): number {
  if (budget.includes("€0–€50")) return 50;
  if (budget.includes("€50–€250")) return 250;
  if (budget.includes("€250–€500")) return 500;
  if (budget.includes("€500–€1,000")) return 1000;
  if (budget.includes("€1,000+")) return 5000;
  return 0;
}

function getTimeNumber(time: string): number {
  if (time.includes("Less than 2")) return 1;
  if (time.includes("2–5")) return 3;
  if (time.includes("5–10")) return 7;
  if (time.includes("10–20")) return 15;
  return 25;
}

function getAmbitionNumber(ambition: string): number {
  if (ambition.includes("€100–€500")) return 500;
  if (ambition.includes("€500–€1,000")) return 1000;
  if (ambition.includes("€1,000–€2,500")) return 2500;
  if (ambition.includes("€2,500–€5,000")) return 5000;
  if (ambition.includes("€5,000–€10,000")) return 10000;
  return 15000;
}

function calculateMatch(
  opportunity: Opportunity,
  budget: string,
  userSkills: string[],
  userInterests: string[],
  time: string,
  ambition: string,
  goal: string
) {
  let score = 40;

  const budgetNumber = getBudgetNumber(budget);
  const timeNumber = getTimeNumber(time);
  const ambitionNumber = getAmbitionNumber(ambition);

  const skillMatches = userSkills.filter((skill) =>
    opportunity.skills.includes(skill)
  ).length;

  const interestMatches = userInterests.filter((interest) =>
    opportunity.interests.includes(interest)
  ).length;

  score += Math.min(skillMatches * 8, 24);
  score += Math.min(interestMatches * 6, 18);

  if (
    budgetNumber >= opportunity.budgetMin &&
    budgetNumber <= opportunity.budgetMax + 250
  ) {
    score += 8;
  } else if (budgetNumber >= opportunity.budgetMin) {
    score += 4;
  }

  if (timeNumber >= opportunity.timeMin) {
    score += 5;
  }

  if (ambitionNumber <= opportunity.incomeMax) {
    score += 5;
  }

  if (
    goal === "Build a scalable business" &&
    opportunity.incomeMax >= 5000
  ) {
    score += 5;
  }

  if (
    goal === "Make extra income" &&
    opportunity.incomeMin <= 1000
  ) {
    score += 4;
  }

  if (goal === "Start a business") {
    score += 3;
  }

  return Math.min(Math.round(score), 99);
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [analysing, setAnalysing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedAmbition, setSelectedAmbition] = useState("");

  const [results, setResults] = useState<
    { opportunity: Opportunity; score: number }[]
  >([]);

  const toggleSelection = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const canContinue = () => {
    if (step === 1) return selectedGoal !== "";
    if (step === 2) return selectedBudget !== "";
    if (step === 3) return selectedSkills.length > 0;
    if (step === 4) return selectedInterests.length > 0;
    if (step === 5) return selectedTime !== "";
    if (step === 6) return selectedLocation !== "";
    if (step === 7) return selectedAmbition !== "";

    return false;
  };

  const findOpportunities = () => {
    setAnalysing(true);

    const scored = opportunities
      .map((opportunity) => ({
        opportunity,
        score: calculateMatch(
          opportunity,
          selectedBudget,
          selectedSkills,
          selectedInterests,
          selectedTime,
          selectedAmbition,
          selectedGoal
        ),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    setTimeout(() => {
      setResults(scored);
      setAnalysing(false);
      setShowResults(true);
    }, 1800);
  };

  const nextStep = () => {
    if (!canContinue()) return;

    if (step < 7) {
      setStep(step + 1);
    } else {
      findOpportunities();
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  if (!started) {
    return (
      <main className="min-h-screen bg-white text-black">
        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="mb-8 text-sm font-semibold tracking-[0.35em] text-gray-500">
            VISION. YOUR. OPPORTUNITY.
          </p>

          <h1 className="max-w-4xl text-6xl font-bold tracking-tight sm:text-7xl">
            Find the opportunity
            <br />
            built around you.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">
            Tell VYRO your skills, interests, budget and ambitions. We’ll help
            you discover opportunities that fit you.
          </p>

          <button
            onClick={() => setStarted(true)}
            className="mt-10 rounded-full bg-black px-8 py-4 text-base font-semibold text-white transition hover:bg-gray-800"
          >
            Find My Opportunity →
          </button>

          <p className="mt-5 text-sm text-gray-400">
            Discover. Explore. Build.
          </p>
        </section>
      </main>
    );
  }

  if (analysing) {
    return (
      <main className="min-h-screen bg-white text-black">
        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="mb-8 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

          <p className="text-sm font-semibold tracking-[0.3em] text-gray-400">
            VYRO
          </p>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Finding your opportunities...
          </h1>

          <p className="mt-5 max-w-md text-lg text-gray-500">
            We're analysing your skills, interests, budget, time and ambition.
          </p>
        </section>
      </main>
    );
  }

  if (showResults) {
    return (
      <main className="min-h-screen bg-white text-black">
        <section className="mx-auto max-w-4xl px-6 py-12">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold tracking-[0.3em]">VYRO</p>

            <p className="text-sm text-gray-400">Your results</p>
          </div>

          <div className="mt-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Your opportunities
            </p>

            <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
              Built around you.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-500">
              Based on your answers, VYRO found these opportunities as strong
              matches for you.
            </p>
          </div>

          <div className="mt-12 space-y-5">
            {results.map((result, index) => (
              <div
                key={result.opportunity.name}
                className="rounded-3xl border border-gray-200 p-6 transition hover:border-black sm:p-8"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-400">
                      0{index + 1} / {result.opportunity.category}
                    </p>

                    <h2 className="mt-3 text-2xl font-bold">
                      {result.opportunity.name}
                    </h2>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-3xl font-bold">
                      {result.score}%
                    </p>

                    <p className="text-sm text-gray-400">match</p>
                  </div>
                </div>

                <p className="mt-5 leading-7 text-gray-600">
                  {result.opportunity.description}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <InfoCard
                    label="Startup"
                    value={`€${result.opportunity.budgetMin}–€${result.opportunity.budgetMax}`}
                  />

                  <InfoCard
                    label="Difficulty"
                    value={result.opportunity.difficulty}
                  />

                  <InfoCard
                    label="Time"
                    value={`${result.opportunity.timeMin}+ hrs`}
                  />

                  <InfoCard
                    label="Potential"
                    value={`€${result.opportunity.incomeMin}–€${result.opportunity.incomeMax}`}
                  />
                </div>

                <div className="mt-7">
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-400">
                    First steps
                  </p>

                  <ol className="mt-4 space-y-2">
                    {result.opportunity.firstSteps.slice(0, 3).map(
                      (step, stepIndex) => (
                        <li
                          key={step}
                          className="flex gap-3 text-gray-600"
                        >
                          <span className="font-semibold text-black">
                            {stepIndex + 1}.
                          </span>

                          <span>{step}</span>
                        </li>
                      )
                    )}
                  </ol>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-black p-8 text-white sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              What's next?
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Choose an opportunity and start building.
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-gray-300">
              These matches are a starting point. The next version of VYRO
              will give you deeper market research, personalised action plans
              and AI-powered guidance.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <button
              onClick={previousStep}
              disabled={step === 1}
              className={`text-sm font-medium ${
                step === 1
                  ? "cursor-default text-transparent"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              ← Back
            </button>

            <p className="text-sm font-semibold tracking-[0.3em]">VYRO</p>

            <div className="w-12" />
          </div>

          <div className="mt-8 h-1 w-full rounded-full bg-gray-100">
            <div
              className="h-1 rounded-full bg-black transition-all duration-300"
              style={{ width: `${(step / 7) * 100}%` }}
            />
          </div>

          <p className="mt-3 text-sm text-gray-400">
            {String(step).padStart(2, "0")} / 07
          </p>
        </div>

        {step === 1 && (
          <>
            <QuestionHeader
              title="What are you looking to achieve?"
              description="Choose the option that best describes what you want from your next opportunity."
            />

            <OptionList
              options={goals}
              selected={selectedGoal ? [selectedGoal] : []}
              onSelect={setSelectedGoal}
            />
          </>
        )}

        {step === 2 && (
          <>
            <QuestionHeader
              title="What's your budget?"
              description="How much could you realistically invest into an opportunity right now?"
            />

            <OptionList
              options={budgets}
              selected={selectedBudget ? [selectedBudget] : []}
              onSelect={setSelectedBudget}
            />
          </>
        )}

        {step === 3 && (
          <>
            <QuestionHeader
              title="What are you good at?"
              description="Select all the skills you could use to build an opportunity."
            />

            <OptionList
              options={skills}
              selected={selectedSkills}
              onSelect={(value) =>
                toggleSelection(value, selectedSkills, setSelectedSkills)
              }
            />
          </>
        )}

        {step === 4 && (
          <>
            <QuestionHeader
              title="What interests you?"
              description="Choose the areas you're naturally interested in."
            />

            <OptionList
              options={interests}
              selected={selectedInterests}
              onSelect={(value) =>
                toggleSelection(
                  value,
                  selectedInterests,
                  setSelectedInterests
                )
              }
            />
          </>
        )}

        {step === 5 && (
          <>
            <QuestionHeader
              title="How much time do you have?"
              description="How much time could you realistically dedicate each week?"
            />

            <OptionList
              options={timeOptions}
              selected={selectedTime ? [selectedTime] : []}
              onSelect={setSelectedTime}
            />
          </>
        )}

        {step === 6 && (
          <>
            <QuestionHeader
              title="Where are you based?"
              description="This helps VYRO identify opportunities that may work in your market."
            />

            <OptionList
              options={locations}
              selected={selectedLocation ? [selectedLocation] : []}
              onSelect={setSelectedLocation}
            />
          </>
        )}

        {step === 7 && (
          <>
            <QuestionHeader
              title="What's your income ambition?"
              description="What would you ideally like an opportunity to generate each month?"
            />

            <OptionList
              options={ambitions}
              selected={selectedAmbition ? [selectedAmbition] : []}
              onSelect={setSelectedAmbition}
            />
          </>
        )}

        <div className="mt-auto pt-10">
          <button
            onClick={nextStep}
            disabled={!canContinue()}
            className={`w-full rounded-full px-8 py-4 text-base font-semibold transition ${
              canContinue()
                ? "bg-black text-white hover:bg-gray-800"
                : "cursor-not-allowed bg-gray-100 text-gray-400"
            }`}
          >
            {step === 7 ? "Find My Opportunities →" : "Continue →"}
          </button>
        </div>
      </section>
    </main>
  );
}

function QuestionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h1>

      <p className="mt-5 text-lg leading-7 text-gray-500">
        {description}
      </p>
    </div>
  );
}

function OptionList({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string[];
  onSelect: (value: string) => void;
}) {
  return (
    <div className="mt-10 space-y-3">
      {options.map((option) => {
        const isSelected = selected.includes(option);

        return (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`w-full rounded-2xl border p-5 text-left text-base font-medium transition ${
              isSelected
                ? "border-black bg-black text-white"
                : "border-gray-200 bg-white hover:border-black"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4">
      <p className="text-xs uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold">
        {value}
      </p>
    </div>
  );
}
