import React from "react";
import AddContentHeader from "../components/AddContentHeader";
import ActionIcons from "../components/ActionIcons";
import Breadcrum from "../components/Breadcrum";
import AddLink from "../components/AddLink";
import MataDataContent from "../components/MataDataContent";
import AddContentHeaderTwo from "../components/AddContentHeaderTwo";
import ContentHistroy from "../components/ContentHistory";

function metaData() {
  return (
    <div className="bg-sirp-contentbg h-[100%] mx-10 rounded-[1rem]">
        <div className="flex justify-between items-center">
            <AddContentHeader/>
            <ActionIcons/>
        </div>
        <Breadcrum/>
        <AddLink/>
        <MataDataContent/>
        <div className="mt-5">
            <AddContentHeaderTwo/>
            <ContentHistroy/>
        </div>
  </div>);
}

export default metaData;
