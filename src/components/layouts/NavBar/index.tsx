import Image from "next/image";
import React, { useState } from "react";
import NavBarItem from "./NavBarItem";
import { NavBarContents } from "@/utils/constants";
import Link from "next/link";
import { COMPANY_INFO } from "@/utils/company.constants";

function NavBar() {
  const [isCrawling, setIsCrawling] = useState(false);

  const handleCrawler = () => {
    // dispatch crawling action and set isCrawling  to false
    // disable button
    setIsCrawling(true);
  };

  return (
    <div className="w-[15vw] md:w-[20vw] h-full border-3 border-r bg-white px-3 py-10 md:p-10 fixed z-[20]">
      <div className={"flex flex-col items-center justify-center "}>
        <Link
          href={"/"}
          className="flex flex-row w-fit mx-auto cursor-pointer mb-[.1rem]"
        >
          <Image
            src="/images/logo.png"
            alt="IRP Logo"
            width={50}
            height={50}
            className={`md:mr-[10px] flex items-start`}
            priority
          />
          <div className="flex items-end">
            <h1 className="text-sirp-primary font-semibold text-[30px] hidden md:block tracking-wider">
              IRP
            </h1>
          </div>
        </Link>

        <p className="text-sirp-primary font-semibold text-[12.5px] hidden md:block">
          Intelligence Reporting Platform
        </p>
      </div>
      {/* items-center justify-center py-4 md:px-5 w-[100%] flex flex-row self-center */}
      {/* <div
        className={`${
          isCrawling && "pointer-events-none"
        } flex py-4 px-0 md:px-3 lg:px-5 text-center justify-center border-[1.3px] border-sirp-primaryLess1 rounded-xl cursor-pointer shadow-sm shadow-sirp-primaryLess1 hover:bg-blue-50`}
        onClick={handleCrawler}
      >
        <Image
          src={refresh}
          alt="Start/Refresh Crawler"
          width={20}
          height={20}
          className={`md:mr-[20px] ${isCrawling && "animate-spin"}`}
          priority
        />

        <h2 className="text-sirp-primary font-semibold text-[14px] hidden md:block">
          Start Crawler
        </h2>
      </div> */}

      <div className="w-full mt-10">
        {NavBarContents.map((item, index) => (
          <NavBarItem item={item} index={index} key={index} />
        ))}
      </div>

      <div className="absolute bottom-10 text-[10px] px-5 -left-2 md:block hidden">
        <div className="bg-gray-50 p-3 rounded">
          <h3 className="justify-center font-semibold flex items-center mb-2">
            <Image
              src="/icons/disclaimer-icon.svg"
              alt="disclaimer"
              height={12}
              width={12}
            />
            &nbsp; DISCLAIMER
          </h3>
          <p>
            The information presented is intended for general informational
            purposes only. It is imperative that users independently verify and
            assess the output before making any consequential decisions. <br />
            Kindly be advised that the application's output may not
            comprehensively address individual needs and circumstances.
            <br />
            <br />
          </p>
          <p className="bg-sirp-primary text-white px-2 py-1 rounded-md">
            {COMPANY_INFO.copyright}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
