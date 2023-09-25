import React, { useState } from "react";
// import HeadIcon from "./components/HeadIcon";
// import dummy from "@/utils/dummy.json";
// import BlueButton from "@/components/ui/BlueButton";
import { SelectTableLayout } from "@/components/ui";
import { useSelector } from "react-redux";
import HomeContent from "./components/Content";

function Starred() {
  const [activeOption, setActiveOption] = useState("All");
  const [tableLayout, setTableLayout] = useState("0");
  const archivedFacts = useSelector(
    (state: any) => state.documents.archivedDocs,
  );
  // const [archivedFacts, setArchivedFacts] = useState([]);

  const handleOptionChange = (option) => {
    setActiveOption(option);
  };

  const handleLayoutOptionChange = (_arg) => {
    setTableLayout(_arg);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-[20px] md:text-[30px] font-bold md:ml-10 ml-5 mb-5">
          Archives
        </h1>
        <SelectTableLayout
          handleSelectChange={handleLayoutOptionChange}
          classNameStyle="mr-10"
        />
      </div>

      <div className="bg-sirp-listBg h-[100%] border mx-3 md:mx-10 rounded-[1rem]">
        {/* <div className=" flex w-[100%] mr-[1.5rem] px-2 border-b-2 py-4 "> */}
        {/* <HeadIcon
            activeOption={activeOption}
            onOptionChange={handleOptionChange}
            onClick={handleCheckboxes}
          /> */}
        {/* </div> */}

        <HomeContent data={archivedFacts} headerborder={true} />
      </div>
    </>
  );
}

export default Starred;
