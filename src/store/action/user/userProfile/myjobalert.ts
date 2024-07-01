
import axios from 'axios';

const host = 'https://search.talenovo.com/';
const apiKey = '47dfe734-68fb-4b19-a96f-5f19a3355458';
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
    const res = await fetch('https://talenovo.com/api/user/user-profile/my-job-alert', {
        method: 'GET',
    });
    return await res.json();
}

export async function myBookMarkJob() {
    const res = await fetch('https://talenovo.com/api/user/user-profile/my-bookmark-job', {
        method: 'GET',
    });
    return await res.json();
}

