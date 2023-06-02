"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathUtils = void 0;
var MathUtils = exports.MathUtils = /** @class */ (function () {
    function MathUtils() {
    }
    MathUtils.computedTTC = function (priceHT, vat) {
        if (vat === void 0) { vat = MathUtils.VAT; }
        return Math.floor(priceHT * (1 + (vat / 100)));
    };
    MathUtils.computedVAT = function (priceHT, vat) {
        if (vat === void 0) { vat = MathUtils.VAT; }
        return Math.floor(priceHT * (vat / 100));
    };
    MathUtils.computedHT = function (priceTTC, vat) {
        if (vat === void 0) { vat = MathUtils.VAT; }
        return Math.floor(priceTTC / (1 + (vat / 100)));
    };
    MathUtils.convertFloat = function (value, precision) {
        if (precision === void 0) { precision = 1; }
        var res = (value + "").trim();
        if (res.endsWith(".")) {
            return value;
        }
        return Number.parseFloat(value.toFixed(precision));
    };
    MathUtils.convertStringAmountToIntAmountMultiplyBy100 = function (value) {
        return MathUtils.convertFloatAmountToIntAmountMultiplyBy100(parseFloat(value));
    };
    MathUtils.convertFloatAmountToIntAmountMultiplyBy100 = function (value) {
        if (Number.isNaN(value))
            return 0;
        return Math.round(value * 100);
    };
    MathUtils.convertIntAmountToFloatAmountDivideBy100 = function (value) {
        if (Number.isNaN(value))
            return 0;
        return MathUtils.round(value / 100, 2);
    };
    MathUtils.round = function (value, precision) {
        if (precision === void 0) { precision = 1; }
        if (Number.isNaN(value)) {
            console.error("Attention la valeur n'est pas un nombre");
            value = 0;
        }
        return Number.parseFloat(value.toFixed(precision));
    };
    MathUtils.VAT = 20;
    return MathUtils;
}());
