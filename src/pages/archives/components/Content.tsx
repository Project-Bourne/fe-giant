import React, { useEffect, useState } from "react";
import ActionIcons from "@/pages/home/components/ActionIcons";
import ListItem from "@/pages/home/components/ListItem";
import DocumentDisplayModal from "@/pages/home/components/DocumentDisplayModal";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useFormatDate, useTruncate } from "@/components/custom-hooks";
import saved from "../../../../public/icons/saved.svg";
import on_saved from "../../../../public/icons/on.bookmark_filled.svg";
import options from "../../../../public/icons/options-icon.svg";
import Image from "next/image";
import { setIsArchived } from "@/redux/reducers/documentReducer";

function HomeContent({ data, headerborder }) {
  const buttons = useSelector((state: any) => state.ui.dropdownButtons);
  const isArchived = useSelector((state: any) => state.documents.isArchived);
  const [contentModal, setContentModal] = useState(false);
  const [modalContents, setModalContents] = useState({
    title: "",
    content: "",
  });
  const [selectedId, setSelectedId] = useState(null);
  const [tableheader, setTableheader] = useState(buttons);
  const [showaction, setShowAction] = useState(0);
  const [archived, setArchived] = useState(false);
  const [clickTimeout, setClickTimeout] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setTableheader(buttons);
  }, [buttons]);

  const handleModalClose = () => {
    setContentModal(false);
    setSelectedId(null);
    setModalContents({ title: "", content: "" });
  };

  const handleModalOpen = (id, title, content) => {
    setContentModal(true);
    setSelectedId(id);
    setModalContents({ title, content });
  };
  const handleClick = (id, title, content) => {
    handleModalOpen(id, title, content);
  };

  const handleClicks = (_arg, _arg1, _arg2) => {
    if (clickTimeout !== null) {
      // alert('double click executes');
      handleDoubleClick(_arg);
      clearTimeout(clickTimeout);
      setClickTimeout(null);
    } else {
      console.log("single click");
      const timeout = setTimeout(() => {
        // alert('first click executes');
        handleClick(_arg, _arg1, _arg2);
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

  const handleArchived = (e, id) => {
    e.stopPropagation();
    // setArchived(true);
    dispatch(setIsArchived(id));
  };

  const handleUndoArchived = (e, id) => {
    e.stopPropagation();
    setArchived(false);
  };

  const handleDoubleClick = (id) => {
    router.push(`/home/metadata/${id}`);
  };

  const generateTableRows = (_arg, columnOrder) => {
    return _arg.map((rowData: any) => {
      const cells = columnOrder.map((columnItem: any, index) => {
        if (columnItem?.key === "archive") {
          return (
            <div
              key={index}
              className={`w-[${columnItem.width}] flex px-2 items-center`}
            >
              {rowData?.archived ? (
                <Image
                  src={on_saved}
                  alt="documents"
                  className="cursor-pointer w-4 h-4"
                  onClick={(e) => handleUndoArchived(e, rowData?.uuid)}
                  width={13}
                  height={13}
                />
              ) : (
                <Image
                  src={saved}
                  alt="documents"
                  className="cursor-pointer w-4 h-4"
                  onClick={(e) => handleArchived(e, rowData?.uuid)}
                  width={10}
                  height={10}
                />
              )}
            </div>
          );
        }
        if (
          (rowData?.hasOwnProperty(columnItem?.key) &&
            rowData[columnItem?.key] !== undefined) ||
          (rowData?.confidence?.hasOwnProperty(columnItem?.key) &&
            rowData["confidence"][columnItem?.key] !== undefined) ||
          columnItem?.key !== "archive"
        ) {
          if (columnItem?.key === "author") {
            // Author
            return (
              <div
                key={index}
                className={`capitalize py-2 w-[${columnItem?.width}]`}
              >
                {useTruncate(
                  (rowData?.confidence && rowData?.confidence?.author) || "",
                  25,
                ) ?? "no author"}
              </div>
            );
          } else if (columnItem?.key === "updatedAt") {
            // Time
            if (columnItem.checked) {
              if (showaction === 0) {
                return (
                  <div key={index} className={`py-2 w-[${columnItem?.width}] `}>
                    {useFormatDate(rowData[columnItem?.key])}
                  </div>
                );
              }
              if (showaction === 1) {
                return <ActionIcons />;
              }
            }
          } else if (columnItem?.key === "content") {
            // Content
            if (columnItem.checked) {
              return (
                <div
                  key={index}
                  className={`py-2 w-[${columnItem?.width}] ${
                    columnItem?.key === "content" && "first-letter:capitalize"
                  }`}
                >
                  {useTruncate(rowData[columnItem?.key], 25) ||
                    useTruncate(
                      (rowData?.confidence &&
                        rowData?.confidence[columnItem?.key]) ||
                        "",
                      25,
                    )}
                </div>
              );
            }
          } else if (
            columnItem?.key !== "updatedAt" ||
            columnItem?.key !== "author"
          ) {
            return (
              <div
                key={index}
                className={`py-2 w-[${columnItem?.width}] ${
                  columnItem?.key === "title" && "first-letter:capitalize"
                }`}
              >
                {useTruncate(rowData[columnItem?.key], 25) ||
                  useTruncate(
                    (rowData?.confidence &&
                      rowData?.confidence[columnItem?.key]) ||
                      "",
                    25,
                  )}
              </div>
            );
          }
        } else {
          <div key={index}></div>;
        }
      });

      return (
        <div
          key={rowData?.uuid}
          onClick={() =>
            handleClicks(
              rowData?.uuid,
              rowData?.confidence?.title,
              rowData?.confidence?.content,
            )
          }
          className="flex text-[13px] hover:bg-sirp-primaryLess2/[0.7] hover:cursor-pointer"
        >
          {cells}
        </div>
      );
    });
  };

  return (
    <>
      <ul
        className={`w-full flex flex-row px-3 py-4 ${
          headerborder && "rounded-t-2xl"
        }  bg-gray-100`}
      >
        {tableheader.map(
          (item, index) =>
            item?.checked && (
              <li
                key={index}
                className={`w-[${item.width}] text-[16px] font-bold`}
              >
                {item.name}
              </li>
            ),
        )}
      </ul>
      <>
        {data?.length > 0 ? (
          generateTableRows(data, tableheader)
        ) : (
          <div className="p-3">
            {" "}
            <i>You have no documents yet!</i>{" "}
          </div>
        )}
      </>

      {/* document content preview pane; fixed display at the right hand side when a document is  clicked */}
      {contentModal && (
        <DocumentDisplayModal
          closeModal={handleModalClose}
          selectedItem={modalContents}
          id={selectedId}
        />
      )}
    </>
  );
}

export default HomeContent;
