import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message },
        { status: 500 }
      );
    }

    const { data: opportunity, error: opportunityError } = await supabase
      .from("user_opportunities")
      .select("*")
      .eq("user_id", user.id)
      .order("selected_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (opportunityError) {
      return NextResponse.json(
        { error: opportunityError.message },
        { status: 500 }
      );
    }

    const { data: journeyProgress, error: journeyProgressError } = await supabase
      .from("journey_progress")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (journeyProgressError) {
      return NextResponse.json(
        { error: journeyProgressError.message },
        { status: 500 }
      );
    }

    let progress = journeyProgress;

    if (!progress) {
      const { data: newProgress, error: createProgressError } = await supabase
        .from("journey_progress")
        .insert({
          user_id: user.id,
          current_stage: 1,
          completed_stages: [],
        })
        .select("*")
        .single();

      if (createProgressError) {
        console.error(
          "CSTN journey progress initialization error:",
          createProgressError
        );

        return NextResponse.json(
          { error: createProgressError.message },
          { status: 500 }
        );
      }

      progress = newProgress;
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
      },
      profile,
      opportunity,
      journeyProgress: progress,
    });
  } catch (error) {
    console.error("CSTN profile API error:", error);

    return NextResponse.json(
      { error: "Unable to load profile." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const opportunity = body?.opportunity;

    if (!opportunity) {
      return NextResponse.json(
        { error: "Opportunity is required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("user_opportunities")
      .insert({
        user_id: user.id,
        opportunity_name: opportunity.name,
        opportunity_data: opportunity,
        selected_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("CSTN opportunity database save error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      opportunity: data,
    });
  } catch (error) {
    console.error("CSTN opportunity POST error:", error);

    return NextResponse.json(
      { error: "Unable to save opportunity." },
      { status: 500 }
    );
  }
}
