import React, { useState } from "react";
import HomeHeader from "../starred/components/HeadIcon";
import HomeHeaderTwo from "../starred/components/HeadIconTwo";
import Image from "next/image";
import dummy from "../../utils/dummy.json";
import archive_delete from "../../../public/icons/archive-delete.svg";
import ListItem from "../home/components/ListItem";

function Archives() {
  const [activeOption, setActiveOption] = useState("All");
  const [dummyData, setDummyData] = useState(dummy);

  const handleOptionChange = (option) => {
    setActiveOption(option);
  };

  const handleCheckboxChange = (id) => {
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
    <div className="bg-sirp-listBg border h-[100%] my-4 mx-3 md:mx-10 pt-5 rounded-[1rem]">
      <HomeHeader
        activeOption={activeOption}
        onOptionChange={handleOptionChange}
        onClick={handleCheckboxes}
      />
      <HomeHeaderTwo
        activeOption={activeOption}
        onOptionChange={handleOptionChange}
      />
      {filteredData?.map((item, index) => {
        return (
          <div key={index}>
            <ListItem
              isMarked={item.isMarked}
              name={item.name}
              desc={item.description}
              message={item.message}
              handleChange={() => handleCheckboxChange(item.id)}
              time={item.time}
              buttonType="view"
              viewDeleteButtons={
                <Image
                  src={archive_delete}
                  alt="delete-archives"
                  height={30}
                  width={30}
                />
              }
            />
          </div>
        );
      })}
    </div>
  );
}

export default Archives;
