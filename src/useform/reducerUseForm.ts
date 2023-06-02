import { UseFormErrors, UseFormGlobalOption, UseFormInfo, UseFormValues } from "./useForm";
import { Dispatch } from "react";
import { UseFormUtils } from "./UseFormUtils";

export type SFReducerAction<P = any, T = number> = {
  type: T;
  payload: P;
};

enum UseFormReducerActionType {
  ONCHANGE_VALUE,
  ONBLUR_VALUE,
  UPDATE_ERRORS,
  ADD_ARRAY_FIELD,
  REMOVE_ARRAY_FIELD,
  UPDATE_VALUE,
  UPDATE_VALUES,
  INITIAL_VALUES,
  AUTO_UPDATE_ERRORS
}

export interface ReducerUserFormState<FormState extends UseFormValues = any> {
  errors: UseFormErrors,
  formatValues: UseFormValues,
  parseValues: FormState
}


class Actions {
  public static async onChangeValue(state: ReducerUserFormState, name: string, value: any, checked: boolean | undefined, type: string | undefined, formInfo: UseFormInfo, option: UseFormGlobalOption) {

    const formatValuePrev = UseFormUtils.getValue(name, state.formatValues);
    // const parseValuePrev = UseFormUtils.getValue(name, state.parseValues);
    let formatValue, parseValue;

    if (type === "checkbox") {
      const val: any = formatValuePrev ? formatValuePrev : [];
      if (checked) {
        if (!val.includes(value)) {
          val.push(value);
        }
      } else {
        const index = val.indexOf(value);
        if (index !== -1) {
          val.splice(index, 1);
        }
      }

      formatValue = [...val];
      parseValue = [...val];
    } else if (type === "radio") {
      formatValue = value;
      parseValue = value;
    } else if (type === "boolean") {
      formatValue = checked;
      parseValue = checked;
    } else {
      const result = UseFormUtils.formatAndParseValue(name, value, formInfo);
      formatValue = result.formatValue;
      parseValue = result.parseValue;
    }

    let newFormatValues, newParseValues;
    if (UseFormUtils.isArrayFieldByName(name)) {
      const {objectName, objectIndex, propName} = UseFormUtils.getArrayFieldInfo(name);
      const objFormats = state.formatValues[objectName as keyof UseFormValues] as any[];
      const objFormat = {...objFormats[objectIndex], [propName]: formatValue};
      objFormats.splice(objectIndex, 1, objFormat);
      newFormatValues = {...state.formatValues, [objectName]: [...objFormats]};

      const objParses = state.parseValues[objectName as keyof UseFormValues] as any[];
      const objParse = {...objParses[objectIndex], [propName]: formatValue};
      objParses.splice(objectIndex, 1, objParse);
      newParseValues = {...state.parseValues, [objectName]: [...objParses]};
    } else {
      newFormatValues = {...state.formatValues, [name]: formatValue};
      newParseValues = {...state.parseValues, [name]: parseValue};
    }

    const prevErrors = state.errors;
    let newErrors = {};

    if (option && option.validateOnChange) {
      const nextError = await UseFormUtils.validationField(state, name, parseValue, formInfo, newParseValues);
      const prevError = prevErrors[name];
      if (nextError !== prevError) {
        newErrors = {
          [name]: nextError
        }
      }
    }

    return {
      ...state,
      parseValues: newParseValues,
      formatValues: newFormatValues,
      errors: {...prevErrors, ...newErrors}
    };
  }

  public static async onBlurValue(state: ReducerUserFormState, name: string, value: any, formInfo: UseFormInfo, option: UseFormGlobalOption) {
    const result = UseFormUtils.formatAndParseValue(name, value, formInfo);
    if (formInfo.onBlurs[name]) {
      formInfo.onBlurs[name](result.parseValue);
    }

    if (option && option.validateOnBlur) {
      // const prevErrors = state.errors;
      // let newErrors = {};
      // const nextError = await UseFormUtils.validationField(state, name, result.parseValue, formInfo, state);
      // const prevError = prevErrors[name];
      // if (nextError !== prevError) {
      //   newErrors = {
      //     [name]: nextError
      //   }
      // }
      //
      // return { ...state, errors: { ...prevErrors, ...newErrors } };
      return Actions.autoUpdateErrors(state, name, value, formInfo);
    }

    return state;

  }

