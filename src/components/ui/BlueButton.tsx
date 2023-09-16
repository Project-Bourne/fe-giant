import React, { useState } from "react";
import Image from "next/image";
import plus1 from "../../../public/icons/plus1.svg";

function BlueButton() {
  const [add, setAdd] = useState(false);
  return (
    <div>
      <button className="flex flex-row gap-2 py-2.5 px-5 justify-center hover:bg-sirp-primary/[0.9] items-center cursor-pointer rounded-md bg-sirp-primary text-[13px] text-white">
        <Image
          src={plus1}
          alt="documents"
          className="cursor-pointer ml-1"
          width={14}
          onClick={() => setAdd(!add)}
        />
        <p>Add content</p>
      </button>
    </div>
  );
}

export default BlueButton;
