import React, { useEffect, useState } from "react";
import { useFormatDate, useTruncate } from "@/components/custom-hooks";
import Image from "next/image";
// import { Checkbox } from "@mui/material";
import ListItemModels from "../../../models/home/home.models";
import saved from "../../../../public/icons/saved.svg";
import on_saved from "../../../../public/icons/on.bookmark_filled.svg";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setArchivedDocs } from "@/redux/reducers/documentReducer";
// import { Button, CustomModal } from "@/components/ui";
// import { Close } from "@mui/icons-material";
// import { DocumentDisplayModal } from "./DocumentDisplayModal";

function ListItem({
  id,
  title,
  url,
  width,
  isArchived,
  author,
  message,
  time,
  handleClick,
  handleDoubleClick,
  actionButtons,
}: ListItemModels) {
  const buttons = useSelector((state: any) => state.ui.dropdownButtons);
  const [showaction, setShowAction] = useState(0);
  const [archived, setArchived] = useState(false);
  const [clickTimeout, setClickTimeout] = useState(null);
  const [tableLayout, setTableLayout] = useState(buttons);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setTableLayout(buttons);
  }, [buttons]);

  const handleClicks = () => {
    if (clickTimeout !== null) {
      // alert('double click executes');
      handleDoubleClick();
      clearTimeout(clickTimeout);
      setClickTimeout(null);
    } else {
      console.log("single click");
      const timeout = setTimeout(() => {
        // alert('first click executes');
        handleClick();
        clearTimeout(timeout);
        setClickTimeout(null);
      }, 200);
      setClickTimeout(timeout);
    }
  };

  const handleHover = () => {
    setShowAction(1);
  };
  const handleHoverOut = () => {
    setShowAction(0);
  };

  const handleArchived = (e) => {
    e.stopPropagation();
    setArchived(true);
    dispatch(setArchivedDocs(id));
  };

  const handleUndoArchived = (e) => {
    e.stopPropagation();
    setArchived(false);
  };

  return (
    <>
      <div
        onClick={handleClicks}
        className={`w-full flex  px-3 py-3 
              ${showaction === 0 ? "justify-between" : "justify-normal"}
              hover:bg-sirp-primaryLess2/[0.4] hover:py-2 hover:cursor-pointer
            `}
        onMouseOut={handleHoverOut}
        onMouseOver={handleHover}
      >
        {/* archives icon  */}
        <div className="w-[4%] flex items-center">
          {isArchived ? (
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
        <div className="w-[21%] flex gap-x-2 text-[14px] items-center text-gray-700">
          <p>{useTruncate(title, 25)}</p>
        </div>

        {/* author  */}
        <div className="w-[21%] flex gap-x-2 text-[14px] items-center text-gray-700">
          <p>{useTruncate(author, 25) || "--"}</p>
        </div>

        {/* source  */}
        <div className="w-[22%] text-[14px] text-gray-700">
          {useTruncate(url, 25)}
        </div>

        {/* content  */}
        <div className="w-[23%] text-[14px] text-gray-700">
          {useTruncate(message, 25)}
        </div>

        {/* time  */}
        {showaction === 0 && (
          <div className="w-[9%] text-[14px] text-gray-700 border-l-[1px] pl-2">
            {useFormatDate(time)}
          </div>
        )}
        {showaction === 1 && <div>{actionButtons}</div>}
      </div>
    </>
  );
}

export default ListItem;

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
