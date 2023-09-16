import React, { useState } from "react";
import { useTruncate } from "@/components/custom-hooks";
import Image from "next/image";
import { Checkbox } from "@mui/material";
import ListItemModels from "../../../models/home/home.models";
import saved from "../../../../public/icons/saved.svg";
import on_saved from "../../../../public/icons/on.bookmark_filled.svg";
import { useRouter } from "next/router";

function ListItem({
  name,
  desc,
  message,
  time,
  tableLayout,
  handleChange,
  isMarked,
  actionButtons,
  viewDeleteButtons,
  buttonType,
}: ListItemModels) {
  const [showaction, setShowAction] = useState(0);
  const [archived, setArchived] = useState(false);
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

  const handleArchived = () => {
    setArchived(true);
  };
  const handleUndoArchived = () => {
    setArchived(false);
  };
  // {`text-[14px] flex items-center cursor-pointer p-2 ${
  //   isMarked && "bg-sirp-primaryLess2"
  // } hover:text-gray-700 hover:bg-sirp-primaryLess2 rounded-lg hover:rounded-none hover:shadow justify-between`}

  return (
    <>
      {tableLayout === "0" && (
        <div
          className={`w-full flex  px-3 py-3 
              ${showaction === 0 ? "justify-between" : "justify-normal"}
              hover:bg-sirp-primaryLess2/[0.4] hover:py-2
            `}
          onMouseOut={handleHoverOut}
          onMouseOver={handleHover}
        >
          {/* archives icon  */}
          <div className="w-[5%] flex items-center">
            {archived ? (
              <Image
                src={on_saved}
                alt="documents"
                className="cursor-pointer w-4 h-4"
                onClick={handleUndoArchived}
                width={13}
                height={13}
              />
            ) : (
              <Image
                src={saved}
                alt="documents"
                className="cursor-pointer w-4 h-4"
                onClick={handleArchived}
                width={10}
                height={10}
              />
            )}
          </div>

          {/* title  */}
          <div className="w-[30%] flex gap-x-2 text-[14px] items-center text-gray-700">
            <p
              className="hover:underline hover:cursor-pointer"
              onClick={handleOnClick}
            >
              {useTruncate(name, 30)}
            </p>
          </div>

          {/* source  */}
          <div className="w-[27%] text-[14px] text-gray-700">
            {useTruncate(desc, 30)}
          </div>

          {/* content  */}
          <div className="w-[28%] text-[14px] text-gray-700">
            {useTruncate(message, 30)}
          </div>

          {/* time  */}
          {showaction === 0 && (
            <div className="w-[10%] text-[14px] text-gray-700 border-l-[1px] pl-2">
              {time}
            </div>
          )}
          {showaction === 1 && <div>{actionButtons}</div>}
        </div>
      )}

      {/* table layout 1  */}

      {tableLayout === "1" && (
        <div
          className={`w-full flex  px-3 py-3 
              ${showaction === 0 ? "justify-between" : "justify-normal"}
              hover:bg-sirp-primaryLess2/[0.4] hover:py-2
            `}
          onMouseOut={handleHoverOut}
          onMouseOver={handleHover}
        >
          {/* archives icon  */}
          <div className="w-[5%] flex items-center">
            {archived ? (
              <Image
                src={on_saved}
                alt="documents"
                className="cursor-pointer w-4 h-4"
                onClick={handleUndoArchived}
                width={13}
                height={13}
              />
            ) : (
              <Image
                src={saved}
                alt="documents"
                className="cursor-pointer w-4 h-4"
                onClick={handleArchived}
                width={10}
                height={10}
              />
            )}
          </div>

          {/* source  */}
          <div className="w-[30%] text-[14px] text-gray-700">
            {useTruncate(desc, 30)}
          </div>

          {/* title  */}
          <div className="w-[27%] flex gap-x-2 text-[14px] items-center text-gray-700">
            <p
              className="hover:underline hover:cursor-pointer"
              onClick={handleOnClick}
            >
              {useTruncate(name, 30)}
            </p>
          </div>

          {/* content  */}
          <div className="w-[28%] text-[14px] text-gray-700">
            {useTruncate(message, 30)}
          </div>

          {/* time  */}
          {showaction === 0 && (
            <div className="w-[10%] text-[14px] text-gray-700 border-l-[1px] pl-2">
              {time}
            </div>
          )}
          {showaction === 1 && <div>{actionButtons}</div>}
        </div>
      )}
    </>

    // <div
    //   onMouseOut={handleHoverOut}
    //   onMouseOver={handleHover}
    //   className={'w-full flex flex-row'}
    // >
    //   {/* title */}
    //   <div className="flex gap-2 items-center bg-purple-300 w-[30%]">
    //     {/* star icon  */}
    //     <Image
    //       src={saved}
    //       alt="documents"
    //       className="cursor-pointer w-4 h-4"
    //       width={10}
    //       height={10}
    //     />
    //     <p
    //       onClick={handleOnClick}
    //       className="text-sirp-black-500 ml-2"
    //     >
    //       {useTruncate(name, 30)}
    //     </p>
    //   </div>

    //   {/* source  */}
    //   <div
    //     className="hover:text-gray-400 hidden md:block bg-blue-300 w-[28%]"
    //     onClick={handleOnClick}
    //   >
    //     <p className={`text-black-100`}>
    //       {desc && useTruncate(desc, 30)}
    //     </p>
    //   </div>

    //   {/* content */}
    //   {buttonType === "action" ? (
    //     <>
    //       {showaction === 0 && (
    //         <div className=" hidden md:block bg-green-300 w-[30%]">
    //           <p className="text-gray-400 border-l-2 pl-2 ">
    //             {message && useTruncate(message, 15)}
    //           </p>
    //         </div>
    //       )}
    //     </>
    //   ) : (
    //     <>
    //       {(showaction === 0 || showaction === 1) && (
    //         <div className="md:w-[15%] border-l-2 px-3 hidden md:block w-[30%]">
    //           <p className="text-gray-400">
    //             {message && useTruncate(message, 15)}
    //           </p>
    //         </div>
    //       )}
    //     </>
    //   )}
    //   {/* time  */}
    //   {showaction === 0 && (
    //     <div className="flex mr-[3rem] md:mr-[5rem] bg-yellow-300 w-[12%]">
    //       <p>{time}</p>
    //     </div>
    //   )}
    //   {/* overflow buttons  */}
    //   {showaction === 1 && (
    //     <div className="border-l-2 px-5 hover:cursor-pointer bg-orange-600">
    //       {viewDeleteButtons}
    //     </div>
    //   )}
    //   {showaction === 1 && <div className="border-l-2">{actionButtons}</div>}
    // </div>
  );
}

export default ListItem;
