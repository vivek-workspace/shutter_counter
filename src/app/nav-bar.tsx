"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-slate-200 p-5 flex justify-between">
      <div>
        <Link href={"/"}>
        <h3 className="text-3xl ">Curtain Counter</h3>
        </Link>
      </div>
      <div>
        <Link href={"/form"}>
          <input
            type="button"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            value="Form"
          />
        </Link>
        <Link href={"/bills"}>
          <input  
            type="button"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            value="Bills"
          />
        </Link>
      </div>
    </div>
  );
}
