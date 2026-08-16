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

export default function Home() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);

  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");

  const continueToNextStep = () => {
    if (step === 1 && selectedGoal) {
      setStep(2);
    }
  };

  const goBack = () => {
    if (step === 2) {
      setStep(1);
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
              onClick={goBack}
              disabled={step === 1}
              className={`text-sm font-medium ${
                step === 1
                  ? "cursor-default text-transparent"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              ← Back
            </button>

            <p className="text-sm font-semibold tracking-[0.3em]">
              VYRO
            </p>

            <div className="w-12" />
          </div>

          {/* Progress bar */}
          <div className="mt-8 h-1 w-full rounded-full bg-gray-100">
            <div
              className={`h-1 rounded-full bg-black transition-all duration-300 ${
                step === 1 ? "w-[14%]" : "w-[28%]"
              }`}
            />
          </div>

          <p className="mt-3 text-sm text-gray-400">
            0{step} / 07
          </p>
        </div>

        {/* QUESTION 1 */}
        {step === 1 && (
          <>
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                What are you looking to achieve?
              </h1>

              <p className="mt-5 text-lg leading-7 text-gray-500">
                Choose the option that best describes what you want from your
                next opportunity.
              </p>
            </div>

            <div className="mt-10 space-y-3">
              {goals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => setSelectedGoal(goal)}
                  className={`w-full rounded-2xl border p-5 text-left text-base font-medium transition ${
                    selectedGoal === goal
                      ? "border-black bg-black text-white"
                      : "border-gray-200 bg-white hover:border-black"
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>

            <div className="mt-auto pt-10">
              <button
                onClick={continueToNextStep}
                disabled={!selectedGoal}
                className={`w-full rounded-full px-8 py-4 text-base font-semibold transition ${
                  selectedGoal
                    ? "bg-black text-white hover:bg-gray-800"
                    : "cursor-not-allowed bg-gray-100 text-gray-400"
                }`}
              >
                Continue →
              </button>
            </div>
          </>
        )}

        {/* QUESTION 2 */}
        {step === 2 && (
          <>
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                What's your budget?
              </h1>

              <p className="mt-5 text-lg leading-7 text-gray-500">
                How much could you realistically invest into an opportunity
                right now?
              </p>
            </div>

            <div className="mt-10 space-y-3">
              {budgets.map((budget) => (
                <button
                  key={budget}
                  onClick={() => setSelectedBudget(budget)}
                  className={`w-full rounded-2xl border p-5 text-left text-base font-medium transition ${
                    selectedBudget === budget
                      ? "border-black bg-black text-white"
                      : "border-gray-200 bg-white hover:border-black"
                  }`}
                >
                  {budget}
                </button>
              ))}
            </div>

            <div className="mt-auto pt-10">
              <button
                disabled={!selectedBudget}
                className={`w-full rounded-full px-8 py-4 text-base font-semibold transition ${
                  selectedBudget
                    ? "bg-black text-white hover:bg-gray-800"
                    : "cursor-not-allowed bg-gray-100 text-gray-400"
                }`}
              >
                Continue →
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
