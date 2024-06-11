
import axios from 'axios';

const host = 'https://ms-ce7a48ac689b-10562.nyc.meilisearch.io/';
const apiKey = '9fbe0270ada537d37c34e0f768ceed9fe2ae3b6b';
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
    const res = await fetch('http://104.128.55.140:3000/api/user/user-profile/my-job-alert', {
        method: 'GET',
    });
    return await res.json();
}

export async function myBookMarkJob() {
    const res = await fetch('http://104.128.55.140:3000/api/user/user-profile/my-bookmark-job', {
        method: 'GET',
    });
    return await res.json();
}

