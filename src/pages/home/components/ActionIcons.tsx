import React, { useState } from "react";
import Image from "next/image";
import CustomModal from "@/components/ui/CustomModal";
import Factcheck from "../modal-popup/factcheck";
import Collaborate from "../modal-popup/collaborate";
import DocumentExport from "../modal-popup/DocumentExport";
import { Tooltip } from "@mui/material";
import h1 from "../../../../public/icons/h1.svg";
// import h2 from "../../../../public/icons/h2.svg";
import h3 from "../../../../public/icons/h3.svg";
import h4 from "../../../../public/icons/h4.svg";
// import h6 from "../../../../public/icons/h6.svg";
import on_saved from "../../../../public/icons/on.saved.svg";
import { useRouter } from "next/router";

type ActionIconsProps = {
  docId?: string;
};

const ActionIcons = ({ docId }: ActionIconsProps) => {
  const [factcheck, setFactcheck] = useState(false);
  const [collaborate, setCollaborate] = useState(false);
  const [documents, setDocuments] = useState(false);
  const router = useRouter();

  const handleRoute = (id: string, to: string) => {
    if (to === "collab") {
      router.push(`http://192.81.213.226:36/documents/${id}&collab`);
    }
    if (to === "analyzer") {
      router.push(`http://192.81.213.226:31/home/${id}&analyzer`);
    }
    if (to === "summarizer") {
      router.push(`http://192.81.213.226:32/home/${id}&summarizer`);
    }
  };

  return (
    <>
      <div className="flex gap-2 ">
        <Tooltip title="Export to Collab">
          <Image
            src={h3}
            alt="documents"
            className=" cursor-pointer"
            width={33}
            onClick={() => handleRoute(docId, "collab")}
          />
        </Tooltip>
        {/* <Tooltip title="Archive">
          <Image
            src={h2}
            alt="documents"
            className=" cursor-pointer"
            width={33}
          />
        </Tooltip> */}
        <Tooltip title="Analyze">
          <Image
            src={h1}
            alt="analyzer"
            className=" cursor-pointer"
            width={33}
            onClick={() => handleRoute(docId, "analyzer")}
          />
        </Tooltip>

        <Tooltip title="Summarize">
          <Image
            src={h4}
            alt="summarizer"
            className="cursor-pointer"
            width={33}
            onClick={() => handleRoute(docId, "summarizer")}
          />
        </Tooltip>
      </div>
      {/* factcheck models */}
      {/* {factcheck && (
        <CustomModal
          style="bg-white md:w-[30%] w-[20%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setFactcheck(false)}
        >
          <Factcheck />
        </CustomModal>
      )} */}

      {/* collaborate models */}

      {/* {collaborate && (
        <CustomModal
          style="bg-white md:w-[50%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setCollaborate(false)}
        >
          <Collaborate />
        </CustomModal>
      )}
      {documents && (
        <CustomModal
          style="bg-white md:w-[30%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 md:px-5 px-4 pb-5"
          closeModal={() => setDocuments(false)}
        >
          <DocumentExport doc={doc} />
        </CustomModal>
      )} */}
    </>
  );
};

export default ActionIcons;
