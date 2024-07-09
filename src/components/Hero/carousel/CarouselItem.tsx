import Slider from "react-slick";
import clsx from 'clsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

export default function CarouselItem({ companyFilter, setCompanyFilter, subResult }: any) {

    return (
        <div className="mb-0 pt-1 pb-4 rounded-[4px]">
            <Slider {...settings}>
                {Array(3).fill(0).map((item: any, index: any) => index).map((item: any, index: any) =>
                    <div className="flex justify-between items-center">
                        <div className="flex justify-center items-start">
                            {subResult.slice(index * 6, index * 6 + 6).map((item: any, index: any) =>
                                <div
                                    key={index}
                                    className={clsx("w-1/4 flex justify-center items-center flex-col cursor-pointer")}
                                    onClick={() => setCompanyFilter(item.companyName)}
                                >
                                    <img src={item.companyLogo} alt="avatar" className={clsx("w-[50px] h-[50px] rounded-full bg-cover shadow-lg")} width={50} height={50} />
                                    <p className={clsx("text-center text-[12px] mt-2 font-bold hover:text-red-400", companyFilter === item.companyName ? "text-red-700 underline" : "text-gray-700")}>{item.companyName}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Slider>
        </div>
    )
}