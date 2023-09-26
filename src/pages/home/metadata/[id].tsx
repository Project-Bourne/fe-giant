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
          console.log(res?.data);
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
      <div className="w-full flex justify-between my-5 px-5">
        <Image
          src={backArrow}
          alt="documents"
          className=" cursor-pointer"
          width={30}
          onClick={() => router.back()}
        />

        <ActionIcons docId={selectedDoc?.uuid} />
      </div>

      <div className="bg-white my-[3rem] mx-5 rounded-[1rem] w-[96%] py-7">
        {/* <Min_and_Max_icon maxOnClick={handleMax} minOnClick={handleMin} /> */}
        {hideMeta === true && (
          <div>
            <MetaData data={selectedDoc} />
          </div>
        )}
        {hideMeta === false && (
          <h1 className="md:text-lg font-bold pl-5 pb-2"></h1> // {title}</h1>
        )}
      </div>
      {/* </div> */}

      <div className="flex md:justify-between  flex-wrap md:px-5 md:py-5 ">
        <div className="mx-5 my-5">
          <MainContent
            title={selectedDoc?.confidence?.title}
            content={
              selectedDoc?.confidence?.content5wh ||
              selectedDoc?.confidence?.content
            }
          />
        </div>

        {/* <div className="bg-white border mx-5 p-10 py-5 text-justify text-[1rem] leading-8 mb-10 rounded-[1rem] w-[100%]">
          <h1>{content}</h1>
        </div> */}
      </div>

      {/* <div className="bg-white rounded-[1rem] my-5 mx-5 pt-7"> */}
      {/* <Min_and_Max_icon maxOnClick={handleMax} minOnClick={handleMin} /> */}
      {/* {hideMeta === false && (
          <MataDataContent
            title={selectedDoc?.confidence?.title}
            confidence={selectedDoc?.confidence?.level}
            author={selectedDoc?.confidence?.author}
            author_avatar={selectedDoc?.author?.avatar}
            location={selectedDoc?.countries}
            date={selectedDoc?.updatedAt}
            tags={selectedDoc?.confidence?.backedBy}
            source={selectedDoc?.url}
          />
        )}
      </div> */}
    </div>
  );
}

export default Meta;
