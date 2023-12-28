import React, { useCallback, useReducer, useRef } from "react";
import { getInitialUseFormState, reducerActionUseForm, reducerUseForm } from "./reducerUseForm";
import { UseFormUtils } from "./UseFormUtils";
import { useWorker } from "../useWorker/useWorker";

export interface UseFormRegisterReturn {
  name: string,
  type?: string,
  value?: any,
  onChange: UseFormChangeEvent,
  onBlur: UseFormBlurEvent,
  ref: (elt: any) => void,
  error?: string,
  checked?: boolean
}

export interface UseFormRegisterDateReturn {
  name: string,
  value: any,
  onChange: UseFormChangeEvent,
  onBlur: UseFormBlurEvent,
  error?: string,
  ref: (elt: any) => void,
}

export interface UseFormValidator {
  message: string,
  valid: boolean
}

interface UserFormInputEvent {
  target: {
    name: string,
    value: any
    type?: string,
    checked?: boolean
  }
}

export type UseFormChangeEvent = (e: UserFormInputEvent) => void;
export type UseFormBlurEvent = (e: UserFormInputEvent) => void;

export type UseFormValidateType = <FormValues> (value: any, values?: FormValues) => (UseFormValidator | Promise<UseFormValidator>);
export type UseFormFormatType = (value: any) => any;
export type UseFormParseType = (value: any) => any;

type UseFormRegisterType = 'radio' | 'checkbox' | 'text' | "boolean" | undefined;

interface UseFormRegisterOption {
  validate?: UseFormValidateType[],
  format?: UseFormFormatType,
  parse?: UseFormParseType,
  // defaultValue?: any,
  multiple?: boolean,
  type?: UseFormRegisterType,
  onChange?: (value: any) => void,
  onBlur?: (value: any) => void,
}

interface UseFormRegisterCheckboxOption extends UseFormRegisterOption {

}

interface UseFormRegisterRadioOption extends UseFormRegisterOption {

}

export interface UseFormGlobalOption {
  validateOnChange?: boolean,
  validateOnBlur?: boolean
}


interface UseFormArrayFieldsReturn<T = any> {
  add: (item: T) => void,
  move: (oldIndex: number, newIndex: number) => void,
  remove: (index: number) => void,
  fields: () => { index: number, name: string }[]
}

export interface UseFormReturn<FormValues extends UseFormValues = any> {
  register: (name: string, options?: UseFormRegisterOption) => UseFormRegisterReturn,
  registerCheckbox: (name: string, value: any, option?: UseFormRegisterCheckboxOption) => UseFormRegisterReturn,
  registerBoolean: (name: string, option?: UseFormRegisterCheckboxOption) => UseFormRegisterReturn,
  registerRadio: (name: string, value: any, option?: UseFormRegisterRadioOption) => UseFormRegisterReturn,
  registerDate: (name: string, option?: UseFormRegisterRadioOption) => UseFormRegisterDateReturn,
  handleSubmit: (fn: (s: FormValues) => void) => (e?: React.SyntheticEvent) => Promise<void>,
  values: FormValues,
  errors: { [propName: string]: string | undefined },
  arrayFields: (fieldName: string) => UseFormArrayFieldsReturn,
  updateValue: (name: string, value: any) => void,
  updateValues: (values: Partial<FormValues>) => void,
  initialValues: (values: Partial<FormValues>) => void,
  // control: any
}

export interface UseFormValidation {
  [propName: string]: UseFormValidateType[]
}

interface IArrayField {
  [name: string]: any
}

export interface UseFormInfo {
  validations: UseFormValidation,
  formats: { [propName: string]: UseFormFormatType },
  parses: { [propName: string]: UseFormParseType },
  types: { [propName: string]: UseFormRegisterType },
  onChanges: { [propName: string]: (value: any) => void },
  onBlurs: { [propName: string]: (value: any) => void },
  arrayFields: IArrayField[],
  selectionStart: { [propName: string]: number },
  eltRefs: { [propName: string]: HTMLElement },
}

export type UseFormErrors = { [propName: string]: string | undefined };
export type UseFormValues = { [propName: string]: any | any[] };


