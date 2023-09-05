import React from "react";
import BlueButton from "@/components/ui/BlueButton";
import { Checkbox } from "@mui/material";
import Link from "next/link";
import Pagination from "./pagination";

function HeadIcon({ activeOption, onOptionChange, onClick }) {
  return (
    <div className="flex justify-between items-center w-[100%]">
      {/* These are the three icons to the left */}
      <div className="flex flex-row items-center ">
        <Checkbox onClick={onClick} />
      </div>
      <div className="flex gap-4 items-center pr-[1rem]">
        {/* Pagination section */}
        <Pagination />
      </div>
    </div>
  );
}

export default HeadIcon;
