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
