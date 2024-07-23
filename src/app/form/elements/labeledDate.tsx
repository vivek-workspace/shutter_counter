import { ILabelDate } from "@/app/interface"
import { useFormContext } from "react-hook-form"
import _ from "lodash";


export type FormErrors = {
  [key: string]: {
    message?: string;
  };
};

export default function LabelDate({register, label, fieldName} : ILabelDate){

  const { formState: {errors}} = useFormContext()
  const formErrors = errors as FormErrors;
  return(
    <div className="flex justify-between items-center p-2">
    <label htmlFor="date_of_birth">{label} </label>
    <div className="w-1/2">
    <input
      type="date"
      {...register(fieldName)}
      className="bg-gray-50 border border-gray-300 w-full text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
    />
    { <span className= "text-sm font-light text-red-500">{_.get(formErrors, `${fieldName}.message`) as string}</span>}
    </div>
  </div>
  )
}