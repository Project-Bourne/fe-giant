import React, { useEffect, useState } from "react";
import DocumentDisplayModal from "@/pages/home/components/DocumentDisplayModal";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useFormatDate, useTruncate } from "@/components/custom-hooks";

function HomeContent({ data, headerborder }) {
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
    router.push(`/home/metadata/${id}`);
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
            <div
              key={index}
              className={`w-[${columnItem.width}] flex  items-center`}
            ></div>
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
              rowData?.confidence?.author || rowData?.fact?.confidence?.author
                ? rowData?.confidence?.author ||
                  rowData?.fact?.confidence?.author
                : "No Author";
            const author =
              typeof uniqueAuthor !== "string"
                ? useTruncate(uniqueAuthor[0], 25)
                : useTruncate(uniqueAuthor, 25);
            return (
              <div
                key={index}
                className={`capitalize py-2 px-3 w-[${columnItem?.width}]`}
              >
                {author}
              </div>
            );
          } else if (columnItem?.key === "updatedAt") {
            // Time
            if (columnItem.checked) {
              return (
                <div
                  key={index}
                  className={`py-2 px-2 w-[${columnItem?.width}] `}
                >
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
                  className={`py-2 px-2 w-[${columnItem?.width}] ${
                    columnItem?.key === "content" && "first-letter:capitalize"
                  }`}
                >
                  {useTruncate(
                    rowData?.confidence?.content ||
                      rowData?.fact?.confidence?.content ||
                      "No Content",
                    25,
                  )}
                </div>
              );
            }
          } else if (
            columnItem?.key !== "updatedAt" ||
            columnItem?.key !== "author"
          ) {
            const item = rowData?.fact
              ? rowData?.fact[columnItem?.key] ||
                rowData?.fact?.confidence[columnItem?.key]
              : !rowData?.fact
              ? rowData[columnItem?.key] ||
                rowData?.confidence?.title ||
                `No ${columnItem?.key}`
              : `No ${columnItem?.key}`;
            return (
              <div
                key={index}
                className={`py-2 w-[${columnItem?.width}] ${
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
                className={`w-[${item.width}] text-[16px] px-[2px] font-bold`}
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
