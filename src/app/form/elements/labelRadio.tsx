import { useFormContext } from "react-hook-form";

export default function LabelRadio({
  label,
  value,
  radioName,
}: {
  label: string;
  value: string;
  radioName: string;
}) {
  const {
    register,
  } = useFormContext();

  return (
    <div>
      <div className="flex mx-2 items-center">
        <input
          id={value}
          type="radio"
          value={value}
          {...register(radioName)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label htmlFor="male" className=" my-1 mx-2 text-gray-900">
          {label}
        </label>
      </div>
    </div>
  );
}
