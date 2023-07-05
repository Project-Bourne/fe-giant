import React, { useState } from "react";
import Image from "next/image";
import BlueButton from "@/components/ui/BlueButton";
import { Checkbox } from "@mui/material";
import Link from "next/link";

function HeadIcon(props) {
  const [check, setCheck] = useState(false);

  return (
    <div className="flex justify-between items-center mx-5">
      {/* this are the three icon to the left */}
      <div className="flex flex-row items-center">
        <Checkbox />
        <Image
          src={require("../../../assets/icons/down.svg")}
          alt="documents"
          className="cursor-pointer ml-2"
          width={10}
        />
        <Image
          src={require("../../../assets/icons/refresh.svg")}
          alt="documents"
          className="cursor-pointer ml-5"
          width={20}
        />
      </div>
      <div className="flex gap-4 items-center">
        {/* pegination section */}
        <div className="flex flex-row items-center">
          <h2 className="text-sirp-peginationtext">1 - 50 of 1000</h2>
          <Image
            src={require("../../../assets/icons/Icons-left.svg")}
            alt="documents"
            className="cursor-pointer ml-1"
            width={20}
          />
          <Image
            src={require("../../../assets/icons/chevron-right 1.svg")}
            alt="documents"
            className="cursor-pointer ml-1"
            width={20}
          />
        </div>
        {/* Blue action button */}
        <Link href="./home/addcontent/addcontent">
          <BlueButton />
        </Link>
      </div>
    </div>
  );
}

export default HeadIcon;
