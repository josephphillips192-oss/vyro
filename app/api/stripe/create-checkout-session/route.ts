import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const interval = body.interval === "annual" ? "annual" : "monthly";

    const priceId =
      interval === "annual"
        ? "price_1UDhiw0bwyq3aAwJ9NGKhfOE"
        : "price_1UDhiB0bwyq3aAwJSNlOcXgA";

    const origin = new URL(request.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: user.email,
      success_url: `${origin}/app?checkout=success`,
      cancel_url: `${origin}/app?checkout=cancelled`,
      metadata: {
        user_id: user.id,
        plan: "cstn_pro",
        billing_interval: interval,
      },
      subscription_data: {
        metadata: {
          user_id: user.id,
          plan: "cstn_pro",
          billing_interval: interval,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout error:", error);
    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 500 }
    );
  }
}
