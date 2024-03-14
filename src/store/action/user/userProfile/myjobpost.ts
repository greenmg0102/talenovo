
export async function myJobPost() {
    const res = await fetch('http://l195.35.32.163:3000/api/user/user-profile/my-job-post', {
        method: 'POST',
        body: JSON.stringify({
        })
    });
    return await res.json();
}
