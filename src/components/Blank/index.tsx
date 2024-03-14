

import clsx from 'clsx'
export default function Blank() {

    return (
        <div
            className={clsx(
                "fixed w-full h-screen left-0 top-0 z-[99999] bg-gray-900 opacity-75"
            )}
        >
            Blank
        </div>
    )
}