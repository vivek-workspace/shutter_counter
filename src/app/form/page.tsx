"use client";

import { Suspense } from "react";
import BillForm from "./BillForm";

export default function Home() {
  return (
    <Suspense>
      <BillForm />
    </Suspense>
  );
}
