
import axios from 'axios';

const host = 'https://ms-2eabdf8fdac6-9012.nyc.meilisearch.io';
const apiKey = '45949bbe2bf65ebe9aa08012ed5742c1373cc310';
const indexName = 'title';

export async function getfacetedIndustry() {

    const response = await axios.post(
        `${host}/indexes/${indexName}/search`,
        { facets: ['insightsV2'] },
        { headers: { 'Authorization': `Bearer ${apiKey}` } }
    );
    const { facetDistribution } = response.data;

    return Object.keys(facetDistribution.insightsV2)
}


export async function myJobAlert() {
    const res = await fetch('http://localhost:3000/api/user/user-profile/my-job-alert', {
        method: 'GET',
    });
    return await res.json();
}

export async function myBookMarkJob() {
    const res = await fetch('http://localhost:3000/api/user/user-profile/my-bookmark-job', {
        method: 'GET',
    });
    return await res.json();
}

