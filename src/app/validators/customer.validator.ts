import { string, object } from "yup";

const customerValidationObj = object().shape({
  name: string().trim().required("Customer name is required"),
  email: string()
    .email("Please Enter Valid email")
    .required("Email is required"),
  phoneNumber: string()
    .length(10, "Contact no must be 10 digit")
    .matches(/^[0-9]{10}$/, "Please Enter vlid mobile number")
    .required("Contact no can not be empty"),
  address: string().trim().required("Please enter address")
});

export default customerValidationObj;
