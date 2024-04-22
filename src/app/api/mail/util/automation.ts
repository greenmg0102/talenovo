import https from "https";

export default async function automations(total: any) {

    
    const automationKey = {
        "job alert": process.env.EMAIL_OCTO_PUS_JOB_ALERT_AUTOMATION_KEY
    }

    return new Promise((resolve: any, reject: any) => {

        var postData = ""

        if (total.listType === "job alert") {
            postData = `{"api_key":"${process.env.EMAIL_OCTO_PUS_API_KEY}","list_member_id":"${total.memberId}"}`;
        }

        var options = {
            hostname: 'emailoctopus.com',
            port: 443,
            path: `/api/1.6/automations/${automationKey[total.listType]}/queue`,
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
                console.log('data', data);

                resolve(true); // Resolve the promise when the response ends
            });
        });

        req.on('error', (error: any) => {
            reject(error); // Reject the promise if there's an error
        });

        req.write(postData);
        req.end();
    });
}
