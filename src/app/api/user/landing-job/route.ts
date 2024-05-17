import { MeiliSearch } from 'meilisearch';
import { connectToDatabase } from "@/lib/mongodb";
import axios from 'axios';
import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs';

export async function GET(req: any, res: any) {

  const client = new MeiliSearch({
    host: 'https://ms-7b38c9a53bf5-9766.lon.meilisearch.io',
    apiKey: 'a9120440eb9dce6256f824577056a48700be88f0',
  });

  const user: any = await currentUser();
  let { db } = await connectToDatabase();

  const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
  const localInfo: any = await axios.get(`https://api.findip.net/${ip === "::1" ? "8.230.6.196" : ip}/?token=988e48d25e534484b591149ce6a32c74`);

  let result = await client.index('title').getStats();

  let isMe: any = user === null ? null : await db.collection("userinfos").findOne({ userId: user.id });

  return NextResponse.json({
    total: result.numberOfDocuments,
    todayJob: result.numberOfDocuments - 123,
    locatedin: localInfo.data.city.names.en + ", " + localInfo.data.country.names.en,
    skill: isMe === null ? [] : isMe.skill,
    jobalertsetting: isMe === null ? null : isMe.jobalertsetting,
  });

}

export async function POST(req: any, res: any) {

  let { db } = await connectToDatabase();

  const myjobposts = await db.collection("myjobposts")
    .find({ postStatus: 2 })
    .toArray();

  return NextResponse.json({
    myjobposts: myjobposts,
  });

}