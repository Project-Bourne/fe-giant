// "use client"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "@/services/auth.service";
import NotificationService from "@/services/notification.service";
import { CustomModal } from "@/components/ui";
import { setAccessToken, setUserInfo } from "@/redux/reducers/authReducer";
import { useRouter } from "next/router";
import Loader from "@/components/ui/Loader";
import Group from "@/components/dashboard/Group";
// import LeftCompDB from "@/components/dashboard/LeftComp";
// import RightCompDB from "@/components/dashboard/RightComp";
import logo from "../../public/images/logo.png";
import Image from "next/image";

function Index() {
  const authService = new AuthService();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const userAccessToken = useSelector(
    (state: any) => state?.auth?.userAccessToken,
  );
  const { documents, archivedDocs } = useSelector(
    (state: any) => state.documents,
  );
  const collabExportsCount = 0;

  useEffect(() => {
    setUserData(user);
  }, [user]);

  useEffect(() => {
    getUserInfo();
  }, [userAccessToken]);

  const getUserInfo = async () => {
    setLoading(true);
    try {
      const response = await authService.getUserViaAccessToken();
      setLoading(false);
      if (response?.status) {
        dispatch(setUserInfo(response?.data));
        setUserData(response?.data);
      } else {
        setLoading(false);
        NotificationService.error({
          message: "Error",
          addedText: "Could not fetch user data",
          position: "top-center",
        });
      }
    } catch (err) {
      setLoading(false);
      NotificationService.error({
        message: "Error",
        addedText: err?.message,
        position: "top-center",
      });
    }
  };

  return (
    <React.Fragment>
      {/* logo  */}
      <div>
        <Image
          src={logo}
          alt="IRP Logo"
          className={`h-[70px] md:h-[150px] w-[70px] md:w-[150px] mx-auto mt-[2rem] flex items-center`}
          priority
        />
        <h1 className="text-sirp-primary md:text-3xl text-xl font-bold text-center">
          Deep Soul
        </h1>
      </div>

      {user?.firstName && (
        <h2 className="text-black text-2xl font-bold capitalize mt-[3rem] -mb-[2rem] ml-[10rem]">
          Welcome {userData?.firstName}
        </h2>
      )}

      {/* the yellow navigation at the top of the dashboard page */}
      {/* <div className="grid grid-cols-1 px-[5px] md:px-0 md:grid-cols-2 justify-between md:items-center w-full md:w-[95%] md:mx-auto md:gap-x-[20px] gap-y-[20px] mt-5">
        <LeftCompDB
          docsCount={documents[0]?.length}
          collabExportsCount={collabExportsCount}
        />
        <RightCompDB
          crawledContentCount={documents[0]?.length}
          archivedDocsCount={archivedDocs?.length}
        />
      </div> */}
      <div className="mb-5 mt-0">
        <Group userData={userData} />
      </div>
      {loading && (
        <CustomModal
          style="bg-transparent w-full relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5 flex justify-center"
          closeBtn={false}
        >
          <Loader />
        </CustomModal>
      )}
    </React.Fragment>
  );
}

export default Index;
