import { useFieldArray, useFormContext } from "react-hook-form";
import CurtainRow from "./curtainRow";
import Button from "./elements/button";
import { act, useContext, useMemo, useState } from "react";
import FormDataContext from "@/context/formDataContext/formDataContext";
import { IShutter, IFromDataContext } from "../interface";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';

export default function ShutterList() {
  const { control, watch } = useFormContext();
  const { totalArea, setTotalArea } = useContext(
    FormDataContext
  ) as IFromDataContext;
  const { fields, append, insert, remove, move } = useFieldArray({
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    // console.log("active : ", active, "over : ", over);
    if (over && active.id !== over.id) {
      const activeIndex : number = fields.findIndex((item) => item.id == active.id);
      const overIndex : number = fields.findIndex((item) => item.id == over.id);
      console.log("active : ", activeIndex, "over : ", overIndex);
      move(activeIndex, overIndex)
    }
  };

  return (
    <div className="border my-3 rounded-lg p-3 border-slate-200">
      <h3 className="text-slate-500">Shutter Details</h3>
      <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}>
        <SortableContext items={fields}>
          <div>
            {fields.map((field, index: number) => (
              <CurtainRow
                key={field.id}
                index={index}
                id={field.id}
                
                cloneRowFunction={() => {
                  cloneRowFunction(index);
                }}
                removeRowFunction={() => removeRowFunction(index)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <div className="w-full p-2 flex justify-between items-center">
        <div className="w-1/4">
          <Button name={"Add"} onClickFunction={addRowFunction} />
        </div>
        <p>Total Area : {totalArea.toFixed(2)} cm square </p>
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
