import { NextResponse } from "next/server";
import schedule from 'node-schedule';
import { KadoaScrapping } from '@/app/api/automation/scrapping-start/kadoa'
import { linkedinScrapping } from '@/app/api/automation/scrapping-start/linkedin'
import { connectToDatabase } from "@/lib/mongodb";
import { adminAPIMiddleware } from '@/app/api/admin/middleware';

export async function GET(req: any, res: any) {
  await adminAPIMiddleware(req, res);

  let { db } = await connectToDatabase();

  schedule.scheduleJob('0 */12 * * *', async () => {
    let linkedin = await linkedinScrapping();
    let kadoa = await KadoaScrapping();

    // let real = linkedin
    let real = [...linkedin, ...kadoa]
    await db.collection("otherjobs").insertMany(real).then(async (result: any) => { return });
  });

  return NextResponse.json({
    result: true,
  });
}
