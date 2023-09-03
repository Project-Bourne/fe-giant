import { TableHeaderData } from "@/utils/users.constants";
import CustomTable from "../components/Table";

function UsersList({ tableData, usertype }) {
  return (
    <CustomTable
      tableHeaderData={TableHeaderData}
      tableBodyData={tableData}
      rowsPerPage={10}
      usertype={usertype}
    />
  );
}

export default UsersList;
