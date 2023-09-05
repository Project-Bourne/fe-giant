import React, { useState } from "react";
import MataDataContent from "../components/MataDataContent";
import Min_and_Max_icon from "../components/Min_and_Max_icon";
import ActionIcons from "../components/ActionIcons";
import DummyText from "../components/dummyText";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import backArrow from "../../../../public/icons/arrow-narrow-left1.svg";
import { useRouter } from "next/router";

function MetaData() {
  const router = useRouter();
  const [hideMeta, setHideMeta] = useState(false);
  const handleMax = () => {
    setHideMeta(true);
  };
  const handleMin = () => {
    setHideMeta(false);
  };
  return (
    <div className="bg-sirp-contentbg border bg-sirp-secondary2  h-[100%] mx-10 rounded-[1rem]">
      <div className="w-full flex justify-between my-5 px-5">
        <Tooltip title="Export to Collab">
          <Image
            src={backArrow}
            alt="documents"
            className=" cursor-pointer"
            width={30}
            onClick={() => router.back()}
          />
        </Tooltip>

        <ActionIcons />
      </div>

      <div className="bg-white rounded-[1rem] my-5 mx-5">
        <Min_and_Max_icon maxOnClick={handleMax} minOnClick={handleMin} />
        {hideMeta === false && <MataDataContent />}
      </div>
      <div className="mx-5 my-5">
        <DummyText />
      </div>
    </div>
  );
}

export default MetaData;
