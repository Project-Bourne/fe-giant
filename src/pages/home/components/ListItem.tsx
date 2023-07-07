import React, { useState } from "react";
import { useTruncate } from "@/components/custom-hooks";
import Image from "next/image";
import { Checkbox } from "@mui/material";
import ActionIcons from "./ActionIcons";

function ListItem({ name, desc, message, time, handleChange, isMarked, actionButtons }) {
  const [showaction, setShowAction] = useState(0);
  const handleHover = () => {
    setShowAction(1)
  }
  const handleHoverOut = () => {
    setShowAction(0)
  }



  return (
    <div onMouseOut={handleHoverOut} onMouseOver={handleHover} className="flex items-center hover:text-gray-400 hover:bg-sirp-hoverbg p-2 rounded-lg ">
      <div className="flex gap-3 items-center hover:text-gray-400">
        <Checkbox checked={isMarked} onChange={handleChange} />
        <Image
          src={require("../../../assets/icons/bluestar.svg")}
          alt="documents"
          className="cursor-pointer w-4 h-4"
          width={10}
          height={10}
        />
        <p className="text-sirp-black-500 ml-2 w-[12rem] hover:text-gray-400">
          {name}
        </p>
      </div>
      <div className="hover:text-gray-400">
        <p className="text-black-100 w-[25rem]">{useTruncate(desc, 48)}</p>
      </div>
      { showaction == 0 &&
        <div className="flex justify-between md:w-[20rem] pl-[7rem] ">
          <p className="text-gray-400 border-l-2 pl-2 ">
            {useTruncate(message, 15)}
          </p>
          <p>{time}</p>
        </div>
      }
      { showaction == 1 &&
        <div className="border-l-2 ">{actionButtons}</div>
        }
    </div>
  );
}

export default ListItem;
