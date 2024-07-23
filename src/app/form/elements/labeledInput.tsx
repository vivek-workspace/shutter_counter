import { useFormContext } from "react-hook-form";
import { ILabelInput } from "@/app/interface";
import { ChangeEvent, useEffect } from "react";
import _ from "lodash";


export type FormErrors = {
  [key: string]: {
    message?: string;
  };
};


export function LabelInput({
  value,
  register,
  flex,
  type,
  disabled,
  fieldName,
  labelName,
  onChangeFunction,
}: ILabelInput) {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  let defaultvalue : string = value?value:"";
  useEffect(() => {
    if(value){ setValue(fieldName, value) }
  },[defaultvalue])

  const formErrors = errors as FormErrors;
  
  return (
    <div
      className={`${
        flex == "0" ? "" : "flex gap-2  justify-between items-center"
      } w-full  p-2`}
    >
      <label htmlFor={fieldName}>{labelName} </label>
      <div>
        
        {value ? (
          <input
            type={`${type == undefined ? "text" : type}`}
            disabled={disabled ? true : false}
            onChange={
              onChangeFunction
                ? (e: ChangeEvent) => onChangeFunction(e)
                : () => {}
            }
            value={value} 
            className={`${
              disabled
                ? "cursor-not-allowed"
                : "border focus:ring-blue-500 focus:border-blue-500"
            } bg-gray-50 w-full  border-gray-300 text-gray-900 text-sm rounded-lg  block p-2`}
          />
        ) : (
          <input
            type={`${type == undefined ? "text" : type}`}
            {...register(fieldName)}
            disabled={disabled ? true : false}
            onChange={
              onChangeFunction
                ? (e: ChangeEvent) => onChangeFunction(e)
                : () => {}
            }
            // value={value ? value : ""}
            className={`${
              disabled
                ? "cursor-not-allowed"
                : "border focus:ring-blue-500 focus:border-blue-500"
            } bg-gray-50 w-full  border-gray-300 text-gray-900 text-sm rounded-lg  block p-2`}
          />
        )}

        {
          <span className="text-sm font-light text-red-500">  
            {_.get(formErrors, `${fieldName}.message`) as string}
          </span>
        }
      </div>
    </div>
  );
}
