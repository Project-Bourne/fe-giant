import React, { useEffect, useState } from "react";
// import Min_and_Max_icon from "../components/Min_and_Max_icon";
import MetaData from "./components/MetaData";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import backArrow from "../../../public/icons/arrow-narrow-left1.svg";
import { useRouter } from "next/router";
import DocumentService from "@/services/documents.service";
import NotificationService from "@/services/notification.service";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentDocId,
  setFactCheck,
} from "@/redux/reducers/documentReducer";
import ActionIcons from "@/pages/home/components/ActionIcons";
import MainContent from "@/pages/home/components/MainContent";

function Meta() {
  const router = useRouter();
  const [hideMeta, setHideMeta] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<any>({});
  const documentService = new DocumentService();
  const { id }: any = router.query;
  const dispatch = useDispatch();
  const idFromState = useSelector(
    (state: any) => state?.documents?.currentDocId,
  );

  useEffect(() => {
    if (id || idFromState) {
      documentService
        .getSingleFactCheckedDoc(id || idFromState)
        .then((res) => {
          if (res?.status) {
            setSelectedDoc(res?.data);
            dispatch(setFactCheck(res?.data));
          } else {
            NotificationService.error({
              message: "Failed to get document details!",
              addedText: res?.message,
            });
          }
        })
        .catch((err) => {
          NotificationService.error({
            message: "Failed to get document details!",
            addedText: err?.message,
          });
        });

      dispatch(setCurrentDocId(id));
    }
  }, []);

  // const handleMax = () => {
  //   setHideMeta(true);
  // };
  // const handleMin = () => {
  //   setHideMeta(false);
  // };

  return (
    <div className="bg-sirp-contentbg border bg-sirp-secondary2  h-[100%] mx-10 rounded-[1rem]">
      <div className="w-full flex justify-between mt-5 mb-3 px-5">
        <Image
          src={backArrow}
          alt="documents"
          className=" cursor-pointer"
          width={30}
          onClick={() => router.back()}
        />

        <ActionIcons
          showArchive={false}
          docId={selectedDoc?.fact?.uuid}
          archiveId={selectedDoc?.irpId}
        />
      </div>

      <div className="bg-white mt-[1rem] mx-5 rounded-[1rem] w-[96%] pt-7 pb-3">
        {hideMeta === true && (
          <div>
            <MetaData data={selectedDoc} />
          </div>
        )}
        {hideMeta === false && (
          <h1 className="md:text-lg font-bold pl-5 pb-2"></h1> // {title}</h1>
        )}
      </div>

      <div className="flex md:justify-between  flex-wrap md:px-5 md:py-3 ">
        <div className="mx-5 my-3">
          <MainContent
            title={selectedDoc?.fact?.confidence?.title}
            content={
              selectedDoc?.fact?.confidence?.content ||
              selectedDoc?.fact?.confidence?.content5wh
            }
          />
        </div>

        {/* <div className="bg-white border mx-5 p-10 py-5 text-justify text-[1rem] leading-8 mb-10 rounded-[1rem] w-[100%]">
          <h1>{content}</h1>
        </div> */}
      </div>
    </div>
  );
}

export default Meta;
