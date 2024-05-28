import axios from 'axios';

const host = 'https://ms-f818396405c0-10172.nyc.meilisearch.io/';
const apiKey = '1116d49cd6e2aee89e3b54713b1bb9b1e4184651';
const indexName = 'title';

export async function newletterSubscribePost(data: any) {
    const res = await fetch('http://104.128.55.140:3000/api/user/newsletter-confirm', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return await res.json();
}
export async function newletterSubscribeGet() {
    const res = await fetch('http://104.128.55.140:3000/api/user/newsletter-confirm', {
        method: 'GET',
    });
    return await res.json();
}

export async function suggestJobs(data: any) {

    let processingData = data
    const cityInfo = processingData.locatedin.split(", ")[0]
    const skillSet = processingData.skill

    if (processingData.jobalertsetting === undefined) {

        const response = await axios.post(
            `${host}/indexes/${indexName}/search`,
            {
                filter: [
                    `city = "${cityInfo}"`,
                ],
                showRankingScore: true,
                limit: 20,
                sort: ['postStatus:asc']
            },
            { headers: { 'Authorization': `Bearer ${apiKey}` } }
        );

        return response.data.hits
    } else {

        let skillSetFilter = skillSet.map((itme: any) => { return `skills = "${itme}"`; })

        let queryList = processingData.jobalertsetting.titleList.join(" ")

        const response = await axios.post(
            `${host}/indexes/${indexName}/search`,
            {
                q: queryList,
                filter: [
                    [...skillSetFilter],
                    `city = "${cityInfo}"`,
                    'postStatus = 2 OR postStatus = 3'
                ],
                showRankingScore: true,
                limit: 20,
                sort: ['postStatus:asc']
            },
            { headers: { 'Authorization': `Bearer ${apiKey}` } }
        );

        return response.data.hits
    }

}