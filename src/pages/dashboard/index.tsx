import React, { useEffect, useState } from "react";
import Left from "./components/LeftCompt";
import Right from "./components/RightCompt";
import Group1 from "./components/Group1";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "@/services/auth.service";
import NotificationService from "@/services/notification.service";
import { CustomModal } from "@/components/ui";
import { setAccessToken, setUserInfo } from "@/redux/reducers/authReducer";
import { useRouter } from "next/router";
import Loader from "@/components/ui/Loader";

const index = () => {
  const authService = new AuthService();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const { documents, archivedDocs } = useSelector(
    (state: any) => state.documents,
  );
  const collabExportsCount = 0;

  useEffect(() => {
    setLoading(true);
    try {
      authService
        .getUserViaAccessToken()
        .then((response) => {
          setLoading(false);
          if (response?.status) {
            // console.log("user data via login", res);
            dispatch(setUserInfo(response?.data));
          }
        })
        .catch((err) => {
          NotificationService.error({
            message: "Error",
            addedText: "Could not fetch user data",
            position: "top-center",
          });
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="h-full overflow-y-scroll mt-[10rem]">
      <h1 className="text-black text-2xl pl-10 font-bold capitalize">
        Welcome {user?.firstName}
      </h1>

      {/* the yellow navigation at the top of the dashboard page */}
      <div className="grid grid-cols-1 px-[5px] md:px-0 md:grid-cols-2 justify-between md:items-center w-full md:w-[95%] md:mx-auto md:gap-x-[20px] gap-y-[20px] mt-5">
        <Left
          docsCount={documents?.length}
          collabExportsCount={collabExportsCount}
        />
        <Right
          crawledContentCount={documents?.length}
          archivedDocsCount={archivedDocs?.length}
        />
      </div>
      <div className="mt-5 mb-5">
        <Group1 />
      </div>
      {loading && (
        <CustomModal
          style="bg-transparent w-full relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5 flex justify-center"
          closeBtn={false}
        >
          <Loader />
        </CustomModal>
      )}
    </div>
  );
};

export default index;
