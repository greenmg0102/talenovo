import { useState } from 'react';
import { DatePicker, Space, Modal, Select, Input } from 'antd';
import { PhoneOutlined, HomeOutlined } from '@ant-design/icons';

// Create a functional component to demonstrate the usage of the Modal
function UserInfoModal({ isModalVisible, setIsModalVisible }: any) {

    const [value, setValue] = useState('');

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    // State to control the visibility of the modal

    // Function to handle the visibility of the modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Function to handle the closing of the modal
    const handleOk = () => {
        setIsModalVisible(false);
    };

    // Function to handle the cancel action of the modal
    const handleCancel = () => {
        setIsModalVisible(false);
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
                            <p>Phone Number</p>
                        </div>
                        <div className='w-1/2 p-2'>
                            <Input placeholder="default size" prefix={<PhoneOutlined />} className='w-full' />
                        </div>
                        <div className='w-1/2 p-2'>
                            <p>I am located in</p>
                        </div>
                        <div className='w-1/2 p-2'>
                            <Input placeholder="Florida, United State" prefix={<HomeOutlined />} className='w-full' />
                        </div>
                        <div className='w-1/2 p-2'>
                            <p>Gender</p>
                        </div>
                        <div className='w-1/2 p-2'>
                            <Select
                                defaultValue="Male"
                                style={{ width: '100%' }}
                                onChange={handleChange}
                                options={[
                                    { value: 'Male', label: 'Male' },
                                    { value: 'Female', label: 'Female' },
                                    { value: 'They', label: 'He/They or She/They' },
                                    { value: 'no', label: 'Don"t wanna show' },
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
