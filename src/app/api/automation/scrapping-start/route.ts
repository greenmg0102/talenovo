import { NextResponse } from "next/server";
import schedule from 'node-schedule';
import { KadoaScrapping } from '@/app/api/automation/scrapping-start/kadoa'
import { linkedinScrapping } from '@/app/api/automation/scrapping-start/linkedin'
import { connectToDatabase } from "@/lib/mongodb";
import { adminAPIMiddleware } from '@/app/api/admin/middleware';
import { MeiliSearch } from 'meilisearch';

export async function GET(req: any, res: any) {
  await adminAPIMiddleware(req, res);

  let { db } = await connectToDatabase();

  const client = new MeiliSearch({
    host: 'https://ms-25a464fc2474-8311.nyc.meilisearch.io',
    apiKey: 'a9af493c2f5076aad794cab8b668828cb8f1835f',
  });


  schedule.scheduleJob('0 */12 * * *', async () => {
    let linkedin = await linkedinScrapping();
    // let kadoa = await KadoaScrapping();

    let real = linkedin
    // let real = [...linkedin, ...kadoa]

    console.log(1);
    await client.index('title').addDocuments(real, { primaryKey: 'jobId' });

    console.log(2);
    await client.index('title').updateFilterableAttributes(["title", "location", "companyName"]);


    await db.collection("otherjobs").insertMany(real).then(async (result: any) => { return });
  });

  return NextResponse.json({
    result: true,
  });
}
