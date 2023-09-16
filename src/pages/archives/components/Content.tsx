import React from "react";
import ActionIcons from "@/pages/home/components/ActionIcons";
import ListItem from "@/pages/home/components/ListItem";

function Content({ data, onCheck, headerborder, tableLayout }) {
  const handleCheckboxChange = (id) => {
    onCheck(id); // Notify parent component about the checkbox change
  };

  return (
    <>
      {tableLayout === "0" && (
        <ul
          className={`w-full flex flex-row px-3 py-4 ${
            headerborder && "rounded-t-2xl"
          }  bg-gray-100`}
        >
          <li className="w-[5%]"></li>
          <li className=" w-[30%] text-[16px] font-bold">Title</li>
          <li className=" w-[27%] text-[16px] font-bold">Source</li>
          <li className=" w-[28%] text-[16px] font-bold">Content</li>
          <li className=" w-[10%] text-[16px] font-bold">Time</li>
        </ul>
      )}

      {tableLayout === "1" && (
        <ul
          className={`w-full flex flex-row px-3 py-4 ${
            headerborder && "rounded-t-2xl"
          }  bg-gray-100`}
        >
          <li className="w-[5%]"></li>
          <li className=" w-[30%] text-[16px] font-bold">Source</li>
          <li className=" w-[27%] text-[16px] font-bold">Title</li>
          <li className=" w-[28%] text-[16px] font-bold">Content</li>
          <li className=" w-[10%] text-[16px] font-bold">Time</li>
        </ul>
      )}

      {data?.map((item) => {
        return (
          <div key={item.id}>
            <ListItem
              isMarked={item.isMarked}
              name={item.name}
              desc={item.description}
              message={item.message}
              handleChange={() => handleCheckboxChange(item.id)} // Pass the id to handleChange
              time={item.time}
              tableLayout={tableLayout}
              buttonType="action"
              actionButtons={<ActionIcons doc={item.description} />}
            />
          </div>
        );
      })}
    </>
  );
}

export default Content;
