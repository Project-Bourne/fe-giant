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
        console.log(res);
        if (res?.data?.facts) {
          // console.log(res?.data?.facts)
          const docs = res?.data?.facts;
          const isArchived = docs?.filter((doc) => doc?.bookmark === true);
          setArchivedData(isArchived);
          dispatch(setArchived(isArchived));
        }
      });
    } catch (error) {
      setLoading(false);
      // toast.error(error?.msg);
    }
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-[20px] md:text-[30px] font-bold md:ml-10 ml-5 mb-5">
          Archives
        </h1>
      </div>

      <div
        className={`${
          !loading && "bg-sirp-listBg border"
        } h-[100%]  mx-3 md:mx-10 rounded-[1rem]`}
      >
        <ArchiveContent
          data={archivedData}
          headerborder={true}
          loading={loading}
        />
      </div>
    </>
  );
}

export default Starred;
