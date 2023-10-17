import Image from "next/image";

import doc from "../../../../public/icons/doc.svg";
import { useState } from "react";
import ReportsTypeDropdown from "./ReportsTypeDropdown";
import { CustomModal } from "@/components/ui";
import DigestModal from "./DigestModal";
import SecurityBriefModal from "./SecurityBriefModal";
import DigestPreview from "./DigestPreview";

function Header() {
  const [toggleModal, setToggleModal] = useState(false);
  const [secBriefModal, setSecBriefModal] = useState(false);
  const [digestModal, setDigestModal] = useState(false);
  const [digestPreview, setDigestPreview] = useState(false);
  const [previewData, setPreviewData] = useState({ title: "", text: "" });
  const closeModal = () => setToggleModal(false);

  const handleDigestClose = (showPreview) => {
    setDigestModal(false);
    if (showPreview) {
      setDigestPreview(true);
    }
  };

  const handleDataPreview = (title, text) => {
    setPreviewData({ title, text });
  };

  return (
    <div className="flex flex-wrap relative justify-between items-center py-4">
      <h1 className="text-[20px] md:text-[30px] font-bold">Reports</h1>
      <div className="flex gap-x-2 items-center">
        {/* <Image
          src={on_exports}
          alt="exports"
          height={35}
          width={35}
          className="p-2 border-[2px] border-gray-200 rounded-md cursor-pointer"
        />
        <Image
          src={on_share}
          alt="archive"
          height={35}
          width={35}
          className="p-2 border-[2px] border-gray-200 rounded-md cursor-pointer"
        />
        <Image
          src={on_bookmark}
          alt="archive"
          height={35}
          width={35}
          className="p-2 border-[2px] border-gray-200 rounded-md cursor-pointer"
        /> */}

        <div
          onClick={() => setToggleModal((prevState) => !prevState)}
          className="flex gap-x-2 items-center py-2 px-1.5 md:px-4 bg-sirp-primary text-white cursor-pointer rounded-md"
        >
          <Image src={doc} alt="export" height={20} width={20} className="" />
          <p className="text-[12px] md:text-[14px]">Generate report</p>
        </div>
      </div>

      {toggleModal && (
        <ReportsTypeDropdown
          closeModal={closeModal}
          setDigest={() => setDigestModal(true)}
          setSecBrief={() => setSecBriefModal(true)}
        />
      )}

      {secBriefModal && (
        <CustomModal
          style="bg-white md:w-[35%] w-[60%] relative rounded-xl mx-auto pt-3 px-7 pb-[2rem] md:mt-[7%] mt-[20%]"
          closeModal={() => setSecBriefModal(false)}
        >
          <SecurityBriefModal />
        </CustomModal>
      )}
      {digestModal && (
        <CustomModal
          style="bg-white md:w-[35%] w-[60%] relative rounded-xl mx-auto pt-3 px-7 pb-[2rem] md:mt-[7%] mt-[20%]"
          closeModal={() => setDigestModal(false)}
        >
          <DigestModal
            closeModal={handleDigestClose}
            previewData={handleDataPreview}
          />
        </CustomModal>
      )}
      {digestPreview && (
        <CustomModal
          style="bg-white md:w-[40%] w-[80%] relative rounded-xl mx-auto pt-2 px-5 pb-[1rem] md:mt-[3%] mt-[10%]"
          closeModal={() => setDigestPreview(false)}
        >
          <DigestPreview title={previewData.title} text={previewData.text} />
        </CustomModal>
      )}
    </div>
  );
}

export default Header;
