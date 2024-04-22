import https from "https";

export default function createContract(total: any) {

    const listTypeKey = {
        "all clients": process.env.EMAIL_OCTO_PUS_JOB_ALL_CLIENTS,
        "premium user": process.env.EMAIL_OCTO_PUS_JOB_PREMIUM_USERS
    }

    return new Promise((resolve: any, reject: any) => {

        let postData = ""

        if (total.listType === "all clients") {
            postData = `{"api_key":"${process.env.EMAIL_OCTO_PUS_API_KEY}","email_address":"${total.email}","fields": {"EmailAddress":"${total.email}","FirstName":"${total.FirstName}","LastName":"${total.LastName}"}, "tags": [""],"status": "SUBSCRIBED"}`;
        } else if (total.listType === "premium user") {
            postData = `{"api_key":"${process.env.EMAIL_OCTO_PUS_API_KEY}","email_address":"${total.email}","fields": {"EmailAddress":"${total.email}","FirstName":"${total.FirstName}","LastName":"${total.LastName}"},"CurrentCount":"${total.CurrentCount}"}, "tags": [""],"status": "SUBSCRIBED"}`;
        }

        console.log("postData", postData);

        var options = {
            hostname: 'emailoctopus.com',
            port: 443,
            path: `/api/1.6/lists/${listTypeKey[total.listType]}/contacts`,
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

                console.log("createContract", data);

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
