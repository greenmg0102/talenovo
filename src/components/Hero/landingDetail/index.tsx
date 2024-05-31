import LinkedinDetail from '@/components/Hero/landingDetail/LinkedinDetail'
import GoogleDetail from '@/components/Hero/landingDetail/GoogleDetail'
import TalenovoDetail from '@/components/Hero/landingDetail/TalenovoDetail'

export default function LandingDetail({ isDetail, setIsDetail }: any) {

    return (
        <div>
            {isDetail && isDetail.platform === "apify" && isDetail.subType === "linkedin" ?
                <LinkedinDetail
                    isDetail={isDetail}
                    setIsDetail={(data: any) => setIsDetail(data)}
                /> : null
            }
            {isDetail && isDetail.platform === "apify" && isDetail.subType === "google" ?
                <GoogleDetail
                    isDetail={isDetail}
                    setIsDetail={(data: any) => setIsDetail(data)}
                /> : null
            }
            {isDetail && isDetail.platform === "talenovo" && isDetail.subType === "paid" ?
                <TalenovoDetail
                    isDetail={isDetail}
                    setIsDetail={(data: any) => setIsDetail(data)}
                /> : null
            }
        </div>
    )
}