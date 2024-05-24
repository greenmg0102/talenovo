// models/UserModel.ts

import { Db, ObjectId } from "mongodb";

export interface User {
    _id: ObjectId;
    email: string;
    status: string;
    planName: string;
    stripeCustomerId: string;
    subscriptionId: string;
    // Add more fields as needed
}

export class UserModel {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    async createUser(email: string, status: string, planName: string, stripeCustomerId: string, subscriptionId: string): Promise<any> {
        try {
            const result = await this.db.collection("users").insertOne({ email, status, planName, stripeCustomerId, subscriptionId });
            console.log('Here is result of user creation',result);
            // return result.ops[0] as User;
        } catch (error) {
            // console.error("Error creating user:", error);
            // throw error;
        }
    }

    async updateUser(userId: string, updates: Partial<User>): Promise<any> {
        const user = await this.db.collection("users").findOneAndUpdate(
            { _id: new ObjectId(userId) },
            { $set: updates },
            { returnOriginal: false }
        );
        return user.value;
    }

    async deleteUser(userId: string): Promise<boolean> {
        const result = await this.db.collection("users").deleteOne({ _id: new ObjectId(userId) });
        return result.deletedCount === 1;
    }

    async getUserByEmail(email: string): Promise<any> {
        return await this.db.collection("users").findOne({ email });
    }

    // Add more methods as needed for fetching, updating, and deleting users
}
