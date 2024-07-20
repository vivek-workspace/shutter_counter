import { useForm } from "react-hook-form";
import Button from "./elements/button";
import { LabelInput } from "./elements/labeledInput";
import { addCustomer } from "@/lib/features/customers/customerSlice";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import customerValidationObj from "../validators/customer.validator";

export default function AddCustomerModel({
  setShowModal,
}: {
  setShowModal: Function;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerValidationObj),
  });
  const dispatch = useDispatch();

  function submitHandler(data: any) {
    const id: string = createRandomString(10);
    data.id = id;

    dispatch(addCustomer(data));
    setShowModal(false);
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">New Customer</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent z-60 text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  x
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <form>
                <div>
                  <LabelInput
                    register={register}
                    fieldName="name"
                    labelName="Customer Name"
                  />
                  <div className="text-sm text-right pr-2 font-light text-red-500">
                    {errors.name?.message as string}
                  </div>
                  <LabelInput
                    register={register}
                    fieldName="email"
                    labelName="Email"
                  />
                  <div className="text-sm text-right pr-2 font-light text-red-500">
                    {errors.email?.message as string}
                  </div>
                </div>
                <div>
                  <LabelInput
                    register={register}
                    fieldName="phoneNumber"
                    labelName="Contact Number"
                  />
                  <div className="text-sm text-right pr-2 font-light text-red-500">
                    {errors.phoneNumber?.message as string}
                  </div>
                  <LabelInput
                    register={register}
                    fieldName="address"
                    labelName="Address"
                  />
                  <div className="text-sm text-right pr-2 font-light text-red-500">
                    {errors.address?.message as string}
                  </div>
                </div>
                <div className="flex items-center justify-end ">
                  <Button
                    name={"Close"}
                    color="from-red-500 via-red-600 to-red-700"
                    onClickFunction={() => setShowModal(false)}
                  />
                  <Button
                    // type={"submit"}
                    name={"Save"}
                    onClickFunction={handleSubmit(submitHandler)}
                  />
                  {/* <input type="button" value={"sdfs"} onClick={handleSubmit(submitHandler)} /> */}
                </div>
              </form>
            </div>
            {/*footer*/}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

function createRandomString(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result: string = "";
  for (let i: number = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
