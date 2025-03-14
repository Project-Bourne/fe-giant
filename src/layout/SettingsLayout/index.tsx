import { SettingsData } from "@/utils/constants";
import React, { ReactNode } from "react";
import "../../styles/global.css";
import { useRouter } from "next/router";
import TabComp from "@/pages/settings/components/TabComp";

type LayoutType = {
  children: ReactNode;
};

const SettingsLayout = ({ children }: LayoutType) => {
  const route = useRouter().pathname;

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="flex flex-row w-full py-7 px-7 items-center justify-between">
        <h1 className="text-[18px] font-semibold">Profile Settings</h1>
      </div>

      {/* Settings tabs */}
      <div className="w-[100%] flex flex-row flex-wrap items-center border-b overscroll-y-auto">
        {SettingsData.length > 0 &&
          SettingsData?.map((item, index) => (
            <TabComp item={item} key={index} />
          ))}
      </div>

      {/* <div className='w-full h-full overscroll-auto flex'>
        </div> */}
      {children}
    </div>
  );
};

export default SettingsLayout;
