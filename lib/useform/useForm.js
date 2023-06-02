"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForm = void 0;
var react_1 = require("react");
var reducerUseForm_1 = require("./reducerUseForm");
var UseFormUtils_1 = require("./UseFormUtils");
/**
 * TODO update un champs dans une page
 */
function useForm(optionProp) {
    var option = optionProp ? optionProp : { validateOnChange: true, validateOnBlur: true };
    var formInfoRef = (0, react_1.useRef)({
        validations: {},
        formats: {},
        parses: {},
        types: {},
        onChanges: {},
        onBlurs: {},
        arrayFields: []
    });
    // const eltsRef = useRef<{ [propName: string]: any }>({});
    var _a = (0, react_1.useReducer)(reducerUseForm_1.reducerUseForm, (0, reducerUseForm_1.getInitialUseFormState)()), state = _a[0], dispatch = _a[1];
    var reducerAction = (0, reducerUseForm_1.reducerActionUseForm)(dispatch);
    var errors = state.errors, formatValues = state.formatValues, parseValues = state.parseValues;
    function validation(values) {
        return __awaiter(this, void 0, void 0, function () {
            var validations, errors, validate;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validations = formInfoRef.current.validations;
                        errors = {};
                        return [4 /*yield*/, Object.keys(validations).reduce(function (acc, name) { return __awaiter(_this, void 0, void 0, function () {
                                var value, validField, valid;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            value = UseFormUtils_1.UseFormUtils.getValue(name, values);
                                            return [4 /*yield*/, UseFormUtils_1.UseFormUtils.validationField(state, name, value, formInfoRef.current, state.parseValues)];
                                        case 1:
                                            validField = _a.sent();
                                            errors[name] = validField;
                                            valid = !Boolean(validField);
                                            return [4 /*yield*/, acc];
                                        case 2: return [2 /*return*/, (_a.sent()) && valid];
                                    }
                                });
                            }); }, Promise.resolve(true))];
                    case 1:
                        validate = _a.sent();
                        reducerAction.updateErrors(errors);
                        return [2 /*return*/, validate];
                }
            });
        });
    }
    function handleSubmit(fn) {
        var _this = this;
        return function (e) { return __awaiter(_this, void 0, void 0, function () {
            var valuesParse, valid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (e) {
                            e.preventDefault();
                        }
                        valuesParse = state.parseValues;
                        return [4 /*yield*/, validation(valuesParse)];
                    case 1:
                        valid = _a.sent();
                        if (valid) {
                            fn(valuesParse);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
    }
    function updateValue(name, value) {
        reducerAction.updateValue(name, value, formInfoRef.current, state);
    }
    function updateValues(values) {
        reducerAction.updateValues(values, formInfoRef.current, state);
    }
    function initialValues(values) {
        reducerAction.initialValues(values, formInfoRef.current);
    }
    function handleChange(e) {
        return __awaiter(this, void 0, void 0, function () {
            var name, type, value, checked;
            return __generator(this, function (_a) {
                name = e.target.name;
                type = formInfoRef.current.types[name] === undefined ? e.target.type : formInfoRef.current.types[name];
                value = e.target.value;
                checked = e.target.checked;
                reducerAction.onChangeValue(state, name, type, value, checked, formInfoRef.current, option);
                return [2 /*return*/];
            });
        });
    }
    function handleBlur(e) {
        return __awaiter(this, void 0, void 0, function () {
            var value, name;
            return __generator(this, function (_a) {
                value = e.target.value;
                name = e.target.name;
                reducerAction.onBlurValue(state, name, value, formInfoRef.current, option);
                return [2 /*return*/];
            });
        });
    }
    function getTypeElt(type) {
        if (type !== undefined) {
            return type; //TODO quant on aura plus de type
        }
        return undefined;
    }
    var initializeRegisterOption = (0, react_1.useCallback)(function (name, option) {
        var _a, _b, _c, _d, _e, _f;
        var type = undefined;
        if (option) {
            if (option.validate && formInfoRef.current.validations[name] === undefined) {
                formInfoRef.current.validations = __assign(__assign({}, formInfoRef.current.validations), (_a = {}, _a[name] = option.validate, _a));
            }
            if (option.format && formInfoRef.current.formats[name] === undefined) {
                formInfoRef.current.formats = __assign(__assign({}, formInfoRef.current.formats), (_b = {}, _b[name] = option.format, _b));
            }
            if (option.parse && formInfoRef.current.parses[name] === undefined) {
                formInfoRef.current.parses = __assign(__assign({}, formInfoRef.current.parses), (_c = {}, _c[name] = option.parse, _c));
            }
            if (option.type) {
                type = option.type;
            }
            if (option.onChange) {
                formInfoRef.current.onChanges = __assign(__assign({}, formInfoRef.current.onChanges), (_d = {}, _d[name] = option.onChange, _d));
            }
            if (option.onBlur) {
                formInfoRef.current.onBlurs = __assign(__assign({}, formInfoRef.current.onBlurs), (_e = {}, _e[name] = option.onBlur, _e));
            }
        }
        if (formInfoRef.current.types[name] === undefined) {
            formInfoRef.current.types = __assign(__assign({}, formInfoRef.current.types), (_f = {}, _f[name] = type, _f));
        }
    }, []);
    var register = (0, react_1.useCallback)(function (name, option) {
        initializeRegisterOption(name, option);
        var type = formInfoRef.current.types[name];
        var error = errors[name];
        var typeElt = getTypeElt(type);
        var initialValue = (option && option.multiple) ? [] : "";
        var value = state.formatValues[name] ? formatValues[name] : initialValue;
        if (UseFormUtils_1.UseFormUtils.isArrayFieldByName(name)) {
            var _a = UseFormUtils_1.UseFormUtils.getArrayFieldInfo(name), objectName = _a.objectName, objectIndex = _a.objectIndex, propName = _a.propName;
            var val = state.formatValues[objectName][objectIndex][propName];
            value = val ? val : initialValue;
        }
        // const valueFinal = UseFormUtils.formatAndParseValue(name, value, formInfoRef.current);
        var valueFinal = value;
        return {
            name: name,
            type: typeElt,
            value: valueFinal,
            error: error,
            onChange: handleChange,
            onBlur: handleBlur,
            // ref: (elt: any) => eltsRef.current[name] = elt
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors, state.formatValues, state.parseValues]);
    var registerCheckbox = (0, react_1.useCallback)(function (name, value, option) {
        var _a;
        initializeRegisterOption(name, option);
        var valueState = (_a = state.formatValues[name]) !== null && _a !== void 0 ? _a : [];
        if (UseFormUtils_1.UseFormUtils.isArrayFieldByName(name)) {
            var _b = UseFormUtils_1.UseFormUtils.getArrayFieldInfo(name), objectName = _b.objectName, objectIndex = _b.objectIndex, propName = _b.propName;
            var val = state.formatValues[objectName][objectIndex][propName];
            valueState = val ? val : [];
        }
        var checked = valueState.includes(value);
        return {
            name: name,
            value: value,
            type: "checkbox",
            checked: checked,
            error: errors[name],
            onChange: handleChange,
            onBlur: handleBlur,
            // ref: (elt: any) => eltsRef.current[name] = elt
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors, state.formatValues, state.parseValues]);
    var registerBoolean = (0, react_1.useCallback)(function (name, option) {
        var _a;
        var optionFinal = option ? __assign(__assign({}, option), { type: "boolean" }) : { type: "boolean" };
        initializeRegisterOption(name, optionFinal);
        var valueState = (_a = state.formatValues[name]) !== null && _a !== void 0 ? _a : false;
        if (UseFormUtils_1.UseFormUtils.isArrayFieldByName(name)) {
            var _b = UseFormUtils_1.UseFormUtils.getArrayFieldInfo(name), objectName = _b.objectName, objectIndex = _b.objectIndex, propName = _b.propName;
            var val = state.formatValues[objectName][objectIndex][propName];
            valueState = val ? val : false;
        }
        return {
            name: name,
            value: valueState,
            type: "checkbox",
            error: errors[name],
            onChange: handleChange,
            onBlur: handleBlur,
            checked: valueState
            // ref: (elt: any) => eltsRef.current[name] = elt
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors, state.formatValues, state.parseValues]);
    //
    var registerRadio = (0, react_1.useCallback)(function (name, value, option) {
        initializeRegisterOption(name, option);
        var valueState = formatValues[name] ? formatValues[name] : [];
        if (UseFormUtils_1.UseFormUtils.isArrayFieldByName(name)) {
            var _a = UseFormUtils_1.UseFormUtils.getArrayFieldInfo(name), objectName = _a.objectName, objectIndex = _a.objectIndex, propName = _a.propName;
            var val = formatValues[objectName][objectIndex][propName];
            valueState = val ? val : "";
        }
        var checked = valueState === value;
        return {
            name: name,
            value: value,
            type: "radio",
            checked: checked,
            error: errors[name],
            onChange: handleChange,
            onBlur: handleBlur,
            // ref: (elt: any) => eltsRef.current[name] = elt
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors, formatValues, parseValues]);
    var registerDate = (0, react_1.useCallback)(function (name, option) {
        initializeRegisterOption(name, option);
        var initialValue = (option && option.multiple) ? [] : null;
        var value = state.formatValues[name] ? formatValues[name] : initialValue;
        if (UseFormUtils_1.UseFormUtils.isArrayFieldByName(name)) {
            var _a = UseFormUtils_1.UseFormUtils.getArrayFieldInfo(name), objectName = _a.objectName, objectIndex = _a.objectIndex, propName = _a.propName;
            var val = state.formatValues[objectName][objectIndex][propName];
            value = val ? val : initialValue;
        }
        return {
            name: name,
            value: value,
            onChange: handleChange,
            onBlur: handleBlur,
            error: errors[name]
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors, state.formatValues]);
    function arrayFields(name) {
        formInfoRef.current.arrayFields.push({ name: name });
        return {
            add: function (item) {
                reducerAction.addArrayField(name, item, formInfoRef.current);
            },
            move: function (oldIndex, newIndex) {
                //TODO
            },
            remove: function (index) {
                reducerAction.removeArrayField(name, index, formInfoRef.current);
            },
            fields: function () {
                var fields = formatValues[name];
                if (!fields) {
                    return [];
                }
                return formatValues[name].map(function (_, i) { return ({
                    index: i,
                    name: "".concat(name, "[").concat(i, "]")
                }); });
            }
        };
    }
    return {
        register: register,
        registerCheckbox: registerCheckbox,
        registerRadio: registerRadio,
        registerBoolean: registerBoolean,
        registerDate: registerDate,
        handleSubmit: handleSubmit,
        values: parseValues,
        errors: errors,
        arrayFields: arrayFields,
        updateValue: updateValue,
        updateValues: updateValues,
        initialValues: initialValues,
        // control: { state }
    };
}
exports.useForm = useForm;
