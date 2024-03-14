import { useState } from 'react';
import { DatePicker, Space, Modal, Select, Input } from 'antd';
import { PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import { userOtherRegist } from '@/store/action/user/userProfile/userInfo'

// Create a functional component to demonstrate the usage of the Modal
function UserInfoModal({ isModalVisible, setIsModalVisible, userInfo, onchange }: any) {


    const handleOk = async () => {
        let result = await userOtherRegist({
            locatedin: userInfo.locatedin,
            gender: userInfo.gender
        })
        if (result.isOkay) {
            setIsModalVisible(false);
        } else {

        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        onchange({ ...userInfo, locatedin: "", gender: "Male" })
    };

    return (
        <div>
            <Modal
                title="User Initial Information"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className=''>
                    <div className='flex justify-between items-center flex-wrap'>
                        <div className='w-1/2 p-2'>
                            <p>I am located in</p>
                        </div>
                        <div className='w-1/2 p-2'>
                            <Input value={userInfo.locatedin} placeholder="Your position" prefix={<HomeOutlined />} className='w-full' onChange={(e: any) => onchange({ ...userInfo, locatedin: e.target.value })} />
                        </div>
                        <div className='w-1/2 p-2'>
                            <p>Gender</p>
                        </div>
                        <div className='w-1/2 p-2'>
                            <Select
                                defaultValue={userInfo.gender}
                                style={{ width: '100%' }}
                                onChange={(e: any) => onchange({ ...userInfo, gender: e })}
                                options={[
                                    { value: 'Male', label: 'Male' },
                                    { value: 'Female', label: 'Female' },
                                    { value: 'Agency', label: 'Agency' }
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default UserInfoModal;
