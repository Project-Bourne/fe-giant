// "use client"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "@/services/auth.service";
import { CustomModal } from "@/components/ui";
import { useRouter } from "next/router";
import Loader from "@/components/ui/Loader";
import Group from "@/components/dashboard/Group";
import logo from "../../public/images/logo.png";
import Image from "next/image";
import RightComp from "@/components/layouts/Header/RightComp";

function Index() {
  const authService = new AuthService();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  // const [reload, setReload] = useState(false);
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const { documents, archivedDocs } = useSelector(
    (state: any) => state.documents,
  );
  const collabExportsCount = 0;

  useEffect(() => {
    setUserData(user);
  }, [user]);

  return (
    <React.Fragment>
      {/* logo  */}
      <div
        className={
          "mb-[60px] border-b-[2px] p-[25px] w-full flex items-center justify-center"
        }
      >
        <div>
          <Image
            src={logo}
            alt="IRP Logo"
            className={`h-[70px] md:h-[60px] w-[70px] md:w-[60px] mx-auto mt-[2rem] flex items-center`}
            priority
          />
          <h1 className="text-sirp-primary md:text-2xl text-xl mt-[2px] font-bold text-center">
            Deep Soul
          </h1>
        </div>

        <div className={"absolute right-3 top-10"}>
          <RightComp dashboard />
        </div>
      </div>

      <div className={"flex self-center content-center items-center"}>
        {user?.firstName && (
          <h2 className="text-black text-2xl font-bold capitalize mt-[1rem] lg:ml-[11rem] md:ml-[14rem] ml-[19rem] ">
            Welcome {userData?.firstName}
          </h2>
        )}
      </div>

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
      <div className="mb-5 mt-0 flex justify-center items-center ">
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
