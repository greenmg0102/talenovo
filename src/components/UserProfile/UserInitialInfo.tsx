import UserBanner from "@/components/UserProfile/UserInitialInfo/UserBanner";
import UserInfo from "@/components/UserProfile/UserInitialInfo/UserInfo";

const UserInitialInfo = () => {
  return (
    <div className="flex justify-between items-start border">
      <div className="w-1/4 border">
        <UserBanner />
      </div>
      <div className="w-3/4">
        <UserInfo />
      </div>
    </div>
  );
};

export default UserInitialInfo;
