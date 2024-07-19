import { useFormContext } from "react-hook-form";
import Button from "./elements/button";
import LabelRadio from "./elements/labelRadio";
import { LabelInput } from "./elements/labeledInput";
import {
  ChangeEvent,
  MouseEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import FormDataContext from "@/context/formDataContext/formDataContext";
import { IFromDataContext } from "../interface";

export default function DiscountAndTotal() {
  const { watch } = useFormContext();
  const [checked, setChecked] = useState("flat_amount");
  const [payableAmount, setPayableAmount] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const { totalArea } = useContext(FormDataContext) as IFromDataContext;
  const { register } = useFormContext();

  useEffect(() => {
    if (checked == "flat_amount") {
      setPayableAmount(totalArea - discount);
    } else if (checked == "percentage") {
      setPayableAmount(totalArea - (totalArea * discount) / 100);
    }
  }, [checked, totalArea, discount]);

  return (
    <div className="border my-3 rounded-lg p-3 border-slate-200">
      <h3 className="text-slate-500">Discount</h3>
      <div className="flex w-full items-center justify-between">
        <div className="flex w-1/2 items-center justify-between">
          <div className="w-1/2">
            <h3>Discount Type</h3>
            <LabelRadio
              register={register}
              checked={checked == "flat_amount" ? "1" : "0"}
              label={"Flat Amount"}
              value={"flat_amount"}
              radioName="discount_type"
              onClickFunction={(e: MouseEvent<HTMLInputElement>) => {
                setChecked(e.currentTarget.value);
              }}
            />
            <LabelRadio
              register={register}
              checked={checked == "percentage" ? "1" : "0"}
              label={"Percentage"}
              value={"percentage"}
              radioName="discount_type"
              onClickFunction={(e: MouseEvent<HTMLInputElement>) => {
                setChecked(e.currentTarget.value);
              }}
            />
          </div>
          <div className="w-1/2">
            <LabelInput
              register={register}
              flex="0"
              type="number"
              fieldName="discount"
              labelName="Discount"
              onChangeFunction={(e: ChangeEvent<HTMLInputElement>) => {
                setDiscount(Number(e.target.value));
              }}
            />
          </div>
        </div>
        <div className="1/4">
          <h3 className="text-slate-500">Total Amount </h3>
          <p>{totalArea.toString()}</p>
          <h3 className="text-slate-500">Payable Amount</h3>
          <p>{payableAmount.toString()}</p>
        </div>
        
      </div>
    </div>
  );
}
