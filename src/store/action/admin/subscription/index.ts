
export async function subscriptionGet() {

    const res = await fetch('http://195.35.32.163:3000/api/admin/subscription', {
        method: 'GET'
    });

    return await res.json();
}
