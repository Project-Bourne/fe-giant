import React, { useState } from "react";
import HeadIcon from "./components/HeadIcon";
import Content from "./components/Content";
import dummy from "@/utils/dummy.json";
import BlueButton from "@/components/ui/BlueButton";
import { SelectTableLayout } from "@/components/ui";

function Starred() {
  const [activeOption, setActiveOption] = useState("All");
  const [tableLayout, setTableLayout] = useState("0");
  const [dummyData, setDummyData] = useState(dummy);

  const handleOptionChange = (option) => {
    setActiveOption(option);
  };

  const handleLayoutOptionChange = (_arg) => {
    setTableLayout(_arg);
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

  const handleCheckboxes = () => {
    const allChecked = dummyData.every((item) => item.isMarked);
    const updatedData = dummyData.map((item) => {
      return {
        ...item,
        isMarked: !allChecked,
      };
    });
    setDummyData(updatedData);
  };

  const filteredData =
    activeOption === "All"
      ? dummyData
      : dummyData.filter((item) => item.isMarked === false);

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

        <Content
          data={filteredData}
          onCheck={handleCheck}
          headerborder={true}
          tableLayout={tableLayout}
        />
      </div>
    </>
  );
}

export default Starred;
