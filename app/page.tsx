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
  targetCustomer?: string;
  timeToFirstRevenue?: string;
  scalability?: string;
  score?: number;
};

const goals = [
  "Make extra income",
  "Start a business",
  "Build a scalable business",
  "Replace my job",
  "Test an idea",
  "I'm not sure yet",
  "Other",
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
  "Other",
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
  "Other",
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
    interests: ["Social media", "Fashion", "Food", "Fitness", "Beauty"],
    timeMin: 4,
    incomeMin: 500,
    incomeMax: 5000,
    difficulty: "Moderate",
    location: "Online",
    whyItFits:
      "Small businesses constantly need content and social media support. This can be started with almost no equipment and developed into recurring monthly income.",
    firstSteps: [
      "Day 1 — Choose a specific niche and define the type of businesses you want to help.",
      "Day 2 — Research 10 competitors and study their services, pricing and content.",
      "Day 3 — Create 5 example social media posts for your chosen niche.",
      "Day 4 — Build a simple portfolio showing your best examples and services.",
      "Day 5 — Create 2–3 simple monthly service packages and set your pricing.",
      "Day 6 — Build a list of 20 potential clients and prepare a personalised outreach message.",
      "Day 7 — Contact your first 20 potential clients and aim to book your first conversation.",
    
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
      "Day 1 — Choose 2–3 product categories you want to create UGC for.",
      "Day 2 — Research successful UGC creators and identify what makes their videos effective.",
      "Day 3 — Create your first sample UGC video.",
      "Day 4 — Create two more sample videos using different hooks and styles.",
      "Day 5 — Build a simple creator portfolio containing your best work.",
      "Day 6 — Find 20 small brands that could benefit from UGC and prepare an outreach message.",
      "Day 7 — Contact your first 20 brands and offer a simple starter UGC package.",
    
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
      "Day 1 — Choose one business niche and identify repetitive tasks they commonly perform.",
      "Day 2 — Learn one automation platform and understand its core features.",
      "Day 3 — Build your first simple AI automation.",
      "Day 4 — Build two additional automations that solve realistic business problems.",
      "Day 5 — Create a simple service offer explaining the problem you solve and your pricing.",
      "Day 6 — Find 20 businesses in your chosen niche and identify one automation opportunity for each.",
      "Day 7 — Contact your first 20 businesses with a personalised automation idea.",
    
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
      "Day 1 — Choose the subject or skill you will teach and define your ideal student.",
      "Day 2 — Research competing tutors and compare their pricing and offers.",
      "Day 3 — Create a simple lesson structure and prepare your first teaching materials.",
      "Day 4 — Create a short sample lesson or educational resource to demonstrate your ability.",
      "Day 5 — Set your introductory pricing and create a simple tutoring offer.",
      "Day 6 — Find 20 potential students, parents or communities where you can promote your service.",
      "Day 7 — Reach out to potential students and aim to book your first session.",
    
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
      "Day 1 — Research local demand and identify the types of outdoor surfaces customers need cleaned.",
      "Day 2 — Research equipment costs and calculate your expected cost per job.",
      "Day 3 — Choose your services and create simple pricing packages.",
      "Day 4 — Practise your cleaning process and create before-and-after examples.",
      "Day 5 — Create a simple local presence using social media and a business profile.",
      "Day 6 — Identify 20 nearby potential customers and prepare a local promotion.",
      "Day 7 — Contact potential customers and aim to book your first five jobs.",
    
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
    whyItFits:
      "Graphic design can be started from home with very little capital and can become a service business with recurring clients.",
    firstSteps: [
      "Day 1 — Choose a specific design niche and define the businesses you want to serve.",
      "Day 2 — Research 10 competitors and study their portfolios, services and pricing.",
      "Day 3 — Create your first two portfolio examples.",
      "Day 4 — Create three additional examples showing different design services.",
      "Day 5 — Build a simple portfolio and create clear service packages.",
      "Day 6 — Find 20 potential clients and prepare a personalised outreach message.",
      "Day 7 — Contact your first 20 potential clients and aim to secure your first project.",
    
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
      "Day 1 — Choose a specific target audience and define the problem your coaching will solve.",
      "Day 2 — Research competing coaches and compare their offers, content and pricing.",
      "Day 3 — Create your coaching structure, including what clients receive each week.",
      "Day 4 — Create three educational pieces of content demonstrating your knowledge.",
      "Day 5 — Create a simple coaching offer and introductory price.",
      "Day 6 — Find 20 potential clients and prepare a personalised outreach message.",
      "Day 7 — Contact potential clients and aim to book your first consultation.",
    
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
    whyItFits:
      "Reselling can be tested on a small scale and expanded by reinvesting profits into inventory once demand is proven.",
    firstSteps: [
      "Day 1 — Choose one product niche and identify products with consistent demand.",
      "Day 2 — Research marketplace prices, fees and typical profit margins.",
      "Day 3 — Find reliable sources and identify your first products to test.",
      "Day 4 — Start with a small amount of inventory and photograph the products professionally.",
      "Day 5 — Create and publish your first listings with competitive pricing.",
      "Day 6 — Promote your listings and monitor views, messages and demand.",
      "Day 7 — Review your results, complete your first sales where possible and decide what inventory to reinvest in.",
    
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

  score += Math.min(skillMatches * 9, 27);
  score += Math.min(interestMatches * 6, 18);

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

  if (timeNumber >= opportunity.timeMin) {
    score += 8;
  } else if (timeNumber >= opportunity.timeMin * 0.75) {
    score += 3;
  } else {
    score -= 5;
  }

  if (ambitionNumber >= opportunity.incomeMin) {
    score += 6;
  }

  if (ambitionNumber <= opportunity.incomeMax) {
    score += 5;
  } else if (ambitionNumber > opportunity.incomeMax * 1.5) {
    score -= 4;
  }

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

function getProgressKey(opportunity: Opportunity) {
  return opportunity.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
}

function getThirtyDayPlan(opportunity: Opportunity) {
  const name = opportunity.name.toLowerCase();
  const category = opportunity.category.toLowerCase();

  const makePlan = (
    week1Title: string,
    week1Description: string,
    week1Tasks: string[],
    week2Title: string,
    week2Description: string,
    week2Tasks: string[],
    week3Title: string,
    week3Description: string,
    week3Tasks: string[],
    week4Title: string,
    week4Description: string,
    week4Tasks: string[]
  ) => [
    {
      week: "WEEK 1 — DAYS 1–7",
      title: week1Title,
      description: week1Description,
      tasks: week1Tasks,
    },
    {
      week: "WEEK 2 — DAYS 8–14",
      title: week2Title,
      description: week2Description,
      tasks: week2Tasks,
    },
    {
      week: "WEEK 3 — DAYS 15–21",
      title: week3Title,
      description: week3Description,
      tasks: week3Tasks,
    },
    {
      week: "WEEK 4 — DAYS 22–30",
      title: week4Title,
      description: week4Description,
      tasks: week4Tasks,
    },
  ];

  /*
   * Home Gym / Fitness Equipment Assembly
   */
  if (
    name.includes("home gym") ||
    name.includes("gym assembly") ||
    name.includes("fitness equipment") ||
    name.includes("gym equipment assembly")
  ) {
    return makePlan(
      "Validate Local Demand",
      "Understand who needs home-gym assembly, what competitors charge and what customers expect.",
      [
        "Research 10 local home-gym assembly competitors.",
        "Compare competitor prices for common equipment.",
        "Identify your ideal customers and target neighbourhoods.",
        "Research the most common home-gym equipment customers need assembled.",
        "Check what tools and transport you would need.",
        "Calculate your estimated cost and profit per job.",
        "Create your first three service packages.",
      ],
      "Build Your Local Service",
      "Create a professional service that customers can confidently book.",
      [
        "Choose your business name and service area.",
        "Create a simple professional social media profile.",
        "Create a clear price list for common equipment.",
        "Create a simple customer enquiry and booking process.",
        "Prepare a checklist for every assembly job.",
        "Create basic customer safety and service terms.",
        "Create your first promotional post or flyer.",
      ],
      "Get Your First Customers",
      "Put your service in front of real local customers and complete your first jobs.",
      [
        "Post your service in relevant local community groups.",
        "Contact 10 potential customers.",
        "Contact another 10 potential customers.",
        "Offer an introductory price to your first customers.",
        "Complete your first home-gym assembly professionally.",
        "Take before-and-after photos with customer permission.",
        "Ask your first customers for reviews and testimonials.",
      ],
      "Build Repeatable Local Growth",
      "Turn your first jobs into reviews, referrals and a repeatable customer acquisition system.",
      [
        "Create a Google Business Profile.",
        "Create a simple referral offer.",
        "Create an after-service follow-up message.",
        "Contact another 10 local prospects.",
        "Follow up with previous enquiries.",
        "Review your revenue, travel costs, equipment costs and profit per job.",
        "Set your next customer target and 30-day revenue goal.",
      ]
    );
  }


  /*
   * On-site Matchday Content Production
   */
  if (
    name.includes("matchday content") ||
    name.includes("short-form video") ||
    name.includes("content production") ||
    name.includes("highlights")
  ) {
    return makePlan(
      "Validate the Matchday Content Opportunity",
      "Find out what local clubs actually need, what they currently use and what they would realistically pay for better matchday content.",
      [
        "Research 10 local amateur football clubs and review their current social media content.",
        "Identify the biggest content gaps across matchday posts, highlights, interviews and stories.",
        "Research 5 local photographers, videographers or football content creators.",
        "Compare local prices for matchday photography, video and social media packages.",
        "Decide which type of club you want to target first.",
        "Create a simple list of the equipment you already have and what you actually need.",
        "Define your first matchday content package and introductory price."
      ],
      "Build Your Matchday Content Service",
      "Turn your idea into a simple service that a football club can understand and book.",
      [
        "Choose your service name and define your local service area.",
        "Create 3 simple packages: Matchday Basic, Matchday Plus and Full Content.",
        "Define exactly what the club receives in each package.",
        "Create a simple Instagram or TikTok portfolio page.",
        "Create 3 example pieces of football content to demonstrate your editing style.",
        "Create a simple enquiry and booking process for clubs.",
        "Create your first promotional post showing clubs what you can provide."
      ],
      "Get Your First Club",
      "Start direct outreach and aim to turn your first conversations into a real matchday opportunity.",
      [
        "Create a list of 20 local amateur football clubs to contact.",
        "Send a personalised message to your first 5 clubs.",
        "Send a personalised message to another 5 clubs.",
        "Offer one club an introductory matchday content package.",
        "Follow up with clubs that have not replied.",
        "Complete your first matchday content session if booked.",
        "Ask the club for permission to use the work in your portfolio and request a testimonial."
      ],
      "Turn One Club Into a Repeatable Business",
      "Use your first results to create recurring club relationships and build a repeatable acquisition system.",
      [
        "Create a portfolio post using your strongest first-club content.",
        "Create a simple monthly or seasonal content package for clubs.",
        "Contact another 10 clubs using your improved portfolio.",
        "Follow up with every previous enquiry.",
        "Ask your first club about recurring matchday content.",
        "Calculate your revenue, travel costs, editing time and profit per matchday.",
        "Set your next 30-day target for clubs, matches and revenue."
      ]
    );
  }


  /*
   * Freelance Remote Customer Support
   */
  if (
    name.includes("remote customer support") ||
    name.includes("freelance customer support") ||
    name.includes("remote support") ||
    name.includes("customer support")
  ) {
    return makePlan(
      "Validate the Remote Support Opportunity",
      "Identify companies that genuinely need flexible customer support and understand the problems they need help solving.",
      [
        "Research 15 small SaaS, AI or technology companies that offer customer-facing products.",
        "Review each company's website, help centre and support channels for potential gaps.",
        "Identify the types of customer questions these companies receive most often.",
        "Research freelance and part-time customer support roles and compare typical requirements.",
        "Define the types of support you can confidently provide.",
        "Choose your ideal client: small SaaS, AI startup, e-commerce company or growing app.",
        "Create your initial freelance customer support offer."
      ],
      "Build Your Support Service",
      "Create a professional offer that makes it easy for a company to understand how you can help.",
      [
        "Define your support services: email, live chat, onboarding and knowledge-base support.",
        "Create 2–3 simple service packages based on weekly hours and responsibilities.",
        "Create a professional one-page service profile.",
        "Prepare example customer support responses for common scenarios.",
        "Create a small FAQ or knowledge-base example to demonstrate your ability.",
        "Create a simple system for tracking customer enquiries and support tasks.",
        "Prepare your outreach message and application template."
      ],
      "Get Your First Client",
      "Put your offer in front of real companies and focus on securing your first paid support opportunity.",
      [
        "Create a list of 20 suitable SaaS, AI and technology companies.",
        "Apply for or contact your first 5 relevant opportunities.",
        "Contact another 5 potential companies directly.",
        "Follow up with companies that have not responded.",
        "Offer a short trial or introductory support package where appropriate.",
        "Complete your first paid support work professionally.",
        "Ask your first client for feedback and a testimonial."
      ],
      "Build Recurring Remote Income",
      "Turn your first client into recurring work while creating a repeatable system for finding additional clients.",
      [
        "Document the support processes you used with your first client.",
        "Improve your service packages based on what the client actually needed.",
        "Contact another 10 potential companies.",
        "Follow up with every previous lead.",
        "Ask your first client about extending or increasing your support hours.",
        "Calculate your hourly earnings, total revenue and time spent.",
        "Set your next 30-day target for clients, hours and monthly recurring income."
      ]
    );
  }


  /*
   * AI Tools for Football Coaches Newsletter
   */
  if (
    name.includes("ai tools for football coaches") ||
    name.includes("football coaches") ||
    name.includes("affiliate newsletter") ||
    name.includes("niche content")
  ) {
    return makePlan(
      "Find the Right Football Coaching Niche",
      "Understand which problems coaches and grassroots clubs actually have and where AI can provide useful, practical solutions.",
      [
        "Identify 20 grassroots football coaches, managers or club volunteers to research.",
        "List the biggest recurring problems coaches face with planning, analysis, administration and communication.",
        "Research 15 AI tools that could help football coaches or club staff.",
        "Review existing football coaching newsletters, websites and social accounts.",
        "Identify gaps where existing content is weak, confusing or too technical.",
        "Choose one specific audience to focus on first.",
        "Choose your first 3 content themes and define your newsletter concept."
      ],
      "Build Your Content Engine",
      "Create a simple media brand that consistently gives football coaches useful information they can actually apply.",
      [
        "Choose your newsletter or content brand name.",
        "Create a simple landing page where coaches can subscribe.",
        "Create your first 5 useful articles, posts or videos about AI for football.",
        "Create a simple free resource such as an AI prompt pack for coaches.",
        "Create your first newsletter issue.",
        "Set up a simple content calendar for the next 30 days.",
        "Create profiles on the social platform where your target coaches are most active."
      ],
      "Build Your First Audience",
      "Get your content in front of real coaches and learn which topics generate the strongest response.",
      [
        "Contact 10 football coaches or club staff and introduce the project.",
        "Publish your first educational social post.",
        "Publish a second piece of useful AI-for-football content.",
        "Share your free resource with relevant coaches and communities.",
        "Ask 5 coaches what AI or technology problem they would most like solved.",
        "Review your views, clicks, subscribers and responses.",
        "Choose the 3 content topics that generated the strongest interest."
      ],
      "Test Your First Revenue",
      "Turn audience attention into your first small revenue opportunities while continuing to build trust.",
      [
        "Research relevant AI affiliate programmes and partnership opportunities.",
        "Create your first paid guide, template pack or coaching resource.",
        "Publish a detailed comparison or review of a useful AI tool.",
        "Contact 5 relevant companies about potential partnerships or sponsorships.",
        "Test a clear call-to-action for your paid resource or affiliate recommendation.",
        "Review your subscriber growth, engagement and first revenue.",
        "Set your next 30-day target for subscribers, content output and revenue."
      ]
    );
  }


  /*
   * Football-Tech Print-on-Demand Shop
   */
  if (
    name.includes("print on demand") ||
    name.includes("football-tech accessory") ||
    name.includes("accessory shop") ||
    name.includes("football tech")
  ) {
    return makePlan(
      "Find a Winning Football-Tech Niche",
      "Identify a specific group of football fans and understand which products, designs and ideas they would actually want to buy.",
      [
        "Research 20 Irish football-related products and stores online.",
        "Identify popular football-tech accessories and products already being sold.",
        "Research 10 Irish football communities, clubs or supporter groups.",
        "Identify underserved football niches and potential design themes.",
        "Create 10 initial product or design ideas.",
        "Check estimated production, platform and delivery costs for your strongest ideas.",
        "Choose your first 3 products to test."
      ],
      "Build Your Store",
      "Turn your strongest ideas into a simple online shop with clear products, pricing and branding.",
      [
        "Choose your shop name and visual identity.",
        "Create your first 3–5 product designs.",
        "Choose your print-on-demand supplier and connect your products.",
        "Calculate your selling price, production cost and expected profit for every product.",
        "Write clear product descriptions and create product mockups.",
        "Create your online storefront and organise the product collection.",
        "Create your first social media profiles and prepare launch content."
      ],
      "Launch and Test Demand",
      "Get real people to see your products and use their behaviour to identify what deserves more attention.",
      [
        "Launch your store with your first products.",
        "Create your first football-focused social media post.",
        "Create another 3 pieces of product content.",
        "Share your products with relevant football communities without spamming.",
        "Track visits, clicks, product views and sales.",
        "Ask potential customers which design or product they prefer.",
        "Review your first results and identify your strongest product."
      ],
      "Optimise and Scale the Shop",
      "Double down on what works, improve your store and build a repeatable way to generate sales.",
      [
        "Create 3 new variations of your strongest design or product.",
        "Improve the product page for your best-performing item.",
        "Test a different social media hook or content format.",
        "Review your product margins and remove or improve weak products.",
        "Create a simple promotional offer or bundle.",
        "Review total revenue, costs, orders and profit.",
        "Set your next 30-day target for products, orders and revenue."
      ]
    );
  }


  /*
   * AI-Assisted LinkedIn & CV Optimisation Service
   */
  if (
    name.includes("linkedin") ||
    name.includes("cv optimisation") ||
    name.includes("cv optimization") ||
    name.includes("personal branding")
  ) {
    return makePlan(
      "Validate the Career Optimisation Service",
      "Understand which job seekers need help, what problems they have with their CV or LinkedIn profile and what they would realistically pay to improve their applications.",
      [
        "Research 10 CV and LinkedIn optimisation services targeting early-career professionals.",
        "Compare their packages, pricing, positioning and customer reviews.",
        "Identify the most common CV and LinkedIn problems experienced by graduates and job seekers.",
        "Choose your initial target customer, such as graduates, career changers or early-career professionals.",
        "Define the specific outcomes your service will help customers achieve.",
        "Create a list of the AI tools you can use to speed up research, drafting and optimisation.",
        "Create your initial CV and LinkedIn optimisation package and introductory price."
      ],
      "Build Your Career Optimisation Service",
      "Create a professional service that combines AI efficiency with genuine human review and personalisation.",
      [
        "Define your service packages for CV-only, LinkedIn-only and combined optimisation.",
        "Create a professional service profile explaining exactly what customers receive.",
        "Create an example before-and-after CV section using a fictional candidate.",
        "Create an example LinkedIn headline, About section and experience section.",
        "Create your customer intake questionnaire to collect career goals, experience and target roles.",
        "Create a repeatable workflow for reviewing, improving and quality-checking each customer's documents.",
        "Create your first promotional post explaining the problem your service solves."
      ],
      "Get Your First Customers",
      "Put the service in front of real job seekers and use your first projects to improve your process.",
      [
        "Create a list of 20 potential customers through your network and relevant communities.",
        "Offer your service to your first 5 suitable prospects.",
        "Contact another 5 potential customers with a personalised message.",
        "Offer an introductory package to your first customers.",
        "Complete your first paid CV or LinkedIn optimisation project.",
        "Ask the customer for feedback on the process and final result.",
        "Request a testimonial or permission to use an anonymised before-and-after example."
      ],
      "Build a Repeatable Career Service",
      "Turn your first customers and results into a repeatable service that can generate recurring monthly income.",
      [
        "Create a portfolio showing your strongest optimisation examples.",
        "Improve your packages based on customer feedback.",
        "Create a referral offer for previous customers.",
        "Contact another 10 potential customers.",
        "Test a higher-value combined CV, LinkedIn and application support package.",
        "Calculate your revenue, time spent per customer and profit per package.",
        "Set your next 30-day target for customers, revenue and average order value."
      ]
    );
  }

  /*
   * Football Coaching
   */
  if (
    name.includes("football coaching") ||
    name.includes("football coach") ||
    name.includes("soccer coaching") ||
    name.includes("football training")
  ) {
    return makePlan(
      "Define Your Coaching Offer",
      "Choose who you coach, what you help them improve and how your sessions will work.",
      [
        "Choose your target age group and player level.",
        "Research 10 local football coaches and academies.",
        "Compare local coaching prices and session formats.",
        "Identify the biggest problems your target players want to improve.",
        "Design your first individual coaching session.",
        "Design your first small-group session.",
        "Set your introductory coaching prices.",
      ],
      "Build Your Coaching Presence",
      "Create a professional presence that makes parents and players confident in your service.",
      [
        "Choose your coaching name and service area.",
        "Create a professional Instagram or Facebook page.",
        "Create a simple coaching profile explaining your experience.",
        "Create three useful football training posts.",
        "Create a simple booking and enquiry process.",
        "Prepare a basic session plan template.",
        "Create your first promotional offer.",
      ],
      "Get Your First Players",
      "Start conversations with local players, parents and football communities.",
      [
        "Contact 10 potential players or parents.",
        "Contact another 10 potential customers.",
        "Post your coaching offer in relevant local groups.",
        "Offer an introductory trial session.",
        "Deliver your first coaching session.",
        "Ask for feedback from the player or parent.",
        "Request a testimonial and referral.",
      ],
      "Build Recurring Coaching Revenue",
      "Turn individual sessions into weekly customers and small-group opportunities.",
      [
        "Create weekly coaching packages.",
        "Create a small-group training package.",
        "Create a simple customer progress tracker.",
        "Contact another 10 potential customers.",
        "Follow up with previous enquiries.",
        "Ask existing customers about continuing sessions.",
        "Set your next player target and 30-day revenue goal.",
      ]
    );
  }

  /*
   * Video / Content / UGC
   */
  if (
    name.includes("video") ||
    name.includes("content") ||
    name.includes("ugc") ||
    category.includes("content")
  ) {
    return makePlan(
      "Build Your Foundation",
      "Choose your niche, understand the market and create proof that you can deliver.",
      [
        "Choose one target niche and define your ideal customer.",
        "Research 10 competitors and compare their offers and pricing.",
        "Identify the biggest content problems your target customers have.",
        "Create your first high-quality sample.",
        "Create two additional samples for your portfolio.",
        "Decide exactly what your service includes.",
        "Create your starter pricing package.",
      ],
      "Build Your Sales System",
      "Create everything you need to approach potential customers professionally.",
      [
        "Build a simple portfolio using your strongest examples.",
        "Create your business social media profile.",
        "Write a personalised outreach message.",
        "Build a list of 20 potential customers.",
        "Build a second list of 20 potential customers.",
        "Contact your first 10 prospects.",
        "Contact another 10 prospects and follow up with earlier leads.",
      ],
      "Get Your First Client",
      "Turn your outreach into real conversations, work and feedback.",
      [
        "Follow up with every interested prospect.",
        "Offer a simple introductory package.",
        "Book your first sales conversation.",
        "Aim to close your first paying client.",
        "Complete the client's first project to a high standard.",
        "Ask for feedback and a testimonial.",
        "Turn the project into a case study for your portfolio.",
      ],
      "Create Momentum",
      "Build systems that make it easier to win and retain customers.",
      [
        "Create a repeatable client onboarding process.",
        "Create reusable proposal and outreach templates.",
        "Create a monthly service package.",
        "Contact another 10 potential clients.",
        "Follow up with previous prospects.",
        "Ask your first client for a referral or repeat work.",
        "Review revenue, costs, results and set your next 30-day target.",
      ]
    );
  }

  /*
   * Car Valeting / Pressure Washing / Local Cleaning
   */
  if (
    name.includes("car valet") ||
    name.includes("car detailing") ||
    name.includes("pressure washing") ||
    name.includes("pressure wash") ||
    name.includes("cleaning service") ||
    name.includes("mobile cleaning")
  ) {
    return makePlan(
      "Prepare Your Local Service",
      "Understand local demand, pricing, equipment and the costs required to deliver each job.",
      [
        "Research 10 local competitors.",
        "Compare competitor pricing and services.",
        "Choose your exact services.",
        "Calculate your cost and expected profit per job.",
        "Create your service packages.",
        "Identify the essential equipment needed to start.",
        "Create your business name and social media profile.",
      ],
      "Get Local Attention",
      "Create visibility and generate your first local enquiries.",
      [
        "Create your first before-and-after example.",
        "Create three pieces of social media content.",
        "Set up your Google Business Profile.",
        "Post your service in relevant local groups.",
        "Create an introductory offer.",
        "Contact 10 potential local customers.",
        "Contact another 10 potential customers.",
      ],
      "Get Your First Customers",
      "Turn local interest into paying customers and collect proof of quality.",
      [
        "Follow up with interested customers.",
        "Book your first job.",
        "Complete your first job professionally.",
        "Take before-and-after photos.",
        "Ask your customer for a review.",
        "Complete your next two jobs.",
        "Create a referral offer for existing customers.",
      ],
      "Build Repeat Business",
      "Turn individual jobs into a reliable local customer base.",
      [
        "Review your first five jobs and identify improvements.",
        "Improve your service and customer experience.",
        "Create a repeat-customer package.",
        "Contact another 10 local prospects.",
        "Follow up with previous customers.",
        "Track revenue, costs and profit per job.",
        "Set your weekly customer target and next 30-day growth goal.",
      ]
    );
  }

  /*
   * Social Media / Marketing / Automation
   */
  if (
    name.includes("social media") ||
    name.includes("marketing") ||
    name.includes("automation") ||
    category.includes("marketing")
  ) {
    return makePlan(
      "Choose Your Niche",
      "Build a focused service around one type of customer and one valuable problem.",
      [
        "Choose one specific target niche.",
        "Research 20 businesses in that niche.",
        "Identify their biggest operational or marketing problems.",
        "Study how competitors currently solve those problems.",
        "Choose your main service.",
        "Create your first service offer.",
        "Set your initial pricing.",
      ],
      "Build Your Sales System",
      "Create the assets and prospect list needed to start selling.",
      [
        "Create a simple portfolio or demonstration.",
        "Build a working example of your service.",
        "Create your business social profile.",
        "Write your personalised outreach message.",
        "Build a list of 20 prospects.",
        "Build another list of 20 prospects.",
        "Contact your first 10 prospects.",
      ],
      "Land Your First Client",
      "Turn conversations into your first paying customer and proof of results.",
      [
        "Contact another 10 prospects.",
        "Follow up with earlier prospects.",
        "Book your first discovery call.",
        "Present your offer clearly.",
        "Aim to close your first customer.",
        "Deliver the first piece of work.",
        "Ask for feedback and a testimonial.",
      ],
      "Create Recurring Revenue",
      "Turn a successful first project into a repeatable monthly service.",
      [
        "Create monthly service packages.",
        "Create a client onboarding process.",
        "Create reusable templates and systems.",
        "Contact another 10 prospects.",
        "Follow up with previous prospects.",
        "Ask your existing customer about ongoing work.",
        "Track revenue and customer acquisition and set your next 30-day target.",
      ]
    );
  }

  /*
   * Tutoring / Coaching
   */
  if (
    name.includes("tutoring") ||
    name.includes("tutor") ||
    name.includes("coaching") ||
    name.includes("coach")
  ) {
    return makePlan(
      "Define Your Offer",
      "Choose who you help, what outcome you provide and how your sessions will work.",
      [
        "Choose your specific target student or customer.",
        "Research 10 competing tutors or coaches.",
        "Identify the biggest problems your target customer wants solved.",
        "Create your session structure.",
        "Create a simple introductory offer.",
        "Set your initial pricing.",
        "Create a simple profile explaining your offer.",
      ],
      "Find Your First Customers",
      "Start conversations with people who could benefit from your service.",
      [
        "Create three useful pieces of educational content.",
        "Set up your social media profile.",
        "Write your outreach message.",
        "Create a list of 20 potential customers.",
        "Contact your first 10 prospects.",
        "Contact another 10 prospects.",
        "Follow up with anyone who shows interest.",
      ],
      "Deliver & Improve",
      "Deliver your first sessions and use feedback to improve the experience.",
      [
        "Book your first session.",
        "Deliver your first session professionally.",
        "Ask for feedback.",
        "Improve your session structure.",
        "Book your next customer.",
        "Ask a satisfied customer for a testimonial.",
        "Create a simple referral offer.",
      ],
      "Build Recurring Revenue",
      "Turn individual sessions into a predictable service.",
      [
        "Create weekly or monthly packages.",
        "Create a simple customer onboarding process.",
        "Create reusable lesson or coaching resources.",
        "Contact another 10 prospects.",
        "Follow up with previous leads.",
        "Ask existing customers about continuing.",
        "Review revenue and set your next 30-day customer target.",
      ]
    );
  }

  /*
   * Product / E-commerce
   */
  if (
    category.includes("product") ||
    category.includes("ecommerce") ||
    category.includes("e-commerce") ||
    name.includes("online store") ||
    name.includes("clothing brand") ||
    name.includes("product business")
  ) {
    return makePlan(
      "Validate the Product",
      "Prove there is demand before spending heavily on inventory or development.",
      [
        "Define your ideal customer.",
        "Research 10 competing products or brands.",
        "Compare competitor pricing and positioning.",
        "Identify the main problem or desire your product addresses.",
        "Create or source your first product concept.",
        "Calculate your full cost per unit.",
        "Set your target selling price and expected margin.",
      ],
      "Build Your Minimum Brand",
      "Create the simplest professional version of your business.",
      [
        "Choose your brand name and positioning.",
        "Create your basic visual identity.",
        "Create your product page or sales page.",
        "Create your business social media profile.",
        "Take or create strong product visuals.",
        "Create your first three promotional pieces of content.",
        "Set up a simple customer enquiry and payment process.",
      ],
      "Launch & Make Your First Sales",
      "Put the product in front of real customers and learn what converts.",
      [
        "Create your launch offer.",
        "Contact your first 10 potential customers.",
        "Contact another 10 potential customers.",
        "Publish your first product promotion.",
        "Aim for your first sale.",
        "Deliver your first customer order professionally.",
        "Ask your first customers for feedback and reviews.",
      ],
      "Improve & Grow",
      "Use real customer data to improve your product, marketing and sales.",
      [
        "Review your first sales and customer feedback.",
        "Improve your product or offer.",
        "Improve your product page.",
        "Create a repeatable content schedule.",
        "Contact another 10 potential customers.",
        "Track revenue, costs and profit.",
        "Set your next customer and 30-day revenue target.",
      ]
    );
  }

  /*
   * Generic fallback
   */
  return makePlan(
    "Validate the Opportunity",
    "Make sure there is real demand before investing too much time or money.",
    [
      "Research 10 competitors.",
      "Identify your ideal customer.",
      "Speak to your first potential customer.",
      "Speak to four more potential customers.",
      "Identify the biggest problem customers have.",
      "Create your first offer.",
      "Set your initial pricing.",
    ],
    "Build the Minimum Version",
    "Create the simplest version of your product or service that can be tested.",
    [
      "Create your first version of the product or service.",
      "Create your basic brand identity.",
      "Create your business social media profile.",
      "Create a simple sales page or offer document.",
      "Set up a way for customers to contact you.",
      "Create your first promotional content.",
      "Prepare your first customer outreach.",
    ],
    "Launch & Get Customers",
    "Put the opportunity in front of real customers and learn from the market.",
    [
      "Contact your first 10 prospects.",
      "Contact another 10 prospects.",
      "Follow up with interested prospects.",
      "Make your first personalised offer.",
      "Aim for your first sale.",
      "Deliver your first customer order or service.",
      "Ask for feedback and a testimonial.",
    ],
    "Improve & Grow",
    "Turn what you learned into a repeatable system for generating revenue.",
    [
      "Improve your offer based on customer feedback.",
      "Create a repeatable sales process.",
      "Create a referral system.",
      "Contact another 10 prospects.",
      "Follow up with previous leads.",
      "Track your revenue, costs and profit.",
      "Set your next customer and 30-day revenue target.",
    ]
  );
}


function getScalePlan(opportunity: Opportunity) {
  const name = opportunity.name.toLowerCase();
  const category = opportunity.category.toLowerCase();

  const monthlyRevenueTarget = Math.max(
    1000,
    Math.round((opportunity.incomeMax || opportunity.incomeMin || 1000) * 3 / 100) * 100
  );

  const customerTarget =
    category.includes("service") ||
    category.includes("sales") ||
    category.includes("marketing") ||
    category.includes("coaching")
      ? 5
      : 25;

  if (
    name.includes("appointment-setting") ||
    name.includes("lead qualification") ||
    name.includes("sales outsourcing")
  ) {
    return {
      title: "Scale Your Client Acquisition",
      description:
        "Turn your first successful client relationships into a repeatable appointment-setting business with predictable monthly revenue.",
      revenueTarget: "€3,000+ monthly revenue",
      customerTarget: "5 recurring business clients",
      systems: [
        "Create a repeatable prospecting and follow-up system.",
        "Build a simple CRM pipeline for every lead and client.",
        "Create standard onboarding and reporting templates.",
        "Document your appointment-setting and qualification process.",
      ],
      growth: [
        "Increase weekly prospect outreach.",
        "Ask existing clients for referrals.",
        "Target businesses with higher customer lifetime value.",
        "Create a case study showing appointments generated and results achieved.",
      ],
      pricing: [
        "Move from one-off trials toward monthly retainers.",
        "Create tiered packages based on appointment volume.",
        "Charge more as your results and proof improve.",
      ],
      reinvest: [
        "Reinvest into better CRM and outreach tools.",
        "Consider automation only after your manual process is consistently working.",
        "Reinvest a portion of revenue into customer acquisition.",
      ],
    };
  }

  if (
    name.includes("football") ||
    name.includes("matchday") ||
    name.includes("coaching") ||
    name.includes("content")
  ) {
    return {
      title: "Scale Through Repeat Customers",
      description:
        "Turn your strongest results into recurring customers, stronger packages and a recognisable niche brand.",
      revenueTarget: "€2,000+ monthly revenue",
      customerTarget: `${customerTarget} recurring customers`,
      systems: [
        "Create a standard customer onboarding process.",
        "Document how you deliver each service.",
        "Create reusable content, templates and workflows.",
        "Track revenue, costs, customer retention and delivery time.",
      ],
      growth: [
        "Focus your marketing on the niche producing the best results.",
        "Create case studies from your strongest customers.",
        "Build referral relationships with existing customers.",
        "Increase outreach while maintaining service quality.",
      ],
      pricing: [
        "Create premium packages around your best-performing service.",
        "Introduce recurring monthly or seasonal packages.",
        "Increase pricing when demand consistently exceeds capacity.",
      ],
      reinvest: [
        "Reinvest into equipment or software that saves delivery time.",
        "Outsource low-value tasks when revenue can support it.",
        "Put part of your profit back into customer acquisition.",
      ],
    };
  }

  return {
    title: "Build a Scalable Business",
    description:
      "Use everything you learned during your first 30 days to create a repeatable system for acquiring customers, delivering value and increasing revenue.",
    revenueTarget: `€${monthlyRevenueTarget.toLocaleString("en-IE")}+ monthly revenue`,
    customerTarget: `${customerTarget} active customers`,
    systems: [
      "Document your core customer acquisition process.",
      "Create a repeatable onboarding and delivery system.",
      "Track revenue, costs, customers and profit every month.",
      "Create templates for your most common business tasks.",
    ],
    growth: [
      "Double down on the customer segment producing the best results.",
      "Increase your weekly customer acquisition activity.",
      "Build a referral system around satisfied customers.",
      "Create case studies, testimonials or proof of results.",
    ],
    pricing: [
      "Review your pricing against the value you provide.",
      "Create a higher-value premium package.",
      "Test price increases once demand becomes consistent.",
    ],
    reinvest: [
      "Reinvest into tools that save time or improve customer acquisition.",
      "Only add major expenses when they are supported by revenue.",
      "Reinvest a percentage of profit into the activity producing the strongest return.",
    ],
  };
}


function getStage06Plan(opportunity: Opportunity) {
  const name = opportunity.name.toLowerCase();
  const category = opportunity.category.toLowerCase();
  const description = opportunity.description.toLowerCase();

  const isLeadGeneration =
    name.includes("appointment-setting") ||
    name.includes("lead generation") ||
    name.includes("lead qualification") ||
    name.includes("sales outsourcing") ||
    category.includes("sales") ||
    category.includes("marketing");

  const isCoaching =
    name.includes("football") ||
    name.includes("coaching") ||
    category.includes("coaching") ||
    description.includes("coaching");

  const isContent =
    name.includes("content") ||
    name.includes("creator") ||
    category.includes("content") ||
    category.includes("media");

  const isProduct =
    category.includes("ecommerce") ||
    category.includes("product") ||
    category.includes("retail") ||
    name.includes("ecommerce");

  if (isLeadGeneration) {
    return {
      title: "Build a Scalable Client Acquisition System",
      description:
        "Turn your client acquisition service into a repeatable operation with documented processes, recurring revenue, automation and delegated delivery.",
      systems: [
        "Document your complete prospecting and follow-up workflow.",
        "Create a standard CRM pipeline from lead to paying client.",
        "Build repeatable onboarding and monthly reporting templates.",
        "Create a clear delivery process that another person could follow.",
      ],
      automation: [
        "Automate lead tracking and follow-up reminders.",
        "Create reusable outreach and follow-up sequences.",
        "Automate client reporting where possible.",
        "Connect your CRM with the tools you use most often.",
      ],
      delegation: [
        "Identify repetitive prospecting tasks someone else could handle.",
        "Create a simple role description for a future virtual assistant.",
        "Document your delivery process before delegating it.",
        "Delegate low-value administrative work once revenue supports it.",
      ],
      retention: [
        "Move clients toward monthly retainers.",
        "Create a monthly results review for every client.",
        "Set a clear renewal and upsell process.",
        "Build referrals into your client relationship process.",
      ],
      profit: [
        "Calculate the true profit from each client.",
        "Identify clients and services with the strongest margins.",
        "Reduce unnecessary software and acquisition costs.",
        "Increase pricing as your results and capacity improve.",
      ],
      growth: [
        "Choose one niche where your results are strongest.",
        "Build a repeatable weekly acquisition target.",
        "Turn your strongest results into case studies.",
        "Create a referral and partnership channel.",
      ],
      target: "Build toward €10,000+ monthly revenue with a repeatable client acquisition operation.",
    };
  }

  if (isCoaching) {
    return {
      title: "Build a Scalable Coaching System",
      description:
        "Turn your expertise into a repeatable coaching operation with structured delivery, recurring programmes, systems and additional capacity.",
      systems: [
        "Create a standard onboarding process for every client.",
        "Document your coaching or training framework.",
        "Create reusable session plans, resources and templates.",
        "Track client progress, retention and results.",
      ],
      automation: [
        "Automate booking confirmations and reminders.",
        "Create reusable communication templates.",
        "Automate progress tracking where possible.",
        "Create a simple system for collecting testimonials and referrals.",
      ],
      delegation: [
        "Identify administration that does not require your expertise.",
        "Document tasks a future assistant could handle.",
        "Create a repeatable process for onboarding new coaches or staff.",
        "Delegate operational work before delegating your core expertise.",
      ],
      retention: [
        "Create recurring coaching or training packages.",
        "Build clear progression milestones for customers.",
        "Introduce renewal conversations before programmes finish.",
        "Create referral incentives for satisfied customers.",
      ],
      profit: [
        "Measure revenue and delivery time per customer.",
        "Identify your most profitable programme.",
        "Increase prices as demand and results improve.",
        "Reduce time spent on low-value administrative work.",
      ],
      growth: [
        "Focus your marketing on your strongest customer niche.",
        "Build proof through testimonials and case studies.",
        "Develop a referral network.",
        "Increase capacity through group or recurring programmes.",
      ],
      target: "Build recurring revenue without increasing your workload at the same rate.",
    };
  }

  if (isContent) {
    return {
      title: "Build a Scalable Content Engine",
      description:
        "Turn your content skills into a repeatable production and distribution system that can handle more clients, projects and revenue.",
      systems: [
        "Create a repeatable content production workflow.",
        "Build reusable briefs, templates and approval processes.",
        "Create a content calendar and publishing system.",
        "Track performance by client, platform and content type.",
      ],
      automation: [
        "Automate scheduling and publishing where possible.",
        "Create reusable editing and production templates.",
        "Automate reporting for key content metrics.",
        "Build a central system for managing briefs and approvals.",
      ],
      delegation: [
        "Identify editing, research or admin tasks that can be delegated.",
        "Document your production standards.",
        "Create a role description for a future editor or assistant.",
        "Delegate execution while keeping strategic quality control.",
      ],
      retention: [
        "Offer monthly content packages.",
        "Create recurring reporting and strategy reviews.",
        "Show clients the results generated by your work.",
        "Build long-term content partnerships.",
      ],
      profit: [
        "Track profit by client and project.",
        "Identify which services take the least time for the highest return.",
        "Productise your strongest service.",
        "Increase pricing as demand becomes consistent.",
      ],
      growth: [
        "Choose a profitable content niche.",
        "Publish proof of your results consistently.",
        "Build partnerships with complementary businesses.",
        "Create a repeatable client acquisition process.",
      ],
      target: "Build recurring content revenue while increasing output without increasing workload linearly.",
    };
  }

  if (isProduct) {
    return {
      title: "Build a Scalable Product Business",
      description:
        "Turn a working product into a repeatable commercial system through better operations, customer retention, automation and profitable growth.",
      systems: [
        "Document your order fulfilment process.",
        "Create a repeatable inventory management system.",
        "Track sales, margins, returns and customer behaviour.",
        "Create standard customer support procedures.",
      ],
      automation: [
        "Automate order and customer notifications.",
        "Automate inventory alerts and stock tracking.",
        "Create reusable customer support responses.",
        "Automate reporting for sales and profitability.",
      ],
      delegation: [
        "Identify fulfilment and admin tasks that can be outsourced.",
        "Document your packing and fulfilment standards.",
        "Create a future operations role checklist.",
        "Delegate repetitive work before adding more complexity.",
      ],
      retention: [
        "Create a post-purchase customer journey.",
        "Build repeat-purchase opportunities.",
        "Create referral and loyalty mechanisms.",
        "Use customer feedback to improve the product and offer.",
      ],
      profit: [
        "Calculate true profit after product, delivery and marketing costs.",
        "Identify your highest-margin products.",
        "Reduce waste and unnecessary operating costs.",
        "Increase average order value through bundles or premium offers.",
      ],
      growth: [
        "Double down on the product and audience producing the strongest results.",
        "Build a repeatable acquisition channel.",
        "Test partnerships and creator collaborations.",
        "Reinvest profit into the highest-performing growth channel.",
      ],
      target: "Build a repeatable product operation that can grow sales without operational chaos.",
    };
  }

  return {
    title: "Build a Scalable Business System",
    description:
      "Turn what is working into a repeatable business system with clear processes, automation, delegation, retention and profitable growth.",
    systems: [
      "Document your core customer acquisition process.",
      "Create a repeatable onboarding and delivery system.",
      "Track revenue, costs, customers and profit consistently.",
      "Create templates for your most common business tasks.",
    ],
    automation: [
      "Identify your three most repetitive weekly tasks.",
      "Automate one repetitive task using your existing tools.",
      "Create reusable communication and workflow templates.",
      "Build a simple weekly business reporting system.",
    ],
    delegation: [
      "List every task you currently perform in the business.",
      "Separate tasks that require your expertise from repetitive work.",
      "Document one task another person could complete.",
      "Create a future delegation plan based on your revenue.",
    ],
    retention: [
      "Create a reason for customers to continue buying from you.",
      "Introduce a follow-up process after every sale.",
      "Ask satisfied customers for referrals and testimonials.",
      "Track repeat customers and customer lifetime value.",
    ],
    profit: [
      "Calculate your true monthly profit.",
      "Identify your highest-margin activity.",
      "Remove unnecessary expenses and inefficient work.",
      "Reinvest profit into the activity producing the strongest return.",
    ],
    growth: [
      "Focus on the customer segment producing the strongest results.",
      "Create a repeatable weekly customer acquisition target.",
      "Build a referral system around satisfied customers.",
      "Create proof of results through testimonials or case studies.",
    ],
    target:
      "Build a business that can increase revenue without requiring the same increase in your personal workload.",
  };
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [analysing, setAnalysing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isPro, setIsPro] = useState(false);

  const startCheckout = async (interval: "monthly" | "annual") => {
    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ interval }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to start checkout");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Unable to start checkout. Please try again.");
    }
  };

  const [showDashboard, setShowDashboard] = useState(false);

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [opportunityLoading, setOpportunityLoading] = useState(true);

  const [selectedOpportunity, setSelectedOpportunity] =
    useState<Opportunity | null>(null);

  const [showPlan, setShowPlan] = useState(false);
  const [show30DayPlan, setShow30DayPlan] = useState(false);
  const [showScalePlan, setShowScalePlan] = useState(false);
  const [showStage06, setShowStage06] = useState(false);

  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [completed30DayTasks, setCompleted30DayTasks] =
    useState<number[]>([]);

  const [completedIncomeTasks, setCompletedIncomeTasks] =
    useState<number[]>([]);

  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [activeCustomers, setActiveCustomers] = useState(0);
  const [leadsGenerated, setLeadsGenerated] = useState(0);
  const [appointmentsBooked, setAppointmentsBooked] = useState(0);
  const [incomeProgressLoaded, setIncomeProgressLoaded] = useState(false);

  useEffect(() => {
    if (!selectedOpportunity) {
      setIncomeProgressLoaded(false);
      return;
    }

    let cancelled = false;

    const loadIncomeProgress = async () => {
      const progressKey = getProgressKey(selectedOpportunity);

      try {
        const response = await fetch(
          `/api/income-growth?opportunity=${encodeURIComponent(
            selectedOpportunity.name
          )}`
        );

        if (response.ok) {
          const result = await response.json();
          const progress = result?.progress;

          if (progress && !cancelled) {
            setMonthlyRevenue(Number(progress.monthly_revenue) || 0);
            setMonthlyExpenses(Number(progress.monthly_expenses) || 0);
            setActiveCustomers(Number(progress.active_customers) || 0);
            setLeadsGenerated(Number(progress.leads_generated) || 0);
            setAppointmentsBooked(
              Number(progress.appointments_booked) || 0
            );
            setCompletedIncomeTasks(
              Array.isArray(progress.completed_income_tasks)
                ? progress.completed_income_tasks
                : []
            );

            localStorage.setItem(
              `cstn-income-growth-${progressKey}`,
              JSON.stringify({
                monthlyRevenue:
                  Number(progress.monthly_revenue) || 0,
                monthlyExpenses:
                  Number(progress.monthly_expenses) || 0,
                activeCustomers:
                  Number(progress.active_customers) || 0,
                leadsGenerated:
                  Number(progress.leads_generated) || 0,
                appointmentsBooked:
                  Number(progress.appointments_booked) || 0,
                completedIncomeTasks:
                  Array.isArray(progress.completed_income_tasks)
                    ? progress.completed_income_tasks
                    : [],
              })
            );

            setIncomeProgressLoaded(true);
            return;
          }
        }
      } catch (error) {
        console.error("CSTN income growth database load error:", error);
      }

      if (!cancelled) {
        const saved = localStorage.getItem(
          `cstn-income-growth-${progressKey}`
        );

        if (saved) {
          try {
            const data = JSON.parse(saved);

            setMonthlyRevenue(data.monthlyRevenue ?? 0);
            setMonthlyExpenses(data.monthlyExpenses ?? 0);
            setActiveCustomers(data.activeCustomers ?? 0);
            setLeadsGenerated(data.leadsGenerated ?? 0);
            setAppointmentsBooked(data.appointmentsBooked ?? 0);
            setCompletedIncomeTasks(
              Array.isArray(data.completedIncomeTasks)
                ? data.completedIncomeTasks
                : []
            );
          } catch {
            console.error("CSTN income growth restore error");
          }
        }

        setIncomeProgressLoaded(true);
      }
    };

    loadIncomeProgress();

    return () => {
      cancelled = true;
    };
  }, [selectedOpportunity]);

  useEffect(() => {
    if (!selectedOpportunity || !incomeProgressLoaded) return;

    const progressKey = getProgressKey(selectedOpportunity);

    const progressData = {
      monthlyRevenue,
      monthlyExpenses,
      activeCustomers,
      leadsGenerated,
      appointmentsBooked,
      completedIncomeTasks,
    };

    localStorage.setItem(
      `cstn-income-growth-${progressKey}`,
      JSON.stringify(progressData)
    );

    const saveIncomeProgress = async () => {
      try {
        const response = await fetch("/api/income-growth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            opportunityName: selectedOpportunity.name,
            ...progressData,
          }),
        });

        if (!response.ok) {
          const result = await response.json().catch(() => null);

          console.error(
            "CSTN income growth database save failed:",
            result?.error || response.statusText
          );
        }
      } catch (error) {
        console.error(
          "CSTN income growth database save error:",
          error
        );
      }
    };

    const saveTimer = window.setTimeout(() => {
      saveIncomeProgress();
    }, 700);

    return () => {
      window.clearTimeout(saveTimer);
    };
  }, [
    selectedOpportunity,
    incomeProgressLoaded,
    monthlyRevenue,
    monthlyExpenses,
    activeCustomers,
    leadsGenerated,
    appointmentsBooked,
    completedIncomeTasks,
  ]);

  const [completedScaleTasks, setCompletedScaleTasks] =
    useState<number[]>([]);

  const [sopsCreated, setSopsCreated] = useState(0);
  const [automationsImplemented, setAutomationsImplemented] = useState(0);
  const [delegatedTasks, setDelegatedTasks] = useState(0);
  const [recurringCustomers, setRecurringCustomers] = useState(0);
  const [scaleProgressLoaded, setScaleProgressLoaded] = useState(false);

  useEffect(() => {
    if (!selectedOpportunity) {
      setScaleProgressLoaded(false);
      return;
    }

    let cancelled = false;

    const progressKey = getProgressKey(selectedOpportunity);

    const loadScaleProgress = async () => {
      try {
        const response = await fetch(
          `/api/scale-systems?opportunity=${encodeURIComponent(
            selectedOpportunity.name
          )}`
        );

        if (response.ok) {
          const result = await response.json();
          const progress = result?.progress;

          if (progress && !cancelled) {
            const restoredData = {
              completedScaleTasks:
                Array.isArray(progress.completed_scale_tasks)
                  ? progress.completed_scale_tasks
                  : [],
              sopsCreated: Number(progress.sops_created) || 0,
              automationsImplemented:
                Number(progress.automations_implemented) || 0,
              delegatedTasks: Number(progress.delegated_tasks) || 0,
              recurringCustomers:
                Number(progress.recurring_customers) || 0,
            };

            setCompletedScaleTasks(restoredData.completedScaleTasks);
            setSopsCreated(restoredData.sopsCreated);
            setAutomationsImplemented(
              restoredData.automationsImplemented
            );
            setDelegatedTasks(restoredData.delegatedTasks);
            setRecurringCustomers(restoredData.recurringCustomers);

            localStorage.setItem(
              `cstn-scale-systems-${progressKey}`,
              JSON.stringify(restoredData)
            );

            setScaleProgressLoaded(true);
            return;
          }
        }
      } catch (error) {
        console.error(
          "CSTN scale systems database load error:",
          error
        );
      }

      if (!cancelled) {
        const saved = localStorage.getItem(
          `cstn-scale-systems-${progressKey}`
        );

        if (saved) {
          try {
            const data = JSON.parse(saved);

            setCompletedScaleTasks(
              Array.isArray(data.completedScaleTasks)
                ? data.completedScaleTasks
                : []
            );

            setSopsCreated(Number(data.sopsCreated) || 0);
            setAutomationsImplemented(
              Number(data.automationsImplemented) || 0
            );
            setDelegatedTasks(Number(data.delegatedTasks) || 0);
            setRecurringCustomers(
              Number(data.recurringCustomers) || 0
            );
          } catch {
            console.error("CSTN scale systems restore error");
          }
        }

        setScaleProgressLoaded(true);
      }
    };

    loadScaleProgress();

    return () => {
      cancelled = true;
    };
  }, [selectedOpportunity]);

  useEffect(() => {
    if (!selectedOpportunity || !scaleProgressLoaded) return;

    const progressKey = getProgressKey(selectedOpportunity);

    const progressData = {
      completedScaleTasks,
      sopsCreated,
      automationsImplemented,
      delegatedTasks,
      recurringCustomers,
    };

    localStorage.setItem(
      `cstn-scale-systems-${progressKey}`,
      JSON.stringify(progressData)
    );

    const saveScaleProgress = async () => {
      try {
        const response = await fetch("/api/scale-systems", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            opportunityName: selectedOpportunity.name,
            ...progressData,
          }),
        });

        if (!response.ok) {
          const result = await response.json().catch(() => null);

          console.error(
            "CSTN scale systems database save failed:",
            result?.error || response.statusText
          );
        }
      } catch (error) {
        console.error(
          "CSTN scale systems database save error:",
          error
        );
      }
    };

    const saveTimer = window.setTimeout(() => {
      saveScaleProgress();
    }, 700);

    return () => {
      window.clearTimeout(saveTimer);
    };
  }, [
    selectedOpportunity,
    scaleProgressLoaded,
    completedScaleTasks,
    sopsCreated,
    automationsImplemented,
    delegatedTasks,
    recurringCustomers,
  ]);

  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] =
    useState<string[]>([]);

  const [otherGoal, setOtherGoal] = useState("");
  const [otherSkill, setOtherSkill] = useState("");
  const [otherInterest, setOtherInterest] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedAmbition, setSelectedAmbition] = useState("");

  const [results, setResults] = useState<
    { opportunity: Opportunity; score: number }[]
  >([]);

  /*
   * Load the currently authenticated CSTN user.
   */
  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const response = await fetch("/api/profile");

        if (!response.ok) {
          setCurrentUserId(null);
          setCurrentUserEmail(null);
          return;
        }

        const data = await response.json();

        setCurrentUserId(data.user?.id ?? null);
        setCurrentUserEmail(data.user?.email ?? null);
      } catch (error) {
        console.error("CSTN user loading error:", error);
        setCurrentUserId(null);
        setCurrentUserEmail(null);
      } finally {
        setAuthLoading(false);
      }
    };

    loadCurrentUser();
  }, []);

  /*
   * Restore the user's saved opportunity and progress.
   */
  useEffect(() => {
    const restoreOpportunity = async () => {
      let opportunity: Opportunity | null = null;

      try {
        if (currentUserId) {
          const response = await fetch("/api/profile");

          if (response.ok) {
            const data = await response.json();

            if (data.opportunity?.opportunity_data) {
              opportunity = data.opportunity.opportunity_data;
            }
          }
        }

        if (!opportunity) {
          const savedOpportunity = localStorage.getItem(
            "cstn-selected-opportunity"
          );

          if (savedOpportunity) {
            opportunity = JSON.parse(savedOpportunity);
          }
        }

        if (!opportunity) {
          setOpportunityLoading(false);
          return;
        }

        setSelectedOpportunity(opportunity);

        const progressKey = getProgressKey(opportunity);

        const saved7DayProgress = localStorage.getItem(
          `cstn-7-day-progress-${progressKey}`
        );

        const saved30DayProgress = localStorage.getItem(
          `cstn-30-day-progress-${progressKey}`
        );

        setCompletedDays(
          saved7DayProgress ? JSON.parse(saved7DayProgress) : []
        );

        setCompleted30DayTasks(
          saved30DayProgress ? JSON.parse(saved30DayProgress) : []
        );

        const saved30DayPlan = localStorage.getItem(
          `cstn-show-30-day-plan-${progressKey}`
        );

        const saved7DayPlan = localStorage.getItem(
          `cstn-show-7-day-plan-${progressKey}`
        );

        setShowPlan(false);
        setShow30DayPlan(false);
        setShowScalePlan(false);

        if (saved30DayPlan === "true") {
          setShow30DayPlan(true);
        } else if (saved7DayPlan === "true") {
          setShowPlan(true);
        }

        localStorage.setItem(
          "cstn-selected-opportunity",
          JSON.stringify(opportunity)
        );

        if (currentUserId) {
          setStarted(true);
          setShowDashboard(true);
        }
      } catch (error) {
        console.error("CSTN opportunity restore error:", error);
      } finally {
        setOpportunityLoading(false);
      }
    };

    if (!authLoading) {
      restoreOpportunity();
    }
  }, [currentUserId, authLoading]);


  /*
   * Restore saved CSTN assessment and results.
   */
  useEffect(() => {
    const savedAssessment = localStorage.getItem(
      "cstn-assessment"
    );

    const savedResults = localStorage.getItem(
      "cstn-results"
    );

    const savedStep = localStorage.getItem(
      "cstn-assessment-step"
    );

    try {
      if (savedAssessment) {
        const assessment = JSON.parse(savedAssessment);

        setSelectedGoal(assessment.selectedGoal ?? "");
        setSelectedBudget(assessment.selectedBudget ?? "");
        setSelectedSkills(
          Array.isArray(assessment.selectedSkills)
            ? assessment.selectedSkills
            : []
        );
        setSelectedInterests(
          Array.isArray(assessment.selectedInterests)
            ? assessment.selectedInterests
            : []
        );
        setOtherGoal(assessment.otherGoal ?? "");
        setOtherSkill(assessment.otherSkill ?? "");
        setOtherInterest(assessment.otherInterest ?? "");
        setSelectedTime(assessment.selectedTime ?? "");
        setSelectedLocation(assessment.selectedLocation ?? "");
        setSelectedAmbition(assessment.selectedAmbition ?? "");
      }

      if (savedResults) {
        const parsedResults = JSON.parse(savedResults);

        if (Array.isArray(parsedResults)) {
          setResults(parsedResults);
          setShowResults(true);
        }
      }

      if (savedStep) {
        const parsedStep = Number(savedStep);

        if (
          Number.isInteger(parsedStep) &&
          parsedStep >= 1 &&
          parsedStep <= 7
        ) {
          setStep(parsedStep);
        }
      }
    } catch (error) {
      console.error("CSTN assessment restore error:", error);
    }
  }, []);

  /*
   * Save 7-day progress for the currently selected opportunity.
   */
  useEffect(() => {
    if (!selectedOpportunity) return;

    const progressKey = getProgressKey(selectedOpportunity);

    localStorage.setItem(
      `cstn-7-day-progress-${progressKey}`,
      JSON.stringify(completedDays)
    );
  }, [completedDays, selectedOpportunity]);

  /*
   * Save 30-day progress for the currently selected opportunity.
   */
  useEffect(() => {
    if (!selectedOpportunity) return;

    const progressKey = getProgressKey(selectedOpportunity);

    localStorage.setItem(
      `cstn-30-day-progress-${progressKey}`,
      JSON.stringify(completed30DayTasks)
    );
  }, [completed30DayTasks, selectedOpportunity]);

  /*
   * Save which plan the user is currently viewing.
   */
  useEffect(() => {
    if (!selectedOpportunity) return;

    const progressKey = getProgressKey(selectedOpportunity);

    if (show30DayPlan) {
      localStorage.setItem(
        `cstn-show-30-day-plan-${progressKey}`,
        "true"
      );

      localStorage.removeItem(
        `cstn-show-7-day-plan-${progressKey}`
      );
    } else if (showPlan) {
      localStorage.setItem(
        `cstn-show-7-day-plan-${progressKey}`,
        "true"
      );

      localStorage.removeItem(
        `cstn-show-30-day-plan-${progressKey}`
      );
    } else {
      localStorage.removeItem(
        `cstn-show-7-day-plan-${progressKey}`
      );

      localStorage.removeItem(
        `cstn-show-30-day-plan-${progressKey}`
      );
    }
  }, [showPlan, show30DayPlan, selectedOpportunity]);

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

  const findOpportunities = async () => {
    setAnalysing(true);

    try {
      const response = await fetch("/api/generate-opportunities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budget: selectedBudget,
          skills: [
            ...selectedSkills,
            ...(otherSkill.trim()
              ? [`Other: ${otherSkill.trim()}`]
              : []),
          ],
          interests: [
            ...selectedInterests,
            ...(otherInterest.trim()
              ? [`Other: ${otherInterest.trim()}`]
              : []),
          ],
          goal:
            selectedGoal === "Other" && otherGoal.trim()
              ? `Other: ${otherGoal.trim()}`
              : selectedGoal,
          timeAvailable: selectedTime,
          incomeGoal: selectedAmbition,
          location: selectedLocation,
          experience: "Beginner",
          preferences:
            "I want something I can start alongside my current work and eventually scale.",
        }),
      });

      const responseText = await response.text();

      let data: {
        opportunities?: Opportunity[];
        error?: string;
        message?: string;
      };

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          `Invalid API response (${response.status}): ${responseText.slice(
            0,
            300
          )}`
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            `API request failed: ${response.status}`
        );
      }

      if (!data.opportunities || !Array.isArray(data.opportunities)) {
        throw new Error(
          data.error ||
            data.message ||
            "AI returned no valid opportunities"
        );
      }

      if (data.opportunities.length === 0) {
        throw new Error(
          "CSTN couldn't find any opportunities for these answers. Please try again."
        );
      }

      const aiResults = data.opportunities.map(
        (opportunity: Opportunity & { score?: number }) => ({
          opportunity,
          score: Math.min(
            Math.max(Math.round(opportunity.score ?? 0), 1),
            99
          ),
        })
      );

      setResults(aiResults);

      localStorage.setItem(
        "cstn-results",
        JSON.stringify(aiResults)
      );

      localStorage.setItem(
        "cstn-assessment",
        JSON.stringify({
          selectedGoal,
          selectedBudget,
          selectedSkills,
          selectedInterests,
          otherGoal,
          otherSkill,
          otherInterest,
          selectedTime,
          selectedLocation,
          selectedAmbition,
        })
      );

      localStorage.setItem(
        "cstn-assessment-step",
        "7"
      );

      setAnalysing(false);
      setShowResults(true);
    } catch (error) {
      console.error("CSTN AI error:", error);

      setAnalysing(false);

      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while finding your opportunities.";

      alert(
        `CSTN couldn't generate your opportunities.\n\n${message}\n\nPlease try again.`
      );
    }
  };

  useEffect(() => {
    if (started && !showResults) {
      localStorage.setItem(
        "cstn-assessment-step",
        String(step)
      );
    }
  }, [step, started, showResults]);

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

  const selectOpportunity = async (opportunity: Opportunity) => {
    const progressKey = getProgressKey(opportunity);

    const saved7DayProgress = localStorage.getItem(
      `cstn-7-day-progress-${progressKey}`
    );

    const saved30DayProgress = localStorage.getItem(
      `cstn-30-day-progress-${progressKey}`
    );

    setCompletedDays(
      saved7DayProgress ? JSON.parse(saved7DayProgress) : []
    );

    if (saved30DayProgress) {
      try {
        const saved = JSON.parse(saved30DayProgress);

        // New format: task indexes.
        if (
          Array.isArray(saved) &&
          saved.every((item) => typeof item === "number")
        ) {
          setCompleted30DayTasks(saved);
        } else {
          // Old task-text format: clear it so old progress
          // cannot incorrectly check tasks in a new plan.
          setCompleted30DayTasks([]);
          localStorage.removeItem(
            `cstn-30-day-progress-${progressKey}`
          );
        }
      } catch {
        setCompleted30DayTasks([]);
        localStorage.removeItem(
          `cstn-30-day-progress-${progressKey}`
        );
      }
    } else {
      setCompleted30DayTasks([]);
    }

    localStorage.setItem(
      "cstn-selected-opportunity",
      JSON.stringify(opportunity)
    );

    // Save the opportunity to the logged-in CSTN account.
    if (currentUserId) {
      try {
        const response = await fetch("/api/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            opportunity,
          }),
        });

        if (!response.ok) {
          console.error(
            "CSTN opportunity save failed:",
            await response.text()
          );
        }
      } catch (error) {
        console.error("CSTN opportunity save error:", error);
      }
    }

    setSelectedOpportunity(opportunity);
    setShowPlan(false);
    setShow30DayPlan(false);
  };

  const resetAssessment = () => {
    setShowResults(false);
    setSelectedOpportunity(null);
    setShowPlan(false);
    setShow30DayPlan(false);

    setStep(1);

    setSelectedGoal("");
    setSelectedBudget("");
    setSelectedSkills([]);
    setSelectedInterests([]);
    setSelectedTime("");
    setSelectedLocation("");
    setSelectedAmbition("");

    setResults([]);
    setCompletedDays([]);
    setCompleted30DayTasks([]);

    localStorage.removeItem("cstn-selected-opportunity");
  };

  /*
   * Landing page
   */
  if (!started) {
    return (
      <main className="min-h-screen bg-white text-black">
        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="mb-8 text-sm font-semibold tracking-[0.35em] text-gray-500">
            CORNERSTONE NETWORK
          </p>

          <h1 className="max-w-4xl text-6xl font-bold tracking-tight sm:text-7xl">
            Find the opportunity
            <br />
            built around you.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">
     CSTN turns your skills, interests and ambitions into realistic opportunities — then gives you a step-by-step path to build one.
          </p>

          <button
            onClick={() => setStarted(true)}
            className="mt-10 rounded-full bg-black px-8 py-4 text-base font-semibold text-white transition hover:bg-gray-800"
          >
            Find My Opportunity →
          </button>

          <p className="mt-5 text-sm text-gray-400">
            Discover. Validate. Build. Grow.
          </p>
        </section>
      </main>
    );
  }

  /*
   * Analysis screen
   */
  if (analysing) {
    return (
      <main className="min-h-screen bg-white text-black">
        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="mb-8 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

          <p className="text-sm font-semibold tracking-[0.3em] text-gray-400">
            CSTN
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

  /*
   * CSTN Dashboard
   */
  if (showDashboard && selectedOpportunity) {
    const progressKey = getProgressKey(selectedOpportunity);

    const monthPlan = getThirtyDayPlan(selectedOpportunity);
    const allTasks = monthPlan.flatMap((week) => week.tasks);

    const dashboard7Day = completedDays.filter(
      (index) => Number.isInteger(index) && index >= 0 && index < 7
    ).length;

    const dashboard30Day = completed30DayTasks.filter(
      (index) =>
        Number.isInteger(index) &&
        index >= 0 &&
        index < allTasks.length
    ).length;

    const sevenDayProgress = Math.min(
      100,
      Math.round((dashboard7Day / 7) * 100)
    );

    const thirtyDayProgress =
      allTasks.length === 0
        ? 0
        : Math.min(
            100,
            Math.round((dashboard30Day / allTasks.length) * 100)
          );

    const next7DayTask =
      sevenDayProgress < 100
        ? selectedOpportunity.firstSteps.find(
            (_, index) => !completedDays.includes(index)
          )
        : null;

    const next30DayTask =
      thirtyDayProgress < 100
        ? allTasks.find(
            (_, index) => !completed30DayTasks.includes(index)
          )
        : null;

    let nextAction = "Start your 7-day launch plan.";
    let nextActionDescription =
      "Your first objective is to validate the opportunity and take your first real-world actions.";

    if (next7DayTask) {
      nextAction = next7DayTask;
      nextActionDescription =
        "This is your next recommended action in the CSTN launch plan.";
    } else if (next30DayTask) {
      nextAction = next30DayTask;
      nextActionDescription =
        "Your 7-day launch is complete. Now keep building through the 30-day plan.";
    } else if (
      sevenDayProgress === 100 &&
      thirtyDayProgress === 100
    ) {
      nextAction = "Your first CSTN build cycle is complete.";
      nextActionDescription =
        "Review what you learned, measure your results and decide what to improve or scale next.";
    }

    const continueBuilding = () => {
      if (sevenDayProgress < 100) {
        setShowDashboard(false);
        setShowPlan(true);
      } else if (thirtyDayProgress < 100) {
        setShowDashboard(false);
        setShow30DayPlan(true);
      } else {
        setShowDashboard(false);
        setShowScalePlan(true);
      }
    };

    return (
      <main className="min-h-screen bg-white text-black">
        <section className="mx-auto max-w-5xl px-6 py-12">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold tracking-[0.3em]">
              CSTN
            </p>

            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={async () => {
                  const { supabase } = await import("@/lib/supabase");
                  await supabase.auth.signOut();

                  localStorage.removeItem("cstn-selected-opportunity");
                  localStorage.removeItem("cstn-assessment");
                  localStorage.removeItem("cstn-results");
                  localStorage.removeItem("cstn-assessment-step");

                  window.location.href = "/auth";
                }}
                className="text-sm font-semibold text-gray-600 hover:text-black"
              >
                Log out
              </button>

              <button
                type="button"
                onClick={() => setShowDashboard(false)}
                className="text-sm font-semibold text-gray-600 hover:text-black"
              >
                Back
              </button>
            </div>
          </div>

          <div className="mt-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Your dashboard
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Keep building.
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-7 text-gray-500">
              Your opportunity, progress and next actions — all in one place.
            </p>
          </div>

          <div className="mt-10 rounded-3xl bg-black p-8 text-white sm:p-10">
            <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Current opportunity
                </p>

                <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
                  {selectedOpportunity.name}
                </h2>

                <p className="mt-4 text-gray-300">
                  {selectedOpportunity.category}
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-4xl font-bold">
                  {selectedOpportunity.score ?? 0}%
                </p>

                <p className="text-sm text-gray-400">
                  CSTN match
                </p>
              </div>
            </div>

            {sevenDayProgress < 100 || thirtyDayProgress < 100 ? (
              <button
                onClick={continueBuilding}
                className="mt-8 rounded-full bg-white px-7 py-4 font-semibold text-black transition hover:bg-gray-200"
              >
                Continue Building →
              </button>
            ) : (
              <div className="mt-8">
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="font-semibold">
                    🎉 Build cycle complete
                  </p>

                  <p className="mt-1 text-sm text-gray-300">
                    You've completed your 7-day launch and 30-day build plans.
                    You're ready for the next stage.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setShowDashboard(false);
                    setShowScalePlan(true);
                  }}
                  className="mt-4 rounded-full bg-white px-7 py-4 font-semibold text-black transition hover:bg-gray-200"
                >
                  Start Scaling →
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-gray-200 p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-400">
                7-Day Launch
              </p>

              <p className="mt-3 text-4xl font-bold">
                {sevenDayProgress}%
              </p>

              <p className="mt-2 text-sm text-gray-500">
                {dashboard7Day}/7 days complete
              </p>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-black transition-all duration-300"
                  style={{ width: `${sevenDayProgress}%` }}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-400">
                30-Day Build
              </p>

              <p className="mt-3 text-4xl font-bold">
                {thirtyDayProgress}%
              </p>

              <p className="mt-2 text-sm text-gray-500">
                {dashboard30Day}/{allTasks.length} tasks complete
              </p>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-black transition-all duration-300"
                  style={{ width: `${thirtyDayProgress}%` }}
                />
              </div>
            </div>
          </div>

          <section className="mt-8 rounded-3xl bg-gray-50 p-7 sm:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Next action
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">
              {nextAction}
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-gray-600">
              {nextActionDescription}
            </p>

            {(next7DayTask || next30DayTask) && (
              <button
                onClick={continueBuilding}
                className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Do this now →
              </button>
            )}
          </section>

          <section className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              CSTN Blueprint
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-gray-200 p-6">
                <p className="text-sm text-gray-400">
                  Target customer
                </p>

                <p className="mt-2 font-semibold leading-6">
                  {selectedOpportunity.targetCustomer ?? "Define your customer"}
                </p>
              </div>

              <div className="rounded-3xl border border-gray-200 p-6">
                <p className="text-sm text-gray-400">
                  Time to revenue
                </p>

                <p className="mt-2 font-semibold leading-6">
                  {selectedOpportunity.timeToFirstRevenue ?? "Varies"}
                </p>
              </div>

              <div className="rounded-3xl border border-gray-200 p-6">
                <p className="text-sm text-gray-400">
                  Scalability
                </p>

                <p className="mt-2 font-semibold leading-6">
                  {selectedOpportunity.scalability ?? "Can be developed over time"}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Your journey
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-5">
              {[
                ["01", "Assessment", true],
                ["02", "Opportunity", true],
                ["03", "Launch", sevenDayProgress === 100],
                ["04", "Build", thirtyDayProgress === 100],
                ["05", "Scale", thirtyDayProgress === 100],
              ].map(([number, title, complete]) => (
                <div
                  key={String(number)}
                  className={`rounded-2xl p-5 ${
                    complete
                      ? "bg-black text-white"
                      : "bg-gray-50 text-gray-400"
                  }`}
                >
                  <p className="text-xs font-semibold tracking-[0.15em]">
                    {number}
                  </p>

                  <p className="mt-3 font-semibold">
                    {title}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
    );
  }

  /*
   * 30-Day Build Plan
   */
  if (show30DayPlan && selectedOpportunity) {
    const monthPlan = getThirtyDayPlan(selectedOpportunity);

    const allTasks = monthPlan.flatMap((week) => week.tasks);

    const validCompletedTasks = Array.from(
      new Set(
        completed30DayTasks.filter(
          (index) =>
            Number.isInteger(index) &&
            index >= 0 &&
            index < allTasks.length
        )
      )
    );

    const completedCount = validCompletedTasks.length;

    const progress =
      allTasks.length === 0
        ? 0
        : Math.min(
            100,
            Math.round((completedCount / allTasks.length) * 100)
          );

    const toggleThirtyDayTask = (taskIndex: number) => {
      setCompleted30DayTasks((current) => {
        const validCurrent = Array.from(
          new Set(
            current.filter(
              (index) =>
                Number.isInteger(index) &&
                index >= 0 &&
                index < allTasks.length
            )
          )
        );

        if (validCurrent.includes(taskIndex)) {
          return validCurrent.filter(
            (index) => index !== taskIndex
          );
        }

        return [...validCurrent, taskIndex];
      });
    };

    return (
      <main className="min-h-screen bg-white text-black">
        <section className="mx-auto max-w-4xl px-6 py-12">
          <button
            onClick={() => {
              setShow30DayPlan(false);
              setShowPlan(true);
            }}
            className="text-sm font-medium text-gray-500 hover:text-black"
          >
            ← Back to 7-day plan
          </button>

          <div className="mt-12">
            <p className="text-sm font-semibold tracking-[0.3em] text-gray-400">
              CSTN
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
                  {week.tasks.map((task, taskIndex) => {
        const weekIndex = monthPlan.indexOf(week);

        const globalTaskIndex =
          monthPlan
            .slice(0, weekIndex)
            .reduce(
              (total, previousWeek) =>
                total + previousWeek.tasks.length,
              0
            ) + taskIndex;

        const completed =
          completed30DayTasks.includes(globalTaskIndex);

        return (
                      <button
                        key={`${week.week}-${taskIndex}`}
                        onClick={() => toggleThirtyDayTask(globalTaskIndex)}
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
                            {completed ? "✓" : taskIndex + 1}
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

  /*
   * 7-Day Launch Plan
   */
  if (showPlan && selectedOpportunity) {
    const completedCount = completedDays.length;

    const progress = Math.round((completedCount / 7) * 100);

    const toggleDay = (index: number) => {
      setCompletedDays((current) => {
        if (current.includes(index)) {
          return current.filter((day) => day !== index);
        }

        return [...current, index];
      });
    };

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
              CSTN
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
                <p className="text-sm text-gray-400">
                  Your progress
                </p>

                <p className="mt-1 text-3xl font-bold">
                  {progress}%
                </p>
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
                  onClick={() => toggleDay(index)}
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
                          completed
                            ? "line-through text-gray-400"
                            : ""
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
                Now it's time to review what you learned and decide your
                next move.
              </p>
            </div>
          )}

          <button
            onClick={() => {
              setShowPlan(false);
              setShow30DayPlan(true);
            }}
            className="mt-8 w-full rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:bg-gray-800"
          >
            Continue to 30-Day Build Plan →
          </button>
        </section>
      </main>
    );
  }

  /*
   * CSTN Stage 05 — Income Growth
   */
  if (showScalePlan && selectedOpportunity) {
    const scalePlan = getScalePlan(selectedOpportunity);

    const monthlyTarget =
      Number(scalePlan.revenueTarget.replace(/[^0-9]/g, "")) || 10000;

    const customerTarget =
      Number(scalePlan.customerTarget.replace(/[^0-9]/g, "")) || 5;

    const weeklyTarget = Math.round(monthlyTarget / 4);

    const revenueRemaining = Math.max(
      monthlyTarget - monthlyRevenue,
      0
    );

    const profit = monthlyRevenue - monthlyExpenses;

    const customerProgress = Math.min(
      Math.round((activeCustomers / customerTarget) * 100),
      100
    );

    const revenueProgress = Math.min(
      Math.round((monthlyRevenue / monthlyTarget) * 100),
      100
    );

    const leadToCustomerRate =
      leadsGenerated > 0
        ? Math.round((activeCustomers / leadsGenerated) * 100)
        : 0;

    const appointmentRate =
      leadsGenerated > 0
        ? Math.round((appointmentsBooked / leadsGenerated) * 100)
        : 0;

    const incomeTasks = [
      {
        category: "Acquire",
        tasks: [
          "Contact 50 potential customers.",
          "Follow up with 25 existing prospects.",
          "Book at least 5 discovery calls.",
        ],
      },
      {
        category: "Convert",
        tasks: [
          "Complete your discovery calls.",
          "Send proposals to qualified prospects.",
          "Close your next paying customer.",
        ],
      },
      {
        category: "Deliver",
        tasks: [
          "Deliver your service to your customers.",
          "Track the results you generate.",
          "Ask satisfied customers for a testimonial or referral.",
        ],
      },
      {
        category: "Improve",
        tasks: [
          "Identify what is producing the strongest results.",
          "Improve your offer based on customer feedback.",
          "Review your pricing and prepare for your next increase.",
        ],
      },
    ];

    const totalIncomeTasks = incomeTasks.reduce(
      (total, section) => total + section.tasks.length,
      0
    );

    const completedIncomeTaskCount = completedIncomeTasks.filter(
      (index) =>
        Number.isInteger(index) &&
        index >= 0 &&
        index < totalIncomeTasks
    ).length;

    const incomeProgress =
      totalIncomeTasks === 0
        ? 0
        : Math.round(
            (completedIncomeTaskCount / totalIncomeTasks) * 100
          );

    const toggleIncomeTask = (index: number) => {
      setCompletedIncomeTasks((current) => {
        if (current.includes(index)) {
          return current.filter((task) => task !== index);
        }

        return [...current, index];
      });
    };

    const milestones = [
      { label: "First €500", amount: 500 },
      { label: "€1,000/month", amount: 1000 },
      { label: "€3,000/month", amount: 3000 },
      { label: "€5,000/month", amount: 5000 },
      { label: "€10,000/month", amount: 10000 },
    ];

    return (
      <main className="min-h-screen bg-white text-black">
        <section className="mx-auto max-w-5xl px-6 py-12">

          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold tracking-[0.3em]">
              CSTN
            </p>

            <button
              onClick={() => {
                setShowScalePlan(false);
                setShowDashboard(true);
              }}
              className="text-sm font-medium text-gray-500 transition hover:text-black"
            >
              ← Back to Dashboard
            </button>
          </div>

          <div className="mt-16 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
              Stage 05 — Income Growth
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Turn Your Opportunity Into Income
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-500">
              {selectedOpportunity.name}
            </p>
          </div>

          <section className="mt-10 rounded-3xl bg-black p-8 text-white sm:p-10">
            <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Monthly Revenue
                </p>

                <p className="mt-3 text-5xl font-bold tracking-tight">
                  €{monthlyRevenue.toLocaleString("en-IE")}
                </p>

                <p className="mt-2 text-gray-400">
                  Target: €{monthlyTarget.toLocaleString("en-IE")}
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-3xl font-bold">
                  {revenueProgress}%
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Revenue target reached
                </p>
              </div>
            </div>

            <div className="mt-8 h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-white transition-all duration-300"
                style={{ width: `${revenueProgress}%` }}
              />
            </div>

            <p className="mt-4 text-sm text-gray-400">
              €{revenueRemaining.toLocaleString("en-IE")} remaining to hit
              this month's target.
            </p>
          </section>

          <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-3xl border border-gray-200 p-6">
              <p className="text-sm text-gray-400">
                Revenue
              </p>

              <input
                type="number"
                min="0"
                value={monthlyRevenue}
                onChange={(e) =>
                  setMonthlyRevenue(Number(e.target.value) || 0)
                }
                className="mt-3 w-full border-b border-gray-300 bg-transparent pb-2 text-2xl font-bold outline-none focus:border-black"
              />
            </div>

            <div className="rounded-3xl border border-gray-200 p-6">
              <p className="text-sm text-gray-400">
                Expenses
              </p>

              <input
                type="number"
                min="0"
                value={monthlyExpenses}
                onChange={(e) =>
                  setMonthlyExpenses(Number(e.target.value) || 0)
                }
                className="mt-3 w-full border-b border-gray-300 bg-transparent pb-2 text-2xl font-bold outline-none focus:border-black"
              />
            </div>

            <div className="rounded-3xl border border-gray-200 p-6">
              <p className="text-sm text-gray-400">
                Active Customers
              </p>

              <input
                type="number"
                min="0"
                value={activeCustomers}
                onChange={(e) =>
                  setActiveCustomers(Number(e.target.value) || 0)
                }
                className="mt-3 w-full border-b border-gray-300 bg-transparent pb-2 text-2xl font-bold outline-none focus:border-black"
              />

              <p className="mt-2 text-xs text-gray-400">
                Target: {customerTarget}
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 p-6">
              <p className="text-sm text-gray-400">
                Monthly Profit
              </p>

              <p
                className={`mt-3 text-2xl font-bold ${
                  profit < 0 ? "text-red-600" : "text-black"
                }`}
              >
                €{profit.toLocaleString("en-IE")}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                Revenue minus expenses
              </p>
            </div>

          </section>

          <section className="mt-8 grid gap-4 sm:grid-cols-2">

            <div className="rounded-3xl border border-gray-200 p-6">
              <p className="text-sm text-gray-400">
                Leads Generated
              </p>

              <input
                type="number"
                min="0"
                value={leadsGenerated}
                onChange={(e) =>
                  setLeadsGenerated(Number(e.target.value) || 0)
                }
                className="mt-3 w-full border-b border-gray-300 bg-transparent pb-2 text-2xl font-bold outline-none focus:border-black"
              />

              <p className="mt-2 text-sm text-gray-500">
                {leadToCustomerRate}% lead → customer conversion
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 p-6">
              <p className="text-sm text-gray-400">
                Appointments Booked
              </p>

              <input
                type="number"
                min="0"
                value={appointmentsBooked}
                onChange={(e) =>
                  setAppointmentsBooked(Number(e.target.value) || 0)
                }
                className="mt-3 w-full border-b border-gray-300 bg-transparent pb-2 text-2xl font-bold outline-none focus:border-black"
              />

              <p className="mt-2 text-sm text-gray-500">
                {appointmentRate}% of your leads became appointments
              </p>
            </div>

          </section>

          <section className="mt-16">

            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                Your Targets
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Know what you are working toward.
              </h2>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">

              <div className="rounded-3xl bg-gray-50 p-6">
                <p className="text-sm text-gray-400">
                  Monthly target
                </p>

                <p className="mt-2 text-2xl font-bold">
                  €{monthlyTarget.toLocaleString("en-IE")}
                </p>
              </div>

              <div className="rounded-3xl bg-gray-50 p-6">
                <p className="text-sm text-gray-400">
                  Weekly target
                </p>

                <p className="mt-2 text-2xl font-bold">
                  €{weeklyTarget.toLocaleString("en-IE")}
                </p>
              </div>

              <div className="rounded-3xl bg-gray-50 p-6">
                <p className="text-sm text-gray-400">
                  Customer target
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {customerTarget}
                </p>
              </div>

            </div>

          </section>

          <section className="mt-16">

            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                This Week
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Build your income engine.
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Focus on acquiring customers, converting opportunities,
                delivering results and improving your offer.
              </p>
            </div>

            <div className="mt-8 space-y-6">

              {incomeTasks.map((section, sectionIndex) => {
                const previousTaskCount = incomeTasks
                  .slice(0, sectionIndex)
                  .reduce(
                    (total, previousSection) =>
                      total + previousSection.tasks.length,
                    0
                  );

                return (
                  <div
                    key={section.category}
                    className="rounded-3xl border border-gray-200 p-7 sm:p-8"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                      {section.category}
                    </p>

                    <div className="mt-5 space-y-3">

                      {section.tasks.map((task, taskIndex) => {
                        const globalIndex =
                          previousTaskCount + taskIndex;

                        const completed =
                          completedIncomeTasks.includes(globalIndex);

                        return (
                          <button
                            key={task}
                            onClick={() =>
                              toggleIncomeTask(globalIndex)
                            }
                            className={`w-full rounded-2xl p-5 text-left transition ${
                              completed
                                ? "bg-black text-white"
                                : "bg-gray-50 text-black hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex items-center gap-4">

                              <div
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                                  completed
                                    ? "bg-white text-black"
                                    : "bg-black text-white"
                                }`}
                              >
                                {completed
                                  ? "✓"
                                  : globalIndex + 1}
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
                );
              })}

            </div>

            <div className="mt-6 rounded-2xl bg-gray-50 p-5">
              <div className="flex items-center justify-between">
                <p className="font-semibold">
                  Growth system progress
                </p>

                <p className="font-bold">
                  {incomeProgress}%
                </p>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-black transition-all duration-300"
                  style={{ width: `${incomeProgress}%` }}
                />
              </div>
            </div>

          </section>

          <section className="mt-16">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Your Growth Funnel
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Customers create the income.
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-5">

              {[
                ["01", "Prospects", leadsGenerated],
                ["02", "Conversations", leadsGenerated],
                ["03", "Appointments", appointmentsBooked],
                ["04", "Customers", activeCustomers],
                ["05", "Revenue", `€${monthlyRevenue.toLocaleString("en-IE")}`],
              ].map(([number, label, value]) => (
                <div
                  key={number}
                  className="rounded-3xl bg-gray-50 p-6 text-center"
                >
                  <p className="text-sm font-semibold text-gray-400">
                    {number}
                  </p>

                  <p className="mt-3 font-bold">
                    {label}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    {value}
                  </p>
                </div>
              ))}

            </div>

          </section>

          <section className="mt-16 rounded-3xl bg-gray-50 p-8 sm:p-10">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Revenue Milestones
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Build your way up.
            </h2>

            <div className="mt-8 space-y-4">

              {milestones.map((milestone, index) => {
                const achieved =
                  monthlyRevenue >= milestone.amount;

                return (
                  <div
                    key={milestone.label}
                    className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5"
                  >

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        achieved
                          ? "bg-black text-white"
                          : "bg-gray-100 text-black"
                      }`}
                    >
                      {achieved ? "✓" : index + 1}
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold">
                        {milestone.label}
                      </p>

                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-black transition-all duration-300"
                          style={{
                            width: `${Math.min(
                              Math.round(
                                (monthlyRevenue / milestone.amount) * 100
                              ),
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                  </div>
                );
              })}

            </div>

          </section>

          {incomeProgress === 100 && (
            <section className="mt-10 rounded-3xl bg-black p-8 text-center text-white sm:p-10">

              <p className="text-4xl">🚀</p>

              <h2 className="mt-4 text-2xl font-bold">
                Your growth system is active.
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-gray-300">
                You've completed your first growth cycle. Now use the
                system every week to acquire customers, generate revenue
                and improve the business.
              </p>
              
              <button
                onClick={() => {
                  setShowScalePlan(false);
                  setShowStage06(true);
                }}
                className="mt-6 rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-gray-200"
              >
                Continue to Scale & Systems →
              </button>

            </section>
          )}

        </section>
      </main>
    );
  }

  /*
   * Stage 06 — Scale & Systems
   */
  if (showStage06 && selectedOpportunity) {
    const scalePlan = getStage06Plan(selectedOpportunity);

    const scaleSections = [
      { title: "Build Your Systems", tasks: scalePlan.systems },
      { title: "Automate", tasks: scalePlan.automation },
      { title: "Delegate", tasks: scalePlan.delegation },
      { title: "Retain & Increase Customer Value", tasks: scalePlan.retention },
      { title: "Improve Profit", tasks: scalePlan.profit },
      { title: "Build Your Growth Engine", tasks: scalePlan.growth },
    ];

    const allScaleTasks = scaleSections.flatMap(
      (section) => section.tasks
    );

    const scaleProgress =
      allScaleTasks.length > 0
        ? Math.round(
            (completedScaleTasks.length / allScaleTasks.length) * 100
          )
        : 0;

    const getSectionProgress = (
      startIndex: number,
      endIndex: number
    ) => {
      const sectionTaskCount = endIndex - startIndex;
      const completedCount = completedScaleTasks.filter(
        (task) => task >= startIndex && task < endIndex
      ).length;

      return sectionTaskCount > 0
        ? Math.round((completedCount / sectionTaskCount) * 100)
        : 0;
    };

    const systemProgress = getSectionProgress(0, 4);
    const automationProgress = getSectionProgress(4, 8);
    const delegationProgress = getSectionProgress(8, 12);
    const retentionProgress = getSectionProgress(12, 16);

    const readinessScore = Math.round(
      (systemProgress +
        automationProgress +
        delegationProgress +
        retentionProgress) /
        4
    );

    const toggleScaleTask = (index: number) => {
      setCompletedScaleTasks((current) => {
        if (current.includes(index)) {
          return current.filter((task) => task !== index);
        }

        return [...current, index];
      });
    };

    return (
      <main className="min-h-screen bg-white text-black">
        <section className="mx-auto max-w-5xl px-6 py-12">

          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold tracking-[0.3em]">
              CSTN
            </p>

            <button
              onClick={() => {
                setShowStage06(false);
                setShowScalePlan(true);
              }}
              className="text-sm font-medium text-gray-500 transition hover:text-black"
            >
              ← Back to Income Growth
            </button>
          </div>

          <div className="mt-16 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
              Stage 06 — Scale & Systems
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Build a Business That Can Grow Without You Doing Everything.
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-500">
              {selectedOpportunity.name}
            </p>
          </div>

          <section className="mt-10 rounded-3xl bg-black p-8 text-white sm:p-10">
            <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Scale Readiness
                </p>

                <p className="mt-3 text-5xl font-bold tracking-tight">
                  {readinessScore}%
                </p>

                <p className="mt-2 max-w-xl text-gray-400">
                  Your goal is to replace repeated manual work with
                  systems, automation, delegation and recurring revenue.
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-sm text-gray-400">
                  Scale tasks
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {completedScaleTasks.length}/{allScaleTasks.length}
                </p>
              </div>
            </div>

            <div className="mt-8 h-2 overflow-hidden rounded-full bg-gray-800">
              <div
                className="h-full rounded-full bg-white transition-all duration-300"
                style={{ width: `${scaleProgress}%` }}
              />
            </div>
          </section>

          <section className="mt-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Your Scale Strategy
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              {scalePlan.title}
            </h2>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
              {scalePlan.description}
            </p>

            <div className="mt-8 rounded-3xl bg-gray-50 p-7 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                Your direction
              </p>

              <p className="mt-3 text-xl font-semibold">
                {scalePlan.target}
              </p>
            </div>
          </section>

          <section className="mt-16">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                Scale Dashboard
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Build the infrastructure behind your growth.
              </h2>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {[
                ["Systems", sopsCreated, systemProgress],
                ["Automation", automationsImplemented, automationProgress],
                ["Delegation", delegatedTasks, delegationProgress],
                ["Recurring Customers", recurringCustomers, retentionProgress],
              ].map(([label, value, progress]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-gray-200 p-6"
                >
                  <p className="text-sm text-gray-400">
                    {label}
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    {value}/4
                  </p>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-black transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    {progress}% complete
                  </p>
                </div>
              ))}

            </div>
          </section>

          <section className="mt-16">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                24-Day Scale Challenge
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Build systems that create capacity.
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Complete the actions below. Each completed task moves
                you closer to an operation that can handle more
                customers without the same increase in workload.
              </p>
            </div>

            <div className="mt-8 space-y-6">

              {scaleSections.map((section, sectionIndex) => {
                const previousTaskCount = scaleSections
                  .slice(0, sectionIndex)
                  .reduce(
                    (total, previousSection) =>
                      total + previousSection.tasks.length,
                    0
                  );

                return (
                  <div
                    key={section.title}
                    className="rounded-3xl border border-gray-200 p-7 sm:p-8"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                      {section.title}
                    </p>

                    <div className="mt-5 space-y-3">

                      {section.tasks.map((task, taskIndex) => {
                        const globalIndex =
                          previousTaskCount + taskIndex;

                        const completed =
                          completedScaleTasks.includes(globalIndex);

                        return (
                          <button
                            key={task}
                            onClick={() =>
                              toggleScaleTask(globalIndex)
                            }
                            className={`w-full rounded-2xl p-5 text-left transition ${
                              completed
                                ? "bg-black text-white"
                                : "bg-gray-50 text-black hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex items-center gap-4">

                              <div
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                                  completed
                                    ? "bg-white text-black"
                                    : "bg-black text-white"
                                }`}
                              >
                                {completed
                                  ? "✓"
                                  : globalIndex + 1}
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
                );
              })}

            </div>

            <div className="mt-6 rounded-2xl bg-gray-50 p-5">
              <div className="flex items-center justify-between">
                <p className="font-semibold">
                  Scale system progress
                </p>

                <p className="font-bold">
                  {scaleProgress}%
                </p>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-black transition-all duration-300"
                  style={{ width: `${scaleProgress}%` }}
                />
              </div>
            </div>

          </section>

          <section className="mt-16 rounded-3xl bg-gray-50 p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              90-Day Scale Direction
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              From doing the work to building the machine.
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">

              <div className="rounded-3xl bg-white p-6">
                <p className="text-sm font-semibold text-gray-400">
                  Days 1–30
                </p>

                <h3 className="mt-3 text-xl font-bold">
                  Document
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Turn the way you currently work into repeatable
                  processes, templates and checklists.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6">
                <p className="text-sm font-semibold text-gray-400">
                  Days 31–60
                </p>

                <h3 className="mt-3 text-xl font-bold">
                  Automate & Delegate
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Remove repetitive work from your personal workload
                  and create capacity for higher-value activities.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6">
                <p className="text-sm font-semibold text-gray-400">
                  Days 61–90
                </p>

                <h3 className="mt-3 text-xl font-bold">
                  Scale
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Strengthen retention, increase customer value and
                  reinvest into the channels producing the strongest
                  returns.
                </p>
              </div>

            </div>
          </section>

          {scaleProgress === 100 && (
            <section className="mt-10 rounded-3xl bg-black p-8 text-center text-white sm:p-10">

              <p className="text-4xl">🏗️</p>

              <h2 className="mt-4 text-2xl font-bold">
                Your scaling foundation is complete.
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-gray-300">
                You've completed the core systems work. Now focus on
                operating the business, measuring what works and
                reinvesting into profitable growth.
              </p>

            </section>
          )}

        </section>
      </main>
    );
  }

  /*
   * Selected opportunity
   */
  if (selectedOpportunity) {
    const match =
      results.find(
        (result) =>
          result.opportunity.name === selectedOpportunity.name
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

            <p className="text-sm font-semibold tracking-[0.3em]">
              CSTN
            </p>
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
                <p className="text-sm text-gray-400">
                  CSTN match
                </p>
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
       label="Time to revenue"
       value={selectedOpportunity.timeToFirstRevenue ?? "Not specified"}
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
              Why CSTN matched you
            </p>

            <div className="mt-5 rounded-3xl bg-gray-50 p-7 sm:p-9">
              <p className="text-lg leading-8 text-gray-700">
                {selectedOpportunity.whyItFits}
              </p>
            </div>
          </section>

          <section className="mt-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Your CSTN Blueprint
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Your path from idea to income.
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-gray-600">
              CSTN has turned this opportunity into a practical roadmap.
              Follow the steps, validate the idea and build momentum before
              investing heavily.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">

              <div className="rounded-3xl bg-gray-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                  STEP 01
                </p>

                <h3 className="mt-3 text-xl font-bold">
                  Validate
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Research the market, understand your customer and confirm
                  there is real demand before spending heavily.
                </p>
              </div>

              <div className="rounded-3xl bg-gray-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                  STEP 02
                </p>

                <h3 className="mt-3 text-xl font-bold">
                  Launch
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Create a simple offer, get it in front of real people and
                  focus on getting your first customer.
                </p>
              </div>

              <div className="rounded-3xl bg-gray-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                  STEP 03
                </p>

                <h3 className="mt-3 text-xl font-bold">
                  Build
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Improve what works, create repeatable systems and turn the
                  opportunity into a sustainable business.
                </p>
              </div>

            </div>

            <div className="mt-6 rounded-3xl border border-gray-200 p-7">

              <p className="text-sm font-semibold">
                Your next move
              </p>

              <p className="mt-2 leading-7 text-gray-600">
                Start with the 7-Day Launch Plan. The goal is not to build
                everything immediately — it is to prove that people want what
                you are offering.
              </p>

              <button
                onClick={() => setShowPlan(true)}
                className="mt-6 rounded-full bg-black px-7 py-3 font-semibold text-white transition hover:bg-gray-800"
              >
                Start Your 7-Day Plan →
              </button>

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
              {selectedOpportunity.firstSteps.map(
                (item, index) => (
                  <div
                    key={item}
                    className="flex gap-5 rounded-2xl border border-gray-200 p-5"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                      {index + 1}
                    </div>

                    <p className="pt-1 leading-6 text-gray-700">
                      {item}
                    </p>
                  </div>
                )
              )}
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
              CSTN will guide you through validation, finding your first
              customer and building your first version.
            </p>

            <button
              onClick={() => setShowPlan(true)}
              className="mt-8 rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-gray-200"
            >
              Start This Opportunity →
            </button>
          </section>
        </section>
      </main>
    );
  }

  /*
   * Results
   */
  if (showResults) {
    const bestMatch = results.length > 0 ? results[0] : null;

    return (
      <main className="min-h-screen bg-white text-black">
        <section className="mx-auto max-w-4xl px-6 py-12">

          {/* Header */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold tracking-[0.3em]">
              CSTN
            </p>

            <div className="text-sm text-gray-400">
              <span>Your results</span>

              <div className="mt-6 flex flex-wrap gap-3">
                {bestMatch && (
                  <button
                    onClick={() => selectOpportunity(bestMatch.opportunity)}
                    className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                  >
                    Open Dashboard →
                  </button>
                )}

                <button
                  onClick={resetAssessment}
                  className="rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-black transition hover:border-black"
                >
                  Retake Assessment
                </button>
              </div>
            </div>
          </div>

          {/* Retake */}
          <button
            onClick={resetAssessment}
            className="mt-6 w-full rounded-full border border-black px-8 py-4 font-semibold text-black transition hover:bg-black hover:text-white"
          >
            Retake Assessment
          </button>

          {/* Intro */}
          <div className="mt-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Your opportunities
            </p>

            <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
              Built around you.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-500">
              CSTN analysed your answers and found opportunities that
              fit your skills, interests, resources and ambitions.
            </p>
          </div>

          {/* Best Match */}
          {bestMatch && (
            <div className="mt-10 rounded-3xl bg-black p-7 text-white sm:p-9">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                    Your strongest match
                  </p>

                  <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                    {bestMatch.opportunity.name}
                  </h2>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-4xl font-bold">
                    {bestMatch.score}%
                  </p>

                  <p className="text-sm text-gray-400">
                    CSTN match
                  </p>
                </div>
              </div>

              <p className="mt-5 max-w-2xl leading-7 text-gray-300">
                {bestMatch.opportunity.description}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs text-gray-400">
                    Startup
                  </p>
                  <p className="mt-2 font-semibold">
                    €{bestMatch.opportunity.budgetMin}–€{bestMatch.opportunity.budgetMax}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs text-gray-400">
                    Difficulty
                  </p>
                  <p className="mt-2 font-semibold">
                    {bestMatch.opportunity.difficulty}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs text-gray-400">
                    Time
                  </p>
                  <p className="mt-2 font-semibold">
                    {bestMatch.opportunity.timeMin}+ hrs
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs text-gray-400">
                    Potential
                  </p>
                  <p className="mt-2 font-semibold">
                    €{bestMatch.opportunity.incomeMin}–€{bestMatch.opportunity.incomeMax}
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  selectOpportunity(bestMatch.opportunity)
                }
                className="mt-7 rounded-full bg-white px-7 py-3 font-semibold text-black transition hover:bg-gray-200"
              >
                Explore Best Match →
              </button>
            </div>
          )}

          {/* All Matches */}
          <div className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Your matches
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                  Opportunities worth exploring.
                </h2>
              </div>

              <p className="hidden text-sm text-gray-400 sm:block">
                {results.length} personalised matches
              </p>
            </div>

            <div className="mt-6 space-y-5">
              {results.slice(0, isPro ? results.length : 3).map((result, index) => {
                const opportunity = result.opportunity;

                return (
                  <button
                    key={`${opportunity.name}-${index}`}
                    onClick={() => selectOpportunity(opportunity)}
                    className={`group w-full rounded-3xl border p-6 text-left transition hover:-translate-y-0.5 hover:border-black hover:shadow-lg sm:p-8 ${
                      index === 0
                        ? "border-black bg-gray-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-sm font-bold text-gray-400">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          {index === 0 && (
                            <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                              BEST MATCH
                            </span>
                          )}

                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                            {opportunity.category}
                          </span>
                        </div>

                        <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                          {opportunity.name}
                        </h2>

                        <p className="mt-4 max-w-2xl leading-7 text-gray-600">
                          {opportunity.description}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-3xl font-bold sm:text-4xl">
                          {result.score}%
                        </p>
                        <p className="text-sm text-gray-400">
                          match
                        </p>
                      </div>
                    </div>

                    <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <InfoCard
                        label="Startup"
                        value={`€${opportunity.budgetMin}–€${opportunity.budgetMax}`}
                      />

                      <InfoCard
                        label="Potential"
                        value={`€${opportunity.incomeMin}–€${opportunity.incomeMax}`}
                      />

                      <InfoCard
                        label="Time to revenue"
                        value={opportunity.timeToFirstRevenue || "Varies"}
                      />

                      <InfoCard
                        label="Difficulty"
                        value={opportunity.difficulty}
                      />
                    </div>

                    {opportunity.whyItFits && (
                      <div className="mt-6 rounded-2xl bg-gray-50 p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                          Why CSTN thinks it fits
                        </p>

                        <p className="mt-2 leading-7 text-gray-700">
                          {opportunity.whyItFits}
                        </p>
                      </div>
                    )}

                    {opportunity.targetCustomer && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                          Target customer
                        </p>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                          {opportunity.targetCustomer}
                        </p>
                      </div>
                    )}

                    <div className="mt-7 flex items-center justify-between border-t border-gray-100 pt-6">
                      <div className="flex flex-wrap gap-2">
                        {opportunity.scalability && (
                          <span className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600">
                            {opportunity.scalability} scalability
                          </span>
                        )}

                        {Array.isArray(opportunity.skills) &&
                          opportunity.skills.slice(0, 2).map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600"
                            >
                              {skill}
                            </span>
                          ))}
                      </div>

                      <span className="shrink-0 text-sm font-semibold transition group-hover:translate-x-1">
                        Explore →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {!isPro && (
              <div className="mt-8 overflow-hidden rounded-3xl border border-black bg-black text-white">
                <div className="p-8 sm:p-10">
                  <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-2xl">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                        CSTN Pro
                      </p>

                      <h3 className="mt-3 text-3xl font-bold sm:text-4xl">
                        Stop searching. Start building.
                      </h3>

                      <p className="mt-4 leading-7 text-gray-300">
                        Unlock your full opportunity list and get the complete
                        CSTN execution journey built around the opportunity you choose.
                      </p>

                      <div className="mt-6 grid gap-3 text-sm text-gray-200 sm:grid-cols-2">
                        <div>✓ Unlimited opportunities</div>
                        <div>✓ Full 7-day action plans</div>
                        <div>✓ Full 30-day build plans</div>
                        <div>✓ Progress & journey tracking</div>
                        <div>✓ AI guidance</div>
                        <div>✓ Full opportunity matching</div>
                      </div>
                    </div>

                    <div className="w-full max-w-sm shrink-0 rounded-2xl bg-white p-6 text-black">
                      <p className="text-sm font-semibold text-gray-500">
                        Choose your plan
                      </p>

                      <div className="mt-5 space-y-3">
                        <button
                          onClick={() => startCheckout("monthly")}
                          className="w-full rounded-xl bg-black px-5 py-4 text-left text-white transition hover:bg-gray-800"
                        >
                          <span className="block font-semibold">
                            Monthly
                          </span>
                          <span className="mt-1 block text-sm text-gray-400">
                            €9.99 / month
                          </span>
                        </button>

                        <button
                          onClick={() => startCheckout("annual")}
                          className="w-full rounded-xl border border-gray-200 px-5 py-4 text-left transition hover:border-black"
                        >
                          <span className="flex items-center justify-between gap-3 font-semibold">
                            <span>Annual</span>
                            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs">
                              Best value
                            </span>
                          </span>
                          <span className="mt-1 block text-sm text-gray-500">
                            €79.99 / year
                          </span>
                        </button>
                      </div>

                      <p className="mt-4 text-center text-xs text-gray-400">
                        Secure checkout powered by Stripe
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* What's Next */}
          <div className="mt-12 rounded-3xl bg-black p-8 text-white sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              What's next?
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Choose an opportunity and start building.
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-gray-300">
              Your result is only the starting point. Choose the
              opportunity that feels right and CSTN will guide you
              through your first 7 days and then your 30-day build plan.
            </p>
          </div>

        </section>
      </main>
    );
  }

  /*
   * Assessment
   */
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

            <p className="text-sm font-semibold tracking-[0.3em]">
              CSTN
            </p>

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
              otherValue={otherGoal}
              setOtherValue={setOtherGoal}
              otherPlaceholder="Tell CSTN what you're looking to achieve..."
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
              selected={
                selectedBudget ? [selectedBudget] : []
              }
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
                toggleSelection(
                  value,
                  selectedSkills,
                  setSelectedSkills
                )
              }
              otherValue={otherSkill}
              setOtherValue={setOtherSkill}
              otherPlaceholder="Tell CSTN about another skill you have..."
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
              otherValue={otherInterest}
              setOtherValue={setOtherInterest}
              otherPlaceholder="Tell CSTN about another interest..."
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
              selected={
                selectedTime ? [selectedTime] : []
              }
              onSelect={setSelectedTime}
            />
          </>
        )}

        {step === 6 && (
          <>
            <QuestionHeader
              title="Where are you based?"
              description="This helps CSTN identify opportunities that may work in your market."
            />

            <OptionList
              options={locations}
              selected={
                selectedLocation ? [selectedLocation] : []
              }
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
              selected={
                selectedAmbition ? [selectedAmbition] : []
              }
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
            {step === 7
              ? "Find My Opportunities →"
              : "Continue →"}
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
  otherValue,
  setOtherValue,
  otherPlaceholder,
}: {
  options: string[];
  selected: string[];
  onSelect: (value: string) => void;
  otherValue?: string;
  setOtherValue?: (value: string) => void;
  otherPlaceholder?: string;
}) {
  const showOtherInput =
    selected.includes("Other") &&
    setOtherValue !== undefined;

  return (
    <div className="mt-10 space-y-3">
      {options.map((option) => {
        const isSelected = selected.includes(option);

        return (
          <button
            key={option}
            type="button"
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

      {showOtherInput && (
        <div className="pt-2">
          <textarea
            value={otherValue ?? ""}
            onChange={(event) =>
              setOtherValue?.(event.target.value)
            }
            placeholder={
              otherPlaceholder ||
              "Tell CSTN more..."
            }
            rows={3}
            className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 p-5 text-base outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white"
          />
        </div>
      )}
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
