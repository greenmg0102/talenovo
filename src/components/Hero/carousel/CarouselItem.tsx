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
        <div className="mb-0 pt-1 pb-4 rounded-[4px]">
            <Slider {...settings}>
                <div className="flex justify-between items-center">
                    <div className="flex justify-center items-start">
                        {subResult.slice(0, 6).map((item: any, index: any) =>
                            <div
                                key={index}
                                className="w-1/4 flex justify-center items-center flex-col"
                            >
                                <img src={item.companyLogo} alt="avatar" className="w-[50px] h-[50px] rounded-full bg-cover shadow-lg" width={50} height={50} />
                                <p className="text-center text-gray-700 text-[12px] mt-2 font-bold">{item.companyName}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex justify-center items-start">
                        {subResult.slice(6, 12).map((item: any, index: any) =>
                            <div
                                key={index}
                                className="w-1/4 flex justify-center items-center flex-col"
                            >
                                <img src={item.companyLogo} alt="avatar" className="w-[50px] h-[50px] rounded-full bg-cover shadow-lg" width={50} height={50} />
                                <p className="text-center text-gray-700 text-[12px] font-bold">{item.companyName}</p>
                                {/* <p className="text-center text-gray-400 text-[13px]">{item.count} Jobs</p> */}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex justify-center items-start">
                        {subResult.slice(12, 18).map((item: any, index: any) =>
                            <div
                                key={index}
                                className="w-1/4 flex justify-center items-center flex-col"
                            >
                                <img src={item.companyLogo} alt="avatar" className="w-[50px] h-[50px] rounded-full bg-cover shadow-lg" width={50} height={50} />
                                <p className="text-center text-gray-700 text-[12px] font-bold">{item.companyName}</p>
                                {/* <p className="text-center text-gray-400 text-[13px]">{item.count} Jobs</p> */}
                            </div>
                        )}
                    </div>
                </div>
            </Slider>
        </div>
    )
}