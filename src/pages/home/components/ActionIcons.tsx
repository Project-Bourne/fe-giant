import React, { useState } from "react";
import Image from "next/image";
import CustomModal from "@/components/ui/CustomModal";
import Factcheck from "../modal-popup/factcheck";
import Collaborate from "../modal-popup/collaborate";
import DocumentExport from "../modal-popup/DocumentExport";
import { Tooltip } from "@mui/material";
import h1 from "../../../../public/icons/h1.svg";
import h2 from "../../../../public/icons/h2.svg";
import h3 from "../../../../public/icons/h3.svg";
import h4 from "../../../../public/icons/h4.svg";
import h6 from "../../../../public/icons/h6.svg";
import on_saved from "../../../../public/icons/on.saved.svg";

type ActionIconsProps = {
  doc?: any;
};

const ActionIcons = ({ doc }: ActionIconsProps) => {
  const [factcheck, setFactcheck] = useState(false);
  const [collaborate, setCollaborate] = useState(false);
  const [documents, setDocuments] = useState(false);
  return (
    <>
      <div className="flex gap-2 px-5">
        <Tooltip title="Export to Collab">
          <Image
            src={h3}
            alt="documents"
            className=" cursor-pointer"
            width={50}
            onClick={() => setDocuments(true)}
          />
        </Tooltip>
        <Tooltip title="Archive">
          <Image
            src={h2}
            alt="documents"
            className=" cursor-pointer"
            width={50}
          />
        </Tooltip>
        <Tooltip title="Analyze">
          <Image
            src={h1}
            alt="documents"
            className=" cursor-pointer"
            width={50}
          />
        </Tooltip>
        <Tooltip title="Save">
          <Image
            src={on_saved}
            alt="documents"
            className="cursor-pointer"
            width={50}
          />
        </Tooltip>
        <Tooltip title="Summarize">
          <Image
            src={h4}
            alt="documents"
            className="cursor-pointer"
            width={50}
            onClick={() => setCollaborate(true)}
          />
        </Tooltip>
        <Tooltip title="Run Fact Checker">
          <Image
            src={h6}
            alt="documents"
            className="cursor-pointer"
            width={50}
            onClick={() => setFactcheck(true)}
          />
        </Tooltip>
      </div>
      {/* factcheck models */}
      {factcheck && (
        <CustomModal
          style="bg-white md:w-[30%] w-[20%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setFactcheck(false)}
        >
          <Factcheck />
        </CustomModal>
      )}

      {/* collaborate models */}

      {collaborate && (
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
      )}
    </>
  );
};

export default ActionIcons;
