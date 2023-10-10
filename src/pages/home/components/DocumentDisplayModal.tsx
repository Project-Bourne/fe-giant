import React from "react";
import { Close } from "@mui/icons-material";
import { useRouter } from "next/router";
import ActionIcons from "./ActionIcons";
import { useTruncate } from "@/components/custom-hooks";

function DocumentDisplayModal({ closeModal, selectedItem, id, to }) {
  const router = useRouter();

  const handleOnClick = (e) => {
    e.stopPropagation();
    router.push(`${to}/${id}`);
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

          <div className="w-full flex justify-between items-center mt-5">
            <ActionIcons showArchive={false} docId={id} />
            <p
              onClick={handleOnClick}
              className="first-letter:capitalize hover:cursor-pointer text-sirp-primary text-[11px] bg-sirp-primaryLess2 py-1 px-2 rounded-md"
            >
              View document &rarr;
            </p>
          </div>
        </div>
        <div className="w-full h-[47vh] p-2 bg-gray-50 overflow-y-auto mt-[1.5rem] font-normal text-[13.5px] first-letter:capitalize break-all rounded">
          {useTruncate(selectedItem?.content, 1100)}
        </div>
      </div>
    </div>
  );
}

export default DocumentDisplayModal;
