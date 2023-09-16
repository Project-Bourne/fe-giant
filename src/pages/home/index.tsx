import React, { useEffect, useState } from "react";
import HomeHeader from "../archives/components/HeadIcon";
import HomeContent from "../archives/components/Content";
import dummy from "../../utils/dummy.json";
import BlueButton from "@/components/ui/BlueButton";
import { useRouter } from "next/router";
import DocumentService from "@/services/documents.service";
import { SelectTableLayout } from "@/components/ui";

function Index() {
  const router = useRouter();
  const [activeOption, setActiveOption] = useState("All");
  const [tableLayout, setTableLayout] = useState("0");
  const [dummyData, setDummyData] = useState(dummy);
  const documentService = new DocumentService();

  useEffect(() => {
    getDocuments();
  }, []);

  const getDocuments = () => {
    documentService
      .getFactCheckedDocs()
      .then((res) => {
        if (res?.status) {
          console.log("from home", res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLayoutOptionChange = (_arg) => {
    setTableLayout(_arg);
  };

  const handleAdd = () => {
    router.push("/home/addcontent/addcontent");
  };

  const handleCheck = (id) => {
    const updatedData = dummyData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isMarked: !item.isMarked, // Toggle the isMarked property
        };
      }
      return item;
    });
    setDummyData(updatedData);
  };

  const filteredData =
    activeOption === "All"
      ? dummyData
      : dummyData.filter((item) => item.isMarked === false);

  return (
    <div className="bg-sirp-listBg border h-[100%] my-5 md:mx-10  rounded-[1rem]">
      <div className="flex gap-x-4 justify-end w-[100%] px-2 border-b-2 py-4 ">
        {/* <HomeHeader
          activeOption={activeOption}
          onOptionChange={handleOptionChange}
          onClick={handleCheckboxes}
        /> */}
        <SelectTableLayout handleSelectChange={handleLayoutOptionChange} />

        <div onClick={handleAdd} className="md:mr-[2rem] mr-[.7rem]">
          <BlueButton />
        </div>
      </div>
      <div className=" w-full">
        <HomeContent
          data={filteredData}
          onCheck={handleCheck}
          headerborder={false}
          tableLayout={tableLayout}
        />
      </div>
    </div>
  );
}

export default Index;
