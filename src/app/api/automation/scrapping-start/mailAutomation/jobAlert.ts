import axios from 'axios';

import { connectToDatabase } from "@/lib/mongodb";
import updateContractInList from '@/app/api/mail/util/updateContractInList'
import automations from '@/app/api/mail/util/automation'
import getList from '@/app/api/mail/util/getList'

const host = 'https://ms-1dd1c86bf47e-9385.nyc.meilisearch.io';
const apiKey = 'e6c3cf035914f999bc89bdc1c13aa1bcfb930fb2';
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

            let userInfo: any = await db.collection("userinfos").findOne({ userId: userClerkId });

            const cityInfo = userInfo.locatedin.split(", ")[0]
            const skillSet = userInfo.skill
            let queryList = userInfo.jobalertsetting.titleList.join(" ")

            let skillSetFilter = skillSet.map((itme: any) => { return `skills = "${itme}"`; })

            const response = await axios.post(
                `${host}/indexes/${indexName}/search`,
                {
                    q: queryList,
                    filter: [
                        [...skillSetFilter],
                        `city = "${cityInfo}"`,
                    ],
                    showRankingScore: true,
                    limit: 20,
                },
                { headers: { 'Authorization': `Bearer ${apiKey}` } }
            );


            if (response.data.hits.length > 0) {
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
}