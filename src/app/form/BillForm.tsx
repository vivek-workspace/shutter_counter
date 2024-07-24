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
import {
  createBill,
  selectBills,
  updateBill,
} from "@/lib/features/bills/billSlice";
import { Bill, BillState, IFromDataContext } from "../interface";
import { yupResolver } from "@hookform/resolvers/yup";
import billValidationObj from "../validators/bill.validator";
import { useRouter, useSearchParams } from "next/navigation";
import { RootState } from "@/lib/store";
import { useContext, useEffect, useMemo, useRef } from "react";
import FormDataContext from "@/context/formDataContext/formDataContext";

export default function BillForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const count = useRef(0);
  count.current++;

  const id = searchParams.get("id")?Number(searchParams.get("id")):null
    
  let bill: Bill | null = useSelector((state: RootState): Bill | null=> {
    if(id != null){
      return state.billReducer.bills[id]
    }
    else {
      return null
    }
  })
 
  const defaultForm: Bill =
    (bill == undefined)
      ? {
          customerId: "",
          personName: "",
          dueDate: "",
          shutters: [
            {
              type: "",
              width: "0",
              height: "0",
              area: "0",
            },
          ],
          discountType: "flatAmount",
          discount: "0",
        }
      : bill;

  
   
  const methods = useForm({
    defaultValues: defaultForm,
    resolver: yupResolver(billValidationObj),
  });
  const { handleSubmit, reset, watch, register } = methods;
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    // console.log("bill", bill);
    if (bill !== null && bill !== undefined) {
      reset({
        ...bill,
      });
      
    } else if (id != undefined ) {
      router.push("/form");
      alert("invalid id");
    } 
  }, [bill, id, reset, router]);
  // console.log("Render Count ", count,"redux", bill);
  // console.log("Render Count ", count,"Form",watch());

  // console.log(" page ",watch());
  function submitHandler(data: any) {
    // console.log("From data", data.discountType);

    if (id === null) dispatch(createBill(data));
    else {
      const intId: number = Number(id);
      dispatch(updateBill({ intId, data }));
    }
  
    router.push("/bills");
  }

  // const bills: BillState = useSelector(selectBills);

  return (
    <div>
      <FormProvider {...methods}>
        <FormDataProvider>
          <form action="">
            <div className="w-4/5 my-3 mx-auto m-20">
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
