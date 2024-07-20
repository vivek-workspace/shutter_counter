import Button from "../form/elements/button";
import { Bill, Customer, IShutter, Shutter } from "../interface";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {deleteBill} from  "@/lib/features/bills/billSlice";

export default function BillRow({
  bill,
  customers,
  index
}: {
  bill: Bill;
  customers: Customer[];
  index: number
}) {
  console.log("dfd", customers.filter((item: Customer): boolean => {
    // console.log("wew",item);
    return item.id === bill.customerId ? true : false;
  }));

  const dispatch = useDispatch()

  function deleteThisBill(index : number){
    dispatch(deleteBill(index))
  }

  return (
    <div className="flex items-center justify-between">
      <div className="w-1/4">
        {customers.filter((item: Customer): boolean => {
            console.log("wew",item);
            return item.id === bill.customerId ? true : false;
          }).map((item: Customer): string => item.name)}
      </div>
      <div className="w-1/4">
        {bill.shutters
          .map((item: IShutter): number => Number(item.area))
          .reduce((total: number, item: number): number => total + item)}
      </div>
      <div className="w-1/4">{bill.dueDate.toString()}</div>
      <div className="w-1/4">
      <Link href={`/form?id=${index}`}>
        <Button name={"Update"}  />
      </Link>
      <Link href={`/form?id=${index}`}>
        <Button name={"Delete"} onClickFunction={() => deleteThisBill(index)}  />
      </Link>
      </div>
    </div>
  );
}
