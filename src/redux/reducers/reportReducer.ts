import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInfoModel } from "./models";

interface UserStateProps {
  user: {} | any;
  reports: {} | any;
}

const initialState: UserStateProps = {
  user: {},
  reports: {},
};

const usersSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setReports: (state: any, action: PayloadAction<{ reports: any }>) => {
      state.reports = action?.payload;
    },
  },
});

export const { setReports } = usersSlice.actions;
export default usersSlice.reducer;
