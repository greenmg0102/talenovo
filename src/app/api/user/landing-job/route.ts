import { MeiliSearch } from 'meilisearch';
import { connectToDatabase } from "@/lib/mongodb";
import axios from 'axios';
import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs';

export async function GET(req: any, res: any) {

  const client = new MeiliSearch({
    host: 'https://ms-2eabdf8fdac6-9012.nyc.meilisearch.io',
    apiKey: '45949bbe2bf65ebe9aa08012ed5742c1373cc310',
  });

  const user: any = await currentUser();
  let { db } = await connectToDatabase();

  const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
  const localInfo: any = await axios.get(`https://api.findip.net/${ip === "::1" ? "8.230.6.196" : ip}/?token=988e48d25e534484b591149ce6a32c74`);

  let result = await client.index('title').getStats();

  let isMe: any = user === null ? [] : await db.collection("userinfos").findOne({ userId: user.id });

  return NextResponse.json({
    total: result.numberOfDocuments,
    todayJob: result.numberOfDocuments - 456,
    locatedin: localInfo.data.city.names.en + ", " + localInfo.data.country.names.en,
    skill: isMe === null ? [] : isMe.skill
  });

}