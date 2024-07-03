
export async function subscriptionGet() {

    const res = await fetch('https://talenovo.com/api/admin/subscription', {
        method: 'GET'
    });

    return await res.json();
}
