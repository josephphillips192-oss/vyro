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
      .from("income_growth_progress")
      .select("*")
      .eq("user_id", user.id)
      .eq("opportunity_name", opportunityName)
      .maybeSingle();

    if (error) {
      console.error("CSTN income growth database load error:", error);

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
    console.error("CSTN income growth GET error:", error);

    return NextResponse.json(
      { error: "Unable to load income growth progress." },
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
      monthly_revenue: Number(body?.monthlyRevenue) || 0,
      monthly_expenses: Number(body?.monthlyExpenses) || 0,
      active_customers: Number(body?.activeCustomers) || 0,
      leads_generated: Number(body?.leadsGenerated) || 0,
      appointments_booked: Number(body?.appointmentsBooked) || 0,
      completed_income_tasks: Array.isArray(body?.completedIncomeTasks)
        ? body.completedIncomeTasks
        : [],
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("income_growth_progress")
      .upsert(progress, {
        onConflict: "user_id,opportunity_name",
      })
      .select()
      .single();

    if (error) {
      console.error("CSTN income growth database save error:", error);

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
    console.error("CSTN income growth POST error:", error);

    return NextResponse.json(
      { error: "Unable to save income growth progress." },
      { status: 500 }
    );
  }
}
