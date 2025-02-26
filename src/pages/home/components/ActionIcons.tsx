import React, { useState } from "react";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import archive from "../../../../public/icons/action_archive.svg";
import analyzer from "../../../../public/icons/action_analyzer.svg";
import collab from "../../../../public/icons/action_collab.svg";
import summarizer from "../../../../public/icons/action_summarizer.svg";
import deepchat from "../../../../public/icons/action_deepchat.svg";
import factchecker from "../../../../public/icons/action_factchecker.svg";
import translator from "../../../../public/icons/action_translator.svg";
import interrogator from "../../../../public/icons/action_interrogator.svg";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import DocumentService from "@/services/documents.service";
import NotificationService from "@/services/notification.service";
import { FRONTEND_ROUTES } from "@/utils/api.constants";

type ActionIconsProps = {
  showArchive?: boolean;
  docId?: string;
  archiveId?: string;
};

const ActionIcons = ({ showArchive, docId, archiveId }: ActionIconsProps) => {
  const { userInfo } = useSelector((state: any) => state.auth);
  const [factcheck, setFactcheck] = useState(false);
  const [collaborate, setCollaborate] = useState(false);
  const [documents, setDocuments] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const docService = new DocumentService();

  const permissions = userInfo?.role?.permissions;

  const handleRoute = (id: string, to: string) => {
    // if (to === "collab") {
    //   router.replace(`http://192.81.213.226:36/document/${id}&irp`);
    // }
    // if (to === "analyser") {
    //   router.replace(`http://192.81.213.226:31/home/${id}&irp`);
    // }
    // if (to === "summarizer") {
    //   router.replace(`http://192.81.213.226:32/home/${id}&irp`);
    // }
    // if (to === "factcheck") {
    //   router.replace(`http://192.81.213.226:34/home/${id}&irp`);
    // }
    // if (to === "deepchat") {
    //   router.replace(`http://192.81.213.226:35/home/${id}&irp`);
    // }
    // if (to === "interrogator") {
    //   router.replace(`http://192.81.213.226:82/home/query/${id}&irp`);
    // }
    // if (to === "translator") {
    //   router.replace(`http://192.81.213.226:33/home/${id}&irp`);
    // }

    const routes = {
      collab: `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_COLLAB_PORT}/document/${id}&irp`,
      analyser: `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_ANALYZER_PORT}/home/${id}&irp`,
      summarizer: `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_SUMMARIZER_PORT}/home/${id}&irp`,
      factcheck: `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_FACT_CHECKER_PORT}/home/${id}&irp`,
      deepchat: `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_DEEP_CHAT_PORT}/home/${id}&irp`,
      interrogator: `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_INTERROGATOR_PORT}/home/query/${id}&irp`,
      translator: `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_TRANSLATOR_PORT}/home/${id}&irp`,
    };

    router.replace(routes[to]);
  };

  const handleArchive = (_arg) => {
    try {
      docService
        .archiveDocument(_arg)
        .then((res) => {
          if (res?.status) {
            // dispatch(setArc)
            NotificationService.success({
              message: "Added to archives!",
              position: "top-center",
            });
          } else {
            NotificationService.error({
              message: res?.message,
              position: "top-center",
            });
          }
        })
        .catch((err) => {
          NotificationService.error({
            message: err?.message,
            position: "top-center",
          });
        });
    } catch (error) {}
  };

  return (
    <>
      <div className="flex gap-2 ">
        {/* archive  */}
        {showArchive && (
          <Tooltip title="Archive">
            <Image
              src={archive}
              alt="documents"
              className=" cursor-pointer"
              onClick={() => handleArchive(archiveId)}
              width={50}
            />
          </Tooltip>
        )}

        {/* collab  */}
        {permissions && permissions?.includes("collab") && (
          <Tooltip title="Export to Collab">
            <Image
              src={collab}
              alt="documents"
              className=" cursor-pointer"
              width={50}
              onClick={() => handleRoute(docId, "collab")}
            />
          </Tooltip>
        )}

        {/* Translator  */}
        {permissions && permissions?.includes("translator") && (
          <Tooltip title="Export to Translator">
            <Image
              src={translator}
              alt="translator"
              className="cursor-pointer"
              onClick={() => handleRoute(docId, "translator")}
              width={50}
            />
          </Tooltip>
        )}

        {/* analyzer  */}
        {permissions && permissions?.includes("analyser") && (
          <Tooltip title="Export to Analyzer">
            <Image
              src={analyzer}
              alt="analyzer"
              className=" cursor-pointer"
              width={50}
              onClick={() => handleRoute(docId, "analyser")}
            />
          </Tooltip>
        )}

        {/* factchecker  */}
        {permissions && permissions?.includes("fact checker") && (
          <Tooltip title="Export to Fact Checker">
            <Image
              src={factchecker}
              alt="factcheck"
              className="cursor-pointer"
              width={50}
              onClick={() => handleRoute(docId, "factcheck")}
            />
          </Tooltip>
        )}

        {/* summarizer  */}
        {permissions && permissions?.includes("summarizer") && (
          <Tooltip title="Export to Summarizer">
            <Image
              src={summarizer}
              alt="summarizer"
              className="cursor-pointer"
              width={50}
              onClick={() => handleRoute(docId, "summarizer")}
            />
          </Tooltip>
        )}

        {/* deepchat  */}
        {permissions && permissions?.includes("deep chat") && (
          <Tooltip title="Export to Deep Chat">
            <Image
              src={deepchat}
              alt="deep chat"
              className="cursor-pointer"
              width={50}
              onClick={() => handleRoute(docId, "deepchat")}
            />
          </Tooltip>
        )}

        {/* interrogator  */}
        {permissions && permissions?.includes("interrogator") && (
          <Tooltip title="Export to Interrogator">
            <Image
              src={interrogator}
              alt="interrogator"
              className="cursor-pointer"
              width={50}
              onClick={() => handleRoute(docId, "interrogator")}
            />
          </Tooltip>
        )}
      </div>
    </>
  );
};

export default ActionIcons;
