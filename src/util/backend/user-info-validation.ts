
export function userInfoValidation(userInfoData: any) {

    let errorMessage: any = {}

    if (userInfoData.profile.length === 0) errorMessage.profile = "The profile must be entered!"
    if (userInfoData.profile.length > 0 && userInfoData.profile.length < 4) errorMessage.companyName = "The profile must be at least some characters in length!"

    if (userInfoData.jobTitle.length === 0) errorMessage.jobTitle = "The jobTitle must be entered!"
    if (userInfoData.jobTitle.length > 0 && userInfoData.jobTitle.length < 4) errorMessage.companyName = "The jobTitle must be at least some characters in length!"

    if (userInfoData.summary.length === 0) errorMessage.summary = "The summary must be entered!"
    if (userInfoData.summary.length > 0 && userInfoData.summary.length < 10) errorMessage.companyName = "The summary must be at least some characters in length!"

    if (userInfoData.skill.length === 0) errorMessage.skill = "It needs to have at least one skill!"

    return {
        error: Object.keys(errorMessage).length > 0 ? true : false,
        errorMessage: errorMessage
    }

}