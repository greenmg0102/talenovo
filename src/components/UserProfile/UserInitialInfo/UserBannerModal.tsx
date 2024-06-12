import { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';
import clsx from 'clsx'
import { Spin } from 'antd';
import { LoadingOutlined, PlusOutlined, ProfileOutlined, CrownOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { GetProp, UploadProps, Select } from 'antd';
import { userBannerRegist } from '@/store/action/user/userProfile/userInfo'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const { TextArea } = Input;

function UserBannerModal({ isModalVisible, setIsModalVisible, userInfo, onchange }: any) {

    const [loading, setLoading] = useState(false);
    const [errorObject, setErrorObject] = useState<any>({})

    const handleSelectChange = (value: string) => {
        onchange({ ...userInfo, skill: value })
    };

    const handleOk = async () => {
        setLoading(true)
        let result = await userBannerRegist({
            avatar: userInfo.avatar,
            profile: userInfo.profile,
            jobTitle: userInfo.jobTitle,
            summary: userInfo.summary,
            skill: userInfo.skill
        })
        console.log('result', result);
        setLoading(false)
        if (result.isOkay) {
            setIsModalVisible(false);
            setErrorObject({})
        } else {
            setErrorObject(result.errorMessage)
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        onchange({ ...userInfo, profile: "", jobTitle: "", summary: "" })
    };

    console.log("loading", loading);

    return (
        <div>
            <Modal
                title="About Me"
                open={isModalVisible}
                footer={null}
                closeIcon={false}
            // onOk={handleOk}
            // onCancel={handleCancel}
            >
                <div>

                    <div className="flex justify-center py-4">
                        <div className="w-[100px] h-[100px] rounded-full border border-gray-200 border-[3px] flex justify-center items-center">
                            <img src={userInfo.avatar} className='w-[100px] h-[100px] bg-cover rounded-full shadow-lg' alt="avatar" />
                        </div>
                    </div>
                    <p className='text-center text-gray-400 text-[12px]'>You can update your photo in by clicking on manage account setting. </p>

                    <p className='text-center text-blue-500 my-2'>{userInfo.name}</p>

                    <p className='text-gray-400 my-2 font-semibold'>My Job Title</p>
                    <Input
                        value={userInfo.jobTitle}
                        placeholder="Job Title"
                        prefix={<CrownOutlined />}
                        className='w-full my-2'
                        onChange={(e: any) => onchange({ ...userInfo, jobTitle: e.target.value })}
                    />
                    <p className={clsx("text-[12px]", errorObject.jobTitle ? "text-red-400" : "invisible")}>{errorObject.jobTitle}</p>

                    <p className='text-gray-400 my-2 text-[14px] font-semibold'>My Profile Link</p>
                    <Input
                        value={userInfo.profile}
                        placeholder="Add your profile link such as Linkedin, Facebook, twitter etc..."
                        prefix={<ProfileOutlined />}
                        className='w-full my-2'
                        onChange={(e: any) => onchange({ ...userInfo, profile: e.target.value })}
                    />
                    <p className={clsx("text-[12px]", errorObject.profile ? "text-red-400" : "invisible")}>{errorObject.profile}</p>

                    <p className='text-gray-400 my-2 font-semibold'>Headline</p>
                    <TextArea
                        value={userInfo.summary}
                        rows={4}
                        placeholder="Add your headlines"
                        onChange={(e: any) => onchange({ ...userInfo, summary: e.target.value })}
                        maxLength={1000}
                        minLength={100}
                    />
                    <p className={clsx("text-[12px]", errorObject.summary ? "text-red-400" : "invisible")}>{errorObject.summary}</p>

                    <p className='text-gray-400 my-2'>My skill set </p>
                    <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        placeholder="Add skill sets to get customized job suggestions"
                        onChange={handleSelectChange}
                        options={userInfo.skill.map((item: any) => {
                            return {
                                value: item,
                                label: item,
                            }
                        })}
                    />
                    <p className={clsx("text-[12px]", errorObject.skill ? "text-red-400" : "invisible")}>{errorObject.skill}</p>


                    <div className='flex justify-end items-center mt-4'>
                        <div
                            className='bg-red-500 px-4 py-1 text-gray-100 cursor-pointer hover:shadow-lg'
                            onClick={handleCancel}
                        >
                            Cancel
                        </div>
                        <div
                            className='flex items-center bg-blue-500 px-4 py-1 text-gray-100 ml-4 cursor-pointer hover:shadow-lg'
                            onClick={handleOk}
                        >
                            {loading ? <Spin size="small" className='mr-1' /> : null}
                            Save
                        </div>

                    </div>

                </div>
            </Modal>
        </div>
    );
}

export default UserBannerModal;
