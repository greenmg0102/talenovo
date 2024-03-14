import React from "react";

const IsRemote = ({ item, onchange, totalValue }) => {

    return (
        <div
            className="border border rounded-full px-4 py-1 flex justify-start items-center cursor-pointer"
            onClick={() => onchange('isRemote', !totalValue.isRemote)}
        >
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" ><path d="M22 22L2 22" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" /><path d="M2 11L6.06296 7.74968M22 11L13.8741 4.49931C12.7784 3.62279 11.2216 3.62279 10.1259 4.49931L9.34398 5.12486" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" /><path d="M15.5 5.5V3.5C15.5 3.22386 15.7239 3 16 3H18.5C18.7761 3 19 3.22386 19 3.5V8.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" /><path d="M4 22V9.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" /><path d="M20 9.5V13.5M20 22V17.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" /><path d="M15 22V17C15 15.5858 15 14.8787 14.5607 14.4393C14.1213 14 13.4142 14 12 14C10.5858 14 9.87868 14 9.43934 14.4393M9 22V17" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M14 9.5C14 10.6046 13.1046 11.5 12 11.5C10.8954 11.5 10 10.6046 10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5Z" stroke="#1C274C" strokeWidth="1.5" /></svg>
            <p className="mx-2"> {item.title} </p>
            {totalValue.isRemote ?
                <svg viewBox="64 64 896 896" focusable="false" data-icon="stop" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372 0-89 31.3-170.8 83.5-234.8l523.3 523.3C682.8 852.7 601 884 512 884zm288.5-137.2L277.2 223.5C341.2 171.3 423 140 512 140c205.4 0 372 166.6 372 372 0 89-31.3 170.8-83.5 234.8z"></path></svg>
                :
                <svg viewBox="64 64 896 896" focusable="false" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg>
            }
        </div>
    );
};

export default IsRemote;