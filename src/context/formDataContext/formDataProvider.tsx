import { ReactNode, useState } from "react"
import FormDataContext from "./formDataContext"

export default function FormDataProvider({children}:{children: ReactNode}){

  const [discountTypeContext, setDiscountTypeContext] = useState<string>("flatAmount")
  const [totalArea, setTotalArea] = useState<number>(0)

  return(
    <FormDataContext.Provider value={{totalArea, setTotalArea, discountTypeContext, setDiscountTypeContext}}>
      {children}
    </FormDataContext.Provider>
  )
}