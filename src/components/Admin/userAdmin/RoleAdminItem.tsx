import { useState } from 'react'
import { deleteAdmin } from '@/store/action/admin/role'

const RoleAdminItem = ({ item, order, setTyepList }: { item: any, order: any, setTyepList: any }) => {


  const [active, setActive] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const changeItem = () => {
    setActive(!active)
  }

  const deleteItem = async (id: any) => {
    setActive(!active)
    let result = await deleteAdmin({ id: id })
    if (result.result) {
      setTyepList(order, null)
    } else {
      setIsVisible(false)
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="flex justify-between border border-white hover:border-dashed hover:border-gray-200 p-1 my-2">
      <p className="w-[20px] text-[14px]">
        {order + 1}
      </p>
      <div className="w-[calc(100%-40px)] flex justify-between items-center">
        <div className='flex jsutify-start items-center text-[14px]'>
          {item.name}
        </div>
        {active ?
          <div className="flex justify-start items-center">
            <div
              className="text-[14px] border border-red-500 text-red-500 rounded-[4px] px-3 py-1 mr-1"
              onClick={() => deleteItem(item._id)}
            >
              Delete
            </div>
            <div
              className="text-[14px] border border-blue-500 text-blue-500 rounded-[4px] px-3 py-1"
              onClick={() => changeItem()}
            >
              Return
            </div>
          </div>
          :
          <div
            className="text-[14px] border border-green-500 text-green-500 rounded-[4px] px-3 py-1"
            onClick={() => changeItem()}
          >
            Change
          </div>
        }
      </div>
    </div>
  );
};

export default RoleAdminItem;


