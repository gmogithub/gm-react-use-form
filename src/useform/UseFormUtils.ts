import { UseFormInfo, UseFormValues } from "./useForm";
import { ReducerUserFormState } from "./reducerUseForm";

interface FormatAndParseValue {
  parseValue: any,
  formatValue: any
}

interface FormatAndParseValues {
  parseValues: UseFormValues,
  formatValues: UseFormValues
}

export class UseFormUtils {

  // public static KEY_ARRAY_FIELDS = "____array_fields____";

  public static getArrayFieldInfo(name: string) {
    const nameForArrayField = name;
    // const nameSplit = nameForArrayField.split(".");
    // const [objectsName, propName] = nameSplit;
    // const objectsNameSplit = objectsName.split("[");
    // const [objectName, objectIndex] = objectsNameSplit;

    const regRex = new RegExp('([a-z_]+)\\[([0-9]+)].([a-zA-Z0-9_]+)', "gm");
    const result = regRex.exec(nameForArrayField);
    if (!result) {
      throw new Error("The name field array is not valid")
    }

    const objectName = result[1];
    const objectIndex = result[2];
    const propName = result[3];

    return { objectIndex: parseInt(objectIndex, 10), objectName, propName }
  }

  public static formatAndParseValue(name: string, value: any, formInfoRef: UseFormInfo): FormatAndParseValue {
    const fnFormat = formInfoRef.formats[name];
    const fnParse = formInfoRef.parses[name];
    let resultFormat = value;
    let resultParse = value;

    if (fnFormat) {
      resultFormat = fnFormat(value);
      resultParse = resultFormat;
    }

    if (fnParse) {
      resultParse = fnParse(resultFormat);
    }

    if (!fnFormat) {
      resultFormat = resultParse;
    }

    return { formatValue: resultFormat, parseValue: resultParse };
  }

  public static parseAndFormatValue(name: string, value: any, formInfoRef: UseFormInfo): FormatAndParseValue {
    const fnFormat = formInfoRef.formats[name];
    // const fnParse = formInfoRef.parses[name];
    let resultFormat = value;
    let resultParse = value;



    if (fnFormat) {
      resultFormat = fnFormat(resultParse);
    }

    return { formatValue: resultFormat, parseValue: resultParse };
  }

  public static parseAndFormatValues(values: UseFormValues, formInfo: UseFormInfo): FormatAndParseValues {
    return Object.entries(values).reduce((acc, [propName, value]) => {

      if (UseFormUtils.isArrayFieldByPropName(propName, formInfo)) {
        const result = (value as UseFormValues[]).map(val => UseFormUtils.parseAndFormatValues(val, formInfo));
        acc.formatValues = { ...acc.formatValues, [propName]: result.map(({ formatValues }) => formatValues) };
        acc.parseValues = { ...acc.parseValues, [propName]: result.map(({ parseValues }) => parseValues) };
      } else {
        const result = UseFormUtils.parseAndFormatValue(propName, value, formInfo);
        acc.formatValues = { ...acc.formatValues, [propName]: result.formatValue };
        acc.parseValues = { ...acc.parseValues, [propName]: result.parseValue };
      }
      return acc;
    }, { parseValues: {}, formatValues: {} });
  }

  public static formatAndParseValues(values: UseFormValues, formInfo: UseFormInfo): FormatAndParseValues {
    return Object.entries(values).reduce((acc, [propName, value]) => {

      if (UseFormUtils.isArrayFieldByPropName(propName, formInfo)) {
        const result = (value as UseFormValues[]).map(val => UseFormUtils.formatAndParseValues(val, formInfo));
        acc.formatValues = { ...acc.formatValues, [propName]: result.map(({ formatValues }) => formatValues) };
        acc.parseValues = { ...acc.parseValues, [propName]: result.map(({ parseValues }) => parseValues) };
      } else {
        const result = UseFormUtils.formatAndParseValue(propName, value, formInfo);
        acc.formatValues = { ...acc.formatValues, [propName]: result.formatValue };
        acc.parseValues = { ...acc.parseValues, [propName]: result.parseValue };
      }

      return acc;
    }, { parseValues: {}, formatValues: {} });
  }

  public static getValue(name: string, valuesState: UseFormValues) {
    if (this.isArrayFieldByName(name)) {
      const { objectName, objectIndex, propName } = UseFormUtils.getArrayFieldInfo(name);
      const objs = valuesState[objectName as keyof UseFormValues] as any[];
      return objs[objectIndex] ? objs[objectIndex][propName] : undefined;
    } else {
      return valuesState[name as keyof UseFormValues];
    }
  }

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
  public static async validationField(state: ReducerUserFormState, name: string, value: any, formInfo: UseFormInfo, newValues?: UseFormValues) {
    const fns = formInfo.validations[name] ? formInfo.validations[name] : [];
    return await fns.reduce<Promise<string | undefined>>((async (acc, fn) => {
      const res = fn(value, newValues ? newValues : state.parseValues);
      const { message, valid } = res instanceof Promise ? (await res) : res;
      const resAcc = await acc;
      if (!valid && resAcc === undefined) {
        acc = Promise.resolve(message);
      }
      return acc;
    }), Promise.resolve(undefined));
  }

  public static isArrayFieldByName(name: string) {
    const regRex = new RegExp('([a-z_]+)\\[([0-9]+)].([a-zA-Z0-9_]+)', "gm");
    return regRex.test(name);
  }

  public static isArrayFieldByPropName(propName: string, formInfo: UseFormInfo) {
    return formInfo.arrayFields.map(({ name }) => name).includes(propName);
  }

}