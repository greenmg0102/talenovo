import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {

        const { email, priceId, clerkId, packageName } = req.body;

        // Create the Checkout Session
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId, // The price ID of the subscription plan
                    quantity: 1,
                },
            ],
            subscription_data: {
                metadata: {
                    clerkId,
                    packageName,
                    email,
                },
            },
            customer_email: email,
            success_url: "http://195.35.32.163:3000/user-profile", // Redirect URL after successful payment
            cancel_url: "http://195.35.32.163:3000/price", // Redirect URL after cancelled payment
        });

        return res.status(200).json({ url: session.url });

    } catch (error) {
        console.error("Error creating Checkout Session:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
