import React, { useState } from "react";
import Image from "next/image";
import CustomModal from "@/components/ui/CustomModal";
import Factcheck from "../modal-popup/factcheck";
import Collaborate from "../modal-popup/collaborate";
import DocumentExport from "../modal-popup/DocumentExport";
import { Tooltip } from "@mui/material";
import archive from "../../../../public/icons/action_archive.svg";
import analyzer from "../../../../public/icons/action_analyzer.svg";
import collab from "../../../../public/icons/action_collab.svg";
import summarizer from "../../../../public/icons/action_summarizer.svg";
import deepchat from "../../../../public/icons/action_deepchat.svg";
import factchecker from "../../../../public/icons/action_factchecker.svg";
import translator from "../../../../public/icons/action_translator.svg";
import interrogator from "../../../../public/icons/action_interrogator.svg";
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
    if (to === "factcheck") {
      router.push(`http://192.81.213.226:34/home/${id}&factcheck`);
    }
    if (to === "deepchat") {
      router.push(`http://192.81.213.226:35/home/${id}&deepchat`);
    }
    if (to === "interrogator") {
      router.push(`http://192.81.213.226:37/home/${id}&interrogator`);
    }
    if (to === "translator") {
      router.push(`http://192.81.213.226:33/home/${id}&translator`);
    }
  };

  return (
    <>
      <div className="flex gap-2 ">
        {/* archive  */}
        <Tooltip title="Archive">
          <Image
            src={archive}
            alt="documents"
            className=" cursor-pointer"
            width={33}
          />
        </Tooltip>

        {/* collab  */}
        <Tooltip title="Export to Collab">
          <Image
            src={collab}
            alt="documents"
            className=" cursor-pointer"
            width={33}
            onClick={() => handleRoute(docId, "collab")}
          />
        </Tooltip>

        {/* Translator  */}
        <Tooltip title="Export to Translator">
          <Image
            src={translator}
            alt="translator"
            className="cursor-pointer"
            onClick={() => handleRoute(docId, "translator")}
            width={33}
          />
        </Tooltip>

        {/* analyzer  */}
        <Tooltip title="Export to Analyzer">
          <Image
            src={analyzer}
            alt="analyzer"
            className=" cursor-pointer"
            width={33}
            onClick={() => handleRoute(docId, "analyzer")}
          />
        </Tooltip>

        {/* factchecker  */}
        <Tooltip title="Export to Factchecker">
          <Image
            src={factchecker}
            alt="factcheck"
            className="cursor-pointer"
            width={33}
            onClick={() => handleRoute(docId, "factcheck")}
          />
        </Tooltip>

        {/* summarizer  */}
        <Tooltip title="Export to Summarizer">
          <Image
            src={summarizer}
            alt="summarizer"
            className="cursor-pointer"
            width={33}
            onClick={() => handleRoute(docId, "summarizer")}
          />
        </Tooltip>

        {/* deepchat  */}
        <Tooltip title="Export to Deepchat">
          <Image
            src={deepchat}
            alt="deep chat"
            className="cursor-pointer"
            width={33}
            onClick={() => handleRoute(docId, "deepchat")}
          />
        </Tooltip>

        {/* deepchat  */}
        <Tooltip title="Export to Interrogator">
          <Image
            src={interrogator}
            alt="interrogator"
            className="cursor-pointer"
            width={33}
            onClick={() => handleRoute(docId, "interrogator")}
          />
        </Tooltip>
      </div>
    </>
  );
};

export default ActionIcons;

// const ActionIcons = () => {
//   const handleCollab = () => {
//     console.log("collabe");
//   };

//   return (
//     <>
//       <div className="flex flex-row justify-end gap-[0.5rem] mr-5">
//         <Tooltip title="Export to Collab">
//           <Image
//             src={require("../../../../../public/icons/action_collab.svg")}
//             alt="documents"
//             className=" cursor-pointer"
//             width={60}
//             onClick={handleCollab}
//           />
//         </Tooltip>

//

//         <Tooltip title="Export to Summarizer">
//           <Image
//             src={require("../../../../../public/icons/action_summarizer.svg")}
//             alt="documents"
//             className="cursor-pointer"
//             width={60}
//           />
//         </Tooltip>

//         <Tooltip title="Export to Analyzer">
//           <Image
//             src={require("../../../../../public/icons/action_analyzer.svg")}
//             alt="documents"
//             className=" cursor-pointer"
//             width={60}
//           />
//         </Tooltip>

//         <Tooltip title="Export to translator">
//           <Image
//             src={require("../../../../../public/icons/action_translator.svg")}
//             alt="documents"
//             className="cursor-pointer"
//             width={60}
//           />
//         </Tooltip>

//         <Tooltip title="Export to Deep chat">
//           <Image
//             src={require("../../../../../public/icons/action_deepchat.svg")}
//             alt="documents"
//             className="cursor-pointer"
//             width={60}
//           />
//         </Tooltip>

//         <Tooltip title="Export to Interrogator">
//           <Image
//             src={require("../../../../../public/icons/action_interrogator.svg")}
//             alt="documents"
//             className="cursor-pointer"
//             width={60}
//           />
//         </Tooltip>
//       </div>
//     </>
//   );
// };

// export default ActionIcons;
