import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { TableHeaderData, TableBodyDataSup } from "@/utils/users.constants";
import CustomTable from "./components/Table";
import UserService from "@/services/users.service";
import { useDispatch } from "react-redux";
import { setUsers } from "@/redux/reducers/userReducer";
import NotificationService from "@/services/notification.service";

function Users() {
  const userService = new UserService();
  const dispatch = useDispatch();
  const [status, setStatus] = useState<any>(null);
  const [allUsers, setAllUsers] = useState([]);

  // useEffect(() => {
  //   userService
  //     .getUsers()
  //     .then((res) => {
  //       if (res?.status) {
  //         dispatch(setUsers(res?.data));
  //         setAllUsers(res?.data);
  //       } else {
  //         NotificationService.error({
  //           message: "Unable to fetch users!",
  //           addedText: res?.message,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //     });
  // }, []);

  // useEffect(() => {
  //   if(status && allUsers.length > 0){
  //     if(typeof(status) === 'string'){
  //       if(status === "approved"){
  //         const verified = allUsers.filter((user) => user.verified)
  //         setAllUsers(verified);
  //       }
  //       if(status === 'pending'){
  //         const verified = allUsers.filter((user) => !user.verified)
  //         setAllUsers(verified);

  //       }
  //     }
  //   }
  // }, [status])

  const _setStatusAction = (_arg) => setStatus(_arg);

  return (
    <>
      <div>
        <Header setSelectedStatus={_setStatusAction} filter={false} />
        <CustomTable
          tableHeaderData={TableHeaderData}
          tableBodyData={allUsers}
        />
      </div>
    </>
  );
}

export default Users;
