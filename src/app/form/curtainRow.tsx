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
import { IFromDataContext } from "../interface";

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

  const { totalArea, setTotalArea, listOfArea, setAreas } = useContext(
    FormDataContext
  ) as IFromDataContext;

  useEffect(() => {
    setArea(width * height);
    setTotalArea((): number => totalArea + width * height);
    return () => {
      console.log(totalArea);
      console.log("area",totalArea - width * height);
      setTotalArea((): number => totalArea - (width * height));
    };
  }, [width, height]);

  // console.log("List of area", listOfArea);/

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
          labelName={"Shutter Type"}
          selectName={`curtains_list.${index}.shutter_type`}
          flex="0"
          options={[{ value: "val1", name: "shutter 1" }]}
        />
      </div>
      <div className="w-1/6">
        <LabelInput
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
