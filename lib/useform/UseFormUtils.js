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
exports.UseFormUtils = void 0;
var UseFormUtils = /** @class */ (function () {
    function UseFormUtils() {
    }
    // public static KEY_ARRAY_FIELDS = "____array_fields____";
    UseFormUtils.getArrayFieldInfo = function (name) {
        var nameForArrayField = name;
        // const nameSplit = nameForArrayField.split(".");
        // const [objectsName, propName] = nameSplit;
        // const objectsNameSplit = objectsName.split("[");
        // const [objectName, objectIndex] = objectsNameSplit;
        var regRex = new RegExp('([a-z_]+)\\[([0-9]+)].([a-zA-Z0-9_]+)', "gm");
        var result = regRex.exec(nameForArrayField);
        if (!result) {
            throw new Error("The name field array is not valid");
        }
        var objectName = result[1];
        var objectIndex = result[2];
        var propName = result[3];
        return { objectIndex: parseInt(objectIndex, 10), objectName: objectName, propName: propName };
    };
    UseFormUtils.formatAndParseValue = function (name, value, formInfoRef) {
        var fnFormat = formInfoRef.formats[name];
        var fnParse = formInfoRef.parses[name];
        var resultFormat = value;
        var resultParse = value;
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
    };
    UseFormUtils.parseAndFormatValue = function (name, value, formInfoRef) {
        var fnFormat = formInfoRef.formats[name];
        // const fnParse = formInfoRef.parses[name];
        var resultFormat = value;
        var resultParse = value;
        if (fnFormat) {
            resultFormat = fnFormat(resultParse);
        }
        return { formatValue: resultFormat, parseValue: resultParse };
    };
    UseFormUtils.parseAndFormatValues = function (values, formInfo) {
        return Object.entries(values).reduce(function (acc, _a) {
            var _b, _c, _d, _e;
            var propName = _a[0], value = _a[1];
            if (UseFormUtils.isArrayFieldByPropName(propName, formInfo)) {
                var result = value.map(function (val) { return UseFormUtils.parseAndFormatValues(val, formInfo); });
                acc.formatValues = __assign(__assign({}, acc.formatValues), (_b = {}, _b[propName] = result.map(function (_a) {
                    var formatValues = _a.formatValues;
                    return formatValues;
                }), _b));
                acc.parseValues = __assign(__assign({}, acc.parseValues), (_c = {}, _c[propName] = result.map(function (_a) {
                    var parseValues = _a.parseValues;
                    return parseValues;
                }), _c));
            }
            else {
                var result = UseFormUtils.parseAndFormatValue(propName, value, formInfo);
                acc.formatValues = __assign(__assign({}, acc.formatValues), (_d = {}, _d[propName] = result.formatValue, _d));
                acc.parseValues = __assign(__assign({}, acc.parseValues), (_e = {}, _e[propName] = result.parseValue, _e));
            }
            return acc;
        }, { parseValues: {}, formatValues: {} });
    };
    UseFormUtils.formatAndParseValues = function (values, formInfo) {
        return Object.entries(values).reduce(function (acc, _a) {
            var _b, _c, _d, _e;
            var propName = _a[0], value = _a[1];
            if (UseFormUtils.isArrayFieldByPropName(propName, formInfo)) {
                var result = value.map(function (val) { return UseFormUtils.formatAndParseValues(val, formInfo); });
                acc.formatValues = __assign(__assign({}, acc.formatValues), (_b = {}, _b[propName] = result.map(function (_a) {
                    var formatValues = _a.formatValues;
                    return formatValues;
                }), _b));
                acc.parseValues = __assign(__assign({}, acc.parseValues), (_c = {}, _c[propName] = result.map(function (_a) {
                    var parseValues = _a.parseValues;
                    return parseValues;
                }), _c));
            }
            else {
                var result = UseFormUtils.formatAndParseValue(propName, value, formInfo);
                acc.formatValues = __assign(__assign({}, acc.formatValues), (_d = {}, _d[propName] = result.formatValue, _d));
                acc.parseValues = __assign(__assign({}, acc.parseValues), (_e = {}, _e[propName] = result.parseValue, _e));
            }
            return acc;
        }, { parseValues: {}, formatValues: {} });
    };
    UseFormUtils.getValue = function (name, valuesState) {
        if (this.isArrayFieldByName(name)) {
            var _a = UseFormUtils.getArrayFieldInfo(name), objectName = _a.objectName, objectIndex = _a.objectIndex, propName = _a.propName;
            var objs = valuesState[objectName];
            return objs[objectIndex] ? objs[objectIndex][propName] : undefined;
        }
        else {
            return valuesState[name];
        }
    };
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
    UseFormUtils.validationField = function (state, name, value, formInfo, newValues) {
        return __awaiter(this, void 0, void 0, function () {
            var fns;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fns = formInfo.validations[name] ? formInfo.validations[name] : [];
                        return [4 /*yield*/, fns.reduce((function (acc, fn) { return __awaiter(_this, void 0, void 0, function () {
                                var res, _a, message, valid, _b, resAcc;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            res = fn(value, newValues ? newValues : state.parseValues);
                                            if (!(res instanceof Promise)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, res];
                                        case 1:
                                            _b = (_c.sent());
                                            return [3 /*break*/, 3];
                                        case 2:
                                            _b = res;
                                            _c.label = 3;
                                        case 3:
                                            _a = _b, message = _a.message, valid = _a.valid;
                                            return [4 /*yield*/, acc];
                                        case 4:
                                            resAcc = _c.sent();
                                            if (!valid && resAcc === undefined) {
                                                acc = Promise.resolve(message);
                                            }
                                            return [2 /*return*/, acc];
                                    }
                                });
                            }); }), Promise.resolve(undefined))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UseFormUtils.isArrayFieldByName = function (name) {
        var regRex = new RegExp('([a-z_]+)\\[([0-9]+)].([a-zA-Z0-9_]+)', "gm");
        return regRex.test(name);
    };
    UseFormUtils.isArrayFieldByPropName = function (propName, formInfo) {
        return formInfo.arrayFields.map(function (_a) {
            var name = _a.name;
            return name;
        }).includes(propName);
    };
    return UseFormUtils;
}());
exports.UseFormUtils = UseFormUtils;
