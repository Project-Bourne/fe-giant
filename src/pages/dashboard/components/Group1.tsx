import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import frame7 from "../../../../public/icons/frame-07.svg";
import frame8 from "../../../../public/icons/frame-08.svg";
import frame9 from "../../../../public/icons/frame-09.svg";
import frame011 from "../../../../public/icons/frame-011.svg";
import frame012 from "../../../../public/icons/frame-012.svg";
import frame013 from "../../../../public/icons/frame-013.svg";
import frame0100 from "../../../../public/icons/frame-0100.svg";

function Group1() {
  const router = useRouter();

  return (
    <div className="flex justify-start items-start md:justify-evenly flex-row flex-wrap gap-x-5 md:gap-x-0">
      {/* group 1  */}

      <div
        className="border mx-auto md:mx-0  border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[12rem] mt-5  p-3"
        onClick={() => router.push("http://192.81.213.226:36/dashboard")}
      >
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
            <p className="font-bold">0</p>
            <span className="capitalize font-light text-sirp-grey text-[15px]">
              Total Exports to Collab
            </span>
          </div>
        </div>
        <div className="pt-8 ">
          <button className="capitalize border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold ">
            Open Collab Workspace
          </button>
        </div>
      </div>
      {/* group 2   */}
      <div
        className="border mx-auto md:mx-0 border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[12rem] mt-5  p-3"
        onClick={() => router.push("http://192.81.213.226:31/dashboard")}
      >
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
            <p className="font-bold">10</p>
            <span className="capitalize font-light text-sirp-grey text-[15px]">
              Analyzed Documents
            </span>
          </div>
        </div>
        <div className="pt-8 ">
          <button className="capitalize border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold">
            Open Analyzer
          </button>
        </div>
      </div>
      <div
        className="border mx-auto md:mx-0 border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[12rem] mt-5  p-3"
        onClick={() => router.push("http://192.81.213.226:32/home")}
      >
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
            <p className="font-bold">0</p>
            <span className="capitalize font-light text-sirp-grey text-[15px] ">
              Interrogated Documents
            </span>
          </div>
        </div>
        <div className="pt-8 ">
          <button className="capitalize border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold">
            Open Interrogator
          </button>
        </div>
      </div>
      <div
        className="border mx-auto md:mx-0 border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[12rem] mt-5  p-3"
        onClick={() => router.push("http://192.81.213.226:33/home")}
      >
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
            <p className="font-bold">4000</p>
            <span className="font-light text-sirp-grey">
              Translated Documents
            </span>
          </div>
        </div>
        <div className="pt-8 ">
          <button className="capitalize border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold">
            Open Translator
          </button>
        </div>
      </div>
      {/* group 3  */}
      <div
        className="border mx-auto md:mx-0 border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[12rem] mt-5  p-3"
        onClick={() => router.push("http://192.81.213.226:34/home")}
      >
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
            <p className="font-bold">4000</p>
            <span className="capitalize font-light text-sirp-grey text-[15px] ">
              Fact-Checked Documents
            </span>
          </div>
        </div>
        <div className="pt-8 ">
          <button className="capitalize border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold">
            Open Fact Checker
          </button>
        </div>
      </div>
      <div
        className="border mx-auto md:mx-0 border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[12rem] mt-5  p-3"
        onClick={() => router.push("http://192.81.213.226:32/home")}
      >
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
            <p className="font-bold">400</p>
            <span className="capitalize font-light text-sirp-grey text-[15px] ">
              Summarized Documents
            </span>
          </div>
        </div>
        <div className="pt-8 ">
          <button className="capitalize border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold">
            Open Summarizer
          </button>
        </div>
      </div>
      <div
        className="border mx-auto md:mx-0 border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[12rem] mt-5  p-3"
        onClick={() => router.push("http://192.81.213.226:35/dashboard")}
      >
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
            <p className="font-bold">4000</p>
            <span className="capitalize font-light text-sirp-grey text-[15px] ">
              Total Documents
            </span>
          </div>
        </div>
        <div className="pt-8 ">
          <button className="capitalize border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold">
            Open Deep Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default Group1;
