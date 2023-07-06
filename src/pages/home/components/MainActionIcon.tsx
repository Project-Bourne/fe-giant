import React from "react";
import AddContentHeader from "../components/AddContentHeader";
import ActionIcons from "../components/ActionIcons";

function MainActionIcon() {
  return (
    <div className="flex justify-between items-center">
      <AddContentHeader />
      <ActionIcons />
    </div>
  );
}

export default MainActionIcon;
