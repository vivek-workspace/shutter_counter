"use client";
import { useSelector, useDispatch } from "react-redux";
import { BillState } from "../interface";
import BillList from "./billList";

export default function BillListPage() {
  return (
    <div className="mx-auto my-5 w-2/3">
      <h3 className="text-2xl ">Bill List</h3>
      <BillList />
    </div>
  );
}
