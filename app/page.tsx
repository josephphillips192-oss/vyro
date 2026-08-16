"use client";

import { useState } from "react";

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

export default function Home() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);

  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedAmbition, setSelectedAmbition] = useState("");

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

  const nextStep = () => {
    if (canContinue() && step < 7) {
      setStep(step + 1);
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

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-12">
        {/* Header */}
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

          {/* Progress bar */}
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

        {/* STEP 1 — GOAL */}
        {step === 1 && (
          <>
            <QuestionHeader
              title="What are you looking to achieve?"
              description="Choose the option that best describes what you want from your next opportunity."
            />

            <OptionList
              options={goals}
              selected={selectedGoal ? [selectedGoal] : []}
              onSelect={(value) => setSelectedGoal(value)}
            />
          </>
        )}

        {/* STEP 2 — BUDGET */}
        {step === 2 && (
          <>
            <QuestionHeader
              title="What's your budget?"
              description="How much could you realistically invest into an opportunity right now?"
            />

            <OptionList
              options={budgets}
              selected={selectedBudget ? [selectedBudget] : []}
              onSelect={(value) => setSelectedBudget(value)}
            />
          </>
        )}

        {/* STEP 3 — SKILLS */}
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
              multiple
            />
          </>
        )}

        {/* STEP 4 — INTERESTS */}
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
              multiple
            />
          </>
        )}

        {/* STEP 5 — TIME */}
        {step === 5 && (
          <>
            <QuestionHeader
              title="How much time do you have?"
              description="How much time could you realistically dedicate each week?"
            />

            <OptionList
              options={timeOptions}
              selected={selectedTime ? [selectedTime] : []}
              onSelect={(value) => setSelectedTime(value)}
            />
          </>
        )}

        {/* STEP 6 — LOCATION */}
        {step === 6 && (
          <>
            <QuestionHeader
              title="Where are you based?"
              description="This helps VYRO identify opportunities that may work in your market."
            />

            <OptionList
              options={locations}
              selected={selectedLocation ? [selectedLocation] : []}
              onSelect={(value) => setSelectedLocation(value)}
            />
          </>
        )}

        {/* STEP 7 — AMBITION */}
        {step === 7 && (
          <>
            <QuestionHeader
              title="What's your income ambition?"
              description="What would you ideally like an opportunity to generate each month?"
            />

            <OptionList
              options={ambitions}
              selected={selectedAmbition ? [selectedAmbition] : []}
              onSelect={(value) => setSelectedAmbition(value)}
            />
          </>
        )}

        {/* CONTINUE BUTTON */}
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

/* QUESTION HEADER */

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

      <p className="mt-5 text-lg leading-7 text-gray-500">{description}</p>
    </div>
  );
}

/* OPTION LIST */

function OptionList({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string[];
  onSelect: (value: string) => void;
  multiple?: boolean;
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
