const https = require('https');

export default async function getList(total: any) {

    const keyList = {
        "job Alert": process.env.EMAIL_OCTO_PUS_JOB_PREMIUM_USERS
    }

    return new Promise((resolve: any, reject: any) => {

        const options = {
            hostname: 'emailoctopus.com',
            port: 443,
            path: `/api/1.6/lists/${keyList[total.listType]}/contacts?api_key=${process.env.EMAIL_OCTO_PUS_API_KEY}`,
            method: 'GET',
        };

        const req = https.request(options, (response: any) => {
            let data = '';

            response.on('data', (chunk: any) => {
                data += chunk;
            });

            response.on('end', () => {
                resolve(data); // Resolve the promise when the response ends
            });
        });

        req.on('error', (error: any) => {
            reject(error); // Reject the promise if there's an error
        });

        req.end();
    });
}
