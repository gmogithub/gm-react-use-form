import { FC, PropsWithChildren } from "react";
import { UseFormReturn } from "./useForm";
export declare function useFormContext(): UseFormReturn<any>;
type FormProviderProps = PropsWithChildren<UseFormReturn>;
export declare const FormProvider: FC<FormProviderProps>;
export {};
