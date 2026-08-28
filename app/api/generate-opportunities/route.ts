import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    } = body;

    if (!skills || !interests) {
      return NextResponse.json(
        { error: "Skills and interests are required." },
        { status: 400 }
      );
    }

    const prompt = `
You are the AI Opportunity Engine for VYRO Network.

Generate 8 realistic, personalised business or income opportunities for this user.

USER PROFILE

Budget: ${budget || "Not specified"}
Skills: ${skills || "Not specified"}
Interests: ${interests || "Not specified"}
Time available: ${timeAvailable || "Not specified"}
Income goal: ${incomeGoal || "Not specified"}
Location: ${location || "Not specified"}
Experience: ${experience || "Not specified"}
Preferences: ${preferences || "Not specified"}

RULES

1. Every opportunity must meaningfully match the user's profile.
2. Do not simply return generic side hustles.
3. Consider online and local opportunities.
4. Consider service businesses, digital businesses, product businesses, AI businesses and technology businesses.
5. Keep starting costs realistic.
6. Do not make guaranteed income claims.
7. Avoid illegal, dangerous or deceptive activities.
8. Include different difficulty levels.
9. Explain why each opportunity fits the user.
10. Give practical first steps.
11. Return exactly 8 opportunities.

Return ONLY valid JSON.

Use this exact structure:

{
  "opportunities": [
    {
      "name": "string",
      "category": "string",
      "description": "string",
      "whyItFits": "string",
      "targetCustomer": "string",
      "budgetMin": 0,
      "budgetMax": 0,
      "incomeMin": 0,
      "incomeMax": 0,
      "difficulty": "Beginner",
      "timeToFirstRevenue": "string",
      "skills": ["string"],
      "firstSteps": ["string"],
      "scalability": "Low",
      "score": 0
    }
  ]
}
`;

    const response = await openai.responses.create({
      model: "gpt-5-mini",
      input: prompt,
    });

    const output = response.output_text;

    let parsed;

    try {
      parsed = JSON.parse(output);
    } catch (parseError) {
      console.error("Invalid JSON from OpenAI:", output);

      return NextResponse.json(
        {
          error: "AI returned an invalid response.",
          details: String(parseError),
        },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("VYRO AI error:", error);

    return NextResponse.json(
      {
        error: "Unable to generate opportunities.",
      },
      { status: 500 }
    );
  }
}