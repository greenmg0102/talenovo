import { NextResponse } from "next/server";
import { MeiliSearch } from 'meilisearch';

export async function POST(req: any, res: any) {
  try {
    let data = await req.json();

    const client = new MeiliSearch({
      host: 'https://ms-25a464fc2474-8311.nyc.meilisearch.io',
      apiKey: 'a9af493c2f5076aad794cab8b668828cb8f1835f',
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
