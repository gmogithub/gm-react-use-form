"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = void 0;
var StringUtils = /** @class */ (function () {
    function StringUtils() {
    }
    StringUtils.parse = function (value, values) {
        try {
            value = value.replace(/\$\[\[(.*?)\]\]/g, function (s, n) {
                return values[n];
            });
        }
        catch (e) {
            console.error(e.message);
        }
        return value;
    };
    StringUtils.isEmpty = function (str) {
        return !str;
    };
    StringUtils.capitalize = function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    StringUtils.removeAccents = function (str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        //   const accents =
        //     "ÀÁÂÃÄÅĄàáâãäåąßÒÓÔÕÕÖØÓòóôõöøóÈÉÊËĘèéêëęðÇĆçćÐÌÍÎÏìíîïÙÚÛÜùúûüÑŃñńŠŚšśŸÿýŽŻŹžżź";
        //   const accentsOut =
        //     "AAAAAAAaaaaaaaBOOOOOOOOoooooooEEEEEeeeeeeCCccDIIIIiiiiUUUUuuuuNNnnSSssYyyZZZzzz";
        //   return string
        //     .split("")
        //     .map((letter, index) => {
        //       const accentIndex = accents.indexOf(letter);
        //       return accentIndex !== -1 ? accentsOut[accentIndex] : letter;
        //     })
        //     .join("");
    };
    return StringUtils;
}());
exports.StringUtils = StringUtils;
