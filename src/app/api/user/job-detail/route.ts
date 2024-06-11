import { NextResponse } from "next/server";
import { MeiliSearch } from 'meilisearch';

export async function POST(req: any, res: any) {
  try {
    let data = await req.json();

    const client = new MeiliSearch({
      host: 'https://ms-ce7a48ac689b-10562.nyc.meilisearch.io/',
      apiKey: '9fbe0270ada537d37c34e0f768ceed9fe2ae3b6b',
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
