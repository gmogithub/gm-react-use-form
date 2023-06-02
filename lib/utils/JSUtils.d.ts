interface ObjectClone {
    [otherProp: string]: any;
}
export declare class JSUtils {
    static UID(number?: number): number;
    static UUID(): string;
    static isArray<T = any>(value: any): value is Array<T>;
    static isString(value: any): value is string;
    static isBoolean(value: any): value is boolean;
    static isObject(value: any): boolean;
    static isFunction(value: any): value is Function;
    static isNumber(value: any): value is number;
    static parseObject(obj: any, values: any): any;
    private static _parseObjectProperties;
    static cloneDeep(value: any): any;
    static _cloneObject(obj: ObjectClone): any;
    static _cloneArray(array: Array<any>): Array<any>;
    static _clone(value: any): any;
    static getValueFromObject(obj: any, path: any, valueDefault?: any): any;
    static isObjectEmpty(object: any): boolean;
    static isNullOrUndefined(variable: any): boolean;
    static copyToClipboard(data: string): void;
    static exportStringAsFile(fileName: string, dataType: string, data: string): void;
    static objectToMapKeyIsNumber<T>(toMap: Object): Map<number, T>;
    static objectToMapKeyIsString<T>(toMap: Object): Map<string, T>;
    static mapToObject(toObject: Map<any, any>): Object;
}
export {};
