import { ReactNode, useState } from "react"
import FormDataContext from "./formDataContext"

export default function FormDataProvider({children}:{children: ReactNode}){

  const [listOfArea, setAreas] = useState<number[]>([0])
  const [totalArea, setTotalArea] = useState<number>(0)

  return(
    <FormDataContext.Provider value={{totalArea, setTotalArea, listOfArea, setAreas}}>
      {children}
    </FormDataContext.Provider>
  )
}