  static addArrayField(state: ReducerUserFormState, name: string, item: UseFormValues, formInfo: UseFormInfo): ReducerUserFormState {
    const itemFormat = Object.entries(item).reduce((acc, [propName, value]) => {
      return {
        ...acc,
        [propName]: UseFormUtils.formatAndParseValue(name, value, formInfo).formatValue
      };
    }, {} as UseFormValues);

    const itemParse = Object.entries(item).reduce((acc, [propName, value]) => {
      return {
        ...acc,
        [propName]: UseFormUtils.formatAndParseValue(name, value, formInfo).parseValue
      };
    }, {} as UseFormValues);

    const newParseValues = state.parseValues[name] ? [...state.parseValues[name], itemParse] : [itemParse];
    const newFormatValues = state.formatValues[name] ? [...state.formatValues[name], itemFormat] : [itemFormat];

    return {
      ...state,
      parseValues: {...state.parseValues, [name]: newParseValues},
      formatValues: {...state.formatValues, [name]: newFormatValues}
    };
  }

  static removeArrayField(state: ReducerUserFormState, name: string, index: number, formInfo: UseFormInfo): ReducerUserFormState {
    const parseValues = state.parseValues[name] as UseFormValues[];
    const formatValues = state.formatValues[name] as UseFormValues[];

    if (parseValues && formatValues) {


      // const propNameError = `${UseFormUtils.KEY_ARRAY_FIELDS}${name}_${index}`;
      //
      // const tmpValidations = Object.keys(formInfo.validations).reduce((acc, propName) => {
      //   if (!propName.includes(propNameError)) {
      //     acc[propName] = formInfo.validations[propName];
      //   }
      //   return acc;
      // }, {} as UseFormValidation);
      //
      // const newValidations = Object.keys(tmpValidations).reduce((acc, propNameTmp, currentIndex) => {
      //   const strSplit = propNameTmp.split(".");
      //   const firstName = strSplit[0];
      //   const propName = propNameTmp.replace(firstName, `${UseFormUtils.KEY_ARRAY_FIELDS}${name}_${currentIndex}`);
      //
      //   if (!propName.includes(propNameError)) {
      //     acc[propName] = tmpValidations[propName];
      //   }
      //   return acc;
      // }, {} as UseFormValidation);
      //
      // formInfo.validations = newValidations;
      //
      // const tmpErrors = Object.keys(state.errors).reduce((acc, propName) => {
      //   if (!propName.includes(propNameError)) {
      //     acc[propName] = state.errors[propName];
      //   }
      //   return acc;
      // }, {} as UseFormErrors);
      //
      // const newErrors = Object.keys(tmpErrors).reduce((acc, propNameTmp, currentIndex) => {
      //   const strSplit = propNameTmp.split(".");
      //   const firstName = strSplit[0];
      //   const propName = propNameTmp.replace(firstName, `${UseFormUtils.KEY_ARRAY_FIELDS}${name}_${currentIndex}`);
      //
      //   if (!propName.includes(propNameError)) {
      //     acc[propName] = state.errors[propName];
      //   }
      //   return acc;
      // }, {} as UseFormErrors);

      formInfo.validations = {};

      return {
        ...state,
        errors: {},
        parseValues: {...state.parseValues, [name]: parseValues.filter((_, i) => i !== index)},
        formatValues: {...state.formatValues, [name]: parseValues.filter((_, i) => i !== index)}
      }
    }
    return state;
  }

  static getValues(values: UseFormValues, formInfo: UseFormInfo) {
    const results = UseFormUtils.parseAndFormatValues(values, formInfo);
    return Object.keys(results).reduce((acc, _) => {
      acc.formatValues = {...acc.formatValues, ...results.formatValues};
      acc.parseValues = {...acc.parseValues, ...results.parseValues};
      return acc;
    }, {formatValues: {}, parseValues: {}});
  }

  static initialValues(state: ReducerUserFormState, values: UseFormValues, formInfo: UseFormInfo): ReducerUserFormState {
    const {formatValues, parseValues} = this.getValues(values, formInfo);
    // console.log(formatValues, parseValues);
    return {...state, parseValues, formatValues};
  }

