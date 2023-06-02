import { UseFormInfo, UseFormValues } from "./useForm";
import { ReducerUserFormState } from "./reducerUseForm";
interface FormatAndParseValue {
    parseValue: any;
    formatValue: any;
}
interface FormatAndParseValues {
    parseValues: UseFormValues;
    formatValues: UseFormValues;
}
export declare class UseFormUtils {
    static getArrayFieldInfo(name: string): {
        objectIndex: number;
        objectName: string;
        propName: string;
    };
    static formatAndParseValue(name: string, value: any, formInfoRef: UseFormInfo): FormatAndParseValue;
    static parseAndFormatValue(name: string, value: any, formInfoRef: UseFormInfo): FormatAndParseValue;
    static parseAndFormatValues(values: UseFormValues, formInfo: UseFormInfo): FormatAndParseValues;
    static formatAndParseValues(values: UseFormValues, formInfo: UseFormInfo): FormatAndParseValues;
    static getValue(name: string, valuesState: UseFormValues): any;
    /**
     *
     * @param state
     * @param name
     * @param value
     *
     * @param formInfo
     * @param newValues
     * @return
     * if valid field return promise undefined else return promise string
     */
    static validationField(state: ReducerUserFormState, name: string, value: any, formInfo: UseFormInfo, newValues?: UseFormValues): Promise<string | undefined>;
    static isArrayFieldByName(name: string): boolean;
    static isArrayFieldByPropName(propName: string, formInfo: UseFormInfo): boolean;
}
export {};
