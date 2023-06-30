import React from "react";
import Image from "next/image";

function LeftCompt() {
  return (
    <div className="ml-10 bg-sirp-secondary1  h-28 flex items-center rounded-[1.5rem] basis-1/2 gap-[1.5rem]">
      <div>
        <div className="flex flex-row items-center gap-2">
          <div>
            <Image
              src={require("../../../assets/icons/Frame 1.svg")}
              alt="documents"
              className="pl-10 cursor-pointer"
              width={100}

            />
          </div>
          <div>
            <p className="font-bold">4000</p>
            <span className="font-light">Total documents</span>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-row items-center gap-2 border-l h-28 border-black">
          <div>
            <Image
              src={require("../../../assets/icons/Frame 2.svg")}
              alt="expor-collab"
              className="pl-10 cursor-pointer"
              width={100}
            />
          </div>
          <div>
            <p className="font-bold">4000</p>
            <span className="font-light">Total export to collab</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftCompt;
