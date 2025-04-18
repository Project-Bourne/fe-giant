import React, { useEffect } from "react";
import Image from "next/image";
import { useWindowWidth } from "@/components/custom-hooks";
import strips from "../../../public/svg/Strips.svg";
import logo from "../../../public/svg/logo.svg";
import Link from "next/link";

function AuthLayout({ children, headerText, subText, isTextCenter }) {
  const screenWidth = useWindowWidth();

  const bgStyle = {
    backgroundColor: `url('../../../public/svg/Strips.svg')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <div className=".root">
      <div className="flex w-full h-[100vh]">
        <div
          style={screenWidth < 768 ? bgStyle : {}}
          className="w-full lg:w-[42%] bg-white overflow-y-scroll"
        >
          <div className="bg-white mx-auto w-[85%] md:w-[45%] lg:w-[80%] rounded-md mt-[30px] md:mt-[50px] px-7">
            {/* logo  */}
            <Link
              href="/auth/login"
              className="mx-auto flex justify-center w-[25%]"
            >
              <Image
                src={logo}
                alt="IRP Logo"
                width={100}
                height={93}
                priority
              />
            </Link>
            {/* heading text  */}
            <div className={`${isTextCenter && "max-w-fit mx-auto"}`}>
              <h1 className="text-center md:text-left text-3xl md:text-4xl mt-[30px] md:mt-[40px] mb-2 font-semibold text-black">
                {headerText}
              </h1>
              {/* sub-text  */}
              <p className="text-center md:text-left text-[14px] md:text-base font-light">
                {subText}
              </p>
            </div>
            {/* form  */}
            <div> {children} </div>
          </div>
        </div>
        <div className="hidden lg:block lg:w-[58%] h-[100vh]">
          <Image
            src={strips}
            alt="IRP Logo"
            className="object-cover w-full"
            width={100}
            height={100}
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