/**
 * TODO update un champs dans une page
 */

interface GenericTaskData<TagName> {
  action: TagName,
  data: TagName extends keyof DefFormWorker ? DefFormWorker[TagName] : never
}

type DefFormWorker = {
  ONCHANGE_VALUE: {
    state: any,
    name: string,
    value: string,
    type: string | undefined,
    checked: boolean | undefined
  },
  ONBLUR_VALUE: {
    state: any,
    name: string,
    value: string
  },
  UPDATE_ERRORS: {
    errors: UseFormErrors
  },
  // ADD_ARRAY_FIELD: {},
  // REMOVE_ARRAY_FIELD: {},
  UPDATE_VALUE: {
    name: string,
    state: any,
    value: any
  },
  UPDATE_VALUES: {
    values: UseFormValues,
    state: any
  },
  INITIAL_VALUES: {
    values: UseFormValues,
  }
}

type KeysFormWorker = keyof DefFormWorker;

type FormWorkerProps = {
  [Action in KeysFormWorker]: GenericTaskData<Action>
}

type ValueOf<T> = T[keyof T];

type UseFormWorker = ValueOf<FormWorkerProps>;


export function useForm<FormValues extends UseFormValues = any>(optionProp?: UseFormGlobalOption): UseFormReturn<FormValues> {
  const option = optionProp ? optionProp : { validateOnChange: true, validateOnBlur: true };
  const formInfoRef = useRef<UseFormInfo>({
    validations: {},
    formats: {},
    parses: {},
    types: {},
    onChanges: {},
    onBlurs: {},
    arrayFields: [],
    selectionStart: {},
    eltRefs: {}
  });


  // const eltsRef = useRef<{ [propName: string]: any }>({});
  const [state, dispatch] = useReducer(reducerUseForm, getInitialUseFormState());
  const reducerAction = reducerActionUseForm(dispatch);
  const { errors, formatValues, parseValues } = state;
  const worker = useWorker<UseFormWorker>(async ({ action, data }) => {
    switch (action) {
      case "ONCHANGE_VALUE":
        await reducerAction.onChangeValue(data.state, data.name, data.type, data.value, data.checked, formInfoRef.current!, option);
        break;
      case "ONBLUR_VALUE":
        await reducerAction.onBlurValue(data.state, data.name, data.value, formInfoRef.current, option);
        break;
      case "UPDATE_ERRORS":
        reducerAction.updateErrors(data.errors);
        break;
      case "UPDATE_VALUES":
        await reducerAction.updateValues(data.values, formInfoRef.current, data.state);
        break;
      case "UPDATE_VALUE":
        await reducerAction.updateValue(data.name, data.value, formInfoRef.current, data.state);
        break;
      case "INITIAL_VALUES":
        reducerAction.initialValues(data.values, formInfoRef.current);
        break;
    }
  })


  async function validation(values: UseFormValues) {
    const validations = formInfoRef.current.validations;
    const errors: UseFormErrors = {};
    const validate = await Object.keys(validations).reduce(async (acc: Promise<boolean>, name) => {
      const value = UseFormUtils.getValue(name, values);
      const validField = await UseFormUtils.validationField(state, name, value, formInfoRef.current, state.parseValues);
      errors[name as keyof UseFormErrors] = validField;
      const valid = !Boolean(validField);
      return await acc && valid;
    }, Promise.resolve(true));

    // reducerAction.updateErrors(errors);
    worker.push({ action: "UPDATE_ERRORS", data: { errors } });


    return validate;
  }

  function handleSubmit(fn: (s: FormValues) => void) {
    return async (e?: any) => {
      if (e) {
        e.preventDefault();
      }
      const valuesParse = state.parseValues as FormValues;
      const valid = await validation(valuesParse);
      if (valid) {
        fn(valuesParse);
      }
    }

  }


  function updateValue(name: string, value: any) {
    worker.push({ action: "UPDATE_VALUE", data: { state, value, name } });
    // reducerAction.updateValue(name, value, formInfoRef.current, state);
  }

  function updateValues(values: UseFormValues) {
    worker.push({ action: "UPDATE_VALUES", data: { state, values } });
    // reducerAction.updateValues(values, formInfoRef.current, state);
  }

  function initialValues(values: UseFormValues) {
    worker.push({ action: "INITIAL_VALUES", data: { values } });
    // reducerAction.initialValues(values, formInfoRef.current);
  }

  async function handleChange(e: UserFormInputEvent) {
    const name: string = e.target.name;
    const type = formInfoRef.current.types[name] === undefined ? e.target.type : formInfoRef.current.types[name];
    const value = e.target.value;
    const checked = e.target.checked;
    worker.push({ action: "ONCHANGE_VALUE", data: { state, name, type, value, checked } });
    // reducerAction.onChangeValue(state, name, type, value, checked, formInfoRef.current!, option);
  }

  async function handleBlur(e: UserFormInputEvent) {
    let value = e.target.value;
    const name: string = e.target.name;
    worker.push({ action: "ONBLUR_VALUE", data: { state, name, value } });
  }

  function getTypeElt(type: undefined | "radio" | "checkbox" | "text" | "boolean") {
    if (type !== undefined) {
      return type; //TODO quant on aura plus de type
    }

    return undefined;
  }

  const initializeRegisterOption = useCallback(function (name: string, option?: UseFormRegisterOption) {
    let type: UseFormRegisterType = undefined;

    if (option) {
      if (option.validate && formInfoRef.current.validations[name] === undefined) {
        formInfoRef.current.validations = { ...formInfoRef.current.validations, [name]: option.validate }
      }

      if (option.format && formInfoRef.current.formats[name] === undefined) {
        formInfoRef.current.formats = { ...formInfoRef.current.formats, [name]: option.format }
      }

      if (option.parse && formInfoRef.current.parses[name] === undefined) {
        formInfoRef.current.parses = { ...formInfoRef.current.parses, [name]: option.parse }
      }

      if (option.type) {
        type = option.type;
      }

      if (option.onChange) {
        formInfoRef.current.onChanges = { ...formInfoRef.current.onChanges, [name]: option.onChange };
      }

      if (option.onBlur) {
        formInfoRef.current.onBlurs = { ...formInfoRef.current.onBlurs, [name]: option.onBlur };
      }
    }

    if (formInfoRef.current.types[name] === undefined) {
      formInfoRef.current.types = { ...formInfoRef.current.types, [name]: type };
    }

  }, []);

  const register = useCallback(function (name: string, option?: UseFormRegisterOption): UseFormRegisterReturn {

    initializeRegisterOption(name, option);

    const type = formInfoRef.current.types[name];
    const error = errors[name];

    const typeElt = getTypeElt(type);

    const initialValue = (option && option.multiple) ? [] : "";

    let value = state.formatValues[name as keyof UseFormValues] ? formatValues[name as keyof UseFormValues] : initialValue;

    if (UseFormUtils.isArrayFieldByName(name)) {
      const { objectName, objectIndex, propName } = UseFormUtils.getArrayFieldInfo(name);
      const val = (state.formatValues[objectName as keyof UseFormValues] as any[])[objectIndex][propName];
      value = val ? val : initialValue;
    }

    // const valueFinal = UseFormUtils.formatAndParseValue(name, value, formInfoRef.current);
    const valueFinal = value;
    return {
      name,
      type: typeElt,
      value: valueFinal,
      error,
      onChange: handleChange,
      onBlur: handleBlur,
      ref: (elt: HTMLElement) => formInfoRef.current.eltRefs[name] = elt
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, state.formatValues, state.parseValues]);

  const registerCheckbox = useCallback(function (name: string, value: any, option?: UseFormRegisterCheckboxOption): UseFormRegisterReturn {
    initializeRegisterOption(name, option);
    let valueState = state.formatValues[name as keyof UseFormValues] ?? [];

    if (UseFormUtils.isArrayFieldByName(name)) {
      const { objectName, objectIndex, propName } = UseFormUtils.getArrayFieldInfo(name);
      const val = (state.formatValues[objectName as keyof UseFormValues] as any[])[objectIndex][propName];
      valueState = val ? val : [];
    }

    const checked: boolean = valueState.includes(value);

    return {
      name,
      value,
      type: "checkbox",
      checked,
      error: errors[name],
      onChange: handleChange,
      onBlur: handleBlur,
      ref: (elt: HTMLElement) => formInfoRef.current.eltRefs[name] = elt
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, state.formatValues, state.parseValues]);

  const registerBoolean = useCallback(function (name: string, option?: UseFormRegisterCheckboxOption): UseFormRegisterReturn {
    const optionFinal: UseFormRegisterCheckboxOption = option ? { ...option, type: "boolean" } : { type: "boolean" };
    initializeRegisterOption(name, optionFinal);
    let valueState = state.formatValues[name as keyof UseFormValues] ?? false;

    if (UseFormUtils.isArrayFieldByName(name)) {
      const { objectName, objectIndex, propName } = UseFormUtils.getArrayFieldInfo(name);
      const val = (state.formatValues[objectName as keyof UseFormValues] as any[])[objectIndex][propName];
      valueState = val ? val : false;
    }


    return {
      name,
      value: valueState,
      type: "checkbox",
      error: errors[name],
      onChange: handleChange,
      onBlur: handleBlur,
      checked: valueState,
      ref: (elt: HTMLElement) => formInfoRef.current.eltRefs[name] = elt
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, state.formatValues, state.parseValues]);

  //
  const registerRadio = useCallback(function (name: string, value: any, option?: UseFormRegisterRadioOption): UseFormRegisterReturn {
    initializeRegisterOption(name, option);
    let valueState = formatValues[name as keyof UseFormValues] ? formatValues[name as keyof UseFormValues] as any[] : [];

    if (UseFormUtils.isArrayFieldByName(name)) {
      const { objectName, objectIndex, propName } = UseFormUtils.getArrayFieldInfo(name);
      const val = (formatValues[objectName as keyof UseFormValues] as any[])[objectIndex][propName];
      valueState = val ? val : "";
    }
    const checked: boolean = valueState === value;
    return {
      name,
      value,
      type: "radio",
      checked,
      error: errors[name],
      onChange: handleChange,
      onBlur: handleBlur,
      ref: (elt: HTMLElement) => formInfoRef.current.eltRefs[name] = elt
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, formatValues, parseValues]);

  const registerDate = useCallback(function (name: string, option?: UseFormRegisterRadioOption): UseFormRegisterDateReturn {
    initializeRegisterOption(name, option);
    const initialValue = (option && option.multiple) ? [] : null;
    let value = state.formatValues[name as keyof UseFormValues] ? formatValues[name as keyof UseFormValues] : initialValue;

    if (UseFormUtils.isArrayFieldByName(name)) {
      const { objectName, objectIndex, propName } = UseFormUtils.getArrayFieldInfo(name);
      const val = (state.formatValues[objectName as keyof UseFormValues] as any[])[objectIndex][propName];
      value = val ? val : initialValue;
    }

    return {
      name,
      value,
      onChange: handleChange,
      onBlur: handleBlur,
      error: errors[name],
      ref: (elt: HTMLElement) => formInfoRef.current.eltRefs[name] = elt
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, state.formatValues])

  function arrayFields<T extends UseFormValues = any>(name: string): UseFormArrayFieldsReturn<T> {
    formInfoRef.current.arrayFields.push({ name });
    return {
      add: (item) => {
        reducerAction.addArrayField(name, item, formInfoRef.current);
      },
      move: (oldIndex: number, newIndex: number) => {
        //TODO
      },
      remove: (index: number) => {
        reducerAction.removeArrayField(name, index, formInfoRef.current);
      },
      fields: () => {
        const fields = formatValues[name as keyof UseFormValues] as (any[] | undefined);
        if (!fields) {
          return [];
        }

        return (formatValues[name as keyof UseFormValues] as any[]).map((_, i) => ({
          index: i,
          name: `${name}[${i}]`
        }));
      }
    }
  }

  return {
    register,
    registerCheckbox,
    registerRadio,
    registerBoolean,
    registerDate,
    handleSubmit,
    values: parseValues,
    errors,
    arrayFields,
    updateValue,
    updateValues,
    initialValues,
    // control: { state }
  };

}