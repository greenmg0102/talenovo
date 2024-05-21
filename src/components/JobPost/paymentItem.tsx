
const PaymentItem = ({ item, handleSubscription }: any) => {

  return (
    <div className="flex justify-between items-center py-4 border border-dashed border-l-0  border-r-0  border-t-0 ">
      <div className="w-full">
        <p className="font-medium mb-2 font-semibold text-[14px]">{item.title}</p>
        <p className="flex justify-start items-center">
          <svg className="mr-1" viewBox="64 64 896 896" focusable="false" data-icon="money-collect" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M911.5 700.7a8 8 0 00-10.3-4.8L840 718.2V180c0-37.6-30.4-68-68-68H252c-37.6 0-68 30.4-68 68v538.2l-61.3-22.3c-.9-.3-1.8-.5-2.7-.5-4.4 0-8 3.6-8 8V763c0 3.3 2.1 6.3 5.3 7.5L501 910.1c7.1 2.6 14.8 2.6 21.9 0l383.8-139.5c3.2-1.2 5.3-4.2 5.3-7.5v-59.6c0-1-.2-1.9-.5-2.8zM512 837.5l-256-93.1V184h512v560.4l-256 93.1zM660.6 312h-54.5c-3 0-5.8 1.7-7.1 4.4l-84.7 168.8H511l-84.7-168.8a8 8 0 00-7.1-4.4h-55.7c-1.3 0-2.6.3-3.8 1-3.9 2.1-5.3 7-3.2 10.8l103.9 191.6h-57c-4.4 0-8 3.6-8 8v27.1c0 4.4 3.6 8 8 8h76v39h-76c-4.4 0-8 3.6-8 8v27.1c0 4.4 3.6 8 8 8h76V704c0 4.4 3.6 8 8 8h49.9c4.4 0 8-3.6 8-8v-63.5h76.3c4.4 0 8-3.6 8-8v-27.1c0-4.4-3.6-8-8-8h-76.3v-39h76.3c4.4 0 8-3.6 8-8v-27.1c0-4.4-3.6-8-8-8H564l103.7-191.6c.6-1.2 1-2.5 1-3.8-.1-4.3-3.7-7.9-8.1-7.9z"></path></svg>
          ${item.price}, billed only once
        </p>
        {/* <p className="flex justify-start items-center">
          <svg className="mr-1" viewBox="64 64 896 896" focusable="false" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg>
          {item.amount} job posting
        </p> */}
        <p className="underline text-[14px] flex justify-start items-center">
          <svg className="mr-1" viewBox="64 64 896 896" focusable="false" data-icon="folder-view" width="1em" height="1em" fill="currentColor" aria-hidden="true"><defs><style></style></defs><path d="M309.1 554.3a42.92 42.92 0 000 36.4C353.3 684 421.6 732 512.5 732s159.2-48.1 203.4-141.3c5.4-11.5 5.4-24.8.1-36.3l-.1-.1-.1-.1C671.7 461 603.4 413 512.5 413s-159.2 48.1-203.4 141.3zM512.5 477c62.1 0 107.4 30 141.1 95.5C620 638 574.6 668 512.5 668s-107.4-30-141.1-95.5c33.7-65.5 79-95.5 141.1-95.5z"></path><path d="M457 573a56 56 0 10112 0 56 56 0 10-112 0z"></path><path d="M880 298.4H521L403.7 186.2a8.15 8.15 0 00-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32zM840 768H184V256h188.5l119.6 114.4H840V768z"></path></svg>
          View more details
        </p>
      </div>
      <div
        className="border rounded-[4px] py-1 px-2 border-red-500 text-red-500 cursor-pointer hover:text-gray-700 hover:shadow transition-all"
        onClick={() => handleSubscription({
          priceId: item.amount,
          packageName: item.amount,
        })}
      >
        Select
      </div>
    </div>
  );
};

export default PaymentItem;
