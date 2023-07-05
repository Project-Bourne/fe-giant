import React, { useState } from "react";
import Image from "next/image";
import { Checkbox } from "@mui/material";
// import dummy from "../../../../dummy.json";

function Content({ data }) {
  const [dummyData, setDummyData] = useState(data);

  // const handleCheckboxChange = (index) => {
  //   const updatedDummyData = [...dummyData];
  //   updatedDummyData[index].isMarked = !updatedDummyData[index].isMarked;
  //   setDummyData(updatedDummyData);
  // };
  console.log(data)
  const handleCheckboxChange = (index) => {
    const updatedData = [...dummyData];
    updatedData[index].isMarked = !updatedData[index].isMarked;
    setDummyData(updatedData);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    }
    return text;
  };

  return (
    <>
      {data?.map((item, index) => {
        const truncatedDescription = truncateText(item.description, 48);
        const truncatedMessage = truncateText(item.message, 11);
        return (
          <div
            key={index}
            className="flex justify-start items-center gap-24 hover:bg-sirp-primaryLess1 p-2 rounded-lg"
          >
            <div className="flex gap-3 items-center">
              <Checkbox
                checked={item.isMarked}
                onChange={() => handleCheckboxChange(index)}
              />
              <Image
                src={require("../../../assets/icons/starred.svg")}
                alt="documents"
                className="cursor-pointer w-4 h-4"
                width={10}
                height={10}
              />
              <p className="text-sirp-black-500 ml-2 w-[12rem]">{item.name}</p>
            </div>
            <div>
              <p className="text-black-100 w-[25rem] ">{truncatedDescription}</p>
            </div>
            <div>
              <div className="flex gap-4">
                <p className="text-gray-400 border-l-2 pl-2 w-[7rem]">
                  {truncatedMessage}
                </p>
                <p>{item.time}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Content;