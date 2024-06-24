"use client";
import { useEffect } from "react";
import { scarppingStart } from '@/store/action/automation/scraping';


export default function AutomationStarting() {

    useEffect(() => {
        async function startScraping() {
            scarppingStart()
        }
        startScraping()
    }, [])

    return (
        <div>
            <div className="cursor-pointer text-center ease-in-up hidden rounded-sm bg-primary px-8 py-3 text-base font-medium text-white shadow-btn transition duration-300 hover:bg-opacity-90 hover:shadow-btn-hover md:block md:px-9 lg:px-6 xl:px-9">
                <div className='w-full h-32 flex justify-center items-center'>
                    <svg viewBox="0 0 1024 1024" focusable="false" data-icon="loading" width="2em" height="2em" className='animate-spin' fill="currentColor" aria-hidden="true"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path></svg>
                </div>
                Automation Scraping Running  . . .
            </div>
        </div>
    )
}