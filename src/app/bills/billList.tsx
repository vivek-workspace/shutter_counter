import { selectBills } from "@/lib/features/bills/billSlice";
import { Bill, BillState, Customer, CustomerState } from "../interface";
import BillRow from "./billRow";
import { selectCustomers } from "@/lib/features/customers/customerSlice";
import { useSelector } from "react-redux";

export default function BillList() {
  const bills: BillState = useSelector(selectBills);
  const customers: CustomerState = useSelector(selectCustomers);
  return (
    <div className="py-5">
      <div className="flex justify-between border-b mb-5">
        <div className="w-1/6">Customer Name</div>
        <div className="w-1/6">Person Name</div>
        <div className="w-1/6">Bill Date</div>
        <div className="w-1/12">Total Amount</div>
        <div className="w-1/12">Discount</div>
        <div className="w-1/12">Payable Amount</div>
        <div className="w-1/4">Action</div>
      </div>
      {bills.bills.length == 0 ? <p className="text-center">Nothing to Show here</p> : <></>}
      {bills.bills.map((bill: Bill, index: number) => (
        <BillRow key={index} bill={bill} customers={customers.customers} index={index} />
      ))}
    </div>
  );
}
