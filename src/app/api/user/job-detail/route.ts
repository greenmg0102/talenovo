import { NextResponse } from "next/server";
import { MeiliSearch } from 'meilisearch';

export async function POST(req: any, res: any) {
  try {
    let data = await req.json();

    const client = new MeiliSearch({
      host: 'https://ms-d932cad3594f-8320.sfo.meilisearch.io',
      apiKey: '45679470fdc94d8c90ef03712354389f8d209067',
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
