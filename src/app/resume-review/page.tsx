'use client'
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch } from 'antd';
const { Meta } = Card;

// export const metadata: Metadata = {
//   title: "Streamline your job search with intelligent technology that brings you the best-matched jobs, saving you time and effort",
//   description: "This is Home for Talenovo",
//   // other metadata
// };

export default function ResumeReview() {

  const text = "It will be content";

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Resume 1',
      children: <div>
        <div className='flex justify-start items-start flex-wrap'>
          {Array(4).fill(0).map((item: any, index: any) => index).map((item: any, index: any) =>
            <Card
              key={index}
              style={{ width: "25%", marginTop: 16 }}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Skeleton loading={false} avatar active>
                <Meta
                  avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />}
                  title="Quantify impacts"
                  description="Resume reviewer will be a premium page, it will use AI prompt to review the resume - refer to vercel for demo."
                />
              </Skeleton>
            </Card>
          )}
        </div>

        <p className='mt-2'>{text}</p>
      </div>,
    },
    {
      key: '2',
      label: 'Resume 2',
      children: <div>
        <Card
          style={{ width: 300, marginTop: 16 }}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Skeleton loading={false} avatar active>
            <Meta
              avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />}
              title="Quantify impacts"
              description="Resume reviewer will be a premium page, it will use AI prompt to review the resume - refer to vercel for demo."
            />
          </Skeleton>
        </Card>
        <p>{text}</p>
      </div>,
    },
    {
      key: '3',
      label: 'Resume 3',
      children: <div>
        <Card
          style={{ width: 300, marginTop: 16 }}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Skeleton loading={false} avatar active>
            <Meta
              avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />}
              title="Quantify impacts"
              description="Resume reviewer will be a premium page, it will use AI prompt to review the resume - refer to vercel for demo."
            />
          </Skeleton>
        </Card>
        <p>{text}</p>
      </div>,
    },
  ];

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <section className="pb-[120px] pt-[60px]">
      <div className="container">
        <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
      </div>
    </section>
  );
}
