
export async function subscriptionGet() {

    const res = await fetch('http://localhost:3000/api/admin/subscription', {
        method: 'GET'
    });

    return await res.json();
}
