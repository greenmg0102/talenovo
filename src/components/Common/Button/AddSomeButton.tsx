
const AddSomeButton = ({ text, add }: any) => {

    return (
        <div
            onClick={add}
            className="flex justify-start items-center text-blue-500 hover:border hover:border-blue-500 transition-all px-4 border-dashed py-[2px] rounded-[4px] cursor-pointer"
        >
            <svg viewBox="64 64 896 896" className="mr-2" focusable="false" data-icon="appstore-add" width="1em" height="1em" fill="currentColor" aria-hidden="true"><defs><style></style></defs><path d="M464 144H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H212V212h200v200zm452-268H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H612V212h200v200zm52 132H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H612V612h200v200zM424 712H296V584c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v128H104c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h128v128c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V776h128c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path></svg>
            <p>Add {text}</p>
        </div>
    );
};

export default AddSomeButton;
