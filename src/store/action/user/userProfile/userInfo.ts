
export async function userInitialInfo(data:any) {

    console.log("userInitialInfo", data);
    
    const res = await fetch('http://localhost:3000/api/user/user-profile/user-info', {
        method: 'PUT',
        body: JSON.stringify(data)
    });
    return await res.json();
}

export async function userlocationUpdate(data: any) {
    const res = await fetch('http://localhost:3000/api/user/user-profile/user-info', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return await res.json();
}

export async function userPremiumStatus() {
    const res = await fetch('http://localhost:3000/api/user/user-profile/user-premium-status', {
        method: 'GET',
    });
    return await res.json();
}

export async function userBannerRegist(data: any) {
    const res = await fetch('http://localhost:3000/api/user/user-profile/user-info/user-banner', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return await res.json();
}

export async function userOtherRegist(data: any) {
    const res = await fetch('http://localhost:3000/api/user/user-profile/user-info/user-other', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return await res.json();
}



