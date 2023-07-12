import React from "react";
import Image from "next/image";

function LeftCompt() {
  return (
    <div className="md:ml-10 ml-0 bg-sirp-dashboardcola drop-shadow-md  h-28 flex items-center rounded-[1.5rem] basis-1/2 gap-[1.5rem]">
      {/* dashbaord card 1  */}
      <div>
        <div className="flex flex-row items-center gap-2">
          <div>
            <Image
              src={require("../../../assets/icons/Frame 01.svg")}
              alt="documents"
              className="pl-5 md:pl-10 cursor-pointer"
              width={100}

            />
          </div>   
          <div>
            <p className="font-bold text-black">4000</p>
            <span className="font-light text-black text-[14px] md:text-[16px]">Total documents</span>
          </div>
        </div>
      </div>


      <div>
        <div className="flex flex-row items-center gap-2 border-l h-28 border-black border-opacity-5">
          <div>
            <Image
              src={require("../../../assets/icons/Frame 02.svg")}
              alt="expor-collab"
              className="pl-5 md:pl-10  cursor-pointer"
              width={100}
            />
          </div>
          <div>
            <p className="font-bold text-black">4000</p>
            <span className="font-light text-black text-[14px] md:text-[16px]">Total export to collab</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftCompt;
