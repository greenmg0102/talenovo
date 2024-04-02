'use client'
import { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";

const UserInitialInfo = ({ userInfo, onchange }: any) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userData, setUserData] = useState<any>({});

  const { user } = useUser();

  const email = user?.primaryEmailAddress?.emailAddress;
  const clerkId = user?.id;

  useEffect(() => {
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
        // Handle the response data
        //redirect to checkout page
        setUserData(data.user);
      })
      .catch(error => {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [email])

  const add = () => {
    setIsModalVisible(!isModalVisible)
  }

  console.log("userData", userData);


  return (
    <div className="relative">
      {/* <UserInfoModal
        userInfo={userInfo}
        isModalVisible={isModalVisible}
        onchange={(total: any) => onchange(total)}
        setIsModalVisible={(bool: any) => setIsModalVisible(bool)}
      /> */}
      {/* <EditButton add={add} /> */}
      <p className='text-center py-6 text-[20px]'>Profile information</p>

      <div className='flex justify-between items-start flex-wrap py-8 pb-0 border border-dashed border-r-0 border-l-0'>

        <div className='w-full sm:w-1/2 mb-8'>
          <p className='text-center text-[16px]'>Phone Number</p>
          {userInfo.phone.map((item: any, index: any) =>
            <p key={index} className='text-center text-blue-500'>{item}</p>
          )}
        </div>

        <div className='w-full sm:w-1/2 mb-8'>
          <p className='text-center'>E-mail</p>
          {userInfo.mail.map((item: any, index: any) =>
            <p key={index} className='text-center text-blue-500'>{item}</p>
          )}
        </div>

        <div className='w-full sm:w-1/2 mb-8'>
          <p className='text-center'>Location</p>
          <p className='text-center text-blue-500'>{userInfo.locatedin}</p>
        </div>

        <div className='w-full sm:w-1/2 mb-8'>
          <p className='text-center'>Subscriptions</p>
          {Object.keys(userData).length > 0 ?
            <div>
              <p className='text-center text-blue-500'>{userData.planName}</p>
            </div>
            :
            <p className='text-center text-blue-500'>Free</p>
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
