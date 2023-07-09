import React, { useState } from "react";
import { useTruncate } from "@/components/custom-hooks";
import Image from "next/image";
import { Checkbox } from "@mui/material";
import { ListItemModels } from "../models/home.models";

function ListItem({
  name,
  desc,
  message,
  time,
  handleChange,
  isMarked,
  actionButtons,
  viewDeleteButtons,
  buttonType,
}: ListItemModels) {
  const [showaction, setShowAction] = useState(0);
  const handleHover = () => {
    setShowAction(1);
  };
  const handleHoverOut = () => {
    setShowAction(0);
  };

  return (
    <div
      onMouseOut={handleHoverOut}
      onMouseOver={handleHover}
      className="grid md:flex justify-between items-center text-[14px] hover:text-gray-400 hover:bg-sirp-primaryLess2 p-2 rounded-lg hover:rounded-none hover:shadow"
    >
      <div className="flex gap-3 items-center hover:text-gray-400">
        <Checkbox checked={isMarked} onChange={handleChange} />
        <Image
          src={require("../../../assets/icons/saved.svg")}
          alt="documents"
          className="cursor-pointer w-4 h-4"
          width={10}
          height={10}
        />
        <p className="text-sirp-black-500 ml-2 md:w-[12rem] hover:text-gray-400">
          {name}
        </p>
      </div>
      <div className="hover:text-gray-400">
        <p className="text-black-100 w-[25rem]">{useTruncate(desc, 48)}</p>
      </div>
      {buttonType === "action" ? (
        <>
          {showaction === 0 && (
            <div className="md:w-[15%]">
              <p className="text-gray-400 border-l-2 pl-2 ">
                {useTruncate(message, 15)}
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          {(showaction === 0 || showaction === 1) && (
            <div className="md:w-[15%] border-l-2 px-5 ">
              <p className="text-gray-400">{useTruncate(message, 15)}</p>
            </div>
          )}
        </>
      )}
      {showaction === 0 && (
        <div className="flex w-[5%] md:mr-[5rem]">
          <p>{time}</p>
        </div>
      )}
      {showaction === 1 && (
        <div className="border-l-2 px-5 hover:cursor-pointer ">
          {viewDeleteButtons}
        </div>
      )}
      {showaction === 1 && <div className="border-l-2 ">{actionButtons}</div>}
    </div>
  );
}

export default ListItem;
