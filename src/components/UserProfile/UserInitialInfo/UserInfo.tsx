'use client'
import { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { jobLocationPut } from "@/store/action/user/jobInfo/jobLocation"
import SearchInput from '@/components/Common/Input/SearchInput'
import { Switch, Button } from 'antd';

const UserInitialInfo = ({ userInfo, onchange, updateLocation }: any) => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [searchHint, setSearchHint] = useState({
    location: "",
  })
  const [isEditable, setIsEditable] = useState(true)
  const [userData, setUserData] = useState<any>({});
  const [jobLocation, setJobLocation] = useState([])

  const { user } = useUser();

  const email = user?.primaryEmailAddress?.emailAddress;
  const clerkId = user?.id;

  const bufferupdateLocation = () => {
    updateLocation()
    setIsEditable(!isEditable)
  }

  useEffect(() => {

    async function locationFetchData(hint: any) {
      const data = { locationHint: hint }
      let reslutJobLocation = await jobLocationPut(data)
      setJobLocation(reslutJobLocation)
    }

    if (searchHint.location !== "") locationFetchData(searchHint.location)

  }, [searchHint])

  useEffect(() => {
    fectData()
  }, [email])

  // const handleCancel = async () => {
  //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stripe/cancel-subscription`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // Add any additional headers if needed
  //     },
  //     body: JSON.stringify({
  //       subscriptionId: userData.subscriptionId,
  //     }),
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json(); // Parse the response body as JSON
  //     })
  //     .then(data => {

  //       fectData()
  //       window.alert(data.message);
  //     })
  //     .catch(error => {
  //       // Handle errors
  //       console.error('There was a problem with the fetch operation:', error);
  //     });
  // };

  // const handleResume = async () => {
  //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stripe/re-active-subscription`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // Add any additional headers if needed
  //     },
  //     body: JSON.stringify({
  //       subscriptionId: userData.subscriptionId,
  //     }),
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json(); // Parse the response body as JSON
  //     })
  //     .then(data => {
  //       fectData()
  //       window.alert(data.message);
  //     })
  //     .catch(error => {
  //       // Handle errors
  //       console.error('There was a problem with the fetch operation:', error);
  //     });
  // };

  // const handleDelete = async () => {
  //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stripe/delete-subscription`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // Add any additional headers if needed
  //     },
  //     body: JSON.stringify({
  //       subscriptionId: userData.subscriptionId,
  //     }),
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json(); // Parse the response body as JSON
  //     })
  //     .then(data => {

  //       fectData()
  //       window.alert(data.message);
  //     })
  //     .catch(error => {
  //       // Handle errors
  //       console.error('There was a problem with the fetch operation:', error);
  //     });
  // };


  // const add = () => {
  //   setIsModalVisible(!isModalVisible)
  // }


  const fectData = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stripe/get-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response body as JSON
      })
      .then(data => {
        //redirect to checkout page
        setUserData(data.user);
      })
      .catch(error => {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  return (
    <div className="relative">
      {/* <UserInfoModal
        userInfo={userInfo}
        isModalVisible={isModalVisible}
        onchange={(total: any) => onchange(total)}
        setIsModalVisible={(bool: any) => setIsModalVisible(bool)}
      /> */}
      {/* <EditButton add={add} /> */}
      <p className='text-center py-6 text-[20px] font-bold text-gray-600 flex justify-center items-center'>
        <svg className='mr-2' viewBox="64 64 896 896" focusable="false" data-icon="user" width="1.3em" height="1e.3m" fill="currentColor" aria-hidden="true"><path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path></svg>
        My Profile Information
      </p>

      <div className='flex justify-between items-start flex-wrap py-8 pb-0 border border-dashed border-r-0 border-l-0'>

        <div className='w-full sm:w-1/2 mb-8'>
          <p className='text-center text-gray-600 flex justify-center items-center font-semibold text-[18px]'>
            <svg className='mr-2' viewBox="64 64 896 896" focusable="false" data-icon="phone" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M877.1 238.7L770.6 132.3c-13-13-30.4-20.3-48.8-20.3s-35.8 7.2-48.8 20.3L558.3 246.8c-13 13-20.3 30.5-20.3 48.9 0 18.5 7.2 35.8 20.3 48.9l89.6 89.7a405.46 405.46 0 01-86.4 127.3c-36.7 36.9-79.6 66-127.2 86.6l-89.6-89.7c-13-13-30.4-20.3-48.8-20.3a68.2 68.2 0 00-48.8 20.3L132.3 673c-13 13-20.3 30.5-20.3 48.9 0 18.5 7.2 35.8 20.3 48.9l106.4 106.4c22.2 22.2 52.8 34.9 84.2 34.9 6.5 0 12.8-.5 19.2-1.6 132.4-21.8 263.8-92.3 369.9-198.3C818 606 888.4 474.6 910.4 342.1c6.3-37.6-6.3-76.3-33.3-103.4zm-37.6 91.5c-19.5 117.9-82.9 235.5-178.4 331s-213 158.9-330.9 178.4c-14.8 2.5-30-2.5-40.8-13.2L184.9 721.9 295.7 611l119.8 120 .9.9 21.6-8a481.29 481.29 0 00285.7-285.8l8-21.6-120.8-120.7 110.8-110.9 104.5 104.5c10.8 10.8 15.8 26 13.3 40.8z"></path></svg>
            Phone Number
          </p>
          {userInfo.phone.map((item: any, index: any) =>
            <p key={index} className='text-center text-blue-500'>{item}</p>
          )}
        </div>

        <div className='w-full sm:w-1/2 mb-8'>
          <p className='text-center text-gray-600 flex justify-center items-center font-semibold text-[18px]'>
            <svg className='mr-2' viewBox="64 64 896 896" focusable="false" data-icon="mail" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0068.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path></svg>
            E-mail
          </p>
          {userInfo.mail.map((item: any, index: any) =>
            <p key={index} className='text-center text-blue-500'>{item}</p>
          )}
        </div>

        <div className='w-full sm:w-1/2 mb-8'>
          <p className='text-center text-gray-600 flex justify-center items-center font-semibold text-[18px]'>
            <svg className='mr-2' viewBox="64 64 896 896" focusable="false" data-icon="environment" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M854.6 289.1a362.49 362.49 0 00-79.9-115.7 370.83 370.83 0 00-118.2-77.8C610.7 76.6 562.1 67 512 67c-50.1 0-98.7 9.6-144.5 28.5-44.3 18.3-84 44.5-118.2 77.8A363.6 363.6 0 00169.4 289c-19.5 45-29.4 92.8-29.4 142 0 70.6 16.9 140.9 50.1 208.7 26.7 54.5 64 107.6 111 158.1 80.3 86.2 164.5 138.9 188.4 153a43.9 43.9 0 0022.4 6.1c7.8 0 15.5-2 22.4-6.1 23.9-14.1 108.1-66.8 188.4-153 47-50.4 84.3-103.6 111-158.1C867.1 572 884 501.8 884 431.1c0-49.2-9.9-97-29.4-142zM512 880.2c-65.9-41.9-300-207.8-300-449.1 0-77.9 31.1-151.1 87.6-206.3C356.3 169.5 431.7 139 512 139s155.7 30.5 212.4 85.9C780.9 280 812 353.2 812 431.1c0 241.3-234.1 407.2-300 449.1zm0-617.2c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 551c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 439c0-29.9 11.7-58 32.8-79.2C454 338.6 482.1 327 512 327c29.9 0 58 11.6 79.2 32.8C612.4 381 624 409.1 624 439c0 29.9-11.6 58-32.8 79.2z"></path></svg>
            Location
          </p>
          <p className='text-center text-blue-500 flex justify-center items-center mb-2'>
            {userInfo.locatedin}
            {isEditable ?

              <svg className='ml-2' onClick={() => setIsEditable(!isEditable)} viewBox="64 64 896 896" focusable="false" data-icon="edit" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path></svg>
              :
              <svg className='ml-2' viewBox="64 64 896 896" onClick={bufferupdateLocation} focusable="false" data-icon="save" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184zm456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840zM512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144zm0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"></path></svg>
              // <svg viewBox="64 64 896 896" focusable="false" data-icon="issues-close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm72-112c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48zm400-188h-59.3c-2.6 0-5 1.2-6.5 3.3L763.7 538.1l-49.9-68.8a7.92 7.92 0 00-6.5-3.3H648c-6.5 0-10.3 7.4-6.5 12.7l109.2 150.7a16.1 16.1 0 0026 0l165.8-228.7c3.8-5.3 0-12.7-6.5-12.7zm-44 306h-64.2c-5.5 0-10.6 2.9-13.6 7.5a352.2 352.2 0 01-49.8 62.2A355.92 355.92 0 01651.1 840a355 355 0 01-138.7 27.9c-48.1 0-94.8-9.4-138.7-27.9a355.92 355.92 0 01-113.3-76.3A353.06 353.06 0 01184 650.5c-18.6-43.8-28-90.5-28-138.5s9.4-94.7 28-138.5c17.9-42.4 43.6-80.5 76.4-113.2 32.8-32.7 70.9-58.4 113.3-76.3a355 355 0 01138.7-27.9c48.1 0 94.8 9.4 138.7 27.9 42.4 17.9 80.5 43.6 113.3 76.3 19 19 35.6 39.8 49.8 62.2 2.9 4.7 8.1 7.5 13.6 7.5H892c6 0 9.8-6.3 7.2-11.6C828.8 178.5 684.7 82 517.7 80 278.9 77.2 80.5 272.5 80 511.2 79.5 750.1 273.3 944 512.4 944c169.2 0 315.6-97 386.7-238.4A8 8 0 00892 694z"></path></svg>
            }
          </p>

          {!isEditable &&

            <SearchInput
              value={userData}
              type={'location'}
              warn={{ location: "" }}
              title={"Location *"}
              isTtitle={true}
              list={jobLocation}
              formatList={() => setJobLocation([])}
              pushList={(type: any, eachvalue: any) => onchange({ ...userInfo, locatedin: eachvalue })}
              onchange={(type: any, eachvalue: any) => setSearchHint({ ...searchHint, [type]: eachvalue })}
            />
          }

        </div>

        <div className='w-full sm:w-1/2 mb-8'>
          <p className='text-center text-gray-600 flex justify-center items-center font-semibold text-[18px]'>
            <svg className='mr-2' viewBox="64 64 896 896" focusable="false" data-icon="pay-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm159.6-585h-59.5c-3 0-5.8 1.7-7.1 4.4l-90.6 180H511l-90.6-180a8 8 0 00-7.1-4.4h-60.7c-1.3 0-2.6.3-3.8 1-3.9 2.1-5.3 7-3.2 10.9L457 515.7h-61.4c-4.4 0-8 3.6-8 8v29.9c0 4.4 3.6 8 8 8h81.7V603h-81.7c-4.4 0-8 3.6-8 8v29.9c0 4.4 3.6 8 8 8h81.7V717c0 4.4 3.6 8 8 8h54.3c4.4 0 8-3.6 8-8v-68.1h82c4.4 0 8-3.6 8-8V611c0-4.4-3.6-8-8-8h-82v-41.5h82c4.4 0 8-3.6 8-8v-29.9c0-4.4-3.6-8-8-8h-62l111.1-204.8c.6-1.2 1-2.5 1-3.8-.1-4.4-3.7-8-8.1-8z"></path></svg>
            Subscriptions
          </p>

          {userData && userData.planName && userData.planName !== "free" ?
            <div>
              <p className='text-center text-blue-500'>{userData.planName}</p>
              <p className='text-center text-blue-500 text-[13px]'>
                <Link
                  href="https://billing.stripe.com/p/login/test_fZeeX92VnaZD11K6oo"
                  className="hover:underline text-red-500 hover:text-green-500 cursor-pointer ml-2"
                >
                  Manage subscriptions
                </Link>
              </p>
            </div>
            :
            <div>
              <p className='text-center text-blue-500'>{userData && userData.planName}</p>

              <p className='text-center text-blue-500 text-[13px]'>
                You can start
                <Link
                  href="/premium"
                  className="hover:underline text-red-500 hover:text-green-500 cursor-pointer ml-2"
                >
                  Here
                </Link>
              </p>

            </div>
          }
        </div>

        {/* <div className='w-full sm:w-1/3 mb-8'>
          <p className='text-center'>Age</p>
          {userInfo.birthday === "" ?
            <p className="text-center text-gray-300 text-[14px]">
              You did n't register <span className='text-gray-400'> Your Birthday </span>yet
            </p>
            :
            <p className="text-center text-blue-500" >
              {userInfo.birthday}
            </p>
          }
        </div> */}

        {/* <div className='w-full sm:w-1/3 mb-12'>
          <p className='text-center'>Experience</p>
          {userInfo.experience === 0 ?
            <p className="text-center text-gray-300 text-[14px]">
              You did n't register <span className='text-gray-400'> Year of the Experience </span>yet
            </p>
            :
            <p className="text-center text-blue-500" >
              {userInfo.experience}
            </p>
          }
        </div> */}

        {/* <div className='w-full sm:w-1/3 mb-12'>
          <p className='text-center'>CTC</p>
          {userInfo.ctc === 0 ?
            <p className="text-center text-gray-300 text-[14px]">
              You did n't register <span className='text-gray-400'> Expected CTC </span>yet
            </p>
            :
            <p className="text-center text-blue-500" >
              {userInfo.ctc} $
            </p>
          }
        </div> */}

        {/* <div className='w-full sm:w-1/3 mb-12'>
          <p className='text-center'>Profile views</p>
          <p className='text-center text-[32px] text-blue-500'>{userInfo.profileViews}</p>
        </div> */}

        {/* <div className='w-full sm:w-1/3 mb-12'>
          <p className='text-center'>Bookmarked Job</p>
          <p className='text-center text-[32px] text-blue-500'>{userInfo.bookmark}</p>
        </div> */}

        {/*<div className='w-full sm:w-1/3 mb-12'>
          <p className='text-center'>Job applied</p>
          <p className='text-center text-[32px] text-blue-500'>{userInfo.appliedJob}</p>
        </div> */}

        {/* <div className='w-full sm:w-1/3 mb-12'>
          <p className='text-center'>Job posted</p>
          <p className='text-center text-[32px] text-blue-500'>{userInfo.postedJob}</p>
        </div> */}

        {/* <div className='w-full sm:w-1/3 mb-12'>
          <p className='text-center'>Gender</p>
          <p className='text-center text-blue-500'>{userInfo.gender}</p>
        </div> */}
      </div>
    </div>
  );
};

export default UserInitialInfo;
