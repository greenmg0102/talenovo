
export async function subscriptionGet() {

    const res = await fetch('http://104.128.55.140:8080/api/admin/subscription', {
        method: 'GET'
    });

    return await res.json();
}
