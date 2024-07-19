import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Button from "./elements/button";
import { LabelInput } from "./elements/labeledInput";
import SelectOption from "./elements/selectOption";
import { UseFieldArrayRemove, useFormContext } from "react-hook-form";
import FormDataContext from "@/context/formDataContext/formDataContext";
import { IFromDataContext, IOptionInterface, ShutterState } from "../interface";
import { useSelector } from "react-redux";
import { selectShutters } from "@/lib/features/Shutters/shutterSlice";


export default function CurtainRow({
  removeRowFunction,
  cloneRowFunction,
  index,
}: {
  removeRowFunction: UseFieldArrayRemove;
  cloneRowFunction: UseFieldArrayRemove;
  index: number;
}) {
  const { watch } = useFormContext();

  const [width, setWidth] = useState<number>(
    watch(`curtains_list.${index}.width`)
  );
  const [height, setHeight] = useState<number>(
    watch(`curtains_list.${index}.height`)
  );
  const [area, setArea] = useState<number>(0);

  const { register } = useFormContext();

  useEffect(() => {
    setArea(width * height);
  }, [width, height]);

  // console.log("List of area", listOfArea);/
  const shutters: ShutterState = useSelector(selectShutters)

  const shutterOptions: IOptionInterface[] = shutters.shutters.map((item) => {
    return {
      value: item.key,
      name: item.type
    }
  })

  function handleWidthChange(e: ChangeEvent<HTMLInputElement>) {
    const value: string = e.currentTarget.value;
    setWidth(Number(value));
  }

  function handleHeightChange(e: ChangeEvent<HTMLInputElement>) {
    const value: string = e.currentTarget.value;
    setHeight(Number(value));
  }

  return (
    <div className="flex w-full items-center justify-between">
      <div className="w-1/4">
        <SelectOption
          register={register}
          labelName={"Shutter Type"}
          selectName={`curtains_list.${index}.shutter_type`}
          flex="0"
          options={shutterOptions}
        />
      </div>
      <div className="w-1/6">
        <LabelInput
          register={register}
          flex="0"
          type="number"
          onChangeFunction={handleWidthChange}
          value={width.toString()}
          fieldName={`curtains_list.${index}.width`}
          labelName="Width (cm)"
        />
      </div>
      <div className="w-1/6">
        <LabelInput
          register={register}
          flex="0"
          type="number"
          onChangeFunction={handleHeightChange}
          value={height.toString()}
          fieldName={`curtains_list.${index}.height`}
          labelName="Height (cm)"
        />
      </div>
      <div className="w-1/6">
        <LabelInput
          register={register}
          flex="0"
          type="number"
          disabled="1"
          onChangeFunction={handleHeightChange}
          value={area.toString()}
          fieldName={`curtains_list.${index}.area`}
          labelName="Area (cm square)"
        />
      </div>
      <div className="flex w-1/4 justify-center">
        <Button name={"Clone"} onClickFunction={cloneRowFunction} />
        {index !== 0 ? (
          <Button
            name={"Remove"}
            onClickFunction={removeRowFunction}
            color={" from-red-500  via-red-600  to-red-700"}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
