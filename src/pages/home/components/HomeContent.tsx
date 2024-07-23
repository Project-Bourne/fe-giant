import React, { useEffect, useState } from "react";
import DocumentDisplayModal from "@/pages/home/components/DocumentDisplayModal";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useFormatDate, useTruncate } from "@/components/custom-hooks";
import Loader from "@/components/ui/Loader";
import { capitalize } from "@mui/material";

function HomeContent({ data, headerborder, loading }) {
  const buttons = useSelector((state: any) => state.ui.dropdownButtons);
  const [timeState, setTimeState] = useState(true);
  const [contentState, setContentState] = useState(true);
  const [contentModal, setContentModal] = useState(false);
  const [modalContents, setModalContents] = useState({
    title: "",
    content: "",
  });
  const [tableAdjust, setTableAdjust] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [tableheader, setTableheader] = useState(buttons);
  const [clickTimeout, setClickTimeout] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setTableheader(buttons);

    buttons.map((btn) => {
      if (btn.name.toLowerCase() === "content") {
        setContentState(btn.checked);
      }
      if (btn.key === "updatedAt") {
        setTimeState(btn.checked);
      }
    });
  }, [buttons]);

  useEffect(() => {
    if (timeState && contentState) {
      setTableAdjust(0);
    }
    if (!timeState && !contentState) {
      setTableAdjust(3);
    }

    if (timeState && !contentState) {
      setTableAdjust(1);
    }
    if (!timeState && contentState) {
      setTableAdjust(2);
    }
  }, [timeState, contentState]);

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
    router.replace(`/home/metadata/${id}`);
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
      const res = rowData?.fact?.confidence;

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
          res?.hasOwnProperty(columnItem?.key) ||
          (rowData?.fact?.confidence?.hasOwnProperty(columnItem?.key) &&
            rowData?.fact["confidence"][columnItem?.key] !== undefined) ||
          columnItem?.key !== "archive"
        ) {
          if (columnItem?.key === "author") {
            // Author
            const uniqueAuthor =
              res?.author || rowData?.fact?.confidence?.author || "No Author"; // getAuthor(rowData?.url) || getAuthor(rowData?.fact?.url);
            const author =
              typeof uniqueAuthor !== "string"
                ? useTruncate(uniqueAuthor[0], 25)
                : useTruncate(uniqueAuthor, 25);

            return (
              <div key={index} className={`capitalize py-2 w-[13%]`}>
                {author
                  ? author
                  : capitalize(
                      new URL(rowData?.fact?.url).hostname.split(".")[1],
                    )}
              </div>
            );
          } else if (columnItem?.key === "updatedAt") {
            // Time
            if (columnItem.checked) {
              return (
                <div key={index} className={`py-2 w-[9%]`}>
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
                  className={`py-2 w-[25%] ${
                    columnItem?.key === "content" && "first-letter:capitalize"
                  }`}
                >
                  {useTruncate(
                    res?.content5wh ||
                      rowData?.fact?.confidence?.content5wh ||
                      "No Content",
                    35,
                  )}
                </div>
              );
            }
          } else if (columnItem?.key === "url") {
            const item = rowData?.fact
              ? rowData?.fact[columnItem?.key] ||
                rowData?.fact?.confidence[columnItem?.key]
              : !rowData?.fact
              ? rowData[columnItem?.key] ||
                res?.title ||
                `No ${columnItem?.key}`
              : `No ${columnItem?.key}`;

            const trcNum =
              tableAdjust === 3
                ? 35
                : tableAdjust === 2
                ? 23
                : tableAdjust === 1
                ? 27
                : 25;
            return (
              <div
                key={index}
                className={`py-2 
                ${
                  tableAdjust === 3
                    ? "w-[30%]"
                    : tableAdjust === 2
                    ? "w-[21%]"
                    : tableAdjust === 1
                    ? "w-[21%]"
                    : "w-[21%]"
                } 
               `}
              >
                {useTruncate(item, trcNum)}
              </div>
            );
          } else if (columnItem?.key === "title") {
            const item = rowData?.fact
              ? rowData?.fact[columnItem?.key] ||
                rowData?.fact?.confidence[columnItem?.key]
              : !rowData?.fact
              ? rowData[columnItem?.key] ||
                res?.title ||
                `No ${columnItem?.key}`
              : `No ${columnItem?.key}`;

            const trcNum =
              tableAdjust === 3
                ? 80
                : tableAdjust === 2
                ? 55
                : tableAdjust === 1
                ? 70
                : 30;
            return (
              <div
                key={index}
                className={`py-2 ${
                  tableAdjust === 3
                    ? "w-[55%]"
                    : tableAdjust === 2
                    ? "w-[39%]"
                    : tableAdjust === 1
                    ? "w-[50%]"
                    : "w-[30%]"
                } ${
                  columnItem?.key === "title" && "px-3 first-letter:capitalize"
                }`}
              >
                {useTruncate(item, trcNum)}
              </div>
            );
          }
        } else {
          <div key={index}></div>;
        }
      });

      return (
        <div
          key={rowData?.fact?.uuid}
          onClick={() =>
            handleClicks(rowData?.fact?.uuid, res?.title, res?.content5wh)
          }
          className={`flex text-[13px] hover:bg-sirp-primaryLess2/[0.7] hover:cursor-pointer`}
        >
          {cells}
        </div>
      );
    });
  };

  return (
    <>
      {!loading ? (
        <>
          <>
            {data?.length > 0 && (
              <ul
                className={`w-full flex flex-row py-4 ${
                  headerborder && "rounded-t-2xl"
                }  ${!loading && "bg-gray-100"}`}
              >
                {tableheader.map(
                  (item, index) =>
                    item?.checked && (
                      <li
                        key={index}
                        className={`
                            ${item.key === "archive" && "w-[2%]"}
                            ${
                              item.key === "title" &&
                              `${
                                tableAdjust === 3
                                  ? "w-[55%]"
                                  : tableAdjust === 2
                                  ? "w-[39%]"
                                  : tableAdjust === 1
                                  ? "w-[50%]"
                                  : "w-[30%]"
                              } px-[10px]`
                            }
                            ${item.key === "author" && "w-[13%]"}
                            ${
                              item.key === "url" &&
                              `${
                                tableAdjust === 3
                                  ? "w-[30%]"
                                  : tableAdjust === 2
                                  ? "w-[21%]"
                                  : tableAdjust === 1
                                  ? "w-[21%]"
                                  : "w-[21%]"
                              }`
                            }
                            ${item.key === "content" && "w-[25%]"}
                            ${item.key === "updatedAt" && "w-[9%]"}
                            text-[16px] px-[2px] font-bold`}
                      >
                        {item.name}
                      </li>
                    ),
                )}
              </ul>
            )}
          </>
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
        </>
      ) : (
        <div className="mx-auto flex justify-center md:mt-10 mt-5">
          <Loader />
        </div>
      )}

      {/* document content preview pane; fixed display at the right hand side when a document is  clicked */}
      {contentModal && (
        <DocumentDisplayModal
          to={"home/metadata"}
          closeModal={handleModalClose}
          selectedItem={modalContents}
          id={selectedId}
        />
      )}
    </>
  );
}

export default HomeContent;
