import { useState } from 'react';
import { DatePicker, Space, Modal, Select, Input } from 'antd';
import type { SelectProps } from 'antd';
import { PushpinOutlined } from '@ant-design/icons';

function WokhistoryModal({ isModalVisible, setIsModalVisible }: any) {

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

    const options: SelectProps['options'] = [
        {
            label: 'React.js',
            value: 'React.js',
            desc: 'React.js ',
        },
        {
            label: 'Vue.js',
            value: 'Vue.js',
            desc: 'Vue.js',
        },
    ];

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
                        <Input placeholder="Software Position" prefix={<PushpinOutlined />} className='w-1/2' />
                        <Select
                            defaultValue="juniordeveloper"
                            style={{ width: 150 }}
                            onChange={handleChange}
                            options={[
                                { value: 'juniordeveloper', label: 'Junior developer' },
                                { value: 'seniordeveloper', label: 'Senior developer' },
                                { value: 'mentordeveloper', label: 'Mentor developer' },
                                { value: 'apideveloper', label: 'API developer' },
                            ]}
                        />
                    </div>
                    <TextArea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Please describe work history in company"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="select 5 stacks"
                        onChange={handleChange}
                        optionLabelProp="label"
                        className='mt-4'
                        options={options}
                        optionRender={(option) => (
                            <Space>
                                <span role="img" aria-label={option.data.label}>
                                    {option.data.emoji}
                                </span>
                                {option.data.desc}
                            </Space>
                        )}
                    />
                </div>
            </Modal>
        </div>
    );
}

export default WokhistoryModal;
