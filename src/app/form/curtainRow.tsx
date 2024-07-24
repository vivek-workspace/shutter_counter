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
import _ from "lodash";
import { useSortable } from "@dnd-kit/sortable";
import { list } from "postcss";
import { CSS } from "@dnd-kit/utilities";
import DNDHandle from "./elements/dndhandle";

export type FormErrors = {
  [key: string]: {
    message?: string;
  };
};

export default function CurtainRow({
  removeRowFunction,
  cloneRowFunction,
  index,
  id,
}: {
  removeRowFunction: UseFieldArrayRemove;
  cloneRowFunction: UseFieldArrayRemove;
  index: number;
  id: string;
}) {
  const { watch } = useFormContext();

  const [width, setWidth] = useState<number>(watch(`shutters.${index}.width`));
  const [height, setHeight] = useState<number>(
    watch(`shutters.${index}.height`)
  );
  const [area, setArea] = useState<number>(0);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const {
    register,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    setArea(width * height);
  }, [width, height]);

  // console.log("List of area", listOfArea);/
  const shutters: ShutterState = useSelector(selectShutters);

  const shutterOptions: IOptionInterface[] = shutters.shutters.map((item) => {
    return {
      value: item.key,
      name: item.type,
    };
  });

  function handleWidthChange(e: ChangeEvent<HTMLInputElement>) {
    const value: string = e.currentTarget.value;
    setWidth(Number(value));
  }

  function handleHeightChange(e: ChangeEvent<HTMLInputElement>) {
    const value: string = e.currentTarget.value;
    setHeight(Number(value));
  }

  const formErrors = errors as FormErrors;
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex px-2 my-2 bg-slate-100 rounded-md border border-slate-50 w-full items-center justify-between"
    >
      <div {...attributes} {...listeners} className="cursor-ns-resize">
        <DNDHandle />
      </div>
      <div className="w-1/4">
        <SelectOption
          register={register}
          labelName={"Shutter Type"}
          selectName={`shutters.${index}.type`}
          flex="0"
          options={shutterOptions}
        />
        {/* <div className="text-sm text-right pr-2 font-light text-red-500">
          {_.get(formErrors, `shutters.${index}.type.message`) as string}{" "}
        </div> */}
      </div>
      <div className="w-1/6">
        <LabelInput
          register={register}
          flex="0"
          type="number"
          onChangeFunction={handleWidthChange}
          value={width.toString()}
          fieldName={`shutters.${index}.width`}
          labelName="Width (cm)"
        />
        {/* <div className="text-sm text-right pr-2 font-light text-red-500">
        {_.get(formErrors, `shutters.${index}.width.message`) as string}
        </div> */}
      </div>
      <div className="w-1/6">
        <LabelInput
          register={register}
          flex="0"
          type="number"
          onChangeFunction={handleHeightChange}
          value={height.toString()}
          fieldName={`shutters.${index}.height`}
          labelName="Height (cm)"
        />
        {/* <div className="text-sm text-right pr-2 font-light text-red-500">
        {_.get(formErrors, `shutters.${index}.height.message`) as string}

        </div> */}
      </div>
      <div className="w-1/6">
        <LabelInput
          register={register}
          flex="0"
          type="number"
          disabled="1"
          onChangeFunction={handleHeightChange}
          value={area.toFixed(2)}
          fieldName={`shutters.${index}.area`}
          labelName="Area (cm square)"
        />
        {/* <div className="text-sm text-right pr-2 font-light text-red-500">
          {errors.shutters && errors.shutters[index]?.area.message as string}
        </div> */}
      </div>
      <div className="flex w-1/5 justify-center">
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
