import React, { useEffect, useState } from "react";
import { useFormatDate, useTruncate } from "@/components/custom-hooks";
import Image from "next/image";
// import { Checkbox } from "@mui/material";
import ListItemModels from "../../../models/home/home.models";
import saved from "../../../../public/icons/saved.svg";
import on_saved from "../../../../public/icons/on.bookmark_filled.svg";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
// import { setArchivedDocs } from "@/redux/reducers/documentReducer";

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
    // dispatch(setArchivedDocs(id));
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
