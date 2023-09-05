import React, { useState } from "react";
import HomeHeader from "../archives/components/HeadIcon";
import HomeContent from "../archives/components/Content";
import dummy from "../../utils/dummy.json";
import BlueButton from "@/components/ui/BlueButton";
import { useRouter } from "next/router";

function Index() {
  const router = useRouter();
  const [activeOption, setActiveOption] = useState("All");
  const [dummyData, setDummyData] = useState(dummy);

  const handleOptionChange = (option) => {
    setActiveOption(option);
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
    <div className="bg-sirp-listBg border h-[100%] my-5 md:mx-10  rounded-[1rem]">
      <div className="mb-5 flex w-[100%] mr-[1.5rem] px-2 border-b-2 py-5 ">
        <HomeHeader
          activeOption={activeOption}
          onOptionChange={handleOptionChange}
          onClick={handleCheckboxes}
        />
        <div onClick={handleAdd}>
          <BlueButton />
        </div>
      </div>
      <div className=" w-full">
        <HomeContent data={filteredData} onCheck={handleCheck} />
      </div>
    </div>
  );
}

export default Index;
