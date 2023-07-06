import React from "react";
import Breadcrum from "../components/Breadcrum";
import AddLink from "../components/AddLink";
import MataDataContent from "../components/MataDataContent";
import AddContentHeaderTwo from "../components/AddContentHeaderTwo";
import ContentHistroy from "../components/ContentHistory";
import MainActionIcon from "../components/MainActionIcon";

function metaData() {
  return (
    <div className="bg-sirp-contentbg border  h-[100%] mx-10 rounded-[1rem]">
           <MainActionIcon/>
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
