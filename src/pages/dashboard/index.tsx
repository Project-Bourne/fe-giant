import React from "react";
import Left from "./components/LeftCompt";
import Right from "./components/RightCompt";
import Group1 from "./components/Group1";

const index = () => {
  return (
    <div>
      <h1 className="text-black text-2xl pl-10 font-bold">
        Welcome Oluanrawaju
      </h1>

      {/* the yellow navigation at the top of the dashboard page */}
      <div className="flex items-center justify-between w-full gap-[20px] mt-5">
        <Left />
        <Right />
      </div>
      <div className="mt-5">
        <Group1 />
      </div>
    </div>
  );
};

export default index;
