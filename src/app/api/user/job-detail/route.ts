import { NextResponse } from "next/server";
import { MeiliSearch } from 'meilisearch';

export async function POST(req: any, res: any) {
  try {
    let data = await req.json();

    const client = new MeiliSearch({
      host: 'https://ms-1dd1c86bf47e-9385.nyc.meilisearch.io',
      apiKey: 'e6c3cf035914f999bc89bdc1c13aa1bcfb930fb2',
    });

    const document = await client.index('title').getDocument(data.id);

    return NextResponse.json({
      isOkay: true,
      result: document
    });
  } catch (error) {
    console.error('Error retrieving document:', error);
    return NextResponse.json({
      isOkay: true,
      message: "There is no such job"
    });
  }
}
