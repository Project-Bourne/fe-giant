import React from "react";
import Image from "next/image";

import arrows_max from "../../../../public/icons/map.svg";
import arrows_minimize from "../../../../public/icons/arrows-minimize1.svg";

const Min_and_Max_icon = ({ minOnClick, maxOnClick }) => {
  return (
    <div>
      <div className="flex justify-end items-center gap-2 mr-[5rem] pt-[2rem]">
        <Image
          src={arrows_minimize}
          alt="documents"
          className="cursor-pointer pb-5"
          width={20}
          onClick={minOnClick}
        />
        <Image
          src={arrows_max}
          alt="documents"
          className="cursor-pointer pb-5"
          width={20}
          onClick={maxOnClick}
        />
      </div>
    </div>
  );
};

export default Min_and_Max_icon;
