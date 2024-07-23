import { BaseSyntheticEvent, ChangeEventHandler } from "react";
import { UseFieldArrayRemove } from "react-hook-form";

// elements interfaces

export interface IButton {
  reference?: number | number[];
  color?: string;
  type?: string;
  name: string;
  onClickFunction?: UseFieldArrayRemove | Function;
}

export interface ILabelInput {
  register?: any;
  value?: string;
  flex?: string;
  type?: string;
  disabled?: string;
  fieldName: string;
  labelName: string;
  onChangeFunction?: Function;
}

export interface ILabelDate {
  register: any;
  label: string;
  fieldName: string;
}

export interface IFromDataContext {
  setDiscountTypeContext: Function;
  totalArea: number;
  discountTypeContext: string;
  setTotalArea: Function;
}

export interface ISelectOption {
  labelName: string;
  multiple?: string;
  register?: any;
  flex?: string;
  selectName: string;
  options: IOptionInterface[];
  onChangeFunction?: ChangeEventHandler<HTMLSelectElement>;
}

export interface IButton {
  reference?: number | number[];
  name: string;
  onClickFunc?:
    | BaseSyntheticEvent<object, any, any>
    | UseFieldArrayRemove
    | undefined;
}

export interface IOptionInterface {
  value: string | number;
  name: string;
}

export interface IShutter {
  type: string;
  width: string;
  height: string;
  area: string;
}

// ======= Redux interfaces ======////

// Define a type for the slice state

export interface BillState {
  bills: Bill[]
}

export interface Bill{
  personName: string;
  customerId: string;
  dueDate: string;
  shutters: IShutter[]
  discountType: string;
  discount: string;
}

export interface CustomerState {
  customers: Customer[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface ShutterState{
  shutters: Shutter[]
}

export interface Shutter {
  key: string;
  type: string;
  price: number;
}
