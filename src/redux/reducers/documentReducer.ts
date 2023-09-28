import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInfoModel } from "./models";

interface DocStateProps {
  documents: Array<any>;
  archivedDocs: Array<any>;
  isArchived: Array<any>;
  factcheck: any;
}

const initialState: DocStateProps = {
  documents: [],
  archivedDocs: [],
  isArchived: [],
  factcheck: {},
};

const documentSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    setDocuments: (state: any, action: PayloadAction<any>) => {
      const newItem = action.payload;
      // Check if the item already exists
      const itemExists = state.documents.some(
        (item) => item?.uuid === newItem?.uuid,
      );
      // state.documents = newItem;

      if (!itemExists) {
        state.documents.push(newItem);
      }
    },

    setIsArchived: (state: any, action: PayloadAction<any>) => {
      const uuid = action.payload;
      state.documents.map((item) => {
        if (item?.uuid === uuid) {
          state.items = state.items.map((item) =>
            item.selected ? { ...item, archived: true } : item,
          );
          return { ...item, archived: true };
        } else {
          return item;
        }
      });
    },
    // setArchivedDocs: (state: any, action: PayloadAction<any>) => {

    // },

    setFactCheck: (state: any, action: any) => {
      state.factcheck = action?.payload;
    },
  },
});

export const { setDocuments, setIsArchived, setFactCheck } =
  documentSlice.actions;
export default documentSlice.reducer;
