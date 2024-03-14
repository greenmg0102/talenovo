import fetch from 'node-fetch';

export async function KadoaScrapping(): Promise<any> {

    let real = []

    const apiKey = 'f32d04ed-9906-43e0-8c04-1e53375d3d4f'; // Replace with your actual API key

    const response = await fetch('https://services.kadoa.com/jobs/pages/65d27f272f4e38d9d59f563c?limit=500&offset=0&format=JSON&mode=ACTIVE', {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'x-api-key': apiKey
        }
    });

    const data: any = await response.json();

    data.forEach((element: any) => {
        real.push({
            platform: "kadoa",
            subType: "portalprocomservices",
            ...element,
            isComplete: true,
            isComfirm: true
        })
    });

    return real;
}
