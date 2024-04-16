import axios from 'axios';

import { connectToDatabase } from "@/lib/mongodb";
import updateContractInList from '@/app/api/mail/util/updateContractInList'
import automations from '@/app/api/mail/util/automation'
import getList from '@/app/api/mail/util/getList'


const host = 'https://ms-2eabdf8fdac6-9012.nyc.meilisearch.io';
const apiKey = '45949bbe2bf65ebe9aa08012ed5742c1373cc310';
const indexName = 'title';


export default async function JobAlertAutomation() {

    let { db } = await connectToDatabase();

    const bufferContactListTotal = {
        listType: "job Alert"
    }
    let bufferContactList: any = await getList(bufferContactListTotal)

    let contactList = bufferContactList !== undefined && JSON.parse(bufferContactList)

    for (let i = 0; i < contactList.data.length; i++) {

        let bufferEmail = contactList.data[i].email_address

        let userBufferInfo = await db.collection("users").findOne({ email: bufferEmail });

        if (userBufferInfo !== null) {
            let userClerkId = userBufferInfo.clerkId

            let userInfo = await db.collection("userinfos").findOne({ userId: userClerkId });

            const skillSet = ["Communication"]
            const countryInfo = "FL"
            const cityInfo = "Miami"

            let skillSetFilter = skillSet.map((itme: any) => { return `skills = "${itme}"`; })

            const response = await axios.post(
                `${host}/indexes/${indexName}/search`,
                {
                    filter: [
                        [...skillSetFilter],
                        `country = "${countryInfo}"`,
                        `city = "${cityInfo}"`,
                    ],
                    showRankingScore: true,
                },
                { headers: { 'Authorization': `Bearer ${apiKey}` } }
            );

            let data: any = []

            response.data.hits.forEach((element: any) => {
                data.push({
                    userId: userClerkId,
                    jobId: element.jobId,
                    checked: false
                })
            });

            await db
                .collection("jobalerts")
                .insertMany(data)
                .then((result: any) => {
                    return result
                })

            if (contactList.data.some((item: any) => item.email_address === bufferEmail)) {

                let updatingId = contactList.data.find((item: any) => item.email_address === bufferEmail).id

                const updateContractInListData = {
                    memberId: updatingId,
                    email_address: bufferEmail,
                    count: response.data.hits.length,
                    listType: "job Alert"
                }

                await updateContractInList(updateContractInListData)

                const automationData = {
                    memberId: updatingId,
                    listType: "job alert"
                }

                await automations(automationData)
            }

        }
    }


}