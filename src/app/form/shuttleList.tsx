import { useFieldArray, useFormContext } from "react-hook-form";
import CurtainRow from "./curtainRow";
import Button from "./elements/button";
import { useContext, useMemo, useState } from "react";
import FormDataContext from "@/context/formDataContext/formDataContext";
import { IShutter, IFromDataContext } from "../interface";

export default function ShutterList() {
  const { control, watch } = useFormContext();
  const {  totalArea, setTotalArea } = useContext(
    FormDataContext
  ) as IFromDataContext;
  const { fields, append, insert, remove } = useFieldArray({
    control,
    name: "shutters", // unique name for your Field Array
  });

  function addRowFunction() {
    append({
      shutters: "",
      width: 0,
      height: 0,
      area: 0,
    });
  }

  function cloneRowFunction(index: number) {
    console.log(watch(`shutters.${index}`));
    insert(index + 1, {
      type: watch(`shutters.${index}.type`),
      width: Number(watch(`shutters.${index}.width`)),
      height: Number(watch(`shutters.${index}.height`)),
    });
  }

  setTotalArea(countTotalArea(watch("shutters")));

  function removeRowFunction(index: number) {
    remove(index);
  }

  return (
    <div className="border my-3 rounded-lg p-3 border-slate-200">
      <h3 className="text-slate-500">Shutter Details</h3>
      <div>
        {fields.map((field, index: number) => (
          <CurtainRow
            key={field.id}
            index={index}
            cloneRowFunction={() => {
              cloneRowFunction(index);
            }}
            removeRowFunction={() => removeRowFunction(index)}
          />
        ))}
      </div>
      <div className="w-full p-2 flex justify-between items-center">
        <div className="w-1/4">
          <Button name={"Add"} onClickFunction={addRowFunction} />
        </div>
        <p>Total Area : {totalArea} cm square </p>
      </div>
    </div>
  );
}

function countTotalArea(shutters: IShutter[]): number {
  // console.log("counting");
  return shutters
    .map((item: IShutter): number => {
      return Number(item.area);
    })
    .reduce((total: number, item: number): number => {
      return total + item;
    });
}
