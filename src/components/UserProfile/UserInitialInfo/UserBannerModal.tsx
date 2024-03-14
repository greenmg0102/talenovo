import { useState } from 'react';
import { Modal, Input } from 'antd';
import { MailOutlined, ProfileOutlined } from '@ant-design/icons';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import { userBannerRegist } from '@/store/action/user/userProfile/userInfo'


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

function UserBannerModal({ isModalVisible, setIsModalVisible, userInfo, onchange }: any) {

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

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
        const isLt2M = file.size / 1024 / 1024 < 2;
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

    const handleOk = async () => {
        let result = await userBannerRegist({
            profile: userInfo.profile
        })
        if (result.isOkay) {
            setIsModalVisible(false);
        } else {

        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        onchange({ ...userInfo, profile: "" })
    };

    return (
        <div>
            <Modal
                title="User Initial Information"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div>
                    <div className='w-full mt-4 flex justify-center items-center'>
                        <Upload
                            name="avatar"
                            listType="picture-circle"
                            className="avatar-uploader !w-[100px]"
                            showUploadList={false}
                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </div>
                    <Input value={userInfo.profile} placeholder="Profile Link" prefix={<ProfileOutlined />} className='w-full' onChange={(e: any) => onchange({ ...userInfo, profile: e.target.value })} />
                </div>
            </Modal>
        </div>
    );
}

export default UserBannerModal;