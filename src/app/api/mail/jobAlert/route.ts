
import { NextResponse } from "next/server";
import https from "https";
import createContract from '@/app/api/mail/util/createContractInList'
import updateContractInList from '@/app/api/mail/util/updateContractInList'
import getList from '@/app/api/mail/util/getList'
import automations from '@/app/api/mail/util/automation'
import searchJobPerUser from '@/app/api/mail/util/searchJobPerUser'

export async function GET(req: any, res: any) {

  // let creatingContactResult = await createContract({})
  // let updateContractInListResult = await updateContractInList({})

  // getList()
  // automations({})

  // let result = await createContract({})

  // console.log('result', result);

  // var postData = `{"api_key":"${process.env.EMAIL_OCTO_PUS_API_KEY}","list_member_id":"${process.env.EMAIL_OCTO_PUS_JOB_ALERT_LIST_KEY}"}`;

  // var options = {
  //   hostname: 'emailoctopus.com',
  //   port: 443,
  //   path: `/api/1.6/automations/${process.env.EMAIL_OCTO_PUS_JOB_ALERT_AUTOMATION_KEY}/queue`,
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // };

  // var req: any = https.request(options, (response) => {
  //   let data = '';

  //   response.on('data', (chunk) => {
  //     data += chunk;
  //   });

  //   response.on('end', () => {
  //     console.log(data);
  //   });
  // });

  // req.write(postData);
  // req.end();

  return NextResponse.json({
    isOkay: true,
  });
}
