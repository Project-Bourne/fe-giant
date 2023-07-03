import React from 'react';
import { Tab } from '@/components/ui';
import { TabHeaderData, TableBodyData, TableBodyDataSup } from './utils/constants';
import { UsersList } from './user';


function Users() {

  const TabBodyContents = [
    {
      id: 0,
      component: <UsersList tableData={TableBodyData} />,
    },
    {
      id: 1,
      component: <UsersList tableData={TableBodyData} />,
    },
    {
      id: 2,
      component:  <UsersList tableData={TableBodyData} />,
    },
    {
      id: 3,
      component: <UsersList tableData={[]} />,
    },
    {
      id: 4,
      component: <UsersList tableData={TableBodyData} />,
    },
    {
      id: 5,
      component:  <UsersList tableData={TableBodyDataSup} />
    },
   
  ]


  return (
    <div>
      <Tab
        tabHeaderContents={TabHeaderData}
        tabBodyContents={TabBodyContents}
      />
    </div>
  )
}

export default Users