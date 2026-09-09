import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const opportunitySchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    opportunities: {
      type: "array",
      minItems: 8,
      maxItems: 8,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          name: { type: "string" },
          category: { type: "string" },
          description: { type: "string" },
          whyItFits: { type: "string" },
          targetCustomer: { type: "string" },
          budgetMin: { type: "number" },
          budgetMax: { type: "number" },
          incomeMin: { type: "number" },
          incomeMax: { type: "number" },
          difficulty: {
            type: "string",
            enum: ["Beginner", "Intermediate", "Advanced"],
          },
          timeToFirstRevenue: { type: "string" },
          skills: {
            type: "array",
            items: { type: "string" },
          },
          firstSteps: {
            type: "array",
            minItems: 7,
            maxItems: 7,
            items: { type: "string" },
          },
          scalability: {
            type: "string",
            enum: ["Low", "Medium", "High"],
          },
          score: {
            type: "integer",
            minimum: 0,
            maximum: 100,
          },
        },
        required: [
          "name",
          "category",
          "description",
          "whyItFits",
          "targetCustomer",
          "budgetMin",
          "budgetMax",
          "incomeMin",
          "incomeMax",
          "difficulty",
          "timeToFirstRevenue",
          "skills",
          "firstSteps",
          "scalability",
          "score",
        ],
      },
    },
  },
  required: ["opportunities"],
} as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      budget,
      skills,
      interests,
      timeAvailable,
      incomeGoal,
      location,
      experience,
      preferences,
      goal,
    } = body;

    if (!skills || !interests) {
      return NextResponse.json(
        { error: "Skills and interests are required." },
        { status: 400 }
      );
    }

    const prompt = `
You are the AI Opportunity Engine for CSTN (Cornerstone Network).

Analyse the user's profile and recommend exactly 8 realistic opportunities.

Every opportunity must be strongly personalised to the user.

USER PROFILE

Goal:
${goal || "Not specified"}

Budget:
${budget || "Not specified"}

Skills:
${Array.isArray(skills) ? skills.join(", ") : skills || "Not specified"}

Interests:
${Array.isArray(interests) ? interests.join(", ") : interests || "Not specified"}

Time available:
${timeAvailable || "Not specified"}

Income ambition:
${incomeGoal || "Not specified"}

Location:
${location || "Not specified"}

Experience:
${experience || "Not specified"}

Preferences:
${preferences || "Not specified"}


PERSONALISATION RULES

1. Connect each opportunity to multiple parts of the user's profile.
2. Prioritise existing skills and interests.
3. Respect the user's actual budget.
4. Respect available time.
5. Consider the user's income ambition and scalability.
6. Consider the user's location.
7. Opportunities may include service, digital, AI-enabled, product, local and online businesses.
8. Do not force categories that do not genuinely fit.
9. Make all 8 opportunities meaningfully different.
10. Avoid duplicate businesses with different wording.
11. At least 3 should be relatively low-cost to start.
12. At least 2 should have strong long-term scalability.
13. At least 2 should potentially generate revenue relatively quickly if demand exists.
14. Never guarantee income.
15. Income figures are potential estimates, not guarantees.
16. Do not recommend illegal, dangerous, deceptive or unethical activities.
17. Explain specifically why each opportunity fits.
18. Give exactly 7 practical first steps.
19. Think like a business strategist rather than a generic side-hustle generator.
20. Rank opportunities from strongest match to weakest match.
21. Score each opportunity from 0 to 100 based on profile fit.
22. Scores should meaningfully differ.
23. A genuinely strong match can score between 85 and 98.
24. If the profile is unclear, use lower confidence rather than inventing information.

Return exactly 8 opportunities.
`;

    const response = await openai.responses.create({
      model: "gpt-5-mini",
      input: prompt,
      text: {
        format: {
          type: "json_schema",
          name: "cstn_opportunities",
          strict: true,
          schema: opportunitySchema,
        },
      },
    });

    const output = response.output_text;

    if (!output) {
      return NextResponse.json(
        { error: "AI returned an empty response." },
        { status: 500 }
      );
    }

    let parsed: {
      opportunities: Array<{
        name: string;
        category: string;
        description: string;
        whyItFits: string;
        targetCustomer: string;
        budgetMin: number;
        budgetMax: number;
        incomeMin: number;
        incomeMax: number;
        difficulty: string;
        timeToFirstRevenue: string;
        skills: string[];
        firstSteps: string[];
        scalability: string;
        score: number;
      }>;
    };

    try {
      parsed = JSON.parse(output);
    } catch (error) {
      console.error("Invalid JSON from OpenAI:", output);

      return NextResponse.json(
        {
          error: "AI returned an invalid response.",
          details: String(error),
        },
        { status: 500 }
      );
    }

    if (
      !parsed.opportunities ||
      !Array.isArray(parsed.opportunities) ||
      parsed.opportunities.length !== 8
    ) {
      return NextResponse.json(
        { error: "AI returned an invalid number of opportunities." },
        { status: 500 }
      );
    }

    for (const opportunity of parsed.opportunities) {
      opportunity.firstSteps = opportunity.firstSteps.slice(0, 7);

      if (opportunity.firstSteps.length !== 7) {
        return NextResponse.json(
          { error: "AI returned an opportunity with invalid first steps." },
          { status: 500 }
        );
      }
    }

    parsed.opportunities.sort(
      (a, b) => (b.score ?? 0) - (a.score ?? 0)
    );

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("CSTN AI error:", error);

    return NextResponse.json(
      {
        error: "Unable to generate opportunities.",
      },
      { status: 500 }
    );
  }
}
