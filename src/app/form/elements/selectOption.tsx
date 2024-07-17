import { IOptionInterface, ISelectOption } from "../../interface";
import { useFormContext } from "react-hook-form";

export default function SelectOption({
  labelName,
  selectName,
  multiple,
  flex,
  options,
  onChangeFunction,
}: ISelectOption) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div
      className={`${
        flex == "0" ? "" : "flex gap-2  justify-between items-center"
      } w-full  p-2`}
    >
      <label htmlFor={selectName}>{labelName} </label>
      <div className={`${flex == "0" ? "w-full" : "w-1/2"} `}>
        <select
          {...register(selectName, { onChange: onChangeFunction })}
          multiple={multiple == undefined ? false : true}
          name={selectName}
          id={selectName}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
        >
          {!multiple && <option value=""> select </option>}
          {options &&
            options.map((item: IOptionInterface) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
        </select>
        {
          <span className="text-sm font-light text-red-500">
            {errors[selectName]?.message as string}
          </span>
        }
      </div>
    </div>
  );
}
