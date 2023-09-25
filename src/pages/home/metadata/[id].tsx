import React, { useEffect, useState } from "react";
import MataDataContent from "../components/MataDataContent";
import Min_and_Max_icon from "../components/Min_and_Max_icon";
import ActionIcons from "../components/ActionIcons";
// import DummyText from "../components/dummyText";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import backArrow from "../../../../public/icons/arrow-narrow-left1.svg";
import { useRouter } from "next/router";
import MainContent from "../components/MainContent";
import DocumentService from "@/services/documents.service";
import NotificationService from "@/services/notification.service";

function MetaData() {
  const router = useRouter();
  const [hideMeta, setHideMeta] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>({});
  const documentService = new DocumentService();
  const { id } = router.query;

  useEffect(() => {
    documentService
      .getSingleFactCheckedDoc(id)
      .then((res) => {
        if (res?.status) {
          console.log(res?.data);
          // setSelectedDoc(res?.data);
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
        <Tooltip title="Export to Collab">
          <Image
            src={backArrow}
            alt="documents"
            className=" cursor-pointer"
            width={30}
            onClick={() => router.back()}
          />
        </Tooltip>

        <ActionIcons />
      </div>

      <div className="bg-white rounded-[1rem] my-5 mx-5 pt-7">
        {/* <Min_and_Max_icon maxOnClick={handleMax} minOnClick={handleMin} /> */}
        {hideMeta === false && (
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
      </div>
      <div className="mx-5 my-5">
        <MainContent
          title={selectedDoc?.confidence?.title}
          content={
            selectedDoc?.confidence?.content5wh ||
            selectedDoc?.confidence?.content
          }
        />
      </div>
    </div>
  );
}

export default MetaData;
