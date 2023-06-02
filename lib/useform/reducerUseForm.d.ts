import { UseFormErrors, UseFormGlobalOption, UseFormInfo, UseFormValues } from "./useForm";
import { Dispatch } from "react";
export type SFReducerAction<P = any, T = number> = {
    type: T;
    payload: P;
};
declare enum UseFormReducerActionType {
    ONCHANGE_VALUE = 0,
    ONBLUR_VALUE = 1,
    UPDATE_ERRORS = 2,
    ADD_ARRAY_FIELD = 3,
    REMOVE_ARRAY_FIELD = 4,
    UPDATE_VALUE = 5,
    UPDATE_VALUES = 6,
    INITIAL_VALUES = 7,
    AUTO_UPDATE_ERRORS = 8
}
export interface ReducerUserFormState<FormState extends UseFormValues = any> {
    errors: UseFormErrors;
    formatValues: UseFormValues;
    parseValues: FormState;
}
export declare function reducerUseForm(state: ReducerUserFormState, { type, payload }: SFReducerAction<any, UseFormReducerActionType>): ReducerUserFormState;
export declare function getInitialUseFormState(): ReducerUserFormState;
export declare const reducerActionUseForm: (dispatch: Dispatch<any>) => {
    onChangeValue(prevState: ReducerUserFormState, name: string, type: string | undefined, value: any, checked: boolean | undefined, formInfoRef: UseFormInfo, option: UseFormGlobalOption): void;
    onBlurValue(prevState: ReducerUserFormState, name: string, value: any, formInfoRef: UseFormInfo, option: UseFormGlobalOption): void;
    updateErrors(errors: UseFormErrors): void;
    addArrayField(name: string, item: UseFormValues, formInfo: UseFormInfo): void;
    removeArrayField(name: string, index: number, formInfo: UseFormInfo): void;
    updateValue(name: string, value: any, formInfo: UseFormInfo, state: ReducerUserFormState): void;
    updateValues(values: UseFormValues, formInfo: UseFormInfo, state: ReducerUserFormState): void;
    initialValues(values: UseFormValues, formInfo: UseFormInfo): void;
};
export {};
