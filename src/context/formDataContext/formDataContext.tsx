import { IFromDataContext } from "@/app/interface";
import { Context, createContext } from "react";

const FormDataContext : Context<IFromDataContext | null>   = createContext<null | IFromDataContext>(null);

export default FormDataContext