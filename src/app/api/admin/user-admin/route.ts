
import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { adminAPIMiddleware } from '../middleware';

export async function GET(req: any, res: any) {

  await adminAPIMiddleware(req, res);

  const users = await clerkClient.users.getUserList();

  return NextResponse.json({
    users: users
  });
}