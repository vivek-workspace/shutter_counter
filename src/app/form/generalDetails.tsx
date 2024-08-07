import { memo, useEffect, useMemo, useState } from "react";
import AddCustomerModel from "./addCustomerModel";
import LabelDate from "./elements/labeledDate";
import { LabelInput } from "./elements/labeledInput";
import SelectOption from "./elements/selectOption";
import Button from "./elements/button";
import { useSelector, useDispatch } from "react-redux";
import { selectCustomers } from "@/lib/features/customers/customerSlice";
import { Bill, CustomerState, IOptionInterface } from "../interface";
import { UseFormRegister, useFormContext } from "react-hook-form";

const GeneralDetails = memo(function GeneralDetails({
  register,
}: {
  register: UseFormRegister<Bill>;
}) {
  const [showModal, setShowModal] = useState(false);
  const customers: CustomerState = useSelector(selectCustomers);
  // console.log("asdf");
  const customerOptions: IOptionInterface[] = customers.customers.map(
    (item) => {
      return {
        value: item.id,
        name: item.name + " - " + item.email,
      };
    }
  );

  return (
    <div className="relative border rounded-lg p-3 border-slate-200">
      {showModal ? <AddCustomerModel setShowModal={setShowModal} /> : null}

      <h3 className="text-slate-500">General Details</h3>
      <div className="flex items-center justify-between">
        <div className="w-1/3">
          <LabelInput
            register={register}
            labelName="Person Name"
            fieldName={"personName"}
          />
        </div>
        <div className="w-1/4">
          <SelectOption
            register={register}
            labelName={"Customer Name"}
            selectName={"customerId"}
            options={customerOptions}
          />
        </div>
        <div className="1/6 flex justify-center">
          <Button name={"New"} onClickFunction={() => setShowModal(true)} />
        </div>
        <div className="w-1/3">
          <LabelDate
            register={register}
            fieldName={"dueDate"}
            label={"Due Date"}
          />
        </div>
      </div>
    </div>
  );
});

export default GeneralDetails;
