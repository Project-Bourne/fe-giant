import React, { useState } from "react";
import Image from "next/image";
import { Checkbox } from "@mui/material";
import ActionIcons from "@/pages/home/components/ActionIcons";

function Content({ data }) {
  const [dummyData, setDummyData] = useState(data);
  const [hoveredIndex, setHoveredIndex] = useState(-1); // Track the index of the hovered item

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

  const handleItemHover = (index) => {
    setHoveredIndex(index); // Set the index of the hovered item
  };

  const handleItemLeave = () => {
    setHoveredIndex(-1); // Reset the hovered index when leaving the item
  };

  return (
    <>
      {data?.map((item, index) => {
        const truncatedDescription = truncateText(item.description, 48);
        const truncatedMessage = truncateText(item.message, 11);
        const isHovered = index === hoveredIndex; // Check if the current item is hovered

        return (
          <div
            key={index}
            className={`flex justify-start items-center gap-24 hover:bg-sirp-primaryLess1 p-2 rounded-lg  hover:-translate-y-1 hover:scale-100 duration-300 ${
              isHovered ? "bg-sirp-primaryLess1" : "" // Add a different background color when hovered
            }`}
            onMouseEnter={() => handleItemHover(index)} // Handle mouse enter event
            onMouseLeave={handleItemLeave} // Handle mouse leave event
          >
            <div className="flex gap-3 items-center">
              <Checkbox
                checked={item.isMarked}
                onChange={() => handleCheckboxChange(index)}
              />
              <Image
                src={require("../../../assets/icons/bluestar.svg")}
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
            {isHovered && ( // Render the options when hovered
              <div className="absolute top-0 right-0 bg-sirp-primaryLess1 p-1">
                {/* Replace with your list of options */}
                <ActionIcons/>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export default Content;
