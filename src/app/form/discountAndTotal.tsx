import { useFormContext } from "react-hook-form";
import Button from "./elements/button";
import LabelRadio from "./elements/labelRadio";
import { LabelInput } from "./elements/labeledInput";
import {
  ChangeEvent,
  MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import FormDataContext from "@/context/formDataContext/formDataContext";
import { IFromDataContext } from "../interface";

export default function DiscountAndTotal() {
  const dntRenderCount = useRef(0);
  dntRenderCount.current++;
  

  const { watch } = useFormContext();
  const [checked, setChecked] = useState(watch("discountType"));
  const [payableAmount, setPayableAmount] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(watch("discount"));
  const { totalArea } = useContext(FormDataContext) as IFromDataContext;
  const { register } = useFormContext();

 
  useEffect(() => {
    // setChecked(watch("discountType"))
    // console.log("discount", "payable", payableAmount);
    // console.log("d n t e2", dntRenderCount, watch());
    if (checked == "flatAmount") {
     
      setPayableAmount(totalArea - discount);
    } else if (checked == "percentage") {
     
      const payableAmt: string = (
        totalArea -
        (totalArea * discount) / 100
      ).toFixed(2);
      setPayableAmount(Number(payableAmt));
    }
  }, [checked, totalArea, discount]);
  // console.log("d n t ",dntRenderCount, watch());
  return (
    <div className="border my-3 rounded-lg p-3 border-slate-200">
      <h3 className="text-slate-500">Discount</h3>
      <div className="flex w-full items-center justify-between">
        <div className="flex w-1/2 items-center justify-between">
          <div className="w-1/2">
            <h3>Discount Type</h3>
            <LabelRadio
              register={register}
              checked={checked == "flatAmount" ? "1" : "0"}
              label={"Flat Amount"}
              value={"flatAmount"}
              radioName="discountType"
              onClickFunction={(e: MouseEvent<HTMLInputElement>) => {
                // console.log("setting check");
                setChecked(e.currentTarget.value);
              }}
            />
            <LabelRadio
              register={register}
              checked={checked == "percentage" ? "1" : "0"}
              label={"Percentage"}
              value={"percentage" }
              radioName="discountType"
              onClickFunction={(e: MouseEvent<HTMLInputElement>) => {
                // console.log("setting check");
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
          <p>{totalArea.toString()} ₹</p>
          <h3 className="text-slate-500">Payable Amount</h3>
          <p>{payableAmount.toString()} ₹</p>
        </div>
      </div>
    </div>
  );
}
