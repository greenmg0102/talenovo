
import axios from 'axios';

const host = 'https://ms-f818396405c0-10172.nyc.meilisearch.io/';
const apiKey = '1116d49cd6e2aee89e3b54713b1bb9b1e4184651';
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
    const res = await fetch('http://104.128.55.140:8080/api/user/user-profile/my-job-alert', {
        method: 'GET',
    });
    return await res.json();
}

export async function myBookMarkJob() {
    const res = await fetch('http://104.128.55.140:8080/api/user/user-profile/my-bookmark-job', {
        method: 'GET',
    });
    return await res.json();
}

