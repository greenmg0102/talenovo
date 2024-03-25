'use client '
import { useState, useEffect } from 'react';
import { suggestJobs } from '@/store/action/user/landing/suggestion'
import { Alert } from 'antd';
import MyJobAlerttem from '@/components/UserProfile/MyJobAlert/MyJobAlerttem'

const MyAlert = ({ skill, locatedin }: any) => {

  const [loading, setLoading] = useState(true)
  const [suggestList, setSuggestList] = useState(undefined);

  useEffect(() => {
    async function fetchSuggestJobs() {

      if (locatedin !== null && skill !== null) {

        let data = {
          skill: skill,
          locatedin: locatedin
        }

        let result: any = await suggestJobs(data)
        setSuggestList(result)
        setLoading(false)
      }
    }
    fetchSuggestJobs()
  }, [locatedin, skill])

  return (
    <div>
      <div>
        {loading ?
          <div className='w-full h-40 flex justify-center items-center'>
            <svg viewBox="0 0 1024 1024" focusable="false" data-icon="loading" width="2em" height="2em" className='animate-spin' fill="currentColor" aria-hidden="true"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path></svg>
          </div>
          :
          <div>
            {suggestList === undefined ?
              null
              :
              <div>
                {suggestList.length > 0 ?
                  <div>
                    {suggestList.map((item: any, index: any) =>
                      <MyJobAlerttem key={index} item={item} />
                    )}
                  </div>
                  :
                  <Alert message="No jobs available, please check back again" type="info" />
                }
              </div>
            }
          </div>
        }
      </div>
    </div>
  );
};

export default MyAlert;