import React from "react";
import { Close } from "@mui/icons-material";
import { useRouter } from "next/router";

function DocumentDisplayModal({ closeModal, selectedItem, id }) {
  const router = useRouter();

  const handleOnClick = (e) => {
    e.stopPropagation();
    router.push(`/home/metadata/${id}`);
  };

  return (
    <div className="bg-white md:w-[30%] w-[40%] h-[89vh] fixed z-[9999] right-0 top-[7rem]  pt-3 md:px-5 px-4 pb-5 shadow">
      <Close
        className="text-[14px] text-gray-400 float-right"
        onClick={closeModal}
      />
      <div className=" mt-3">
        <div className=" mb-4 ">
          <h2 className=" mb-0 capitalize text-[14px] font-bold text">
            {selectedItem?.title}
          </h2>

          <p
            onClick={handleOnClick}
            className="w-fit float-right first-letter:capitalize hover:cursor-pointer text-sirp-primary text-[10px] bg-sirp-primaryLess2 px-2 py-1 rounded-md"
          >
            All document information &rarr;
          </p>
        </div>
        <div className="w-full h-[53vh] overflow-y-auto mt-[2.3rem] clear-both font-normal text-[12px] first-letter:capitalize break-all">
          {selectedItem?.content}
        </div>
      </div>
    </div>
  );
}

export default DocumentDisplayModal;
