import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {

        const { subscriptionId } = req.body;

        // Create the Checkout Session
        await stripe.subscriptions.cancel(subscriptionId)

        return res.status(200).json({ message: 'Membership deleted' });
    } catch (error) {
        console.error("Error creating Checkout Session:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
