import { buffer } from "micro";
import Stripe from "stripe";
const stripe: any = new Stripe(process.env.STRIPE_SECRET_KEY);
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import { UserModel } from "@/models/UserModel";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    try {
        const requestBuffer = await buffer(request);
        const sig = request.headers["stripe-signature"]!;

        const event = stripe.webhooks.constructEvent(
            requestBuffer.toString(),
            sig,
            webhookSecret,
        );

        // Connect to the MongoDB database
        const { db } = await connectToDatabase();

        // Instantiate the UserModel with the database instance
        const userModel = new UserModel(db);

        switch (event.type) {
            case "customer.subscription.created": {
                const subscription = event.data.object;

                const subscriptionData = {
                    subscriptionId: subscription.id,
                    customerId: subscription.customer,
                    planName: subscription.metadata.packageName,
                    email: subscription.metadata.email,
                    status: 'active',
                };

                const dbUser: any = await userModel.getUserByEmail(subscriptionData.email);

                if (dbUser) {
                    const updates = {
                        status: subscriptionData.status,
                        planName: subscriptionData.planName,
                        stripeCustomerId: subscriptionData.customerId,
                        subscriptionId: subscriptionData.subscriptionId,
                    };

                    await userModel.updateUser(dbUser._id, updates);
                    console.log('User updated successfully:', dbUser._id);
                } else {
                    console.log('User not found in the database');
                }

                console.log(subscriptionData);


                break;
            }

            case "checkout.session.completed": {
                const session = event.data.object;



                console.log({ session });

                break;
            }

            case "customer.subscription.updated": {
                const subscription = event.data.object;



                if (subscription.cancel_at_period_end) {
                    console.log('Subscription cancelled')
                    //trigger when subscription is canceled
                    //set status inactivated
                    const subscriptionDataUpdatedInActive = {
                        subscriptionId: subscription.id,
                        customerId: subscription.customer,
                        planName: subscription.metadata.packageName,
                        email: subscription.metadata.email,
                        status: 'inactive',
                    };

                    const dbUser = await userModel.getUserByEmail(subscriptionDataUpdatedInActive.email);

                    if (dbUser) {
                        const updates = {
                            status: subscriptionDataUpdatedInActive.status,
                            planName: subscriptionDataUpdatedInActive.planName,
                            stripeCustomerId: subscriptionDataUpdatedInActive.customerId
                        };

                        await userModel.updateUser(dbUser._id, updates);
                        console.log('User updated successfully:', dbUser._id);
                    } else {
                        console.log('User not found in the database');
                    }

                } else {
                    console.log('Subscription resumed')
                    //trigger when subscription re-activated
                    //set status activated
                    const subscriptionDataActive = {
                        subscriptionId: subscription.id,
                        customerId: subscription.customer,
                        planName: subscription.metadata.packageName,
                        email: subscription.metadata.email,
                        status: 'active',
                    };

                    const dbUser = await userModel.getUserByEmail(subscriptionDataActive.email);

                    if (dbUser) {
                        const updates = {
                            status: subscriptionDataActive.status,
                            planName: subscriptionDataActive.planName,
                            stripeCustomerId: subscriptionDataActive.customerId
                        };

                        await userModel.updateUser(dbUser._id, updates);
                        console.log('User updated successfully:', dbUser._id);
                    } else {
                        console.log('User not found in the database');
                    }
                }
                break;
            }

            case "customer.subscription.deleted": {
                const subscription = event.data.object;


                console.log('Subscription deleted')

                //set status inactivated
                const subscriptionDataDeleted = {
                    subscriptionId: '',
                    customerId: '',
                    planName: 'free plan',
                    email: subscription.metadata.email,
                    status: 'free',
                };

                const dbUser = await userModel.getUserByEmail(subscriptionDataDeleted.email);

                if (dbUser) {
                    const updates = {
                        status: subscriptionDataDeleted.status,
                        planName: subscriptionDataDeleted.planName,
                        stripeCustomerId: subscriptionDataDeleted.customerId,
                        subscriptionId: subscriptionDataDeleted.subscriptionId,
                    };

                    await userModel.updateUser(dbUser._id, updates);
                    console.log('User updated successfully:', dbUser._id);
                } else {
                    console.log('User not found in the database');
                }


                break;
            }
        }
        response.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        response.status(500).end();
    }
}