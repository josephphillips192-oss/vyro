"use client";

import { useEffect, useState } from "react";

type Opportunity = {
  name?: string;
  category?: string;
  description?: string;
  whyItFits?: string;
  targetCustomer?: string;
  timeToFirstRevenue?: string;
  scalability?: string;
  score?: number;
};

type ProfileResponse = {
  user?: {
    email?: string;
  };
  profile?: {
    full_name?: string;
    first_name?: string;
  };
  opportunity?: {
    opportunity_name?: string;
    opportunity_data?: Opportunity;
    selected_at?: string;
  } | null;
  journeyProgress?: {
    current_stage?: number;
    completed_stages?: number[];
    stage_1_completed_at?: string | null;
    stage_2_completed_at?: string | null;
    stage_3_completed_at?: string | null;
    stage_4_completed_at?: string | null;
    stage_5_completed_at?: string | null;
    stage_6_completed_at?: string | null;
  } | null;
};

const journey = [
  {
    number: "01",
    title: "Assessment",
    description: "Understand your strengths, interests and position.",
  },
  {
    number: "02",
    title: "Opportunity",
    description: "Identify the opportunity that fits you best.",
  },
  {
    number: "03",
    title: "Launch",
    description: "Turn the opportunity into your first actions.",
  },
  {
    number: "04",
    title: "Build",
    description: "Build the foundation and start generating revenue.",
  },
  {
    number: "05",
    title: "Income Growth",
    description: "Create consistent income and improve your numbers.",
  },
  {
    number: "06",
    title: "Scale & Systems",
    description: "Build systems that allow the business to grow.",
  },
];

export default function AppDashboard() {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [journeyProgress, setJourneyProgress] = useState<
    ProfileResponse["journeyProgress"]
  >(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await fetch("/api/profile", {
          cache: "no-store",
        });

        if (!response.ok) {
          window.location.href = "/auth";
          return;
        }

        const data: ProfileResponse = await response.json();

        if (!data.user) {
          window.location.href = "/auth";
          return;
        }

        setUserEmail(data.user.email ?? null);

        const profileName =
          data.profile?.first_name ||
          data.profile?.full_name ||
          null;

        setFirstName(profileName);

        if (data.opportunity?.opportunity_data) {
          setOpportunity(data.opportunity.opportunity_data);
        }

        setJourneyProgress(data.journeyProgress ?? null);
      } catch (error) {
        console.error("CSTN dashboard load error:", error);
        window.location.href = "/auth";
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } finally {
      window.location.href = "/auth";
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fafafa] text-black">
        <p className="text-sm text-gray-500">Loading CSTN...</p>
      </main>
    );
  }

  const greeting = firstName
    ? `Welcome back, ${firstName}.`
    : "Welcome back.";

  const completedStages = new Set(
    (journeyProgress?.completed_stages ?? []).map(Number)
  );

  const currentStage = Number(journeyProgress?.current_stage ?? 1);

  const completedCount = completedStages.size;

  const progressPercentage = Math.round(
    (completedCount / journey.length) * 100
  );

  return (
    <main className="min-h-screen bg-[#fafafa] text-black">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <button
            onClick={() => {
              window.location.href = "/app";
            }}
            className="text-sm font-bold tracking-[0.3em]"
          >
            CSTN
          </button>

          <div className="flex items-center gap-5">
            {userEmail && (
              <span className="hidden text-sm text-gray-500 sm:block">
                {userEmail}
              </span>
            )}

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="text-sm font-medium text-gray-500 transition hover:text-black disabled:opacity-50"
            >
              {loggingOut ? "Logging out..." : "Log out"}
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">
              Cornerstone Network
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              {greeting}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
              Your personalised business journey, all in one place.
            </p>
          </div>

          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="w-fit rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Continue Journey →
          </button>
        </div>

        {opportunity ? (
          <section className="mt-10 overflow-hidden rounded-[2rem] bg-black text-white">
            <div className="grid gap-8 p-8 lg:grid-cols-[1.4fr_0.6fr] lg:p-10">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-300">
                    Your opportunity
                  </span>

                  {opportunity.category && (
                    <span className="text-sm text-gray-400">
                      {opportunity.category}
                    </span>
                  )}
                </div>

                <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                  {opportunity.name || "Your selected opportunity"}
                </h2>

                {opportunity.description && (
                  <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300">
                    {opportunity.description}
                  </p>
                )}

                <button
                  onClick={() => {
                    window.location.href = "/";
                  }}
                  className="mt-7 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
                >
                  Open opportunity →
                </button>
              </div>

              <div className="rounded-3xl bg-white/10 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Your direction
                </p>

                {opportunity.whyItFits ? (
                  <p className="mt-4 text-sm leading-7 text-gray-200">
                    {opportunity.whyItFits}
                  </p>
                ) : (
                  <p className="mt-4 text-sm leading-7 text-gray-300">
                    CSTN has identified this as an opportunity worth building
                    around your current position.
                  </p>
                )}

                {opportunity.timeToFirstRevenue && (
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="text-xs uppercase tracking-[0.15em] text-gray-500">
                      Time to first revenue
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      {opportunity.timeToFirstRevenue}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section className="mt-10 rounded-[2rem] border border-gray-200 bg-white p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Your opportunity
            </p>

            <h2 className="mt-4 text-2xl font-bold">
              You haven't selected an opportunity yet.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500">
              Complete the CSTN assessment to discover an opportunity
              personalised to you.
            </p>

            <button
              onClick={() => {
                window.location.href = "/";
              }}
              className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Start Assessment →
            </button>
          </section>
        )}

        <section className="mt-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                Your journey
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                From idea to income.
              </h2>
            </div>

            <span className="hidden text-sm text-gray-400 sm:block">
              {completedCount} of {journey.length} complete · {progressPercentage}%
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {journey.map((stage, index) => {
              const stageNumber = index + 1;
              const isComplete = completedStages.has(stageNumber);
              const isCurrent = !isComplete && currentStage === stageNumber;

              return (
                <div
                  key={stage.number}
                  className={`rounded-3xl border p-6 ${
                    isComplete || isCurrent
                      ? "border-black bg-white"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-[0.2em] text-gray-400">
                      {stage.number}
                    </span>

                    {isComplete && (
                      <span className="rounded-full bg-black px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white">
                        Complete
                      </span>
                    )}

                    {isCurrent && (
                      <span className="rounded-full bg-black px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white">
                        Current
                      </span>
                    )}

                    {!isComplete && !isCurrent && (
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-500">
                        Upcoming
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 text-xl font-semibold">
                    {stage.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {stage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-10 grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-white p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Next step
            </p>

            <h3 className="mt-4 text-xl font-bold">
              Continue building
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Return to your CSTN journey and continue from where you left
              off.
            </p>

            <button
              onClick={() => {
                window.location.href = "/";
              }}
              className="mt-6 text-sm font-semibold underline underline-offset-4"
            >
              Continue →
            </button>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Income Growth
            </p>

            <h3 className="mt-4 text-xl font-bold">
              Build consistent income
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Track revenue, customers and weekly actions as your opportunity
              develops.
            </p>

            <p className="mt-6 text-xs font-medium text-gray-400">
              Available inside your CSTN journey
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Scale & Systems
            </p>

            <h3 className="mt-4 text-xl font-bold">
              Build beyond yourself
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Create systems, automation, delegation and recurring revenue
              structures.
            </p>

            <p className="mt-6 text-xs font-medium text-gray-400">
              Available inside your CSTN journey
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
