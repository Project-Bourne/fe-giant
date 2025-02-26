/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-filename-extension */
// "use client"
import React, { useEffect, useState } from "react";
// import { Router } from "next/router";
import { useDispatch, useSelector } from "react-redux";
// import AuthService from "@/services/auth.service";
import { CustomModal } from "@/components/ui";
import { useRouter } from "next/router";
import Loader from "@/components/ui/Loader";
import Group from "@/components/dashboard/Group";
// import logo from "../../public/images/logo.png";
// import Image from "next/image";
// import RightComp from "@/components/layouts/Header/RightComp";
// import { toast } from "react-toastify";
import DocumentService from "@/services/documents.service";
import {
  setAnalyzedTotal,
  setCollabTotal,
  setDeepChatTotal,
  setFactsTotal,
  setInterrogatedTotal,
  setSummarizedTotal,
  setTranslatedTotal,
} from "@/redux/reducers/documentReducer";

function Index() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [total, setTotal] = useState({
    facts: 0,
    summarized: 0,
    interrogated: 0,
    translated: 0,
    analyzed: 0,
    collabs: 0,
    deep_convo: 0,
  });
  // const [reload, setReload] = useState(false);
  const user = useSelector((state: any) => state?.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const documentService = new DocumentService();

  useEffect(() => {
    setUserData(user);
    // _constructor();
  }, [user]);

  useEffect(() => {
    _constructor();
  }, []);

  const _constructor = async () => {
    await getTotalFactsDoc();
    await getTotalSummarisedDoc();
    await getTotalAnalyzedDoc();
    await getTotalCollabDoc();
    await getTotalInterrogatedDoc();
    await getTotalDeepchats();
  };

  // const BASE_URL = "http://192.81.213.226:81";
  const BASE_URL = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}`;

  const apiRequest = async (url) => {
    if (user.userAccessToken) {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "deep-token": user.userAccessToken,
          "Content-Type": "application/json",
        },
      });
      return res;
    } else {
      // router.replace("/auth/login");
    }
  };

  const getTotalFactsDoc = async () => {
    try {
      const response: any = await apiRequest(
        `${BASE_URL}/${process.env.NEXT_PUBLIC_FACT_CHECKER_API_ROUTE}/fact/user`,
      );
      if (response?.status) {
        const data = await response.json();
        setTotal({ ...total, facts: data?.data?.totalItems });
        dispatch(setFactsTotal(data?.data?.totalItems));
      }
    } catch (err) {
      // Error handling
    }
  };

  const getTotalSummarisedDoc = async () => {
    try {
      const response: any = await apiRequest(
        `${BASE_URL}/${process.env.NEXT_PUBLIC_SUMMARIZER_API_ROUTE}/summary/user`,
      );
      if (response?.status) {
        const data = await response.json();
        setTotal({ ...total, summarized: data?.data?.totalItems });
        dispatch(setSummarizedTotal(data?.data?.totalItems));
      }
    } catch (err) {
      // Error handling
    }
  };

  const getTotalAnalyzedDoc = async () => {
    try {
      const response: any = await apiRequest(
        `${BASE_URL}/${process.env.NEXT_PUBLIC_ANALYZER_API_ROUTE}/analysis/user`,
      );
      if (response?.status) {
        const data = await response.json();
        setTotal({ ...total, analyzed: data?.data?.totalItems });
        dispatch(setAnalyzedTotal(data?.data?.totalItems));
      }
    } catch (err) {
      // Error handling
    }
  };

  const getTotalCollabDoc = async () => {
    try {
      const response: any = await apiRequest(
        `${BASE_URL}:${process.env.NEXT_PUBLIC_COLLAB_API_PORT}/api/v1/doc/docs/${userData?.userInfo?.uuid}`,
      );
      if (response?.status) {
        const data = await response.json();
        setTotal({ ...total, collabs: data?.data?.totalItems });
        dispatch(setCollabTotal(data?.data?.totalItems));
      }
    } catch (err) {
      // Error handling
    }
  };

  const getTotalInterrogatedDoc = async () => {
    try {
      const response: any = await apiRequest(
        `${BASE_URL}/${process.env.NEXT_PUBLIC_INTERROGATOR_API_ROUTE}/interrogation`,
      );
      if (response?.status) {
        const data = await response.json();
        setTotal({ ...total, interrogated: data?.data?.totalItems });
        dispatch(setInterrogatedTotal(data?.data?.totalItems));
      }
    } catch (err) {
      // Error handling
    }
  };

  const getTotalDeepchats = async () => {
    try {
      const response: any = await apiRequest(
        `${BASE_URL}/${process.env.NEXT_PUBLIC_DEEP_CHAT_API_ROUTE}/deepchat`,
      );
      if (response?.status) {
        const data = await response.json();
        setTotal({ ...total, deep_convo: data?.data?.totalItems });
        dispatch(setDeepChatTotal(data?.data?.totalItems));
      }
    } catch (err) {
      // Error handling
    }
  };

  const getTotalTranslatedDoc = async () => {
    try {
      const response: any = await apiRequest(
        `${BASE_URL}/${process.env.NEXT_PUBLIC_TRANSLATOR_API_ROUTE}/translation/user`,
      );
      if (response?.status) {
        const data = await response.json();
        dispatch(setTranslatedTotal(data?.data?.totalItems));
      }
    } catch (err) {
      // throw new Error(err);
    }
  };

  return (
    <React.Fragment>
      {/* logo  */}
      <div className="p-[25px] w-full flex items-center bg-white bg-opacity-25 justify-center max-h-[90vh] overflow-y-hidden">
        <div className="flex self-center content-center items-center text-white">
          {userData?.userInfo?.firstName && userData?.userInfo?.lastName && (
            <h2 className="text-sirp-primary text-xl font-bold capitalize mt-[1rem]">
              <span className="text-black">Welcome to Deep Soul </span>
              {userData.userInfo.lastName} {userData.userInfo.firstName}
            </h2>
          )}
        </div>

        {/* <div>
          <Image
            src={logo}
            alt="IRP Logo"
            className={`h-[70px] md:h-[60px] w-[70px] md:w-[60px] mx-auto mt-[2rem] flex items-center`}
            priority
          />
          <h1 className="text-sirp-primary md:text-2xl text-xl mt-[2px] font-bold text-center">
            Deep Soul
          </h1>
      </div> */}

        {/* <div className={"absolute right-3 top-10"}>
          <RightComp dashboard />
        </div> */}
      </div>

      <div className="mb-5 mt-0 flex flex-col justify-start items-center bg-logo bg-center bg-contain bg-no-repeat">
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
