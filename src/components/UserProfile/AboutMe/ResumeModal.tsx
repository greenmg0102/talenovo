import { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Modal, GetProp, UploadProps, message, Upload } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

function MyComponent({ isModalVisible, setIsModalVisible }: any) {

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const getBase64 = (img: FileType, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <Modal
            title="Resume & other Attachment Upload"
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <div className='flex justify-start items-start border border-gray-200 p-2 rounded-[8px]'>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader !w-[120px]"
                    showUploadList={false}
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                <div className='w-full'>
                    <p className='text-center mb-2'>Attachment File Detail Information</p>
                    <div className='flex justify-start items-center'>
                        <p className='w-1/4 text-left'>Name</p>
                        <p className='w-3/4 text-left'>: File Name</p>
                    </div>
                    <div className='flex justify-start items-center'>
                        <p className='w-1/4 text-left'>Size</p>
                        <p className='w-3/4 text-left'>: File Size</p>
                    </div>
                    <div className='flex justify-start items-center'>
                        <p className='w-1/4 text-left'>Description</p>
                        <p className='w-3/4 text-left'>: File Description</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default MyComponent;
