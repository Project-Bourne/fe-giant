import React from "react";
import { Tab } from "@/components/ui";
import UsersList from "./user";
import Header from "./components/Header";
import {
  TabHeaderData,
  TableBodyData,
  TableBodyDataSup,
} from "@/utils/users.constants";

export const TabBodyContents = [
  {
    id: 0,
    component: <UsersList tableData={TableBodyData} usertype={-1} />,
  },
  {
    id: 1,
    component: <UsersList tableData={TableBodyData} usertype={0} />,
  },
  {
    id: 2,
    component: <UsersList tableData={TableBodyData} usertype={1} />,
  },
  {
    id: 3,
    component: <UsersList tableData={[]} usertype={2} />,
  },
  {
    id: 4,
    component: <UsersList tableData={TableBodyData} usertype={3} />,
  },
  {
    id: 5,
    component: <UsersList tableData={TableBodyDataSup} usertype={4} />,
  },
];

function Users() {
  return (
    <>
      <div>
        <Header filter={true} />
        <Tab
          tabHeaderContents={TabHeaderData}
          tabBodyContents={TabBodyContents}
        />
      </div>
    </>
  );
}

export default Users;
