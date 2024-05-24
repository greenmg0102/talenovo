import { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';
import { LoadingOutlined, PlusOutlined, ProfileOutlined, CrownOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { GetProp, UploadProps, Select } from 'antd';

import { userBannerRegist } from '@/store/action/user/userProfile/userInfo'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const { TextArea } = Input;

function UserBannerModal({ tagList, isModalVisible, setIsModalVisible, userInfo, onchange }: any) {

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleSelectChange = (value: string) => {
        onchange({ ...userInfo, skill: value })
    };

    // useEffect(() => {
    //     console.log("UserBannerModal", userInfo);
    //     if (userInfo.avatar !== "") setImageUrl(userInfo.avatar)
    // }, [userInfo])

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

                // onchange({ ...userInfo, avatar: url })
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
            avatar: userInfo.avatar,
            profile: userInfo.profile,
            jobTitle: userInfo.jobTitle,
            summary: userInfo.summary,
            skill: userInfo.skill
        })
        if (result.isOkay) {
            setIsModalVisible(false);
        } else {

        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        onchange({ ...userInfo, profile: "", jobTitle: "", summary: "" })
    };

    return (
        <div>
            <Modal
                title="About Me"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div>
                    {/* <div className='w-full mt-4 flex justify-center items-center'>
                        <Upload
                            name="avatar"
                            listType="picture-circle"
                            className="avatar-uploader !w-[100px]"
                            showUploadList={false}
                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} className='rounded-full' alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </div> */}

                    {/* <p className='text-center text-blue-500 my-2'>{userInfo.name}</p> */}

                    <p className='text-gray-400 my-4'>My Job Title</p>
                    <Input
                        value={userInfo.jobTitle}
                        placeholder="Job Title"
                        prefix={<CrownOutlined />}
                        className='w-full my-2'
                        onChange={(e: any) => onchange({ ...userInfo, jobTitle: e.target.value })}
                    />

                    <p className='text-gray-400 my-2 text-[14px]'>My Profile Link (Add your profile link such as Linkedin, Facebook, twitter etc...)</p>
                    <Input
                        value={userInfo.profile}
                        placeholder="Profile Link"
                        prefix={<ProfileOutlined />}
                        className='w-full my-2'
                        onChange={(e: any) => onchange({ ...userInfo, profile: e.target.value })}
                    />

                    <p className='text-gray-400 my-2'>Headline</p>
                    <TextArea
                        value={userInfo.summary}
                        rows={4}
                        placeholder="Add your headlines"
                        onChange={(e: any) => onchange({ ...userInfo, summary: e.target.value })}
                        maxLength={1000}
                        minLength={100}
                    />
                    <p className='text-gray-400 my-2'>My skill set </p>

                    <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        placeholder="Add skill sets to get customized job suggestions"
                        onChange={handleSelectChange}
                        options={tagList}
                    />

                </div>
            </Modal>
        </div>
    );
}

export default UserBannerModal;
