import { ILabelDate } from "@/app/interface"
import { useFormContext } from "react-hook-form"


export default function LabelDate({label, fieldName} : ILabelDate){

  const { register, formState: {errors}} = useFormContext()

  return(
    <div className="flex justify-between items-center p-2">
    <label htmlFor="date_of_birth">{label} </label>
    <div className="w-1/2">
    <input
      type="date"
      {...register(fieldName)}
      className="bg-gray-50 border border-gray-300 w-full text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
    />
    { <span className= "text-sm font-light text-red-500">{errors[fieldName]?.message as string}</span>}
    </div>
  </div>
  )
}