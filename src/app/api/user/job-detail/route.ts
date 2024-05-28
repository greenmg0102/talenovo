import { NextResponse } from "next/server";
import { MeiliSearch } from 'meilisearch';

export async function POST(req: any, res: any) {
  try {
    let data = await req.json();

    const client = new MeiliSearch({
      host: 'https://ms-f818396405c0-10172.nyc.meilisearch.io/',
      apiKey: '1116d49cd6e2aee89e3b54713b1bb9b1e4184651',
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
