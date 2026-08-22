"use client";

import { useEffect, useState } from "react";

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
  whyItFits: string;
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
    interests: [
      "Social media",
      "Entertainment",
      "Technology",
      "Fashion",
      "Sports",
    ],
    timeMin: 3,
    incomeMin: 500,
    incomeMax: 3000,
    difficulty: "Moderate",
    location: "Online",
    whyItFits:
      "This opportunity can be started with relatively little money and can work well for people who enjoy creative work, social media and building skills online.",
    firstSteps: [
  "Choose your target niche and identify the type of customer you want to serve.",
  "Research 10 competitors and study their pricing, offers and content.",
  "Create 3 high-quality sample videos for your chosen niche.",
  "Build a simple portfolio showcasing your best work.",
  "Create your service packages and decide what you will charge.",
  "Create a list of 20 potential clients and prepare a personalised outreach message.",
  "Contact your first 20 potential clients and aim to book your first customer.",
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
    whyItFits:
      "This is a practical business that can be started locally with a relatively small amount of equipment. It also has clear opportunities to increase revenue through repeat customers and higher-value detailing packages.",
    firstSteps: [
  "Research 10 local car valeting competitors and compare their prices.",
  "Choose your exact services and calculate your cost per job.",
  "Buy the essential cleaning equipment needed to start.",
  "Create your service packages and pricing.",
  "Create your Instagram, TikTok and Google Business presence.",
  "Create before-and-after content and prepare your first local promotion.",
  "Contact potential customers and aim to book your first five jobs.",
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
    interests: [
      "Social media",
      "Fashion",
      "Food",
      "Fitness",
      "Beauty",
    ],
    timeMin: 4,
    incomeMin: 500,
    incomeMax: 5000,
    difficulty: "Moderate",
    location: "Online",
    whyItFits:
      "Small businesses constantly need content and social media support. This can be started with almost no equipment and developed into recurring monthly income.",
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
    whyItFits:
      "UGC allows creators to start small and build a portfolio without needing a large audience. Strong communication and content skills can translate directly into paid brand work.",
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
    interests: ["AI", "Technology", "Finance"],
    timeMin: 5,
    incomeMin: 1000,
    incomeMax: 10000,
    difficulty: "Advanced",
    location: "Online",
    whyItFits:
      "Businesses are increasingly looking for ways to save time through automation. This has strong scalability because services can become repeatable systems rather than one-off work.",
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
    whyItFits:
      "Tutoring can be started with almost no upfront investment and can be fitted around another job or education.",
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
    interests: ["Sustainability", "Cars"],
    timeMin: 4,
    incomeMin: 700,
    incomeMax: 4000,
    difficulty: "Moderate",
    location: "In person",
    whyItFits:
      "Pressure washing has a straightforward value proposition: customers pay for a visible transformation. It can also grow through referrals and repeat work.",
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
    interests: [
      "Fashion",
      "Technology",
      "Entertainment",
      "Social media",
    ],
    timeMin: 3,
    incomeMin: 300,
    incomeMax: 4000,
    difficulty: "Moderate",
    location: "Online",
    whyItFits:
      "Graphic design can be started from home with very little capital and can become a service business with recurring clients.",
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
    whyItFits:
      "Fitness coaching can combine expertise, content creation and recurring client relationships into a scalable service.",
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
    interests: [
      "Fashion",
      "Gaming",
      "Cars",
      "Technology",
      "Sports",
    ],
    timeMin: 3,
    incomeMin: 300,
    incomeMax: 4000,
    difficulty: "Moderate",
    location: "Either",
    whyItFits:
      "Reselling can be tested on a small scale and expanded by reinvesting profits into inventory once demand is proven.",
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
  if (budget === "€0–€50") return 50;
  if (budget === "€50–€250") return 250;
  if (budget === "€250–€500") return 500;
  if (budget === "€500–€1,000") return 1000;
  if (budget === "€1,000+") return 5000;
  return 0;
}

function getTimeNumber(time: string): number {
  if (time === "Less than 2 hours/week") return 1;
  if (time === "2–5 hours/week") return 3;
  if (time === "5–10 hours/week") return 7;
  if (time === "10–20 hours/week") return 15;
  return 25;
}

function getAmbitionNumber(ambition: string): number {
  if (ambition === "€100–€500/month") return 500;
  if (ambition === "€500–€1,000/month") return 1000;
  if (ambition === "€1,000–€2,500/month") return 2500;
  if (ambition === "€2,500–€5,000/month") return 5000;
  if (ambition === "€5,000–€10,000/month") return 10000;
  return 15000;
}

function calculateMatch(
  opportunity: Opportunity,
  budget: string,
  userSkills: string[],
  userInterests: string[],
  time: string,
  ambition: string,
  goal: string,
  location: string
) {
  let score = 35;

  const budgetNumber = getBudgetNumber(budget);
  const timeNumber = getTimeNumber(time);
  const ambitionNumber = getAmbitionNumber(ambition);

  const skillMatches = userSkills.filter((skill) =>
    opportunity.skills.includes(skill)
  ).length;

  const interestMatches = userInterests.filter((interest) =>
    opportunity.interests.includes(interest)
  ).length;

  // Skills are one of the strongest indicators of fit.
  score += Math.min(skillMatches * 9, 27);

  // Interests help determine whether the user is likely to enjoy the opportunity.
  score += Math.min(interestMatches * 6, 18);

  // Budget compatibility.
  if (
    budgetNumber >= opportunity.budgetMin &&
    budgetNumber <= opportunity.budgetMax
  ) {
    score += 10;
  } else if (budgetNumber >= opportunity.budgetMin) {
    score += 5;
  } else if (budgetNumber >= opportunity.budgetMin * 0.7) {
    score += 2;
  } else {
    score -= 5;
  }

  // Available time.
  if (timeNumber >= opportunity.timeMin) {
    score += 8;
  } else if (timeNumber >= opportunity.timeMin * 0.75) {
    score += 3;
  } else {
    score -= 5;
  }

  // Income ambition.
  if (ambitionNumber >= opportunity.incomeMin) {
    score += 6;
  }

  if (ambitionNumber <= opportunity.incomeMax) {
    score += 5;
  } else if (ambitionNumber > opportunity.incomeMax * 1.5) {
    score -= 4;
  }

  // Goal compatibility.
  if (
    goal === "Build a scalable business" &&
    opportunity.incomeMax >= 5000
  ) {
    score += 7;
  }

  if (
    goal === "Make extra income" &&
    opportunity.incomeMin <= 1000
  ) {
    score += 5;
  }

  if (goal === "Start a business") {
    score += 4;
  }

  // Location compatibility.
  if (
    location === "Online / Anywhere" &&
    opportunity.location === "Online"
  ) {
    score += 10;
  } else if (
    location === "Local / In Person" &&
    opportunity.location === "In person"
  ) {
    score += 10;
  } else if (
    location === "Hybrid" &&
    (opportunity.location === "Online" ||
      opportunity.location === "In person")
  ) {
    score += 5;
  }

  return Math.min(Math.max(Math.round(score), 1), 99);
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [analysing, setAnalysing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<Opportunity | null>(null);
const [showPlan, setShowPlan] = useState(false);
const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [show30DayPlan, setShow30DayPlan] = useState(false);
  const [completed30DayTasks, setCompleted30DayTasks] = useState<string[]>([]);
  useEffect(() => {
  if (!selectedOpportunity) return;

  const progressKey = selectedOpportunity.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  const saved7DayProgress = localStorage.getItem(
    `vyro-7-day-progress-${progressKey}`
  );

  const saved30DayProgress = localStorage.getItem(
    `vyro-30-day-progress-${progressKey}`
  );

  setCompletedDays(saved7DayProgress ? JSON.parse(saved7DayProgress) : []);
  setCompleted30DayTasks(
    saved30DayProgress ? JSON.parse(saved30DayProgress) : []
  );
}, [selectedOpportunity]);

useEffect(() => {
  if (!selectedOpportunity) return;

  const progressKey = selectedOpportunity.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  localStorage.setItem(
    `vyro-7-day-progress-${progressKey}`,
    JSON.stringify(completedDays)
  );
}, [completedDays, selectedOpportunity]);

useEffect(() => {
  if (!selectedOpportunity) return;

  const progressKey = selectedOpportunity.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  localStorage.setItem(
    `vyro-30-day-progress-${progressKey}`,
    JSON.stringify(completed30DayTasks)
  );
}, [completed30DayTasks, selectedOpportunity]);
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
          selectedGoal,
          selectedLocation
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
  if (show30DayPlan && selectedOpportunity) {
  const monthPlan = (() => {
  const name = selectedOpportunity.name.toLowerCase();

  if (
    name.includes("video") ||
    name.includes("content") ||
    name.includes("ugc")
  ) {
    return [
      {
        week: "WEEK 1 — DAYS 1–7",
        title: "Build Your Foundation",
        description: "Define your niche, offer and portfolio.",
        tasks: [
          "Choose your target niche.",
          "Research 10 competitors.",
          "Identify what customers in your niche actually need.",
          "Create your first sample video.",
          "Create two more sample videos.",
          "Decide exactly what your service includes.",
          "Create your starter pricing package.",
        ],
      },
      {
        week: "WEEK 2 — DAYS 8–14",
        title: "Build Your Sales System",
        description: "Prepare everything you need to start approaching customers.",
        tasks: [
          "Create your portfolio.",
          "Create your business social media profile.",
          "Write your outreach message.",
          "Build a list of 20 potential customers.",
          "Build a second list of 20 potential customers.",
          "Contact your first 10 prospects.",
          "Contact another 10 prospects and follow up with earlier leads.",
        ],
      },
      {
        week: "WEEK 3 — DAYS 15–21",
        title: "Get Your First Client",
        description: "Turn your outreach into your first paying customer.",
        tasks: [
          "Follow up with all interested prospects.",
          "Offer a simple introductory package.",
          "Book your first sales conversation.",
          "Close your first client.",
          "Complete the client's first project.",
          "Ask for feedback and a testimonial.",
          "Turn the project into a case study for your portfolio.",
        ],
      },
      {
        week: "WEEK 4 — DAYS 22–30",
        title: "Create Momentum",
        description: "Turn your first success into a repeatable business.",
        tasks: [
          "Create a repeatable client onboarding process.",
          "Create reusable proposal and outreach templates.",
          "Create a monthly service package.",
          "Contact another 10 potential clients.",
          "Follow up with previous prospects.",
          "Ask your first client for a referral.",
          "Review your revenue, costs and profit.",
          "Set your next 30-day customer target.",
          "Create a plan to reach your next €1,000 in revenue.",
        ],
      },
    ];
  }

  if (
    name.includes("car") ||
    name.includes("valet") ||
    name.includes("pressure")
  ) {
    return [
      {
        week: "WEEK 1 — DAYS 1–7",
        title: "Prepare",
        description: "Build the foundation for your local service.",
        tasks: [
          "Research 10 local competitors.",
          "Compare competitor pricing.",
          "Choose your exact services.",
          "Calculate your cost per job.",
          "Create your service packages.",
          "Buy the essential equipment.",
          "Create your business name and social profile.",
        ],
      },
      {
        week: "WEEK 2 — DAYS 8–14",
        title: "Get Local Attention",
        description: "Start generating your first local enquiries.",
        tasks: [
          "Create your first before-and-after example.",
          "Create three pieces of social media content.",
          "Set up Google Business Profile.",
          "Post your service in local groups.",
          "Create an introductory offer.",
          "Contact 10 potential customers.",
          "Contact another 10 potential customers.",
        ],
      },
      {
        week: "WEEK 3 — DAYS 15–21",
        title: "Get Your First Customers",
        description: "Turn local interest into paying customers.",
        tasks: [
          "Follow up with interested customers.",
          "Book your first job.",
          "Complete your first job professionally.",
          "Take before-and-after photos.",
          "Ask your customer for a review.",
          "Complete your next two jobs.",
          "Create a referral offer.",
        ],
      },
      {
        week: "WEEK 4 — DAYS 22–30",
        title: "Build Repeat Business",
        description: "Create a system that can consistently generate revenue.",
        tasks: [
          "Review your first five jobs.",
          "Improve your service process.",
          "Create a repeat-customer package.",
          "Contact another 10 local prospects.",
          "Follow up with previous customers.",
          "Track your revenue and costs.",
          "Calculate your average profit per job.",
          "Set your weekly customer target.",
          "Create your next 30-day growth target.",
        ],
      },
    ];
  }

  if (
    name.includes("social media") ||
    name.includes("marketing") ||
    name.includes("automation")
  ) {
    return [
      {
        week: "WEEK 1 — DAYS 1–7",
        title: "Choose Your Niche",
        description: "Build a focused service around one type of customer.",
        tasks: [
          "Choose one profitable niche.",
          "Research 20 businesses in that niche.",
          "Identify their biggest problems.",
          "Study how competitors currently solve those problems.",
          "Choose your main service.",
          "Create your first service offer.",
          "Set your initial pricing.",
        ],
      },
      {
        week: "WEEK 2 — DAYS 8–14",
        title: "Build Your Sales System",
        description: "Create the assets you need to start selling.",
        tasks: [
          "Create a simple portfolio.",
          "Create a demonstration of your service.",
          "Create your business social profile.",
          "Write your outreach message.",
          "Build a list of 20 prospects.",
          "Build another list of 20 prospects.",
          "Contact your first 10 prospects.",
        ],
      },
      {
        week: "WEEK 3 — DAYS 15–21",
        title: "Land Your First Client",
        description: "Turn conversations into your first paying customer.",
        tasks: [
          "Contact another 10 prospects.",
          "Follow up with earlier prospects.",
          "Book your first discovery call.",
          "Present your offer.",
          "Close your first customer.",
          "Deliver the first piece of work.",
          "Ask for a testimonial.",
        ],
      },
      {
        week: "WEEK 4 — DAYS 22–30",
        title: "Create Recurring Revenue",
        description: "Turn your service into a repeatable monthly business.",
        tasks: [
          "Create monthly service packages.",
          "Create a client onboarding process.",
          "Create reusable templates.",
          "Contact another 10 prospects.",
          "Follow up with previous prospects.",
          "Ask your existing customer about ongoing work.",
          "Ask for referrals.",
          "Track revenue and customer acquisition.",
          "Set your next 30-day revenue target.",
        ],
      },
    ];
  }

  return [
    {
      week: "WEEK 1 — DAYS 1–7",
      title: "Validate",
      description: "Make sure there is real demand for your opportunity.",
      tasks: [
        "Research 10 competitors.",
        "Identify your ideal customer.",
        "Speak to your first potential customer.",
        "Speak to four more potential customers.",
        "Identify the biggest problem customers have.",
        "Create your first offer.",
        "Set your initial pricing.",
      ],
    },
    {
      week: "WEEK 2 — DAYS 8–14",
      title: "Build",
      description: "Create the minimum version of your business.",
      tasks: [
        "Create your product or service.",
        "Create your basic brand identity.",
        "Create a social media profile.",
        "Create a simple sales page.",
        "Set up a way for customers to contact you.",
        "Create your first promotional content.",
        "Prepare your first customer outreach.",
      ],
    },
    {
      week: "WEEK 3 — DAYS 15–21",
      title: "Launch",
      description: "Get your first customers and learn from the market.",
      tasks: [
        "Contact your first 10 prospects.",
        "Contact another 10 prospects.",
        "Follow up with interested prospects.",
        "Make your first offer.",
        "Aim for your first sale.",
        "Deliver your first customer order.",
        "Ask for feedback and a testimonial.",
      ],
    },
    {
      week: "WEEK 4 — DAYS 22–30",
      title: "Grow",
      description: "Build a repeatable system for generating revenue.",
      tasks: [
        "Improve your offer based on feedback.",
        "Create a repeatable sales process.",
        "Create a referral system.",
        "Contact another 10 prospects.",
        "Follow up with previous leads.",
        "Track your revenue and costs.",
        "Calculate your profit.",
        "Set your next customer target.",
        "Set your next 30-day revenue target.",
      ],
    },
  ];
})();

  const allTasks = monthPlan.flatMap((week) => week.tasks);
  const completedCount = completed30DayTasks.length;
  const progress = Math.round(
    (completedCount / allTasks.length) * 100
  );

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-4xl px-6 py-12">

        <button
          onClick={() => setShow30DayPlan(false)}
          className="text-sm font-medium text-gray-500 hover:text-black"
        >
          ← Back to 7-day plan
        </button>

        <div className="mt-12">
          <p className="text-sm font-semibold tracking-[0.3em] text-gray-400">
            VYRO
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Your 30-Day Build Plan
          </h1>

          <p className="mt-4 text-lg text-gray-500">
            {selectedOpportunity.name}
          </p>
        </div>

        <div className="mt-8 rounded-3xl bg-gray-100 p-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-gray-500">
                30-day progress
              </p>

              <p className="mt-1 text-3xl font-bold">
                {progress}%
              </p>
            </div>

            <p className="text-sm text-gray-500">
              {completedCount}/{allTasks.length} tasks
            </p>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-black transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-black p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            Your objective
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            Turn this opportunity into something real.
          </h2>

          <p className="mt-4 leading-7 text-gray-300">
            Your first month is about validating demand, building your
            offer, getting in front of customers and learning what works.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {monthPlan.map((week) => (
            <div
              key={week.week}
              className="rounded-3xl border border-gray-200 p-7 sm:p-8"
            >
              <p className="text-sm font-semibold tracking-[0.2em] text-gray-400">
                {week.week}
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {week.title}
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                {week.description}
              </p>

              <div className="mt-6 space-y-3">
                {week.tasks.map((task, index) => {
                  const completed =
                    completed30DayTasks.includes(task);

                  return (
                    <button
                      key={task}
                      onClick={() => {
                        if (completed) {
                          setCompleted30DayTasks(
                            completed30DayTasks.filter(
                              (item) => item !== task
                            )
                          );
                        } else {
                          setCompleted30DayTasks([
                            ...completed30DayTasks,
                            task,
                          ]);
                        }
                      }}
                      className={`w-full rounded-2xl p-5 text-left transition ${
                        completed
                          ? "bg-black text-white"
                          : "bg-gray-50 text-black hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                            completed
                              ? "bg-white text-black"
                              : "bg-black text-white"
                          }`}
                        >
                          {completed ? "✓" : index + 1}
                        </div>

                        <p
                          className={`text-sm leading-6 ${
                            completed
                              ? "line-through opacity-60"
                              : ""
                          }`}
                        >
                          {task}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {progress === 100 && (
          <div className="mt-10 rounded-3xl bg-black p-8 text-center text-white">
            <p className="text-4xl">🎉</p>

            <h2 className="mt-4 text-2xl font-bold">
              You completed your 30-day plan.
            </h2>

            <p className="mt-3 text-gray-300">
              You've taken the opportunity from idea to execution.
            </p>
          </div>
        )}

      </section>
    </main>
  );
}
if (showPlan && selectedOpportunity) {
  const completedCount = completedDays.length;
  const progress = Math.round((completedCount / 7) * 100);

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-3xl px-6 py-12">
        <button
          onClick={() => setShowPlan(false)}
          className="text-sm font-medium text-gray-500 hover:text-black"
        >
          ← Back to opportunity
        </button>

        <div className="mt-12">
          <p className="text-sm font-semibold tracking-[0.3em] text-gray-400">
            VYRO
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Your 7-Day Launch Plan
          </h1>

          <p className="mt-4 text-lg text-gray-500">
            {selectedOpportunity.name}
          </p>
        </div>

        <div className="mt-10 rounded-3xl bg-black p-6 text-white">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-gray-400">Your progress</p>
              <p className="mt-1 text-3xl font-bold">{progress}%</p>
            </div>

            <p className="text-sm text-gray-400">
              {completedCount}/7 complete
            </p>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-700">
            <div
              className="h-full rounded-full bg-white transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          {selectedOpportunity.firstSteps.map((task, index) => {
            const completed = completedDays.includes(index);

            return (
              <button
                key={task}
                onClick={() => {
                  if (completed) {
                    setCompletedDays(
                      completedDays.filter((day) => day !== index)
                    );
                  } else {
                    setCompletedDays([...completedDays, index]);
                  }
                }}
                className={`w-full rounded-3xl border p-6 text-left transition ${
                  completed
                    ? "border-black bg-gray-100"
                    : "border-gray-200 bg-white hover:border-black"
                }`}
              >
                <div className="flex items-start gap-5">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      completed
                        ? "bg-black text-white"
                        : "bg-gray-100 text-black"
                    }`}
                  >
                    {completed ? "✓" : index + 1}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-400">
                      DAY {index + 1}
                    </p>

                    <p
                      className={`mt-2 text-lg font-semibold ${
                        completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {task}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {progress === 100 && (
          <div className="mt-8 rounded-3xl bg-black p-8 text-center text-white">
            <p className="text-4xl">🎉</p>

            <h2 className="mt-4 text-2xl font-bold">
              You completed your first 7 days.
            </h2>

            <p className="mt-3 text-gray-300">
              Now it's time to review what you learned and decide your next
              move.
            </p>
          </div>
        )}
      </section>
      <button
  onClick={() => setShow30DayPlan(true)}
  className="mt-8 w-full rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:bg-gray-800"
>
  Continue to 30-Day Build Plan →
</button>
    </main>
  );
}
  if (selectedOpportunity) {
    const match =
      results.find(
        (result) => result.opportunity.name === selectedOpportunity.name
      )?.score ?? 0;

    return (
      <main className="min-h-screen bg-white text-black">
        <section className="mx-auto max-w-4xl px-6 py-12">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedOpportunity(null)}
              className="text-sm font-medium text-gray-500 hover:text-black"
            >
              ← Back to results
            </button>

            <p className="text-sm font-semibold tracking-[0.3em]">VYRO</p>
          </div>

          <div className="mt-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              {selectedOpportunity.category}
            </p>

            <div className="mt-4 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
                {selectedOpportunity.name}
              </h1>

              <div className="sm:text-right">
                <p className="text-4xl font-bold">{match}%</p>
                <p className="text-sm text-gray-400">VYRO match</p>
              </div>
            </div>

            <p className="mt-6 max-w-3xl text-xl leading-8 text-gray-600">
              {selectedOpportunity.description}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <InfoCard
              label="Startup cost"
              value={`€${selectedOpportunity.budgetMin}–€${selectedOpportunity.budgetMax}`}
            />

            <InfoCard
              label="Time"
              value={`${selectedOpportunity.timeMin}+ hrs/week`}
            />

            <InfoCard
              label="Income potential"
              value={`€${selectedOpportunity.incomeMin}–€${selectedOpportunity.incomeMax}`}
            />

            <InfoCard
              label="Difficulty"
              value={selectedOpportunity.difficulty}
            />
          </div>

          <section className="mt-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Why VYRO matched you
            </p>

            <div className="mt-5 rounded-3xl bg-gray-50 p-7 sm:p-9">
              <p className="text-lg leading-8 text-gray-700">
                {selectedOpportunity.whyItFits}
              </p>
            </div>
          </section>

          <section className="mt-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Your first 7 days
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Start small. Prove demand.
            </h2>

            <div className="mt-8 space-y-4">
              {selectedOpportunity.firstSteps.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-5 rounded-2xl border border-gray-200 p-5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                    {index + 1}
                  </div>

                  <p className="pt-1 leading-6 text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 rounded-3xl bg-black p-8 text-white sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Ready?
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Start building this opportunity.
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-gray-300">
              VYRO will eventually guide you through validation, finding your
              first customer and building your first version.
            </p>

         <button
  onClick={() => {
  setShowPlan(true);
}}
  className="mt-8 rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-gray-200"
>
  Start This Opportunity →
</button>
          </section>
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
<button
  onClick={() => {
    setShowResults(false);
    setSelectedOpportunity(null);
    setStep(1);
    setSelectedGoal("");
    setSelectedBudget("");
    setSelectedSkills([]);
    setSelectedInterests([]);
    setSelectedTime("");
    setSelectedLocation("");
    setSelectedAmbition("");
    setResults([]);
  }}
  className="mt-6 w-full rounded-full border border-black px-8 py-4 font-semibold text-black transition hover:bg-black hover:text-white"
>
  Retake Assessment
</button>
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
              <button
                key={result.opportunity.name}
                onClick={() => setSelectedOpportunity(result.opportunity)}
                className="w-full rounded-3xl border border-gray-200 p-6 text-left transition hover:border-black sm:p-8"
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
                    <p className="text-3xl font-bold">{result.score}%</p>
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

                <p className="mt-6 text-sm font-semibold">
                  View opportunity →
                </p>
              </button>
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
              These matches are your starting point. VYRO will eventually help
              you validate the opportunity and build your first version.
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

      <p className="mt-2 text-sm font-semibold">{value}</p>
    </div>
  );
}
