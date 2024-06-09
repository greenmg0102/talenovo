import { connectToDatabase } from "@/lib/mongodb";
import { UserModel } from "@/models/UserModel";
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
        
        const { email } = req.body;
        // Connect to the MongoDB database
        const { db } = await connectToDatabase();

        // Instantiate the UserModel with the database instance
        const userModel = new UserModel(db);

        const user = await userModel.getUserByEmail(email);
        // const user = await userModel.getUserByEmail("shakilkhanofficial6@gmail.com");
        return res.status(200).json({ user });
        
    } catch (error) {
        console.error("Error creating Checkout Session:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
