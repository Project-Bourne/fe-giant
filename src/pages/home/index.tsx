import React, { useEffect, useState } from "react";
import HomeHeader from "../archives/components/HeadIcon";
import dummy from "../../utils/dummy.json";
import BlueButton from "@/components/ui/BlueButton";
import { useRouter } from "next/router";
import DocumentService from "@/services/documents.service";
import { SelectTableLayout, TablelayoutDropdownOptions } from "@/components/ui";
import Image from "next/image";
import layoutIcon from "../../../public/icons/layout.svg";
import { useDispatch, useSelector } from "react-redux";
import { setDocuments } from "@/redux/reducers/documentReducer";
import HomeContent from "../archives/components/Content";

function Index() {
  const router = useRouter();
  const documentService = new DocumentService();
  const dispatch = useDispatch();
  const docs = useSelector((state: any) => state.documents.documents);
  const [tableLayout, setTableLayout] = useState("0");
  const [facts, setFacts] = useState([]);
  const [layoutOptionsToggle, setLayoutOptionsToggle] = useState(false);
  const [layoutFormat, setLayoutFormat] = useState({
    time: false,
    content: false,
    title: false,
    author: false,
  });

  useEffect(() => {
    getDocuments();
  }, []);

  useEffect(() => {
    setFacts(docs);
    console.log("res", docs);
  }, [docs]);

  const getDocuments = () => {
    documentService
      .getFactCheckedDocs()
      .then((res) => {
        if (res?.status) {
          dispatch(setDocuments(res?.data));
          setFacts(res?.data);
          console.log(res?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleLayoutOptions = () => {

  // };

  const handleAdd = () => {
    router.push("/home/addcontent/addcontent");
  };

  return (
    <div className="bg-sirp-listBg border h-[100%] my-5 md:mx-10  rounded-t-[1rem]">
      <div className="flex gap-x-4 items-center justify-end w-[100%] px-2 border-b-2 py-4 ">
        {/* <HomeHeader
          activeOption={activeOption}
          onOptionChange={handleOptionChange}
          onClick={handleCheckboxes}
        /> */}
        <div
          className={`h-[39px] w-[39px] relative flex items-center justify-center bg-transparent rounded-md hover:shadow ${
            layoutOptionsToggle && "shadow"
          }`}
        >
          <Image
            src={layoutIcon}
            alt="layout icon"
            className="hover:cursor-pointer"
            title="Table layout"
            onClick={() => setLayoutOptionsToggle((prevState) => !prevState)}
            width={23}
          />

          {layoutOptionsToggle && <TablelayoutDropdownOptions />}
        </div>

        {/* <SelectTableLayout handleSelectChange={handleLayoutOptionChange} /> */}

        <div onClick={handleAdd} className="md:mr-[2rem] mr-[.7rem]">
          <BlueButton />
        </div>
      </div>

      <div className=" w-full">
        <HomeContent data={facts} headerborder={false} />
      </div>
    </div>
  );
}

export default Index;
