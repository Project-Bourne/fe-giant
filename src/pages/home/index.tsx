import React, { useEffect, useState } from "react";
import HomeHeader from "../archives/components/HeadIcon";
import dummy from "../../utils/dummy.json";
import BlueButton from "@/components/ui/BlueButton";
import { useRouter } from "next/router";
import DocumentService from "@/services/documents.service";
import {
  CustomModal,
  SelectTableLayout,
  TablelayoutDropdownOptions,
} from "@/components/ui";
import Image from "next/image";
import layoutIcon from "../../../public/icons/layout.svg";
import { useDispatch, useSelector } from "react-redux";
import { setDocuments } from "@/redux/reducers/documentReducer";
import Loader from "@/components/ui/Loader";
import NotificationService from "@/services/notification.service";
import HomeContent from "./components/HomeContent";

function Index() {
  const router = useRouter();
  const documentService = new DocumentService();
  const dispatch = useDispatch();
  const docs = useSelector((state: any) => state.documents.documents);
  const [tableLayout, setTableLayout] = useState("0");
  const [facts, setFacts] = useState([]);
  const [layoutOptionsToggle, setLayoutOptionsToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDocuments();
  }, []);

  // useEffect(() => {
  //   setFacts(docs);
  // }, [docs]);

  const getDocuments = () => {
    setLoading(true);
    try {
      documentService
        .getFactCheckedDocs()
        .then((res) => {
          setLoading(false);
          if (res?.status) {
            dispatch(setDocuments(res?.data?.facts));
            setFacts(res?.data?.facts);
          } else {
            NotificationService.error({
              message: "Error",
              addedText: res?.message,
              position: "top-center",
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          NotificationService.error({
            message: "Error",
            addedText: err?.message,
            position: "top-center",
          });
        });
    } catch (err) {
      NotificationService.error({
        message: "Error",
        addedText: err?.message,
        position: "top-center",
      });
    }
  };

  // const handleLayoutOptions = () => {

  // };

  const handleAdd = () => {
    router.push("/home/addcontent/addcontent");
  };

  return (
    <div className="pb-7">
      <h1 className="text-[20px] md:text-[30px] font-bold md:ml-10 ml-5 mb-5">
        All Documents
      </h1>

      <div
        className={`${
          !loading && "bg-sirp-listBg border"
        }  h-[100%] my-5 md:mx-10  rounded-t-[1rem]`}
      >
        <div
          className={`flex gap-x-4 items-center justify-end w-[100%] px-2 ${
            !loading && "border-b-2"
          } py-4 `}
        >
          {facts?.length > 0 && (
            <div
              className={`h-[39px] w-[39px] mr-5 relative flex items-center justify-center bg-transparent rounded-md hover:shadow ${
                layoutOptionsToggle && "shadow"
              }`}
            >
              <Image
                src={layoutIcon}
                alt="layout icon"
                className="hover:cursor-pointer"
                title="Table layout"
                onClick={() =>
                  setLayoutOptionsToggle((prevState) => !prevState)
                }
                width={25}
              />
              {layoutOptionsToggle && <TablelayoutDropdownOptions />}
            </div>
          )}

          {/* <SelectTableLayout handleSelectChange={handleLayoutOptionChange} /> */}

          {/* <div onClick={handleAdd} className="md:mr-[2rem] mr-[.7rem]">
            <BlueButton />
          </div> */}
        </div>

        <div className="w-full">
          <HomeContent data={facts} headerborder={false} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default Index;
