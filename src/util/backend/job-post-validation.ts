
export function jobPostValidation(jobPostingData: any, stage: any) {

    if (stage === 'info') {

        let errorMessage: any = {}

        if (jobPostingData.companyLogo.length < 1) errorMessage.companyLogo = "Company logo must be entered!"

        if (jobPostingData.companyName.length === 0) errorMessage.companyName = "Company name must be entered!"
        if (jobPostingData.companyName.length > 0 && jobPostingData.companyName.length < 5) errorMessage.companyName = "The company name must be at least 4 characters in length!"

        if (jobPostingData.companyLinkedinUrl.length === 0) errorMessage.companyLinkedinUrl = "Company link must be entered!"
        if (!jobPostingData.companyLinkedinUrl.includes(".") && (!jobPostingData.companyLinkedinUrl.includes("http") || !jobPostingData.companyLinkedinUrl.includes("https"))) errorMessage.companyLinkedinUrl = "Please enter the company link correctly."

        return {
            error: Object.keys(errorMessage).length > 0 ? true : false,
            errorMessage: errorMessage
        }

    } else if (stage === 'detail') {

        let errorMessage: any = {}

        if (jobPostingData.title.length === 0) errorMessage.title = "Job title must be entered!"
        if (jobPostingData.title.length > 0 && jobPostingData.title.length < 10) errorMessage.title = "The job title must be at least 10 characters in length!"

        if (jobPostingData.tag.length === 0) errorMessage.tag = "You must enter at least one skill!"
        if (jobPostingData.tag.length > 10) errorMessage.tag = "More than 10 technologies cannot be registered!"

        if (jobPostingData.descriptionText === undefined) errorMessage.descriptionText = "Please enter job description!"
        if (jobPostingData.descriptionText !== undefined && jobPostingData.descriptionText.length > 0 && jobPostingData.descriptionText.length < 200) errorMessage.descriptionText = "The job description must be at least 200 characters!"
        if (jobPostingData.descriptionText !== undefined && jobPostingData.descriptionText.length > 5000) errorMessage.descriptionText = "The job description cannot be longer than 5000 characters!"

        if (jobPostingData.maximumPay === undefined) errorMessage.maximumPay = "A maximum price must be set!"
        if (jobPostingData.maximumPay < 0) errorMessage.maximumPay = "This number cannot be negative value."

        if (jobPostingData.minimumPay === undefined) errorMessage.minimumPay = "A minimum price must be set!"
        if (jobPostingData.minimumPay < 0) errorMessage.minimumPay = "This number cannot be negative value."
        if (Number(jobPostingData.minimumPay) > Number(jobPostingData.maximumPay)) errorMessage.maximumPay = "A maximum price must be greater than the minimum price!"

        if (jobPostingData.currency === undefined) errorMessage.currency = "Set currency unit!"

        if (jobPostingData.currencyType === undefined) errorMessage.currencyType = "Set pay period unit!"

        if (jobPostingData.type === undefined) errorMessage.type = "Set job type!"

        // if (jobPostingData.location === undefined) errorMessage.location = "Set the location!"

        if (jobPostingData.category === undefined) errorMessage.category = "Set job category!"

        if (jobPostingData.applyUrl.length === 0) errorMessage.applyUrl = "Please enter the job posting link.!"

        if (jobPostingData.location === undefined) errorMessage.location = "Please enter job location!"


        return {
            error: Object.keys(errorMessage).length > 0 ? true : false,
            errorMessage: errorMessage
        }
    }



}