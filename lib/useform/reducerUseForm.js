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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducerActionUseForm = exports.getInitialUseFormState = exports.reducerUseForm = void 0;
var UseFormUtils_1 = require("./UseFormUtils");
var UseFormReducerActionType;
(function (UseFormReducerActionType) {
    UseFormReducerActionType[UseFormReducerActionType["ONCHANGE_VALUE"] = 0] = "ONCHANGE_VALUE";
    UseFormReducerActionType[UseFormReducerActionType["ONBLUR_VALUE"] = 1] = "ONBLUR_VALUE";
    UseFormReducerActionType[UseFormReducerActionType["UPDATE_ERRORS"] = 2] = "UPDATE_ERRORS";
    UseFormReducerActionType[UseFormReducerActionType["ADD_ARRAY_FIELD"] = 3] = "ADD_ARRAY_FIELD";
    UseFormReducerActionType[UseFormReducerActionType["REMOVE_ARRAY_FIELD"] = 4] = "REMOVE_ARRAY_FIELD";
    UseFormReducerActionType[UseFormReducerActionType["UPDATE_VALUE"] = 5] = "UPDATE_VALUE";
    UseFormReducerActionType[UseFormReducerActionType["UPDATE_VALUES"] = 6] = "UPDATE_VALUES";
    UseFormReducerActionType[UseFormReducerActionType["INITIAL_VALUES"] = 7] = "INITIAL_VALUES";
    UseFormReducerActionType[UseFormReducerActionType["AUTO_UPDATE_ERRORS"] = 8] = "AUTO_UPDATE_ERRORS";
})(UseFormReducerActionType || (UseFormReducerActionType = {}));
var Actions = /** @class */ (function () {
    function Actions() {
    }
    Actions.onChangeValue = function (state, name, value, checked, type, formInfo, option) {
        return __awaiter(this, void 0, void 0, function () {
            var formatValuePrev, formatValue, parseValue, val, index, result, newFormatValues, newParseValues, _a, objectName, objectIndex, propName, objFormats, objFormat, objParses, objParse, prevErrors, newErrors, nextError, prevError;
            var _b, _c, _d, _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        formatValuePrev = UseFormUtils_1.UseFormUtils.getValue(name, state.formatValues);
                        if (type === "checkbox") {
                            val = formatValuePrev ? formatValuePrev : [];
                            if (checked) {
                                if (!val.includes(value)) {
                                    val.push(value);
                                }
                            }
                            else {
                                index = val.indexOf(value);
                                if (index !== -1) {
                                    val.splice(index, 1);
                                }
                            }
                            formatValue = __spreadArray([], val, true);
                            parseValue = __spreadArray([], val, true);
                        }
                        else if (type === "radio") {
                            formatValue = value;
                            parseValue = value;
                        }
                        else if (type === "boolean") {
                            formatValue = checked;
                            parseValue = checked;
                        }
                        else {
                            result = UseFormUtils_1.UseFormUtils.formatAndParseValue(name, value, formInfo);
                            formatValue = result.formatValue;
                            parseValue = result.parseValue;
                        }
                        if (UseFormUtils_1.UseFormUtils.isArrayFieldByName(name)) {
                            _a = UseFormUtils_1.UseFormUtils.getArrayFieldInfo(name), objectName = _a.objectName, objectIndex = _a.objectIndex, propName = _a.propName;
                            objFormats = state.formatValues[objectName];
                            objFormat = __assign(__assign({}, objFormats[objectIndex]), (_b = {}, _b[propName] = formatValue, _b));
                            objFormats.splice(objectIndex, 1, objFormat);
                            newFormatValues = __assign(__assign({}, state.formatValues), (_c = {}, _c[objectName] = __spreadArray([], objFormats, true), _c));
                            objParses = state.parseValues[objectName];
                            objParse = __assign(__assign({}, objParses[objectIndex]), (_d = {}, _d[propName] = formatValue, _d));
                            objParses.splice(objectIndex, 1, objParse);
                            newParseValues = __assign(__assign({}, state.parseValues), (_e = {}, _e[objectName] = __spreadArray([], objParses, true), _e));
                        }
                        else {
                            newFormatValues = __assign(__assign({}, state.formatValues), (_f = {}, _f[name] = formatValue, _f));
                            newParseValues = __assign(__assign({}, state.parseValues), (_g = {}, _g[name] = parseValue, _g));
                        }
                        prevErrors = state.errors;
                        newErrors = {};
                        if (!(option && option.validateOnChange)) return [3 /*break*/, 2];
                        return [4 /*yield*/, UseFormUtils_1.UseFormUtils.validationField(state, name, parseValue, formInfo, newParseValues)];
                    case 1:
                        nextError = _j.sent();
                        prevError = prevErrors[name];
                        if (nextError !== prevError) {
                            newErrors = (_h = {},
                                _h[name] = nextError,
                                _h);
                        }
                        _j.label = 2;
                    case 2: return [2 /*return*/, __assign(__assign({}, state), { parseValues: newParseValues, formatValues: newFormatValues, errors: __assign(__assign({}, prevErrors), newErrors) })];
                }
            });
        });
    };
    Actions.onBlurValue = function (state, name, value, formInfo, option) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                result = UseFormUtils_1.UseFormUtils.formatAndParseValue(name, value, formInfo);
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
                    return [2 /*return*/, Actions.autoUpdateErrors(state, name, value, formInfo)];
                }
                return [2 /*return*/, state];
            });
        });
    };
    Actions.addArrayField = function (state, name, item, formInfo) {
        var _a, _b;
        var itemFormat = Object.entries(item).reduce(function (acc, _a) {
            var _b;
            var propName = _a[0], value = _a[1];
            return __assign(__assign({}, acc), (_b = {}, _b[propName] = UseFormUtils_1.UseFormUtils.formatAndParseValue(name, value, formInfo).formatValue, _b));
        }, {});
        var itemParse = Object.entries(item).reduce(function (acc, _a) {
            var _b;
            var propName = _a[0], value = _a[1];
            return __assign(__assign({}, acc), (_b = {}, _b[propName] = UseFormUtils_1.UseFormUtils.formatAndParseValue(name, value, formInfo).parseValue, _b));
        }, {});
        var newParseValues = state.parseValues[name] ? __spreadArray(__spreadArray([], state.parseValues[name], true), [itemParse], false) : [itemParse];
        var newFormatValues = state.formatValues[name] ? __spreadArray(__spreadArray([], state.formatValues[name], true), [itemFormat], false) : [itemFormat];
        return __assign(__assign({}, state), { parseValues: __assign(__assign({}, state.parseValues), (_a = {}, _a[name] = newParseValues, _a)), formatValues: __assign(__assign({}, state.formatValues), (_b = {}, _b[name] = newFormatValues, _b)) });
    };
    Actions.removeArrayField = function (state, name, index, formInfo) {
        var _a, _b;
        var parseValues = state.parseValues[name];
        var formatValues = state.formatValues[name];
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
            return __assign(__assign({}, state), { errors: {}, parseValues: __assign(__assign({}, state.parseValues), (_a = {}, _a[name] = parseValues.filter(function (_, i) { return i !== index; }), _a)), formatValues: __assign(__assign({}, state.formatValues), (_b = {}, _b[name] = parseValues.filter(function (_, i) { return i !== index; }), _b)) });
        }
        return state;
    };
    Actions.getValues = function (values, formInfo) {
        var results = UseFormUtils_1.UseFormUtils.parseAndFormatValues(values, formInfo);
        return Object.keys(results).reduce(function (acc, _) {
            acc.formatValues = __assign(__assign({}, acc.formatValues), results.formatValues);
            acc.parseValues = __assign(__assign({}, acc.parseValues), results.parseValues);
            return acc;
        }, { formatValues: {}, parseValues: {} });
    };
    Actions.initialValues = function (state, values, formInfo) {
        var _a = this.getValues(values, formInfo), formatValues = _a.formatValues, parseValues = _a.parseValues;
        // console.log(formatValues, parseValues);
        return __assign(__assign({}, state), { parseValues: parseValues, formatValues: formatValues });
    };
    Actions.updateValue = function (state, name, value, formInfo) {
        var _a, _b, _c, _d;
        var result = UseFormUtils_1.UseFormUtils.parseAndFormatValue(name, value, formInfo);
        if (UseFormUtils_1.UseFormUtils.isArrayFieldByName(name)) {
            var _e = UseFormUtils_1.UseFormUtils.getArrayFieldInfo(name), objectName = _e.objectName, objectIndex_1 = _e.objectIndex, propName_1 = _e.propName;
            var prevFormatValueObj = state.formatValues[objectName];
            var newFormatValueObj = void 0;
            /*if (!prevFormatValueObj || prevFormatValueObj.length === 0) {
              newFormatValueObj = [{ [propName]: result.formatValue }];
            } else if ((prevFormatValueObj.length - 1) < objectIndex) {
              newFormatValueObj = [...prevFormatValueObj, { [propName]: result.formatValue }];
            } else*/
            if (prevFormatValueObj && prevFormatValueObj[objectIndex_1]) {
                newFormatValueObj = prevFormatValueObj.reduce(function (acc, valueObj, i) {
                    if (i === objectIndex_1) {
                        acc[i][propName_1] = result.formatValue;
                    }
                    return acc;
                }, prevFormatValueObj);
            }
            var prevParseValueObj = state.parseValues[objectName];
            var newParseValueObj = void 0;
            /*if (!prevParseValueObj || prevParseValueObj.length === 0) {
              newParseValueObj = [{ [propName]: result.parseValue }];
            } else if (prevParseValueObj.length < objectIndex) {
              newParseValueObj = [...prevParseValueObj, { [propName]: result.parseValue }];
            } else */
            if (prevParseValueObj && prevParseValueObj[objectIndex_1]) {
                newParseValueObj = prevParseValueObj.reduce(function (acc, valueObj, i) {
                    if (i === objectIndex_1) {
                        acc[i][propName_1] = result.parseValue;
                    }
                    return acc;
                }, prevParseValueObj);
            }
            if (newFormatValueObj && newParseValueObj) {
                return __assign(__assign({}, state), { parseValues: __assign(__assign({}, state.parseValues), (_a = {}, _a[objectName] = newParseValueObj, _a)), formatValues: __assign(__assign({}, state.formatValues), (_b = {}, _b[objectName] = newFormatValueObj, _b)) });
            }
        }
        else {
            return __assign(__assign({}, state), { parseValues: __assign(__assign({}, state.parseValues), (_c = {}, _c[name] = result.parseValue, _c)), formatValues: __assign(__assign({}, state.formatValues), (_d = {}, _d[name] = result.formatValue, _d)) });
        }
        return state;
    };
    Actions.updateValues = function (state, values, formInfo) {
        var _a = this.getValues(values, formInfo), formatValues = _a.formatValues, parseValues = _a.parseValues;
        return __assign(__assign({}, state), { parseValues: __assign(__assign({}, state.parseValues), parseValues), formatValues: __assign(__assign({}, state.formatValues), formatValues) });
    };
    Actions.autoUpdateErrors = function (state, name, value, formInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var result, prevErrors, newErrors, nextError, prevError;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = UseFormUtils_1.UseFormUtils.formatAndParseValue(name, value, formInfo);
                        prevErrors = state.errors;
                        newErrors = {};
                        return [4 /*yield*/, UseFormUtils_1.UseFormUtils.validationField(state, name, result.parseValue, formInfo, state)];
                    case 1:
                        nextError = _b.sent();
                        prevError = prevErrors[name];
                        if (nextError !== prevError) {
                            newErrors = (_a = {},
                                _a[name] = nextError,
                                _a);
                        }
                        return [2 /*return*/, __assign(__assign({}, state), { errors: __assign(__assign({}, prevErrors), newErrors) })];
                }
            });
        });
    };
    Actions.autoUpdatesErrors = function (state, values, formInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var prevErrors, newErrors;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prevErrors = state.errors;
                        return [4 /*yield*/, Object.entries(values).reduce(function (acc, _a) {
                                var name = _a[0], value = _a[1];
                                return __awaiter(_this, void 0, void 0, function () {
                                    var result, nextError, prevError, accAwait;
                                    var _b;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0:
                                                result = UseFormUtils_1.UseFormUtils.formatAndParseValue(name, value, formInfo);
                                                return [4 /*yield*/, UseFormUtils_1.UseFormUtils.validationField(state, name, result.parseValue, formInfo, state)];
                                            case 1:
                                                nextError = _c.sent();
                                                prevError = prevErrors[name];
                                                return [4 /*yield*/, acc];
                                            case 2:
                                                accAwait = _c.sent();
                                                if (nextError !== prevError) {
                                                    accAwait = __assign(__assign({}, accAwait), (_b = {}, _b[name] = nextError, _b));
                                                }
                                                return [2 /*return*/, accAwait];
                                        }
                                    });
                                });
                            }, {})];
                    case 1:
                        newErrors = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, state), { errors: __assign(__assign({}, prevErrors), newErrors) })];
                }
            });
        });
    };
    return Actions;
}());
function reducerUseForm(state, _a) {
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case UseFormReducerActionType.ONCHANGE_VALUE:
            return __assign(__assign({}, state), payload);
        case UseFormReducerActionType.ONBLUR_VALUE:
            return __assign(__assign({}, state), payload);
        case UseFormReducerActionType.UPDATE_ERRORS:
            return __assign(__assign({}, state), { errors: __assign(__assign({}, state.errors), payload) });
        case UseFormReducerActionType.ADD_ARRAY_FIELD:
            return Actions.addArrayField(state, payload.name, payload.item, payload.formInfo);
        case UseFormReducerActionType.REMOVE_ARRAY_FIELD:
            return Actions.removeArrayField(state, payload.name, payload.index, payload.formInfo);
        case UseFormReducerActionType.UPDATE_VALUE:
            // return { Actions.updateValue(state, payload.name, payload.value, payload.formInfo) };
            return __assign(__assign({}, state), payload);
        case UseFormReducerActionType.UPDATE_VALUES:
            return __assign(__assign({}, state), payload);
        // return Actions.updateValues(state, payload.values, payload.formInfo);
        case UseFormReducerActionType.INITIAL_VALUES:
            return Actions.initialValues(state, payload.values, payload.formInfo);
        // case UseFormReducerActionType.AUTO_UPDATE_ERRORS:
        //   return { ...state, ...payload };
    }
    return state;
}
exports.reducerUseForm = reducerUseForm;
function getInitialUseFormState() {
    return {
        errors: {},
        formatValues: {},
        parseValues: {}
    };
}
exports.getInitialUseFormState = getInitialUseFormState;
var reducerActionUseForm = function (dispatch) { return ({
    onChangeValue: function (prevState, name, type, value, checked, formInfoRef, option) {
        Actions.onChangeValue(prevState, name, value, checked, type, formInfoRef, option).then(function (state) {
            dispatch({
                type: UseFormReducerActionType.ONCHANGE_VALUE,
                payload: state
            });
            return state;
        }).then(function (state) {
            if (formInfoRef.onChanges[name]) {
                var parseValues = state.parseValues, formatValues = state.formatValues;
                var valueFinal = parseValues[name] ? parseValues[name] : formatValues[name];
                formInfoRef.onChanges[name](valueFinal);
            }
        });
    },
    onBlurValue: function (prevState, name, value, formInfoRef, option) {
        Actions.onBlurValue(prevState, name, value, formInfoRef, option).then(function (state) {
            dispatch({
                type: UseFormReducerActionType.ONBLUR_VALUE,
                payload: state
            });
        });
    },
    updateErrors: function (errors) {
        dispatch({
            type: UseFormReducerActionType.UPDATE_ERRORS,
            payload: errors
        });
    },
    addArrayField: function (name, item, formInfo) {
        dispatch({
            type: UseFormReducerActionType.ADD_ARRAY_FIELD,
            payload: { item: item, name: name, formInfo: formInfo }
        });
    },
    removeArrayField: function (name, index, formInfo) {
        dispatch({
            type: UseFormReducerActionType.REMOVE_ARRAY_FIELD,
            payload: { index: index, name: name, formInfo: formInfo }
        });
    },
    updateValue: function (name, value, formInfo, state) {
        var newState = Actions.updateValue(state, name, value, formInfo);
        Actions.autoUpdateErrors(newState, name, value, formInfo).then(function (stateNewWithErrors) {
            dispatch({
                type: UseFormReducerActionType.UPDATE_VALUE,
                payload: stateNewWithErrors
            });
        });
    },
    updateValues: function (values, formInfo, state) {
        var newState = Actions.updateValues(state, values, formInfo);
        Actions.autoUpdatesErrors(newState, values, formInfo).then(function (newStateWithErrors) {
            dispatch({
                type: UseFormReducerActionType.UPDATE_VALUES,
                payload: newStateWithErrors
            });
        });
    },
    initialValues: function (values, formInfo) {
        dispatch({
            type: UseFormReducerActionType.INITIAL_VALUES,
            payload: { values: values, formInfo: formInfo }
        });
    }
}); };
exports.reducerActionUseForm = reducerActionUseForm;
