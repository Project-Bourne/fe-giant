import React from "react";

export default interface ListItemModels {
  id: string;
  title: string;
  url: string;
  width?: string;
  isArchived?: boolean;
  author?: string;
  message: string;
  time?: string;
  tableLayout?: string;
  handleClick?: any;
  handleDoubleClick?: any;
  actionButtons?: React.ReactNode;
  viewDeleteButtons?: React.ReactNode;
  buttonType?: string;
}
