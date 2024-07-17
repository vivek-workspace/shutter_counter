import { ChangeEventHandler } from "react";
import { UseFieldArrayRemove } from "react-hook-form";

// elements interfaces

export interface IButton {
  reference?: number | number[];
  color?: string
  name: string;
  onClickFunction?: UseFieldArrayRemove;
}

export interface ILabelInput {
  value?: string;
  flex?: string;
  type?: string;
  disabled?: string
  fieldName: string;
  labelName: string;
  onChangeFunction?: Function
}

export interface ILabelDate {
  label: string;
  fieldName: string;
}

export interface IFromDataContext{
  totalArea: number;
  setTotalArea: Function
}

export interface ISelectOption {
  labelName: string;
  multiple?: string;
  flex?: string;
  selectName: string;
  options: IOptionInterface[];
  onChangeFunction?: ChangeEventHandler<HTMLSelectElement>;
}

export interface IButton {
  reference?: number | number[];
  name: string;
  onClickFunction?: UseFieldArrayRemove;
}

export interface IOptionInterface {
  value: string | number;
  name: string;
}
