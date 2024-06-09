import https from "https";

export default async function updateContractInList(contractBody: any) {

    const listType = {
        "job Alert": process.env.EMAIL_OCTO_PUS_JOB_PREMIUM_USERS
    }

    return new Promise((resolve: any, reject: any) => {

        var postData:any = ""

        if (contractBody.listType === "job Alert") {

            postData = `{"api_key":"${process.env.EMAIL_OCTO_PUS_API_KEY}","email_address":"${contractBody.email_address}","fields": {"EmailAddress":"${contractBody.email_address}","FirstName":"N/A","LastName":"N/A", "CurrentCount":${contractBody.count}}, "status": "SUBSCRIBED"}`;
        }

        var options = {
            hostname: 'emailoctopus.com',
            port: 443,
            path: `/api/1.6/lists/${listType[contractBody.listType]}/contacts/${contractBody.memberId}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        var req: any = https.request(options, (response) => {
            let data:any = '';

            response.on('data', (chunk:any) => {
                data += chunk;
            });

            response.on('end', () => {

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
