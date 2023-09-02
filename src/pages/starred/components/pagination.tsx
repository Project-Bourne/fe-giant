import React from "react";
import Image from "next/image";

import icons_left from "../../../../public/icons/icons-left.svg";
import chevron_right from "../../../../public/icons/chevron-right1.svg";

function pagination() {
  return (
    <div>
      <div className="flex flex-row items-center">
        <h2 className="text-sirp-peginationtext text-[14px]">1 - 50 of 1000</h2>
        <Image
          src={icons_left}
          alt="documents"
          className="cursor-pointer ml-1"
          width={20}
        />
        <Image
          src={chevron_right}
          alt="documents"
          className="cursor-pointer ml-1"
          width={20}
        />
      </div>
    </div>
  );
}

export default pagination;
