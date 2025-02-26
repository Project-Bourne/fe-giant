import { Dispatch, ReactNode } from "react";

export interface TabModel {
  tabHeaderContents: any[];
  tabBodyContents?: any[];
  tabIndex?: number;
}

export interface InputModel
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isDisabled?: boolean;
  classNameStyle?: string;
}

export interface DropdownModel
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  data?: any[];
  selectItem?: any;
  className?: any;
  style?: any;
  isDisabled?: boolean;
}

export interface ButtonModel
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: any;
  background?: string;
  classNameStyle?: string;
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
}

export interface CustomSwitchType
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styles?: any;
  title: string;
  content: string;
}

export interface TabModel {
  tabHeaderContents: any[];
  tabBodyContents?: any[];
}
