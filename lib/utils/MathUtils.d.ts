export declare class MathUtils {
    static VAT: number;
    static computedTTC(priceHT: number, vat?: number): number;
    static computedVAT(priceHT: number, vat?: number): number;
    static computedHT(priceTTC: number, vat?: number): number;
    static convertFloat(value: number, precision?: number): number;
    static convertStringAmountToIntAmountMultiplyBy100(value: string): number;
    static convertFloatAmountToIntAmountMultiplyBy100(value: number): number;
    static convertIntAmountToFloatAmountDivideBy100(value: number): number;
    static round(value: number, precision?: number): number;
}
