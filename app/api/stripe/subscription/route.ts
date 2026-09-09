import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { isPro: false, subscription: null },
        { status: 401 }
      );
    }

    const { data: subscription, error } = await supabase
      .from("cstn_subscriptions")
      .select(
        "status, plan, billing_interval, current_period_end, stripe_customer_id"
      )
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Subscription lookup error:", error);
      return NextResponse.json(
        { error: "Unable to check subscription" },
        { status: 500 }
      );
    }

    const isPro =
      subscription?.plan === "cstn_pro" &&
      (subscription.status === "active" ||
        subscription.status === "trialing");

    return NextResponse.json({
      isPro,
      subscription: subscription
        ? {
            status: subscription.status,
            plan: subscription.plan,
            billing_interval: subscription.billing_interval,
            current_period_end: subscription.current_period_end,
          }
        : null,
    });
  } catch (error) {
    console.error("Subscription API error:", error);
    return NextResponse.json(
      { error: "Unable to check subscription" },
      { status: 500 }
    );
  }
}
