import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DocStateProps {
  documents: Array<any>;
  archivedDocs: Array<any>;
  factcheck: any;
  currentDocId: any;
}

const initialState: DocStateProps = {
  documents: [],
  archivedDocs: [],
  factcheck: {},
  currentDocId: null,
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
    setArchived: (state: any, action: PayloadAction<any>) => {
      state.archivedDocs = action?.payload;
    },

    setFactCheck: (state: any, action: any) => {
      state.factcheck = action?.payload;
    },

    setCurrentDocId: (state: any, action: any) => {
      state.currentDocId = action?.payload;
    },
  },
});

export const { setDocuments, setArchived, setFactCheck, setCurrentDocId } =
  documentSlice.actions;
export default documentSlice.reducer;