  static updateValue(state: ReducerUserFormState, name: string, value: any, formInfo: UseFormInfo): ReducerUserFormState {
    const result = UseFormUtils.parseAndFormatValue(name, value, formInfo);
    if (UseFormUtils.isArrayFieldByName(name)) {
      const {objectName, objectIndex, propName} = UseFormUtils.getArrayFieldInfo(name);
      const prevFormatValueObj = state.formatValues[objectName];
      let newFormatValueObj;
      /*if (!prevFormatValueObj || prevFormatValueObj.length === 0) {
        newFormatValueObj = [{ [propName]: result.formatValue }];
      } else if ((prevFormatValueObj.length - 1) < objectIndex) {
        newFormatValueObj = [...prevFormatValueObj, { [propName]: result.formatValue }];
      } else*/
      if (prevFormatValueObj && prevFormatValueObj[objectIndex]) {
        newFormatValueObj = prevFormatValueObj.reduce((acc: any[], valueObj: any, i: number) => {
          if (i === objectIndex) {
            acc[i][propName] = result.formatValue;
          }
          return acc;
        }, prevFormatValueObj)
      }

      const prevParseValueObj = state.parseValues[objectName];
      let newParseValueObj;
      /*if (!prevParseValueObj || prevParseValueObj.length === 0) {
        newParseValueObj = [{ [propName]: result.parseValue }];
      } else if (prevParseValueObj.length < objectIndex) {
        newParseValueObj = [...prevParseValueObj, { [propName]: result.parseValue }];
      } else */
      if (prevParseValueObj && prevParseValueObj[objectIndex]) {
        newParseValueObj = prevParseValueObj.reduce((acc: any[], valueObj: any, i: number) => {
          if (i === objectIndex) {
            acc[i][propName] = result.parseValue;
          }
          return acc;
        }, prevParseValueObj);
      }

      if (newFormatValueObj && newParseValueObj) {
        return {
          ...state,
          parseValues: {...state.parseValues, [objectName]: newParseValueObj},
          formatValues: {...state.formatValues, [objectName]: newFormatValueObj}
        };
      }
    } else {
      return {
        ...state,
        parseValues: {...state.parseValues, [name]: result.parseValue},
        formatValues: {...state.formatValues, [name]: result.formatValue}
      };
    }

    return state;
  }


  static updateValues(state: ReducerUserFormState, values: UseFormValues, formInfo: UseFormInfo): ReducerUserFormState {
    const {formatValues, parseValues} = this.getValues(values, formInfo);
    return {
      ...state,
      parseValues: {...state.parseValues, ...parseValues},
      formatValues: {...state.formatValues, ...formatValues}
    };
  }

  static async autoUpdateErrors(state: ReducerUserFormState, name: string, value: any, formInfo: UseFormInfo) {
    const result = UseFormUtils.formatAndParseValue(name, value, formInfo);
    const prevErrors = state.errors;
    let newErrors = {};
    const nextError = await UseFormUtils.validationField(state, name, result.parseValue, formInfo, state);
    const prevError = prevErrors[name];
    if (nextError !== prevError) {
      newErrors = {
        [name]: nextError
      }
    }

    return {...state, errors: {...prevErrors, ...newErrors}};
  }

  static async autoUpdatesErrors(state: ReducerUserFormState, values: UseFormValues, formInfo: UseFormInfo) {
    const prevErrors = state.errors;
    let newErrors = await Object.entries(values).reduce(async (acc, [name, value]) => {
      const result = UseFormUtils.formatAndParseValue(name, value, formInfo);
      const nextError = await UseFormUtils.validationField(state, name, result.parseValue, formInfo, state);
      const prevError = prevErrors[name];
      let accAwait = await acc;
      if (nextError !== prevError) {
        accAwait = {
          ...accAwait,
          [name]: nextError
        }
      }
      return accAwait;
    }, {} as Promise<UseFormErrors>);
    return {...state, errors: {...prevErrors, ...newErrors}};
  }
}


