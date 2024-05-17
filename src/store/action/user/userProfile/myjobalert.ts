
import axios from 'axios';

const host = 'https://ms-7b38c9a53bf5-9766.lon.meilisearch.io';
const apiKey = 'a9120440eb9dce6256f824577056a48700be88f0';
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

