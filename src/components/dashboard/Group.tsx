import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import frame5 from "../../../public/icons/frame-05.svg";
import frame7 from "../../../public/icons/frame-07.svg";
import frame8 from "../../../public/icons/frame-08.svg";
import frame9 from "../../../public/icons/frame-09.svg";
import frame011 from "../../../public/icons/frame-011.svg";
import frame012 from "../../../public/icons/frame-012.svg";
import frame013 from "../../../public/icons/frame-013.svg";
import frame0100 from "../../../public/icons/frame-0100.svg";
import admin from "../../../public/icons/admin.svg";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setDocsLength, setDocuments } from "@/redux/reducers/documentReducer";
import DocumentService from "@/services/documents.service";

function Group({ userData }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const documentService = new DocumentService();

  const { documents, docsLength, archivedDocs } = useSelector(
    (state: any) => state.documents,
  );
  const { userInfo } = useSelector((state: any) => state.auth);
  const conversationsCount = 0;
  const interrogatedDocs = 0;
  const summarizedDocs = 0;
  const translatedDocs = 0;
  const analyzedDocs = 0;
  const collabExports = 0;

  const permissions = userData?.role?.permissions;

  useEffect(() => {
    _constructor();
  }, []);

  const _constructor = async () => {
    await getTotalFactsDoc();
    // await getTotalSummarisedDoc();
    // await getTotalAnalyzedDoc();
    // await getTotalCollabDoc();
    // await getTotalInterrogatedDoc();
    // await getTotalDeepchats();
  };

  const API_URL = "http://192.81.213.226:81/84";

  const getTotalFactsDoc = async () => {
    try {
      const response = await documentService.getFactCheckedDocs();
      // console.log("response==: ", response.data.totalItems);
      if (response?.status === true) {
        dispatch(setDocsLength(response.data.totalItems));
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // userInfo?.role?.roleName

  return (
    <div className="px-[4rem] py-7 flex items-center w-[90%] justify-center self-center">
      <div className="flex flex-wrap gap-y-3 md:gap-x-[2rem] w-[95%]  mx-auto">
        {/* admin */}
        {permissions?.includes("admin") && (
          <div className="border mx-auto md:mx-0 shadow shadow-sirp-primaryLess1 border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[12rem] mt-5  p-3">
            <div className="flex justify-center items-center pt-5">
              {/* admin icon  */}
              <div className="px-4 py-3 rounded-2xl bg-[#F3F5F6]">
                <div className="px-4 py-2 bg-white rounded-[2rem]">
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
                onClick={() => router.push("http://192.81.213.226:38/home")}
                className="capitalize border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold "
              >
                Open Admin Panel
              </button>
            </div>
          </div>
        )}

        {/* IRP */}
        <div className="border mx-auto md:mx-0 shadow shadow-sirp-primaryLess1 border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[12rem] mt-5  p-3">
          <div className="flex flex-row items-center gap-3 pt-5">
            <div>
              <Image
                src={frame5}
                alt="documents"
                className="cursor-pointer"
                width={100}
              />
            </div>
            <div>
              <p className="font-bold">{docsLength ?? 0}</p>
              <span className="capitalize font-light text-sirp-grey text-[15px]">
                Total Documents
              </span>
            </div>
          </div>
          <div className="pt-8 ">
            <button
              // onClick={() => router.push("http://192.81.213.226:30/home")}
              onClick={() => router.push("/home")}
              className="capitalize border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold "
            >
              Open IRP
            </button>
          </div>
        </div>

        {/* collab */}
        {permissions?.includes("collab") && (
          <div className="border mx-auto md:mx-0 shadow shadow-sirp-primaryLess1 border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[12rem] mt-5  p-3">
            <div className="flex flex-row items-center gap-3 pt-5">
              <div>
                <Image
                  src={frame7}
                  alt="documents"
                  className="cursor-pointer"
                  width={100}
                />
              </div>
              <div>
                <p className="font-bold">{collabExports ?? 0}</p>
                <span className="capitalize font-light text-sirp-grey text-[15px]">
                  Total Exports to Collab
                </span>
              </div>
            </div>
            <div className="pt-8 ">
              <button
                onClick={() => router.push("http://192.81.213.226:36/chats")}
                className="capitalize border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold "
              >
                Open Collab Workspace
              </button>
            </div>
          </div>
        )}

        {/* analyzer  */}
        {permissions?.includes("analyser") && (
          <div className="border mx-auto md:mx-0 shadow shadow-sirp-primaryLess1 border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[12rem] mt-5  p-3">
            <div className="flex flex-row items-center gap-3 pt-5">
              <div>
                <Image
                  src={frame8}
                  alt="documents"
                  className="cursor-pointer"
                  width={100}
                />
              </div>
              <div>
                <p className="font-bold">{analyzedDocs ?? 0}</p>
                <span className="capitalize font-light text-sirp-grey text-[15px]">
                  Analyzed Documents
                </span>
              </div>
            </div>
            <div className="pt-8 ">
              <button
                onClick={() => router.push("http://192.81.213.226:31/home")}
                className="capitalize border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold"
              >
                Open Analyzer
              </button>
            </div>
          </div>
        )}

        {/* interrogator  */}
        {permissions?.includes("interrogator") && (
          <div className="border mx-auto md:mx-0 shadow shadow-sirp-primaryLess1 border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[12rem] mt-5  p-3">
            <div className="flex flex-row items-center gap-3 pt-5">
              <div>
                <Image
                  src={frame9}
                  alt="documents"
                  className="cursor-pointer"
                  width={100}
                />
              </div>
              <div>
                <p className="font-bold">{interrogatedDocs ?? 0}</p>
                <span className="capitalize font-light text-sirp-grey text-[15px] ">
                  Interrogated Documents
                </span>
              </div>
            </div>
            <div className="pt-8 ">
              <button
                onClick={() => router.push("http://192.81.213.226:82/home")} // to be changed / officer
                className="capitalize border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold"
              >
                Open Interrogator
              </button>
            </div>
          </div>
        )}

        {/* translator  */}
        {permissions?.includes("translator") && (
          <div className="border mx-auto md:mx-0 shadow shadow-sirp-primaryLess1 border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[12rem] mt-5  p-3">
            <div className="flex flex-row items-center gap-3 pt-5">
              <div>
                <Image
                  src={frame0100}
                  alt="documents"
                  className="cursor-pointer"
                  width={100}
                />
              </div>
              <div>
                <p className="font-bold">{translatedDocs ?? 0}</p>
                <span className="font-light text-sirp-grey">
                  Translated Documents
                </span>
              </div>
            </div>
            <div className="pt-8 ">
              <button
                onClick={() => router.push("http://192.81.213.226:33/home")}
                className="capitalize border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold"
              >
                Open Translator
              </button>
            </div>
          </div>
        )}

        {/* fact checker  */}
        {permissions?.includes("fact checker") && (
          <div className="border mx-auto md:mx-0 shadow shadow-sirp-primaryLess1 border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[12rem] mt-5  p-3">
            <div className="flex flex-row items-center gap-3 pt-5">
              <div>
                <Image
                  src={frame011}
                  alt="documents"
                  className=" cursor-pointer"
                  width={100}
                />
              </div>
              <div>
                <p className="font-bold">{documents?.length ?? 0}</p>
                <span className="capitalize font-light text-sirp-grey text-[15px] ">
                  Fact-Checked Documents
                </span>
              </div>
            </div>
            <div className="pt-8 ">
              <button
                onClick={() => router.push("http://192.81.213.226:34/home")} //change route
                className="capitalize border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold"
              >
                Open Fact Checker
              </button>
            </div>
          </div>
        )}

        {/* summarizer  */}
        {permissions?.includes("summarizer") && (
          <div className="border mx-auto md:mx-0 shadow shadow-sirp-primaryLess1 border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[12rem] mt-5  p-3">
            <div className="flex flex-row items-center gap-3 pt-5">
              <div>
                <Image
                  src={frame012}
                  alt="documents"
                  className="cursor-pointer"
                  width={100}
                />
              </div>
              <div>
                <p className="font-bold">{summarizedDocs ?? 0}</p>
                <span className="capitalize font-light text-sirp-grey text-[15px] ">
                  Summarized Documents
                </span>
              </div>
            </div>
            <div className="pt-8 ">
              <button
                onClick={() => router.push("http://192.81.213.226:32/home")}
                className="capitalize border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold"
              >
                Open Summarizer
              </button>
            </div>
          </div>
        )}

        {/* deep chat  */}
        {permissions?.includes("deep chat") && (
          <div className="border mx-auto md:mx-0 shadow shadow-sirp-primaryLess1 border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[12rem] mt-5  p-3">
            <div className="flex flex-row items-center gap-3 pt-5">
              <div>
                <Image
                  src={frame013}
                  alt="documents"
                  className="cursor-pointer"
                  width={100}
                />
              </div>
              <div>
                <p className="font-bold">{conversationsCount ?? 0}</p>
                <span className="capitalize font-light text-sirp-grey text-[15px] ">
                  Total Documents
                </span>
              </div>
            </div>
            <div className="pt-8 ">
              <button
                onClick={() => router.push("http://192.81.213.226:35/home")}
                className="capitalize border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold"
              >
                Open Deep Chat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Group;
