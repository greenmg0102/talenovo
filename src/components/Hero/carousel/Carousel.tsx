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

export default function Carousel() {

    const [industryList, setIndustryList] = useState([])
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        async function fetchData() {

            const list = ["Staffing and Recruiting", "Hospitals and Health Care", "Manufacturing"]
            let result = await carouselIndustry(list)

            if (!result.isOkay) messageApi.error(result.message);
            else {
                setIndustryList(result.result)
            }
        }
        fetchData()
    }, [])

    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = industryList.map((item: any, index: any) => {
        return {
            key: index.toString(),
            label: item.category,
            children: <CarouselItem subResult={item.subResult} />
        }
    })

    return (
        <div className="border border-gray-300 shadow-lg rounded-[8px] mb-4">
            <div className="px-4 pb-2">
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
        </div>
    )
}