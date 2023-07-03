import { CustomTable } from "../components";
import { TableBodyData, TableHeaderData } from "../utils/constants";

function UsersList({tableData}) {
    return(
        <CustomTable
            tableHeaderData={TableHeaderData}
            tableBodyData={tableData}
            rowsPerPage={10}
        />
    )
}

export { UsersList };