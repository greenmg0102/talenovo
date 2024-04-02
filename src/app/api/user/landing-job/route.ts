import { MeiliSearch } from 'meilisearch';
import { connectToDatabase } from "@/lib/mongodb";
import axios from 'axios';
import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs';

export async function GET(req: any, res: any) {

  const client = new MeiliSearch({
    host: 'https://ms-d932cad3594f-8320.sfo.meilisearch.io',
      apiKey: '45679470fdc94d8c90ef03712354389f8d209067',
  });

  const user = await currentUser();
  let { db } = await connectToDatabase();

  const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
  const localInfo: any = await axios.get(`https://api.findip.net/${ip === "::1" ? "8.230.6.196" : ip}/?token=988e48d25e534484b591149ce6a32c74`);

  let result = await client.index('title').getStats();

  let isMe = await db.collection("userinfos").findOne({ userId: user.id });

  return NextResponse.json({
    total: result.numberOfDocuments,
    todayJob: result.numberOfDocuments - 456,
    locatedin: localInfo.data.city.names.en + ", " + localInfo.data.country.names.en,
    skill: isMe === null ? [] : isMe.skill
  });

}