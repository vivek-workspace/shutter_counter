"use client";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { LabelInput } from "./elements/labeledInput";
import Button from "./elements/button";
import LabelRadio from "./elements/labelRadio";
import FormDataProvider from "../../context/formDataContext/formDataProvider";
import GeneralDetails from "./generalDetails";
import ShutterList from "./shuttleList";
import DiscountAndTotal from "./discountAndTotal";

export default function BillForm() {
  const methods = useForm({
    defaultValues: {
      curtains_list: [
        {
          shutter_type: "",
          width: 0,
          height: 0,
        },
      ],
    },
  });

  return (
    <div>
      <FormProvider {...methods}>
        <FormDataProvider>
          <form action="">
            <div className="w-2/3 my-3 mx-auto m-20">
              <GeneralDetails />
              <ShutterList />
              <DiscountAndTotal />
            </div>
          </form>
        </FormDataProvider>
      </FormProvider>
    </div>
  );
}
