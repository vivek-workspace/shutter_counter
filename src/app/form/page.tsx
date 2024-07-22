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
import { Bill, BillState } from "../interface";
import { yupResolver } from "@hookform/resolvers/yup";
import billValidationObj from "../validators/bill.validator";
import { useRouter, useSearchParams } from "next/navigation";
import { RootState } from "@/lib/store";
import { useEffect } from "react";

export default function BillForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: {
      shutters: [
        {
          type: "",
          width: "0",
          height: "0",
          area: "0",
        },
      ],
      discount: "0",
    },
    resolver: yupResolver(billValidationObj),
  });

  const { handleSubmit, reset , register} = methods;
  const id = searchParams.get("id") as string;
  const bill: Bill = useSelector(
    (state: RootState): Bill => state.bills.bills[Number(id)]
  );

  useEffect(() => {
    if (id !== null) {
      reset({
        ...bill,
      });
    }
  }, []);

  function submitHandler(data: any) {
    // console.log("From data" ,data)
    if (id === null) dispatch(createBill(data));
    // else dispatch(updateBill(id,data))
    router.push("/bills");
  }

  // const bills: BillState = useSelector(selectBills);

  return (
    <div>
      <FormProvider {...methods}>
        <FormDataProvider>
          <form action="">
            <div className="w-2/3 my-3 mx-auto m-20">
              <GeneralDetails register={register} />
              <ShutterList />
              <DiscountAndTotal />
              <div className="w-1/4">
                <Button
                  name={id === null ? "Submit" : "Update"}
                  onClickFunction={handleSubmit(submitHandler)}
                />
              </div>
            </div>
          </form>
        </FormDataProvider>
      </FormProvider>
    </div>
  );
}
