import { string, date, object, array, number, ref, Reference } from "yup";
import { IShutter } from "../interface";

const billValidationObj = object().shape({
  personName: string().trim().required("Person name is required"),
  customerId: string().min(1, "Please select Customer").required(),
  // dueDate: date().typeError("Pick a date").required(),
  shutters: array().required().of(
    object({
      type: string().min(1, "Please select Shutter type"),
      width: string().required().test("test_width", function (value : string){
        if(Number(value) == 0){
          return this.createError({
            path: this.path,
            message: "Width can not be 0",
          });
        }else return true
      }),
      height: string().required().test("test_width", function (value : string){
        if(Number(value) == 0){
          return this.createError({
            path: this.path,
            message: "Height can not be 0",
          });
        }else return true
      }),
      area: string(),
    })
  ),
  discountType: string().required(),
  discount: string()
    .required("Discount can not be empty")
    .test("test_discount", function (value) {
      const discountType: string = this.parent.discountType;
      const totalArea: number = this.parent.shutters
        .map((item: IShutter): number => Number(item.area))
        .reduce((total: number, item: number): number => {
          return total + item;
        });
      // console.log(totalArea);
      if (discountType == "percentage" && Number(value) > 100) {
        return this.createError({
          path: this.path,
          message: "Percentage must be less than 100",
        });
      }else if( Number(value) < 0) {
        return this.createError({
          path: this.path,
          message: "Discount can not be negative",
        });
      } else if (Number(value) > totalArea) {
        return this.createError({
          path: this.path,
          message: "Flat Discount can not be greater than Total Price",
        });
      } else{
        return true
      }
    }),
});

export default billValidationObj;
