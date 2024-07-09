import { Tabs } from 'antd';
import { useState, useEffect } from 'react';
import type { TabsProps } from 'antd';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselItem from '@/components/Hero/carousel/CarouselItem'
import { carouselIndustry } from '@/store/action/user/landing/landingInfo'
import { message, Alert, Button, Tooltip, ConfigProvider } from 'antd';

var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

export default function Carousel({ companyFilter, setCompanyFilter }: any) {

    const [industryList, setIndustryList] = useState([])
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        async function fetchData() {

            const list = ["Staffing and Recruiting", "Hospitals and Health Care", "Manufacturing"]
            let result: any = await carouselIndustry(list)

            if (!result.isOkay) messageApi.error(result.message);
            else {
                setIndustryList(result.result)
            }
        }
        fetchData()
    }, [])

    const items: TabsProps['items'] = industryList.map((item: any, index: any) => {
        return {
            key: index.toString(),
            label: <p className='font-semibold'>{item.category}</p>,
            children: <CarouselItem
                companyFilter={companyFilter}
                setCompanyFilter={(companyName: any) => setCompanyFilter(companyName)}
                // setCompanyFilter={(companyName: any) => console.log("####", companyName)}
                subResult={item.subResult}
            />
        }
    })

    return (
        <div className="shadow-lg rounded-[8px] mb-4 bg-white border border-gray-300">
            <div className="px-2 pb-2">
                <Tabs
                    defaultActiveKey="1"
                    items={items}
                />
            </div>
        </div>
    )
}