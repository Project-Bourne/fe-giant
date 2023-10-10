import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInfoModel } from "./models";

interface UiStateProps {
  dropdownButtons: Array<{ name; width; key; checked }>;
}

const initialState: UiStateProps = {
  dropdownButtons: [
    {
      name: "",
      width: "w-[2%]",
      key: "archive",
      checked: true,
    },
    {
      name: "Title",
      width: "w-[22%]",
      key: "title",
      checked: true,
    },
    {
      name: "Author",
      width: "w-[22%]",
      key: "author",
      checked: true,
    },
    {
      name: "Source",
      width: "w-[22%]",
      key: "url",
      checked: true,
    },
    {
      name: "Content",
      width: "w-[23%]",
      key: "content",
      checked: true,
    },
    {
      name: "Time",
      width: "w-[9%]",
      key: "updatedAt",
      checked: true,
    },
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
      const dropdownKey = action?.payload;
      const updatedDropdownButtons = state.dropdownButtons.map((item) =>
        item?.key === dropdownKey ? { ...item, checked: !item?.checked } : item,
      );
      state.dropdownButtons = updatedDropdownButtons;
    },
  },
});

export const { setDropdownButtons, setChecked } = uiSlice.actions;
export default uiSlice.reducer;
