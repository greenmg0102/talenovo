'use client'
import { useState } from "react";

export default function SubscriptionItem({ index, item }: any) {

    const [active, setActive] = useState(false)

    return (
        <div className="w-full mb-2 flex justify-between items-center p-1 border border-white hover:border-dashed hover:border-gray-200 transition-all">
            <p className="w-[40px]">
                {index}
            </p>
            <div className="w-[calc(100%-40px)] flex justify-between items-center">
                <p className='text-center w-[25%]'>{item.email}</p>
                <p className='text-center w-[25%]'>{item.planName}</p>
                <div className='flex justify-center w-[15%]'>
                    {item.status === "active" ?
                        <div className="w-[15px] h-[15px] rounded-full bg-green-500 shadow-sm" />
                        :
                        <div className="w-[15px] h-[15px] rounded-full bg-red-500 shadow-sm" />
                    }
                </div>
                <div className='flex jsutify-center items-center w-[35%]'>

                    {active ?
                        <div className="flex justify-center items-center">
                            <div
                                className="text-[14px] border border-red-500 text-red-500 rounded-[4px] px-3 py-1 mr-1"
                            >
                                Delete
                            </div>
                            <div
                                className="text-[14px] border border-blue-500 text-blue-500 rounded-[4px] px-3 py-1"
                            >
                                Save
                            </div>
                        </div>
                        :
                        <div
                            className="text-[14px] border border-green-500 text-green-500 rounded-[4px] px-3 py-1"
                        >
                            Change
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}