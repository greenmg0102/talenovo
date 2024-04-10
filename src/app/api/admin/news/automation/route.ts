
import { NextResponse } from "next/server";
import https from "https";
import { adminAPIMiddleware } from '../../middleware';

export async function GET(req: any, res: any) {
  await adminAPIMiddleware(req, res);

  console.log("GET");

  var postData = '{"api_key":"6c5499d6-1c94-44f0-8263-7fe4d50040a3","list_member_id":"1623ad88-f66d-11ee-862a-8b381b638272"}';

  var options = {
    hostname: 'emailoctopus.com',
    port: 443,
    path: '/api/1.6/automations/d41c95ec-f6ff-11ee-ba6f-dd8ed62846bb/queue',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  var req: any = https.request(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      console.log(data);
    });
  });

  req.write(postData);
  req.end();

  return NextResponse.json({
    isOkay: true,
  });
}
