import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInfoModel } from "./models";

interface UserStateProps {
  users: Array<any>;
}

const initialState: UserStateProps = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state: any, action: PayloadAction<{ user: Array<any> }>) => {
      state.users = action?.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
