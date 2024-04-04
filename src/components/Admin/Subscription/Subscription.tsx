'use client'
import { useState, useEffect } from 'react';
import { subscriptionGet } from '@/store/action/admin/subscription'
import SubscriptionItem from '@/components/Admin/Subscription/SubscriptionItem'

export default function Subscription() {

    const [subscription, setSubscription] = useState([])

    useEffect(() => {
        async function fetchData() {
            let result = await subscriptionGet()
            setSubscription(result.subscriptionList)
        }
        fetchData()
    }, [])

    return (
        <div>
            <div className="flex justify-between bg-gray-200 p-1 rounded-[2px]">
                <p className="w-[40px]">
                    No
                </p>
                <div className="w-[calc(100%-40px)] flex justify-between items-center">
                    <p className='text-center w-[25%]'>Mail</p>
                    <p className='text-center w-[25%]'>Plan</p>
                    <p className='text-center w-[15%]'>Status</p>
                    <p className='text-center w-[35%]'>Action</p>
                </div>
            </div>
            {subscription.map((item: any, index: any) =>
                <SubscriptionItem
                    key={index}
                    index={index}
                    item={item}
                // setTyepList={(order: any, updateValue: any) => updateList(order, updateValue)}
                />
            )}
        </div>
    )
}