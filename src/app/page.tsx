"use client";
import { selectBills } from "@/lib/features/bills/billSlice";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Bill, BillState, IShutter } from "./interface";
import { useMemo } from "react";

export default function Home() {
  const bills: BillState = useSelector(selectBills);

  const totalShutterArea = useMemo(() => {
    if (bills.bills.length > 0) return findTotalShutterArea(bills);
    else return 0;
  }, [bills]);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="text-align w-2/3 flex justify-around">
        {/* <h3 className="text-3xl  p-2">This is Dashboard</h3>
        <p className="p-2">we can put Summary Statistics here.</p> */}
        <div>
          <h3 className="text-3xl  p-2">Total Bills</h3>
          <h3 className="text-9xl p-2">{bills.bills.length}</h3>
        </div>
        <div>
          <h3 className="text-3xl  p-2">Total Shutter Area</h3>
          <div className="flex items-end">
          <h3 className="text-9xl p-2">{totalShutterArea}</h3>
          <p>square cm</p>
          </div>
        </div>
      </div>
    </main>
  );
}

function findTotalShutterArea(bills: BillState) {
  return bills.bills
    .map((item: Bill): number => {
      return item.shutters
        .map((item: IShutter): number => Number(item.area))
        .reduce((total: number, item: number): number => total + item);
    })
    .reduce((total: number, item: number): number => total + item);
}
