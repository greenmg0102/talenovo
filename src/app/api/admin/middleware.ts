import { clerkClient, currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from 'next/server';

export async function adminAPIMiddleware(req: NextRequest, res: NextResponse) {
  const user = await currentUser()

  // Retrieve the user list
  const allUsers = await clerkClient.users.getUserList();

  // Filter the user list based on the first name
  const usersWithMatchingFirstName = allUsers.filter((u) => u.firstName === user.firstName);

  const isAdminRequestAllowed = usersWithMatchingFirstName.length > 0 ? true : false;

  if (!isAdminRequestAllowed) {
    throw new Error('Access to admin API is forbidden');
  }

  return res;
}
