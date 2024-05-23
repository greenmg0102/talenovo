
export async function userInitialInfo() {
    const res = await fetch('http://104.128.55.140:3000/api/user/user-profile/user-info', {
        method: 'GET',
    });
    return await res.json();
}

export async function userPremiumStatus() {
    const res = await fetch('http://104.128.55.140:3000/api/user/user-profile/user-premium-status', {
        method: 'GET',
    });
    return await res.json();
}

export async function userBannerRegist(data: any) {
    const res = await fetch('http://104.128.55.140:3000/api/user/user-profile/user-info/user-banner', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return await res.json();
}

export async function userOtherRegist(data: any) {
    const res = await fetch('http://104.128.55.140:3000/api/user/user-profile/user-info/user-other', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return await res.json();
}