export function reducerUseForm(state: ReducerUserFormState, {
  type,
  payload
}: SFReducerAction<any, UseFormReducerActionType>): ReducerUserFormState {

  switch (type) {
    case UseFormReducerActionType.ONCHANGE_VALUE:
      return {...state, ...payload};
    case UseFormReducerActionType.ONBLUR_VALUE:
      return {...state, ...payload};
    case UseFormReducerActionType.UPDATE_ERRORS:
      return {...state, errors: {...state.errors, ...payload}};
    case UseFormReducerActionType.ADD_ARRAY_FIELD:
      return Actions.addArrayField(state, payload.name, payload.item, payload.formInfo);
    case  UseFormReducerActionType.REMOVE_ARRAY_FIELD:
      return Actions.removeArrayField(state, payload.name, payload.index, payload.formInfo);
    case UseFormReducerActionType.UPDATE_VALUE:
      // return { Actions.updateValue(state, payload.name, payload.value, payload.formInfo) };
      return {...state, ...payload};
    case UseFormReducerActionType.UPDATE_VALUES:
      return {...state, ...payload};
    // return Actions.updateValues(state, payload.values, payload.formInfo);
    case UseFormReducerActionType.INITIAL_VALUES:
      return Actions.initialValues(state, payload.values, payload.formInfo);
    // case UseFormReducerActionType.AUTO_UPDATE_ERRORS:
    //   return { ...state, ...payload };
  }

  return state;
}

export function getInitialUseFormState(): ReducerUserFormState {
  return {
    errors: {},
    formatValues: {},
    parseValues: {}
  }
}

export const reducerActionUseForm = (dispatch: Dispatch<any>) => ({
  onChangeValue(prevState: ReducerUserFormState, name: string, type: string | undefined, value: any, checked: boolean | undefined, formInfoRef: UseFormInfo, option: UseFormGlobalOption) {
    Actions.onChangeValue(prevState, name, value, checked, type, formInfoRef, option).then(state => {
      dispatch({
        type: UseFormReducerActionType.ONCHANGE_VALUE,
        payload: state
      })
      return state;
    }).then((state) => {
      if (formInfoRef.onChanges[name]) {
        const {parseValues, formatValues} = state;
        const valueFinal = parseValues[name] ? parseValues[name] : formatValues[name];
        formInfoRef.onChanges[name](valueFinal);
      }
    });
  },
  onBlurValue(prevState: ReducerUserFormState, name: string, value: any, formInfoRef: UseFormInfo, option: UseFormGlobalOption) {
    Actions.onBlurValue(prevState, name, value, formInfoRef, option).then(state => {
      dispatch({
        type: UseFormReducerActionType.ONBLUR_VALUE,
        payload: state
      });
    });
  },
  updateErrors(errors: UseFormErrors) {
    dispatch({
      type: UseFormReducerActionType.UPDATE_ERRORS,
      payload: errors
    });
  },
  addArrayField(name: string, item: UseFormValues, formInfo: UseFormInfo) {
    dispatch({
      type: UseFormReducerActionType.ADD_ARRAY_FIELD,
      payload: {item, name, formInfo}
    });

  },
  removeArrayField(name: string, index: number, formInfo: UseFormInfo) {
    dispatch({
      type: UseFormReducerActionType.REMOVE_ARRAY_FIELD,
      payload: {index, name, formInfo}
    });
  },
  updateValue(name: string, value: any, formInfo: UseFormInfo, state: ReducerUserFormState) {
    const newState = Actions.updateValue(state, name, value, formInfo);
    Actions.autoUpdateErrors(newState, name, value, formInfo).then(stateNewWithErrors => {
      dispatch({
        type: UseFormReducerActionType.UPDATE_VALUE,
        payload: stateNewWithErrors
      });
    });

  },
  updateValues(values: UseFormValues, formInfo: UseFormInfo, state: ReducerUserFormState) {
    const newState = Actions.updateValues(state, values, formInfo);
    Actions.autoUpdatesErrors(newState, values, formInfo).then(newStateWithErrors => {
      dispatch({
        type: UseFormReducerActionType.UPDATE_VALUES,
        payload: newStateWithErrors
      });
    });
  },
  initialValues(values: UseFormValues, formInfo: UseFormInfo) {
    dispatch({
      type: UseFormReducerActionType.INITIAL_VALUES,
      payload: {values, formInfo}
    });
  }
})