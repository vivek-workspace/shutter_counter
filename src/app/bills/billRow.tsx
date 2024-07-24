import Button from "../form/elements/button";
import { Bill, Customer, IShutter, Shutter } from "../interface";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { deleteBill } from "@/lib/features/bills/billSlice";

export default function BillRow({
  bill,
  customers,
  index,
}: {
  bill: Bill;
  customers: Customer[];
  index: number;
}) {
  const dispatch = useDispatch();

  const totalAmt: number = bill.shutters
    .map((item: IShutter): number => Number(item.area))
    .reduce((total: number, item: number): number => total + item);

  const payableAmt: number = calculatePayableAmt(
    totalAmt,
    bill.discountType,
    Number(bill.discount)
  );

  function deleteThisBill(index: number) {
    dispatch(deleteBill(index));
  }

  return (
    <div className="flex items-center justify-between">
      <div className="w-2/12 ">
        {customers
          .filter((item: Customer): boolean => {
            return item.id === bill.customerId ? true : false;
          })
          .map((item: Customer): string => item.name)}
      </div>
      <div className="w-2/12 ">{bill.personName}</div>
      <div className="w-1/12 ">{bill.dueDate.toString()}</div>
      <div className="w-1/6 ">{totalAmt} ₹</div>
      <div className="w-1/12 ">
        {`${bill.discount}  ${bill.discountType == "percentage" ? "%" : " ₹"}`}
      </div>
      <div className="w-2/12 ">{payableAmt.toFixed(2)} ₹</div>
      <div className="w-3/12  flex justify-around">
        <Link href={`/form?id=${index}`}>
          <Button name={"Update"} />  
        </Link>
        <div>
          <Button
            name={"Delete"}
            color="from-red-500 via-red-600 to-red-700"
            onClickFunction={() => deleteThisBill(index)}
          />
        </div>
      </div>
    </div>
  );
}

function calculatePayableAmt(
  total: number,
  discountType: string,
  discount: number
): number {
  if (discountType == "percentage") return total - (total * discount) / 100;
  else return total - discount;
}
