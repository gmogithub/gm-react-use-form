import React from "react";
export interface UseFormRegisterReturn {
    name: string;
    type?: string;
    value?: any;
    onChange: UseFormChangeEvent;
    onBlur: UseFormBlurEvent;
    error?: string;
    checked?: boolean;
}
export interface UseFormRegisterDateReturn {
    name: string;
    value: any;
    onChange: UseFormChangeEvent;
    onBlur: UseFormBlurEvent;
    error?: string;
}
export interface UseFormValidator {
    message: string;
    valid: boolean;
}
interface UserFormInputEvent {
    target: {
        name: string;
        value: any;
        type?: string;
        checked?: boolean;
    };
}
export type UseFormChangeEvent = (e: UserFormInputEvent) => void;
export type UseFormBlurEvent = (e: UserFormInputEvent) => void;
export type UseFormValidateType = <FormValues>(value: any, values?: FormValues) => (UseFormValidator | Promise<UseFormValidator>);
export type UseFormFormatType = (value: any) => any;
export type UseFormParseType = (value: any) => any;
type UseFormRegisterType = 'radio' | 'checkbox' | 'text' | "boolean" | undefined;
interface UseFormRegisterOption {
    validate?: UseFormValidateType[];
    format?: UseFormFormatType;
    parse?: UseFormParseType;
    multiple?: boolean;
    type?: UseFormRegisterType;
    onChange?: (value: any) => void;
    onBlur?: (value: any) => void;
}
interface UseFormRegisterCheckboxOption extends UseFormRegisterOption {
}
interface UseFormRegisterRadioOption extends UseFormRegisterOption {
}
export interface UseFormGlobalOption {
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
}
interface UseFormArrayFieldsReturn<T = any> {
    add: (item: T) => void;
    move: (oldIndex: number, newIndex: number) => void;
    remove: (index: number) => void;
    fields: () => {
        index: number;
        name: string;
    }[];
}
export interface UseFormReturn<FormValues extends UseFormValues = any> {
    register: (name: string, options?: UseFormRegisterOption) => UseFormRegisterReturn;
    registerCheckbox: (name: string, value: any, option?: UseFormRegisterCheckboxOption) => UseFormRegisterReturn;
    registerBoolean: (name: string, option?: UseFormRegisterCheckboxOption) => UseFormRegisterReturn;
    registerRadio: (name: string, value: any, option?: UseFormRegisterRadioOption) => UseFormRegisterReturn;
    registerDate: (name: string, option?: UseFormRegisterRadioOption) => UseFormRegisterDateReturn;
    handleSubmit: (fn: (s: FormValues) => void) => (e?: React.SyntheticEvent) => Promise<void>;
    values: FormValues;
    errors: {
        [propName: string]: string | undefined;
    };
    arrayFields: (fieldName: string) => UseFormArrayFieldsReturn;
    updateValue: (name: string, value: any) => void;
    updateValues: (values: Partial<FormValues>) => void;
    initialValues: (values: Partial<FormValues>) => void;
}
export interface UseFormValidation {
    [propName: string]: UseFormValidateType[];
}
interface IArrayField {
    [name: string]: any;
}
export interface UseFormInfo {
    validations: UseFormValidation;
    formats: {
        [propName: string]: UseFormFormatType;
    };
    parses: {
        [propName: string]: UseFormParseType;
    };
    types: {
        [propName: string]: UseFormRegisterType;
    };
    onChanges: {
        [propName: string]: (value: any) => void;
    };
    onBlurs: {
        [propName: string]: (value: any) => void;
    };
    arrayFields: IArrayField[];
}
export type UseFormErrors = {
    [propName: string]: string | undefined;
};
export type UseFormValues = {
    [propName: string]: any | any[];
};
/**
 * TODO update un champs dans une page
 */
export declare function useForm<FormValues extends UseFormValues = any>(optionProp?: UseFormGlobalOption): UseFormReturn<FormValues>;
export {};
