import React from "react";

export default interface ListItemModels {
  name: string;
  desc: string;
  message: string;
  time: string;
  handleChange: (index: any) => void;
  isMarked: boolean;
  actionButtons?: React.ReactNode;
  viewDeleteButtons?: React.ReactNode;
  buttonType: string;
}
