import React, { useEffect, useState } from "react";
import Min_and_Max_icon from "../components/Min_and_Max_icon";
import ActionIcons from "../components/ActionIcons";
import MetaData from "../components/MetaData";
// import DummyText from "../components/dummyText";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import backArrow from "../../../../public/icons/arrow-narrow-left1.svg";
import { useRouter } from "next/router";
import MainContent from "../components/MainContent";
import DocumentService from "@/services/documents.service";
import NotificationService from "@/services/notification.service";
import { useDispatch } from "react-redux";
import { setFactCheck } from "@/redux/reducers/documentReducer";

function Meta() {
  const router = useRouter();
  const [hideMeta, setHideMeta] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<any>({});
  const documentService = new DocumentService();
  const { id } = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    documentService
      .getSingleFactCheckedDoc(id)
      .then((res) => {
        if (res?.status) {
          setSelectedDoc(res?.data);
          dispatch(setFactCheck(res?.data));
        }
      })
      .catch((err) => {
        NotificationService.error({
          message: "Failed to get document details!",
          addedText: err?.message,
        });
      });
  }, []);

  const handleMax = () => {
    setHideMeta(true);
  };
  const handleMin = () => {
    setHideMeta(false);
  };

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
          showArchive={true}
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
              selectedDoc?.fact?.confidence?.content5wh ||
              selectedDoc?.fact?.confidence?.content
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
