import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInfoModel } from "./models";

interface DocStateProps {
  documents: Array<any>;
}

const initialState: DocStateProps = {
  documents: [],
};

const documentSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    setDocuments: (
      state: any,
      action: PayloadAction<{ documents: Array<any> }>,
    ) => {
      state.documents = action?.payload;
    },
  },
});

export const { setDocuments } = documentSlice.actions;
export default documentSlice.reducer;
