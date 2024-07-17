import { useFormContext } from "react-hook-form";
import Button from "./elements/button";
import LabelRadio from "./elements/labelRadio";
import { LabelInput } from "./elements/labeledInput";

export default function DiscountAndTotal() {

  const {watch} = useFormContext()
  function printData(){
    console.log(watch())
  }
  return (
    <div className="border my-3 rounded-lg p-3 border-slate-200">
      <h3 className="text-slate-500">Discount</h3>
      <div className="flex w-full items-center justify-between">
        <div className="flex w-1/2 items-center justify-between">
          <div className="w-1/2">
            <h3>Discount Type</h3>
            <LabelRadio
              label={"Flat Amount"}
              value={"flat_amount"}
              radioName="discount_type"
            />
            <LabelRadio
              label={"Percentage"}
              value={"percentage"}
              radioName="discount_type"
            />
          </div>
          <div className="w-1/2">
            <LabelInput flex="0" fieldName="discount" labelName="Discount" />
          </div>
        </div>
        <div className="1/4">
          <h3 className="text-slate-500">Payable Amount</h3>
          <p>Amount</p>
        </div>
        <div className="w-1/4">
          <Button name="Submit" onClickFunction={printData} />
        </div>
      </div>
    </div>
  );
}
