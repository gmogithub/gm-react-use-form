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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSUtils = void 0;
var StringUtils_1 = require("./StringUtils");
var JSUtils = /** @class */ (function () {
    function JSUtils() {
    }
    JSUtils.UID = function (number) {
        if (number === void 0) { number = 10; }
        return Math.floor(Math.random() * Math.pow(10, number));
    };
    JSUtils.UUID = function () {
        var s = [];
        var itoh = '0123456789ABCDEF';
        for (var i = 0; i < 36; i++) {
            s[i] = Math.floor(Math.random() * 0x10);
        }
        s[14] = 4;
        s[19] = (s[19] & 0x3) | 0x8;
        for (var j = 0; j < 36; j++) {
            s[j] = itoh[s[j]];
        }
        s[8] = s[13] = s[18] = s[23] = '-';
        return s.join('');
    };
    JSUtils.isArray = function (value) {
        return value instanceof Array;
    };
    JSUtils.isString = function (value) {
        return typeof value === 'string';
    };
    JSUtils.isBoolean = function (value) {
        return typeof value === 'boolean';
    };
    JSUtils.isObject = function (value) {
        return typeof value === 'object';
    };
    JSUtils.isFunction = function (value) {
        return typeof value === 'function';
    };
    JSUtils.isNumber = function (value) {
        return typeof value === 'number' && isFinite(value);
    };
    JSUtils.parseObject = function (obj, values) {
        return JSUtils._parseObjectProperties(obj, values);
    };
    JSUtils._parseObjectProperties = function (obj, values) {
        return Object.entries(obj).reduce(function (object, _a) {
            var _b;
            var propertyName = _a[0], value = _a[1];
            if (JSUtils.isString(value)) {
                value = StringUtils_1.StringUtils.parse(value, values);
            }
            else if (JSUtils.isObject(value)) {
                value = JSUtils._parseObjectProperties(value, values);
            }
            return __assign(__assign({}, object), (_b = {}, _b[propertyName] = value, _b));
        }, {});
    };
    JSUtils.cloneDeep = function (value) {
        if (value === null || value === undefined) {
            return value;
        }
        if (JSUtils.isArray(value)) {
            return JSUtils._cloneArray(value);
        }
        else if (JSUtils.isObject(value)) {
            if (value instanceof Date) {
                return new Date(value);
            }
            return JSUtils._cloneObject(value);
        }
        else {
            return JSUtils._clone(value);
        }
    };
    JSUtils._cloneObject = function (obj) {
        return Object.entries(obj).reduce(function (acc, _a) {
            var property = _a[0], value = _a[1];
            acc[property] = JSUtils.cloneDeep(value);
            return acc;
        }, {});
    };
    JSUtils._cloneArray = function (array) {
        return array.map(function (item) { return JSUtils.cloneDeep(item); });
    };
    JSUtils._clone = function (value) {
        return value;
    };
    JSUtils.getValueFromObject = function (obj, path, valueDefault) {
        if (valueDefault === void 0) { valueDefault = null; }
        var properties = path.split('.');
        var valueTmp = obj;
        var value;
        var prop;
        var valid = true;
        for (var i = 0, l = properties.length; i < l; i++) {
            prop = properties[i];
            valueTmp = valueTmp[prop];
            if (i !== l - 1) {
                if (valueTmp === undefined || valueTmp === null) {
                    valid = false;
                    break;
                }
            }
            else {
                if (valueTmp === undefined) {
                    valid = false;
                    break;
                }
            }
        }
        if (!valid) {
            value = valueDefault;
        }
        else {
            value = valueTmp;
        }
        return value;
    };
    JSUtils.isObjectEmpty = function (object) {
        return Object.entries(object).length === 0 && object.constructor === Object;
    };
    JSUtils.isNullOrUndefined = function (variable) {
        return variable === null || variable === undefined;
    };
    JSUtils.copyToClipboard = function (data) {
        navigator.clipboard.writeText(data);
    };
    JSUtils.exportStringAsFile = function (fileName, dataType, data) {
        if (fileName === undefined || fileName === null || fileName.length === 0) {
            throw new Error("Exported file must have a name");
        }
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style.display = 'none';
        var blob = new Blob([data], { type: dataType });
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        setTimeout(function () {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }, 0);
    };
    JSUtils.objectToMapKeyIsNumber = function (toMap) {
        var objectMap = new Map(Object.entries(toMap));
        var newMap = new Map();
        objectMap.forEach(function (value, key) { return newMap.set(parseInt(key), value); });
        return newMap;
    };
    JSUtils.objectToMapKeyIsString = function (toMap) {
        return new Map(Object.entries(toMap));
    };
    JSUtils.mapToObject = function (toObject) {
        return Object.fromEntries(toObject);
    };
    return JSUtils;
}());
exports.JSUtils = JSUtils;
