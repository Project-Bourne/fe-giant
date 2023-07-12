import React from "react";
import Image from "next/image";

function RightCompt() {
  return (
    <div className="md:mr-10 mr-0 bg-sirp-dashboardcola h-28 drop-shadow-md rounded-[1.5rem] flex items-center gap-[1.5rem]  basis-1/2">
      {/* dashbaord card 2  */}
      <div>
        <div className="flex flex-row items-center gap-2">
          <div>
            <Image
              src={require("../../../assets/icons/Frame 03.svg")}
              alt="crawled-content"
              className="pl-5 md:pl-10 cursor-pointer"
              width={100}

            />
          </div>
          <div>
            <p className= "font-bold text-black">4000</p>
            <span className="font-light text-black text-[14px] md:text-[16px]">Total content crawled</span>
          </div>
        </div>
      </div>

      
      <div>
        <div className="flex items-center gap-2 border-l h-28 border-black border-opacity-5">
          <div>
            <Image
              src={require("../../../assets/icons/Frame 04.svg")}
              alt="total-archives"
              className="pl-5 md:pl-10 cursor-pointer"
              width={100}
            />
          </div>
          <div>
            <p className="font-bold text-black">4000</p>
            <span className="font-light text-black text-[14px] md:text-[16px]">Total archives</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightCompt;
