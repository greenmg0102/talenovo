import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

export default function CarouselItem({ subResult }: any) {

    return (
        <div className="mb-0 p-8 bg-blue-400 rounded-[4px]">
            <Slider {...settings}>
                <div className="flex justify-between items-center">
                    <div className="flex justify-center items-start">
                        {subResult.map((item: any, index: any) =>
                            <div
                                key={index}
                                className="w-1/4 flex justify-center items-center flex-col"
                            >
                                <img src={item.companyLogo} alt="avatar" className="rounded-full shadow-lg" width={50} height={50} />
                                <p className="text-center text-gray-100 text-[12px]">{item.companyName}</p>
                                {/* <p className="text-center text-gray-400 text-[13px]">{item.count} Jobs</p> */}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex justify-center items-start">
                        {subResult.map((item: any, index: any) =>
                            <div
                                key={index}
                                className="w-1/4 flex justify-center items-center flex-col"
                            >
                                <img src={item.companyLogo} alt="avatar" className="rounded-full shadow-lg" width={50} height={50} />
                                <p className="text-center text-gray-100 text-[12px]">{item.companyName}</p>
                                {/* <p className="text-center text-gray-400 text-[13px]">{item.count} Jobs</p> */}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex justify-center items-start">
                        {subResult.map((item: any, index: any) =>
                            <div
                                key={index}
                                className="w-1/4 flex justify-center items-center flex-col"
                            >
                                <img src={item.companyLogo} alt="avatar" className="rounded-full shadow-lg" width={50} height={50} />
                                <p className="text-center text-gray-100 text-[12px]">{item.companyName}</p>
                                {/* <p className="text-center text-gray-400 text-[13px]">{item.count} Jobs</p> */}
                            </div>
                        )}
                    </div>
                </div>
            </Slider>
        </div>
    )
}