import Link from "next/link";
import { priceDataList } from '@/components/Hero/priceCard/priceData'

export default function PriceCard() {
    return (
        <div className="flex justify-around items-center flex-wrap mt-12">
            {priceDataList.map((item: any, index: any) =>

                <Link
                    href="/price"
                    className="w-full md:w-[25%] py-4 my-6 hover:py-6 hover:my-4 px-6 border border-gray-200 rounded-[12px] shadow-lg hover:shadow-xl transition-all hover:border-blue-500 border-[2px] hover:bg-blue-200 cursor-pointer"
                    key={index}
                >
                    <div>
                        <div className='flex justify-center items-center'>
                            <div className='w-[70px] h-[70px] border border-gray-200 rounded-[4px]'>
                            </div>
                        </div>
                        <p className='text-[14px]'>{item.title}</p>
                        <p className='text-[24px] font-bold text-blue-700'>{item.priceText}</p>
                        <p className='text-[12px] mb-4'>per month</p>

                        {item.list.map((each: any, order: any) =>
                            <div
                                key={order}
                                className='flex justify-start items-center  flex-wrap mb-2'
                            >
                                {each.isavailable ?
                                    <div className='w-[15px] h-[15px] border border-gray-200 rounded-[4px]'>
                                    </div>
                                    :
                                    <div className='w-[15px] h-[15px] border border-gray-200 rounded-[4px]'>
                                    </div>
                                }
                                <p className='ml-2'>{each.text}</p>
                            </div>
                        )}

                        <div className="p-4 rounded-[8px] bg-blue-500 text-white text-center font-bold text-[15px] my-4">
                            <p>Choose {item.title}</p>
                        </div>
                    </div>
                </Link>
            )}

        </div>
    )
}