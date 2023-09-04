import Image from "next/image";
import React, { useState } from "react";
import NavBarItem from "./NavBarItem";
import { NavBarContents } from "@/utils/constants";
import logo from "../../../../public/images/logo.png";
import refresh from "../../../../public/icons/refresh.svg";

function NavBar() {
  const [isCrawling, setIsCrawling] = useState(false);

  const handleCrawler = () => {
    // dispatch crawling action and set isCrawling  to false
    // disable button
    setIsCrawling(true);
  };

  return (
    <div className="w-[15vw] md:w-[20vw] h-full border-3 border-r bg-white px-3 py-10 md:p-10 fixed z-[20]">
      <div className="flex flex-row items-center cursor-pointer mb-[4rem]">
        <Image
          src={logo}
          alt="IRP Logo"
          width={50}
          height={50}
          className={`md:mr-[20px]`}
          priority
        />
        <h1 className="text-sirp-primary font-semibold text-[30px] hidden md:block">
          IRP
        </h1>
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
    </div>
  );
}

export default NavBar;
