import React, { useEffect, useState } from "react";
// import HeadIcon from "./components/HeadIcon";
// import dummy from "@/utils/dummy.json";
// import BlueButton from "@/components/ui/BlueButton";
import { CustomModal, SelectTableLayout } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DocumentService from "@/services/documents.service";
import { setArchived } from "@/redux/reducers/documentReducer";
import Loader from "@/components/ui/Loader";
import ArchiveContent from "./components/ArchiveContent";

function Starred() {
  const [loading, setLoading] = useState(false);
  const [archivedData, setArchivedData] = useState([]);
  const docService = new DocumentService();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    try {
      docService.getArchivedDocuments().then((res) => {
        setLoading(false);
        if (res?.data) {
          const docs = res?.data;
          const isArchived = docs?.filter((doc) => doc?.bookmark === true);
          setArchivedData(isArchived);
          dispatch(setArchived(isArchived));
        } else {
          toast.error(res?.msg);
        }
      });
    } catch (error) {
      setLoading(false);
      toast.error(error?.msg);
    }
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-[20px] md:text-[30px] font-bold md:ml-10 ml-5 mb-5">
          Archives
        </h1>
      </div>

      <div className="bg-sirp-listBg h-[100%] border mx-3 md:mx-10 rounded-[1rem]">
        <ArchiveContent data={archivedData} headerborder={true} />
      </div>

      {loading && (
        <CustomModal
          style="bg-transparent w-full relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5 flex justify-center"
          closeBtn={false}
        >
          <Loader />
        </CustomModal>
      )}
    </>
  );
}

export default Starred;
