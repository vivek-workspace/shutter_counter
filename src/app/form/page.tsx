"use client";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { LabelInput } from "./elements/labeledInput";
import Button from "./elements/button";
import LabelRadio from "./elements/labelRadio";
import FormDataProvider from "../../context/formDataContext/formDataProvider";
import GeneralDetails from "./generalDetails";
import ShutterList from "./shuttleList";
import DiscountAndTotal from "./discountAndTotal";
import { useSelector, useDispatch } from "react-redux";
import { createBill, selectBills } from "@/lib/features/bills/billSlice";
import { BillState } from "../interface";

export default function BillForm() {

  const dispatch = useDispatch()
  const methods = useForm({
    defaultValues: {
      curtains_list: [
        {
          shutter_type: "",
          width: 0,
          height: 0,
          area: 0,
        },
      ],
    },
  });

  const {handleSubmit} = methods

  function submitHandler(data: any) {
    // console.log("From data" ,data)
    dispatch(createBill(data))

   
  }

  const bills : BillState= useSelector(selectBills)
  console.log("From State",bills.bills);

  return (
    <div>
      <FormProvider {...methods}>
        <FormDataProvider>
          <form action="">
            <div className="w-2/3 my-3 mx-auto m-20">
              <GeneralDetails />
              <ShutterList />
              <DiscountAndTotal />
              <div className="w-1/4">
                <Button name="Submit" onClickFunction={handleSubmit(submitHandler)} />
              </div>
            </div>
          </form>
        </FormDataProvider>
      </FormProvider>
    </div>
  );
}
