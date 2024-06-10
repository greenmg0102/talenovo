
export async function jobAlertConfig(data: any) {

    const res = await fetch('http://104.128.55.140:8443/api/user/user-profile/job-alert', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return await res.json();
}
export async function jobAlertConfigGet() {

    const res = await fetch('http://104.128.55.140:8443/api/user/user-profile/job-alert', {
        method: 'GET',
    });
    return await res.json();
}
