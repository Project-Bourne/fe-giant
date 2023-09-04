import React, { useState } from "react";
import AddContentHeader from "../components/addContentHeader";
import ActionIcons from "../components/ActionIcons";
import Image from "next/image";
import Link from "next/link";
import MataDataContent from "../components/MataDataContent";
import DummyText from "../components/dummyText";
import Min_and_Max_icon from "../components/Min_and_Max_icon";

import icons_left from "../../../../public/icons/icons-left.svg";
import chevron_right from "../../../../public/icons/chevron-right1.svg";
import arrow_narrow_left from "../../../../public/icons/arrow-narrow-left1.svg";
import { data } from "@/utils/home.constants";

const ViewContent = () => {
  const { author } = data;

  const [hideMeta, setHideMeta] = useState(false);
  const handleMax = () => {
    setHideMeta(true);
  };
  const handleMin = () => {
    setHideMeta(false);
  };

  return (
    <div className="bg-sirp-secondary2 h-[100%] mx-10 rounded-[1rem]">
      <div className="flex justify-between items-center">
        <div className="py-5 mx-5 flex gap-5">
          <Link href="../metadata/metadata">
            <Image
              src={arrow_narrow_left}
              alt="documents"
              className="cursor-pointer pb-5"
              width={20}
            />
          </Link>

          <h1 className="text-black text-sm">4 of 49</h1>
          <Image
            src={icons_left}
            alt="documents"
            className="cursor-pointer pb-5"
            width={20}
          />
          <Image
            src={chevron_right}
            alt="documents"
            className="cursor-pointer pb-5"
            width={20}
          />
        </div>
      </div>
      <h1 className="text-black text-xl">{author.name}</h1>
      <div className="bg-white rounded-[1rem] my-5 mx-5">
        <Min_and_Max_icon maxOnClick={handleMax} minOnClick={handleMin} />

        {hideMeta === false && <MataDataContent />}
      </div>

      <div className="mt-10 mx-10 pb-5">
        <DummyText />
      </div>
    </div>
  );
};

export default ViewContent;
