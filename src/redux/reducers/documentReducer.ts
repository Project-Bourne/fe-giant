import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DocStateProps {
  documents: any | null;
  archivedDocs: Array<any>;
  factcheck: any;
  currentDocId: any;
  summarizedTotal: number;
  factsTotal: number;
  analyzedTotal: number;
  deepChatTotal: number;
  interrogatedTotal: number;
  translatedTotal: number;
  collabsTotal: number;
}

const initialState: DocStateProps = {
  documents: null,
  archivedDocs: [],
  factcheck: {},
  currentDocId: null,
  summarizedTotal: 0,
  factsTotal: 0,
  analyzedTotal: 0,
  deepChatTotal: 0,
  interrogatedTotal: 0,
  translatedTotal: 0,
  collabsTotal: 0,
};

const documentSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    setDocuments: (state: any, action: PayloadAction<any>) => {
      state.documents = action?.payload;
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
    setSummarizedTotal: (state: any, action: PayloadAction<any>) => {
      state.summarizedTotal = action?.payload;
    },
    setFactsTotal: (state: any, action: PayloadAction<any>) => {
      state.factsTotal = action?.payload;
    },
    setDeepChatTotal: (state: any, action: PayloadAction<any>) => {
      state.deepChatTotal = action?.payload;
    },
    setAnalyzedTotal: (state: any, action: PayloadAction<any>) => {
      state.analyzedTotal = action?.payload;
    },
    setTranslatedTotal: (state: any, action: PayloadAction<any>) => {
      state.translatedTotal = action?.payload;
    },
    setInterrogatedTotal: (state: any, action: PayloadAction<any>) => {
      state.interrogatedTotal = action?.payload;
    },
    setCollabTotal: (state: any, action: PayloadAction<any>) => {
      state.collabsTotal = action?.payload;
    },
  },
});

export const {
  setDocuments,
  setArchived,
  setFactCheck,
  setFactsTotal,
  setSummarizedTotal,
  setAnalyzedTotal,
  setCollabTotal,
  setDeepChatTotal,
  setInterrogatedTotal,
  setTranslatedTotal,
  setCurrentDocId,
} = documentSlice.actions;
export default documentSlice.reducer;
