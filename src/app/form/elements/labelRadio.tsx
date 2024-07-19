import { MouseEvent, MouseEventHandler } from "react";
import { useFormContext } from "react-hook-form";

export default function LabelRadio({
  label,
  checked,
  value,
  radioName,
  register,
  onClickFunction
}: {
  label: string;
  value: string;
  checked?: string;
  radioName: string;
  register?: any;
  onClickFunction?: MouseEventHandler<HTMLInputElement>
}) {


  return (
    <div>
      <div className="flex mx-2 items-center">
        <input
          {...register(radioName)}
          id={value}
          type="radio"
          checked={checked=="1"?true:false}
          onClick={onClickFunction?onClickFunction:()=>{}}
          value={value}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label htmlFor={value} className=" my-1 mx-2 text-gray-900">
          {label}
        </label>
      </div>
    </div>
  );
}
