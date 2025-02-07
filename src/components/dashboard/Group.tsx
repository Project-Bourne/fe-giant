import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import irp from "../../../public/icons/module-irp.svg";
import analyzer from "../../../public/icons/module-analyzer.svg";
import collab from "../../../public/icons/module-collab.png";
import deepchat from "../../../public/icons/module-deep-chat.svg";
import summarizer from "../../../public/icons/module-summarizer.svg";
import interrogator from "../../../public/icons/module-interrogator.svg";
import translator from "../../../public/icons/module-translator.svg";
import factcheck from "../../../public/icons/module-factcheck.svg";
import admin from "../../../public/icons/admin.svg";
import { useDispatch, useSelector } from "react-redux";
import DocumentService from "@/services/documents.service";
import { useCookies } from "react-cookie";
import { SERVER_CONFIG } from "@/utils/env";

function Group({ userData }) {
  const router = useRouter();
  const [cookies, getCookie, removeCookie] = useCookies([
    "deep-access",
    "uuid",
  ]);

  useEffect(() => {
    console.log("Cookies: ", cookies);
    if (!cookies["deep-access"]) router.replace("/auth/login");
  }, [cookies]);

  const {
    summarizedTotal,
    factsTotal,
    collabsTotal,
    analyzedTotal,
    interrogatedTotal,
    translatedTotal,
    deepChatTotal,
  } = useSelector((state: any) => state.documents);

  const permissions = userData?.userInfo?.role?.permissions;

  return (
    <div className="px-[4rem] py-7 flex items-center w-[90%] justify-center self-center">
      <div className="flex flex-wrap gap-y-3 md:gap-x-[2rem] w-[95%]  mx-auto">
        {/* admin */}
        {permissions?.includes("admin") && (
          <div className="mx-auto md:mx-0 rounded-[1.5rem] border-none bg-sirp-primary h-[12rem] mt-5  p-3">
            <div className="flex justify-center items-center pt-5">
              {/* admin icon  */}
              <div className="px-4 py-3 rounded-2xl bg-none">
                <div className="px-4 py-2 bg-none rounded-[1.5rem]">
                  <Image
                    src={admin}
                    alt="documents"
                    className="cursor-pointer"
                    width={30}
                  />
                </div>
              </div>
            </div>

            <div className="pt-8 ">
              <button
                onClick={() =>
                  router.push(
                    `${SERVER_CONFIG.BASE_URL}:${SERVER_CONFIG.PORTS.ADMIN}/home`,
                  )
                }
                className="capitalize hover:bg-sirp-secondaryContainer bg-sirp-primaryContainer w-[20rem] pb-2 pt-2 rounded-[1rem] text-white font-bold "
              >
                Open Admin Panel
              </button>
            </div>
          </div>
        )}

        {/* IRP */}
        <div className="mx-auto md:mx-0  rounded-[1.5rem] bg-sirp-primary  h-[12rem] mt-5  p-3">
          <div className="flex flex-row items-center gap-3 pt-5">
            <div>
              <Image
                src={irp}
                alt="documents"
                className="cursor-pointer"
                width={65}
              />
            </div>
            <div>
              <p className="font-bold text-white text-4xl">{factsTotal ?? 0}</p>
              <span className="capitalize font-light text-white text-[15px]">
                Total Documents
              </span>
            </div>
          </div>
          <div className="pt-8 ">
            <button
              // onClick={() => router.push("http://192.81.213.226:30/home")}
              onClick={() => router.push("/home")}
              className="capitalize hover:bg-sirp-secondaryContainer bg-sirp-primaryContainer w-[20rem] pb-2 pt-2 rounded-[1rem] text-white font-bold "
            >
              Open IRP
            </button>
          </div>
        </div>

        {/* analyzer  */}
        {permissions?.includes("analyser") && (
          <div className="mx-auto md:mx-0  rounded-[1.5rem] bg-sirp-primary  h-[12rem] mt-5  p-3">
            <div className="flex flex-row items-center gap-3 pt-5">
              <div>
                <Image
                  src={analyzer}
                  alt="documents"
                  className="cursor-pointer"
                  width={65}
                />
              </div>
              <div>
                <p className="font-bold text-white text-4xl">
                  {analyzedTotal ?? 0}
                </p>
                <span className="capitalize font-light text-white text-[15px]">
                  Analyzed Documents
                </span>
              </div>
            </div>
            <div className="pt-8 ">
              <button
                onClick={() =>
                  router.push(
                    `${SERVER_CONFIG.BASE_URL}:${SERVER_CONFIG.PORTS.ANALYZER}/home`,
                  )
                }
                className="capitalize hover:bg-sirp-secondaryContainer bg-sirp-primaryContainer w-[20rem] pb-2 pt-2 rounded-[1rem] text-white font-bold"
              >
                Open Analyzer
              </button>
            </div>
          </div>
        )}

        {/* interrogator  */}
        {permissions?.includes("interrogator") && (
          <div className="mx-auto md:mx-0  rounded-[1.5rem] bg-sirp-primary  h-[12rem] mt-5  p-3">
            <div className="flex flex-row items-center gap-3 pt-5">
              <div>
                <Image
                  src={interrogator}
                  alt="documents"
                  className="cursor-pointer"
                  width={65}
                />
              </div>
              <div>
                <p className="font-bold text-white text-4xl">
                  {interrogatedTotal ?? 0}
                </p>
                <span className="capitalize font-light text-white text-[15px] ">
                  Interrogated Documents
                </span>
              </div>
            </div>
            <div className="pt-8 ">
              <button
                onClick={() =>
                  router.push(
                    `${SERVER_CONFIG.BASE_URL}:${SERVER_CONFIG.PORTS.INTERROGATOR}/home`,
                  )
                }
                className="capitalize hover:bg-sirp-secondaryContainer bg-sirp-primaryContainer w-[20rem] pb-2 pt-2 rounded-[1rem] text-white font-bold"
              >
                Open Interrogator
              </button>
            </div>
          </div>
        )}

        {/* translator  */}
        {permissions?.includes("translator") && (
          <div className="mx-auto md:mx-0  rounded-[1.5rem] bg-sirp-primary  h-[12rem] mt-5  p-3">
            <div className="flex flex-row items-center gap-3 pt-5">
              <div>
                <Image
                  src={translator}
                  alt="documents"
                  className="cursor-pointer"
                  width={65}
                />
              </div>
              <div>
                <p className="font-bold text-white text-4xl">
                  {translatedTotal ?? 0}
                </p>
                <span className="font-light text-white">
                  Translated Documents
                </span>
              </div>
            </div>
            <div className="pt-8 ">
              <button
                onClick={() =>
                  router.push(
                    `${SERVER_CONFIG.BASE_URL}:${SERVER_CONFIG.PORTS.TRANSLATOR}/home`,
                  )
                }
                className="capitalize hover:bg-sirp-secondaryContainer bg-sirp-primaryContainer w-[20rem] pb-2 pt-2 rounded-[1rem] text-white font-bold"
              >
                Open Translator
              </button>
            </div>
          </div>
        )}

        {/* fact checker  */}
        {permissions?.includes("fact checker") && (
          <div className="mx-auto md:mx-0  rounded-[1.5rem] bg-sirp-primary  h-[12rem] mt-5  p-3">
            <div className="flex flex-row items-center gap-3 pt-5">
              <div>
                <Image
                  src={factcheck}
                  alt="documents"
                  className=" cursor-pointer"
                  width={65}
                />
              </div>
              <div>
                <p className="font-bold text-white text-4xl">
                  {factsTotal ?? 0}
                </p>
                <span className="capitalize font-light text-white text-[15px] ">
                  Fact-Checked Documents
                </span>
              </div>
            </div>
            <div className="pt-8 ">
              <button
                onClick={() =>
                  router.push(
                    `${SERVER_CONFIG.BASE_URL}:${SERVER_CONFIG.PORTS.FACT_CHECKER}/home`,
                  )
                }
                className="capitalize hover:bg-sirp-secondaryContainer bg-sirp-primaryContainer w-[20rem] pb-2 pt-2 rounded-[1rem] text-white font-bold"
              >
                Open Fact Checker
              </button>
            </div>
          </div>
        )}

        {/* summarizer  */}
        {permissions?.includes("summarizer") && (
          <div className="mx-auto md:mx-0  rounded-[1.5rem] bg-sirp-primary  h-[12rem] mt-5  p-3">
            <div className="flex flex-row items-center gap-3 pt-5">
              <div>
                <Image
                  src={summarizer}
                  alt="documents"
                  className="cursor-pointer"
                  width={65}
                />
              </div>
              <div>
                <p className="font-bold text-white text-4xl">
                  {summarizedTotal ?? 0}
                </p>
                <span className="capitalize font-light text-white text-[15px] ">
                  Summarized Documents
                </span>
              </div>
            </div>
            <div className="pt-8 ">
              <button
                onClick={() =>
                  router.push(
                    `${SERVER_CONFIG.BASE_URL}:${SERVER_CONFIG.PORTS.SUMMARIZER}/home`,
                  )
                }
                className="capitalize hover:bg-sirp-secondaryContainer bg-sirp-primaryContainer w-[20rem] pb-2 pt-2 rounded-[1rem] text-white font-bold"
              >
                Open Summarizer
              </button>
            </div>
          </div>
        )}

        {/* deep chat  */}
        {permissions?.includes("deep chat") && (
          <div className="mx-auto md:mx-0  rounded-[1.5rem] bg-sirp-primary  h-[12rem] mt-5  p-3">
            <div className="flex flex-row items-center gap-3 pt-5">
              <div>
                <Image
                  src={deepchat}
                  alt="documents"
                  className="cursor-pointer"
                  width={65}
                />
              </div>
              <div>
                <p className="font-bold text-white text-4xl">
                  {deepChatTotal ?? 0}
                </p>
                <span className="capitalize font-light text-white text-[15px] ">
                  Total Documents
                </span>
              </div>
            </div>
            <div className="pt-8 ">
              <button
                onClick={() =>
                  router.push(
                    `${SERVER_CONFIG.BASE_URL}:${SERVER_CONFIG.PORTS.DEEP_CHAT}/home`,
                  )
                }
                className="capitalize hover:bg-sirp-secondaryContainer bg-sirp-primaryContainer w-[20rem] pb-2 pt-2 rounded-[1rem] text-white font-bold"
              >
                Open Deep Chat
              </button>
            </div>
          </div>
        )}

        {/* collab */}
        {permissions?.includes("collab") && (
          <div className="mx-auto md:mx-0  rounded-[1.5rem] bg-sirp-primary  h-[12rem] mt-5  p-3">
            <div className="flex flex-row items-center gap-3 pt-5">
              <div>
                <Image
                  src={collab}
                  alt="documents"
                  className="cursor-pointer"
                  width={65}
                />
              </div>
              <div>
                <p className="font-bold text-white text-4xl">
                  {collabsTotal ?? 0}
                </p>
                <span className="capitalize font-light text-white text-[15px]">
                  Total Collab Documents
                </span>
              </div>
            </div>
            <div className="pt-8 ">
              <button
                onClick={() =>
                  router.push(
                    `${SERVER_CONFIG.BASE_URL}:${SERVER_CONFIG.PORTS.COLLAB}/chats`,
                  )
                }
                className="capitalize hover:bg-sirp-secondaryContainer bg-sirp-primaryContainer w-[20rem] pb-2 pt-2 rounded-[1rem] text-white font-bold "
              >
                Open Collab Workspace
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Group;
