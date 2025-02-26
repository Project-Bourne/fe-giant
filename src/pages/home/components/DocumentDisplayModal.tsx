import React from "react";
import { Close } from "@mui/icons-material";
import { useRouter } from "next/router";
import ActionIcons from "./ActionIcons";
import { useTruncate } from "@/components/custom-hooks";
import ReactMarkdown from "react-markdown";

function DocumentDisplayModal({ closeModal, selectedItem, id, to }) {
  const router = useRouter();

  const handleOnClick = (e) => {
    e.stopPropagation();
    router.replace(`${to}/${id}`);
  };

  return (
    <div className="bg-white md:w-[35%] w-[40%] h-[70%] fixed z-[9999] right-0 bottom-0  pt-3 md:px-5 px-4 pb-5 shadow rounded-l">
      <Close
        className="text-[14px] text-gray-400 float-right"
        onClick={closeModal}
      />
      <div className=" mt-5">
        <div className="mb-4">
          <h2 className=" mb-0 capitalize text-[16px] font-bold text">
            {useTruncate(selectedItem?.title, 110)}
          </h2>

          <div className="w-full grid items-center mt-3 gap-y-3">
            <ActionIcons showArchive={false} docId={id} />
            <p
              onClick={handleOnClick}
              className="flex justify-end first-letter:capitalize w-fit hover:cursor-pointer text-sirp-primary text-[11px] bg-sirp-primaryLess2 py-3 px-5 rounded-md "
            >
              View document &rarr;
            </p>
          </div>
        </div>
        <div className="w-full h-[40vh] p-2 bg-gray-50 overflow-y-auto  font-normal text-[13.5px] first-letter:capitalize break-all rounded">
          <ReactMarkdown
            className="first-letter:capitalize text-justify leading-6 text-[1rem] mb-10"
            components={{
              p: ({ children }) => <p className="mb-4">{children}</p>,
            }}
          >
            {useTruncate(selectedItem?.content, 1100)}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default DocumentDisplayModal;
