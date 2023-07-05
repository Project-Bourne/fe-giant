import React from "react";
import Image from "next/image";

const ActionIcons = () => {
  return (
    <div className="flex gap-2 mr-2 px-5">
      <Image
        src={require("../../../assets/icons/H3.svg")}
        alt="documents"
        className=" cursor-pointer"
        width={50}
      />
      <Image
        src={require("../../../assets/icons/H2.svg")}
        alt="documents"
        className=" cursor-pointer"
        width={50}
      />
      <Image
        src={require("../../../assets/icons/H1.svg")}
        alt="documents"
        className=" cursor-pointer"
        width={50}
      />
      <Image
        src={require("../../../assets/icons/H5.svg")}
        alt="documents"
        className="cursor-pointer"
        width={50}
      />
      <Image
        src={require("../../../assets/icons/H4.svg")}
        alt="documents"
        className="cursor-pointer"
        width={50}
      />
      <Image
        src={require("../../../assets/icons/H6.svg")}
        alt="documents"
        className="cursor-pointer"
        width={50}
      />
    </div>
  );
};

export default ActionIcons;
