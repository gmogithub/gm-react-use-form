import React, { FC, PropsWithChildren, useContext } from "react";
import { UseFormReturn } from "./useForm";


const FormContext = React.createContext<UseFormReturn | null>(null);

export function useFormContext() {
    return useContext(FormContext)!;
}


type FormProviderProps = PropsWithChildren<UseFormReturn>

export const FormProvider: FC<FormProviderProps> = ({ children, ...props }) => {
  return (
    <FormContext.Provider value={props}>
      {children}
    </FormContext.Provider>
  )
};
