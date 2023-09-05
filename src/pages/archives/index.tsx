import React, { useState } from "react";
import HeadIcon from "./components/HeadIcon";
import Content from "./components/Content";
import dummy from "@/utils/dummy.json";
import BlueButton from "@/components/ui/BlueButton";

function Starred() {
  const [activeOption, setActiveOption] = useState("All");
  const [dummyData, setDummyData] = useState(dummy);

  const handleOptionChange = (option) => {
    setActiveOption(option);
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
    <div className="bg-sirp-listBg h-[100%] border pt-5 mx-3 md:mx-10 rounded-[1rem]">
      <div className="mb-5 flex w-[100%] mr-[1.5rem] px-2 border-b-2 py-4 ">
        <HeadIcon
          activeOption={activeOption}
          onOptionChange={handleOptionChange}
          onClick={handleCheckboxes}
        />
      </div>

      <Content data={filteredData} onCheck={handleCheck} />
    </div>
  );
}

export default Starred;
