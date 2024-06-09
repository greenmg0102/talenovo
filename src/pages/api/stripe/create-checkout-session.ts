import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    let { db } = await connectToDatabase();

    try {

        const { email, priceId, clerkId, packageName, redirectLink } = req.body;

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
            success_url: redirectLink === undefined ? "http://104.128.55.140:3000/my-jobs" : redirectLink, // Redirect URL after successful payment
            cancel_url: "http://104.128.55.140:3000/premium", // Redirect URL after cancelled payment
        });

        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');


        await db
            .collection('myjobposts')
            .findOneAndUpdate(
                { recruiterId: clerkId, postStatus: 0 },
                { $set: { postStatus: 1 } },
            );

        return res.status(200).json({ url: session.url });

    } catch (error) {
        console.error("Error creating Checkout Session:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
