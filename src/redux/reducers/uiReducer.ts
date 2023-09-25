import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInfoModel } from "./models";

interface UiStateProps {
  dropdownButtons: Array<{ name; width; key; checked }>;
}

const initialState: UiStateProps = {
  dropdownButtons: [
    {
      name: "",
      width: "4%",
      key: "archive",
      checked: true,
    },
    {
      name: "Title",
      width: "21%",
      key: "title",
      checked: true,
    },
    {
      name: "Author",
      width: "21%",
      key: "author",
      checked: true,
    },
    {
      name: "Source",
      width: "22%",
      key: "url",
      checked: true,
    },
    {
      name: "Content",
      width: "23%",
      key: "content",
      checked: true,
    },
    {
      name: "Time",
      width: "9%",
      key: "updatedAt",
      checked: true,
    },
    // { name: 'Title', id: 0 },
    // { name: 'Author', id: 1 },
    // { name: 'Source', id: 2 },
    // { name: 'Content', id: 3 },
    // { name: 'Time', id: 4 },
  ],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setDropdownButtons: (
      state: any,
      action: PayloadAction<{ name; id; key; checked }[]>,
    ) => {
      state.dropdownButtons = action?.payload;
    },
    setChecked: (
      state: any,
      action: PayloadAction<{ name; id; key; checked }[]>,
    ) => {
      const dropdownName = action?.payload;
      state.dropdownButtons.map((item) =>
        item.name === dropdownName ? { ...item, checked: !item.checked } : item,
      );
    },
  },
});

export const { setDropdownButtons, setChecked } = uiSlice.actions;
export default uiSlice.reducer;
