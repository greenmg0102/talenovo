
import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios';

export async function GET(req: NextRequest, res: any) {

  const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
  const localInfo: any = await axios.get(`https://api.findip.net/${ip === "::1" ? "8.230.6.196" : ip}/?token=988e48d25e534484b591149ce6a32c74`);

  const geoPostion: any = localInfo.data.country.names.en
  
  return NextResponse.json({
    isOkay: true,
    geoPostion: geoPostion
  });

}