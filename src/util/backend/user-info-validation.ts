
export function userInfoValidation(userInfoData: any) {

    let errorMessage: any = {}

    // if (userInfoData.profile.length === 0) errorMessage.profile = "The profile must be entered!"
    // if (userInfoData.profile.length > 0 && userInfoData.profile.length < 4) errorMessage.companyName = "The profile must be at least some characters in length!"

    if (userInfoData.jobTitle.length === 0) errorMessage.jobTitle = "Please add your job title!"
    if (userInfoData.jobTitle.length > 0 && userInfoData.jobTitle.length < 4) errorMessage.companyName = "The jobTitle must be at least some characters in length!"

    // if (userInfoData.summary.length === 0) errorMessage.summary = "The summary must be entered!"
    // if (userInfoData.summary.length > 0 && userInfoData.summary.length < 10) errorMessage.companyName = "The summary must be at least some characters in length!"

    if (userInfoData.skill.length === 0) errorMessage.skill = "A minimum of 1 skill set must  be entered to get personalized job suggestions!"

    return {
        error: Object.keys(errorMessage).length > 0 ? true : false,
        errorMessage: errorMessage
    }

}