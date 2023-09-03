import React from "react";
import Left from "./components/LeftCompt";
import Right from "./components/RightCompt";
import Group1 from "./components/Group1";
import { useSelector } from "react-redux";

const index = () => {
  const user = useSelector((state: any) => state?.auth?.userInfo);
  return (
    <div className="h-full overflow-y-scroll mt-[10rem]">
      <h1 className="text-black text-2xl pl-10 font-bold capitalize">
        Welcome {user?.firstName}
      </h1>

      {/* the yellow navigation at the top of the dashboard page */}
      <div className="grid grid-cols-1 px-[5px] md:px-0 md:grid-cols-2 justify-between md:items-center w-full md:w-[95%] md:mx-auto md:gap-x-[20px] gap-y-[20px] mt-5">
        <Left />
        <Right />
      </div>
      <div className="mt-5 mb-5">
        <Group1 />
      </div>
    </div>
  );
};

export default index;
