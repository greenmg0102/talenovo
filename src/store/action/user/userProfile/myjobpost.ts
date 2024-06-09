
export async function myJobPost() {
    const res = await fetch('http://104.128.55.140:8080/api/user/user-profile/my-job-post', {
        method: 'POST',
        body: JSON.stringify({
        })
    });
    return await res.json();
}


export async function myJobApply() {
    const res = await fetch('http://104.128.55.140:8080/api/user/user-profile/my-job-apply', {
        method: 'POST',
        body: JSON.stringify({
        })
    });
    return await res.json();
}
