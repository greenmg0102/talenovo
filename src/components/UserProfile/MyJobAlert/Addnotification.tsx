import { Switch } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';

const Addnotification = ({ setNotificationType, notificationType }: any) => {
  return (
    <div className="">
      <div className='flex justify-start items-center pb-4 px-4 sm:px-16'>
        <NotificationOutlined className='text-gray-500' />
        <p className='text-[16px] text-gray-600 flex justify-start items-center pl-2'>
          Notification Setting
        </p>
      </div>
      <div className="px-4 sm:px-16">
        <div className="flex justify-between items-start flex-wrap">
          <p className="text-left text-gray-500 text-[15px] pb-4">
            Get recommended jobs notification email
          </p>
          <Switch checkedChildren="Yes" unCheckedChildren="No" checked={notificationType.email} onChange={(e) => setNotificationType({ ...notificationType, email: e })} />
        </div>
        <div className="flex justify-between items-start flex-wrap">
          <p className="text-left text-gray-500 text-[15px] pb-4">
            Get Talenovo Promotion & Marketing email
          </p>
          <Switch checkedChildren="Yes" unCheckedChildren="No" checked={notificationType.marketing} onChange={(e) => setNotificationType({ ...notificationType, marketing: e })} />
        </div>
        <div className="flex justify-between items-start flex-wrap">
          <p className="text-left text-gray-500 text-[15px] pb-4">
            Get Career Advice / Blogs email
          </p>
          <Switch checkedChildren="Yes" unCheckedChildren="No" checked={notificationType.blogs} onChange={(e) => setNotificationType({ ...notificationType, blogs: e })} />
        </div>
      </div>
    </div>
  );
};

export default Addnotification;
