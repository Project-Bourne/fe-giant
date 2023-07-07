import React, { useState } from "react";
import ActionIcons from "@/pages/home/components/ActionIcons";
import ListItem from "@/pages/home/components/ListItem";

function Content({ data }) {
  const [dummyData, setDummyData] = useState(data);

  const handleCheckboxChange = (index) => {
    const updatedData = [...dummyData];
    updatedData[index].isMarked = !updatedData[index].isMarked;
    setDummyData(updatedData);
  };

  return (
    <>
      {data?.map((item, index) => {
        return (
          <div
            key={index}>
            <ListItem 
              isMarked={item.isMarked}
              name={item.name}
              desc={item.description}
              message={item.message}
              handleChange={handleCheckboxChange}
              time={item.time}
              actionButtons={<ActionIcons />}
            />
          
            
          </div>
        );
      })}
    </>
  );
}

export default Content;
