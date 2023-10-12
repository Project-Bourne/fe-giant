import React, { useEffect, useState } from "react";
import DocumentDisplayModal from "@/pages/home/components/DocumentDisplayModal";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useFormatDate, useTruncate } from "@/components/custom-hooks";

function ArchiveContent({ data, headerborder }) {
  const buttons = useSelector((state: any) => state.ui.dropdownButtons);
  const [contentModal, setContentModal] = useState(false);
  const [modalContents, setModalContents] = useState({
    title: "",
    content: "",
  });
  const [selectedId, setSelectedId] = useState(null);
  const [tableheader, setTableheader] = useState(buttons);
  const [clickTimeout, setClickTimeout] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setTableheader(buttons);
  }, [buttons]);

  const getAuthor = (arg) => {
    const domain = new URL(arg).hostname;
    return domain;
  };

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
  const handleDoubleClick = (id) => {
    router.push(`/archives/${id}`);
  };

  const handleClicks = (_arg, _arg1, _arg2) => {
    if (clickTimeout !== null) {
      // alert('double click executes');
      handleDoubleClick(_arg);
      clearTimeout(clickTimeout);
      setClickTimeout(null);
    } else {
      const timeout = setTimeout(() => {
        // alert('first click executes');
        handleClick(_arg, _arg1, _arg2);
        clearTimeout(timeout);
        setClickTimeout(null);
      }, 200);
      setClickTimeout(timeout);
    }
  };

  const generateTableRows = (_arg, columnOrder) => {
    return _arg.map((rowData: any) => {
      const cells = columnOrder.map((columnItem: any, index) => {
        if (columnItem?.key === "archive") {
          return (
            <div key={index} className={`w-[2%] flex  items-center`}></div>
          );
        }
        if (
          (rowData?.hasOwnProperty(columnItem?.key) &&
            rowData[columnItem?.key] !== undefined) ||
          (rowData?.fact?.hasOwnProperty(columnItem?.key) &&
            rowData?.fact[columnItem?.key] !== undefined) ||
          (rowData?.confidence?.hasOwnProperty(columnItem?.key) &&
            rowData["confidence"][columnItem?.key] !== undefined) ||
          (rowData?.fact?.confidence?.hasOwnProperty(columnItem?.key) &&
            rowData?.fact["confidence"][columnItem?.key] !== undefined) ||
          columnItem?.key !== "archive"
        ) {
          if (columnItem?.key === "author") {
            // Author
            const uniqueAuthor =
              rowData?.fact?.confidence?.author ||
              getAuthor(rowData?.fact?.url) ||
              "No author";
            const author =
              typeof uniqueAuthor !== "string"
                ? useTruncate(uniqueAuthor[0], 20)
                : useTruncate(uniqueAuthor, 20);

            return (
              <div key={index} className={`capitalize py-2 px-3 w-[22%]`}>
                {author}
              </div>
            );
          } else if (columnItem?.key === "updatedAt") {
            // Time
            if (columnItem.checked) {
              return (
                <div key={index} className={`py-2 w-[9%] `}>
                  {useFormatDate(rowData[columnItem?.key])}
                </div>
              );
            }
          } else if (columnItem?.key === "content") {
            // Content
            if (columnItem.checked) {
              return (
                <div
                  key={index}
                  className={`py-2 w-[23%] ${
                    columnItem?.key === "content" && "first-letter:capitalize"
                  }`}
                >
                  {useTruncate(
                    rowData?.fact?.confidence?.content || "No Content",
                    25,
                  )}
                </div>
              );
            }
          } else if (columnItem?.key === "url") {
            // Content
            if (columnItem.checked) {
              return (
                <div
                  key={index}
                  className={`py-2 w-[22%] ${columnItem?.key === "url"}`}
                >
                  {useTruncate(rowData?.fact?.url || "No Source", 25)}
                </div>
              );
            }
          } else if (columnItem?.key === "title") {
            const item = rowData?.fact
              ? rowData?.fact?.confidence?.title
              : `No ${columnItem?.key}`;
            return (
              <div
                key={index}
                className={`py-2 w-[22%] ${
                  columnItem?.key === "title" && "px-3 first-letter:capitalize"
                }`}
              >
                {useTruncate(item, 25)}
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
              rowData?.fact?.uuid,
              rowData?.fact?.confidence?.title,
              rowData?.fact?.confidence?.content,
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
      {data?.length > 0 && (
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
                  className={`
                  ${item.key === "archive" && "w-[2%]"}
                  ${item.key === "title" && "w-[22%]"}
                  ${item.key === "author" && "w-[22%]"}
                  ${item.key === "url" && "w-[22%]"}
                  ${item.key === "content" && "w-[23%]"}
                  ${item.key === "updatedAt" && "w-[9%]"}
                   text-[16px] px-[2px] font-bold`}
                >
                  {item.name}
                </li>
              ),
          )}
        </ul>
      )}
      <>
        {data?.length > 0 ? (
          generateTableRows(data, tableheader)
        ) : (
          <div className="p-3">
            {" "}
            <p className="text-center py-7">
              <i>You have no documents yet!</i>
            </p>{" "}
          </div>
        )}
      </>

      {/* document content preview pane; fixed display at the right hand side when a document is  clicked */}
      {contentModal && (
        <DocumentDisplayModal
          to={"archives"}
          closeModal={handleModalClose}
          selectedItem={modalContents}
          id={selectedId}
        />
      )}
    </>
  );
}

export default ArchiveContent;
