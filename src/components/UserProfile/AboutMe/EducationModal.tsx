import { useState } from 'react';
import { DatePicker, Space, Modal, Select, Input } from 'antd';
import { BankOutlined } from '@ant-design/icons';

function EducationModal({ isModalVisible, setIsModalVisible }: any) {

    const [value, setValue] = useState('');

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const { RangePicker } = DatePicker;
    const { TextArea } = Input;

    return (
        <div>
            <Modal
                title="Work History Regist"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className='p-2'>
                    <div className='flex justify-center mt-4'>
                        <RangePicker />
                    </div>
                    <div className='my-4 flex justify-between items-center'>
                        <Input placeholder="University or College" prefix={<BankOutlined />} className='w-1/2' />
                        <Select
                            defaultValue="bachelor"
                            style={{ width: 150 }}
                            onChange={handleChange}
                            options={[
                                { value: 'bachelor', label: 'Bachelor' },
                                { value: 'master', label: 'Master' },
                            ]}
                        />
                    </div>
                    <TextArea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="About what you learned in"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                </div>
            </Modal>
        </div>
    );
}

export default EducationModal;
