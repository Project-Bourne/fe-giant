import React, { useState } from "react";
import { useTruncate } from "@/components/custom-hooks";
import Image from "next/image";
import { Checkbox } from "@mui/material";
import ListItemModels from "../../../models/home/home.models";
import saved from "../../../../public/icons/saved.svg";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const id = 2;

  const handleHover = () => {
    setShowAction(1);
  };
  const handleHoverOut = () => {
    setShowAction(0);
  };

  const handleOnClick = (e) => {
    e.stopPropagation();
    router.push(`/home/metadata/${id}`);
  };

  return (
    <div
      onMouseOut={handleHoverOut}
      onMouseOver={handleHover}
      className={`text-[14px] flex items-center cursor-pointer ${
        isMarked && "bg-sirp-primaryLess2"
      } hover:text-gray-400 hover:bg-sirp-primaryLess2 p-2 rounded-lg hover:rounded-none hover:shadow justify-between`}
    >
      <div className="flex gap-3 items-center  hover:text-gray-400">
        <Checkbox checked={isMarked} onChange={handleChange} />
        {/* star icon  */}
        <Image
          src={saved}
          alt="documents"
          className="cursor-pointer w-4 h-4"
          width={10}
          height={10}
        />
        {/* name  */}
        <p
          onClick={handleOnClick}
          className="text-sirp-black-500 ml-2 md:w-[12rem] hover:text-gray-400"
        >
          {name}
        </p>
      </div>
      {/* decsription  */}
      <div
        className="hover:text-gray-400 hidden md:block"
        onClick={handleOnClick}
      >
        <p className={`text-black-100 w-[23rem]`}>
          {desc && useTruncate(desc, 48)}
        </p>
      </div>
      {/* message  */}
      {buttonType === "action" ? (
        <>
          {showaction === 0 && (
            <div className="md:w-[15%] hidden md:block">
              <p className="text-gray-400 border-l-2 pl-2 ">
                {message && useTruncate(message, 15)}
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          {(showaction === 0 || showaction === 1) && (
            <div className="md:w-[15%] border-l-2 px-3 hidden md:block">
              <p className="text-gray-400">
                {message && useTruncate(message, 15)}
              </p>
            </div>
          )}
        </>
      )}
      {/* time  */}
      {showaction === 0 && (
        <div className="flex w-[5%] mr-[3rem] md:mr-[5rem]">
          <p>{time}</p>
        </div>
      )}
      {/* overflow buttons  */}
      {showaction === 1 && (
        <div className="border-l-2 px-5 hover:cursor-pointer ">
          {viewDeleteButtons}
        </div>
      )}
      {showaction === 1 && <div className="border-l-2">{actionButtons}</div>}
    </div>
  );
}

export default ListItem;
