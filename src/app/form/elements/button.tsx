import { MouseEventHandler } from "react";
import { IButton } from "../../interface";

export default function Button({
  name,
  color,
  type,
  reference,
  onClickFunction,
}: IButton) {
  function handleOnClick() {
    if (reference && onClickFunction) {
      onClickFunction(reference);
    } else if (onClickFunction) {
      onClickFunction();
    }
  }

  return (
    <input
      type={(type=="submit")?"submit":"button"}
      onClick={handleOnClick}
      value={name}
      className={`text-white w-full m-2 h-10 bg-gradient-to-r ${
        (color) ? color : ' from-blue-500 via-blue-600 to-blue-700 '
      } hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2`}
    />
  );
}
