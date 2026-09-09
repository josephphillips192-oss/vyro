import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing stripe-signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const userId = session.metadata?.user_id;

        const subscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id;

        if (userId && subscriptionId) {
          const subscription =
            await stripe.subscriptions.retrieve(subscriptionId);

          const periodEnd = subscription.items.data[0]?.current_period_end
            ? new Date(
                subscription.items.data[0].current_period_end * 1000
              ).toISOString()
            : null;

          const { error } = await supabaseAdmin
            .from("cstn_subscriptions")
            .upsert(
              {
                user_id: userId,
                stripe_customer_id:
                  typeof session.customer === "string"
                    ? session.customer
                    : session.customer?.id ?? null,
                stripe_subscription_id: subscription.id,
                status: subscription.status,
                plan: "cstn_pro",
                billing_interval:
                  session.metadata?.billing_interval ?? null,
                current_period_end: periodEnd,
                updated_at: new Date().toISOString(),
              },
              { onConflict: "user_id" }
            );

          if (error) {
            throw error;
          }
        }

        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        const userId = subscription.metadata?.user_id;

        const periodEnd = subscription.items.data[0]?.current_period_end
          ? new Date(
              subscription.items.data[0].current_period_end * 1000
            ).toISOString()
          : null;

        if (userId) {
          const { error } = await supabaseAdmin
            .from("cstn_subscriptions")
            .upsert(
              {
                user_id: userId,
                stripe_customer_id:
                  typeof subscription.customer === "string"
                    ? subscription.customer
                    : subscription.customer.id,
                stripe_subscription_id: subscription.id,
                status:
                  event.type === "customer.subscription.deleted"
                    ? "canceled"
                    : subscription.status,
                plan: "cstn_pro",
                billing_interval:
                  subscription.items.data[0]?.price.recurring?.interval ?? null,
                current_period_end: periodEnd,
                updated_at: new Date().toISOString(),
              },
              { onConflict: "user_id" }
            );

          if (error) {
            throw error;
          }
        }

        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook handler error:", error);
    return new NextResponse("Webhook handler failed", { status: 500 });
  }
}
