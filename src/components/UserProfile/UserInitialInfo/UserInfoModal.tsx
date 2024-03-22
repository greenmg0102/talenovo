import { useState } from 'react';
import { DatePicker, Space, DatePickerProps, Modal, Select, Input, InputNumber } from 'antd';
import { PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import { ProfileOutlined } from '@ant-design/icons';
import { userOtherRegist } from '@/store/action/user/userProfile/userInfo'

function UserInfoModal({ isModalVisible, setIsModalVisible, userInfo, onchange }: any) {

    const onChange = (date: any, dateString: any) => {
        if (date && date.isValid()) onchange({ ...userInfo, birthday: dateString })
    };


    const handleOk = async () => {
        let result = await userOtherRegist({
            birthday: userInfo.birthday,
            experience: userInfo.experience,
            ctc: userInfo.ctc,
        })
        if (result.isOkay) {
            setIsModalVisible(false);
        } else {

        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        onchange({ ...userInfo, birthday: "", experience: 0, ctc: 0 })
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
                            <p>Your Birthday</p>
                        </div>
                        <div className='w-1/2 p-2'>
                            <DatePicker
                                onChange={onChange}
                                className='w-full'
                            />
                            {/* <Input
                                value={userInfo.jobTitle}
                                placeholder="Profile Link"
                                prefix={<ProfileOutlined />}
                                className='w-full my-2'
                                onChange={(e: any) => onchange({ ...userInfo, jobTitle: e.target.value })}
                            /> */}
                        </div>
                        <div className='w-1/2 p-2'>
                            <p>Experience</p>
                        </div>
                        <div className='w-1/2 p-2'>
                            <InputNumber
                                value={userInfo.experience}
                                min={0}
                                max={50}
                                defaultValue={0}
                                onChange={(e: any) => onchange({ ...userInfo, experience: e })}
                                className='w-full'
                            />
                            {/* <Select
                                defaultValue={userInfo.gender}
                                style={{ width: '100%' }}
                                onChange={(e: any) => onchange({ ...userInfo, gender: e })}
                                options={[
                                    { value: 'Male', label: 'Male' },
                                    { value: 'Female', label: 'Female' },
                                    { value: 'Agency', label: 'Agency' }
                                ]}
                            /> */}
                        </div>
                        <div className='w-1/2 p-2'>
                            <p>CTC</p>
                        </div>
                        <div className='w-1/2 p-2'>
                            <InputNumber
                                value={userInfo.ctc}
                                addonBefore="+"
                                addonAfter="$"
                                defaultValue={0}
                                onChange={(e: any) => onchange({ ...userInfo, ctc: e })}
                            />

                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default UserInfoModal;
