import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET(request: Request) {
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

    const { searchParams } = new URL(request.url);
    const opportunityName = searchParams.get("opportunity");

    if (!opportunityName) {
      return NextResponse.json(
        { error: "Opportunity is required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("scale_systems_progress")
      .select("*")
      .eq("user_id", user.id)
      .eq("opportunity_name", opportunityName)
      .maybeSingle();

    if (error) {
      console.error("CSTN scale systems database load error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      progress: data,
    });
  } catch (error) {
    console.error("CSTN scale systems GET error:", error);

    return NextResponse.json(
      { error: "Unable to load scale systems progress." },
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
    const opportunityName = body?.opportunityName;

    if (!opportunityName) {
      return NextResponse.json(
        { error: "Opportunity is required." },
        { status: 400 }
      );
    }

    const progress = {
      user_id: user.id,
      opportunity_name: opportunityName,
      completed_scale_tasks: Array.isArray(body?.completedScaleTasks)
        ? body.completedScaleTasks
        : [],
      sops_created: Number(body?.sopsCreated) || 0,
      automations_implemented:
        Number(body?.automationsImplemented) || 0,
      delegated_tasks: Number(body?.delegatedTasks) || 0,
      recurring_customers: Number(body?.recurringCustomers) || 0,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("scale_systems_progress")
      .upsert(progress, {
        onConflict: "user_id,opportunity_name",
      })
      .select()
      .single();

    if (error) {
      console.error("CSTN scale systems database save error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      progress: data,
    });
  } catch (error) {
    console.error("CSTN scale systems POST error:", error);

    return NextResponse.json(
      { error: "Unable to save scale systems progress." },
      { status: 500 }
    );
  }
}
