import axios from 'axios';

const host = 'https://ms-f818396405c0-10172.nyc.meilisearch.io';
const apiKey = '1116d49cd6e2aee89e3b54713b1bb9b1e4184651';
const indexName = 'title';

export async function newletterSubscribePost(data: any) {
    const res = await fetch('http://104.128.55.140:8080/api/user/newsletter-confirm', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return await res.json();
}
export async function newletterSubscribeGet() {
    const res = await fetch('http://104.128.55.140:8080/api/user/newsletter-confirm', {
        method: 'GET',
    });
    return await res.json();
}

export async function suggestJobs(data: any) {

    console.log("data", data);


    let originQuery = [...data.currentLocatedin.split(", "), data.jobTitle, data.locatedin, ...data.skill]

    if (data.jobalertsetting === undefined) {

        const response = await axios.post(
            `${host}/indexes/${indexName}/search`,
            {
                q: `${originQuery.join(" ")}`,
                limit: 20,
                sort: ['postStatus:asc']
            },
            { headers: { 'Authorization': `Bearer ${apiKey}` } }
        );

        return response.data.hits
    } else {

        // let skillSetFilter = data.skillSet.map((itme: any) => { return `skills = "${itme}"`; })

        let real = data.jobalertsetting.bufferList.map((item: any) => item.titleList)
        let titleList = real.reduce((acc: any, curr: any) => acc.concat(curr), []);

        let queryList = [...new Set([...originQuery, ...titleList])]

        console.log("queryList", queryList);


        const response = await axios.post(
            `${host}/indexes/${indexName}/search`,
            {
                q: queryList.join(" "),
                // filter: [
                //     [...skillSetFilter],
                //     `city = "${cityInfo}"`,
                //     'postStatus = 2 OR postStatus = 3'
                // ],
                showRankingScore: true,
                limit: 20,
                sort: ['postStatus:asc']
            },
            { headers: { 'Authorization': `Bearer ${apiKey}` } }
        );

        return response.data.hits
    }

}