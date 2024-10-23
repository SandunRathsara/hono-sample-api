import {TAX_FORMULA, TAX_RELIEF_PER_YEAR} from "../config";

export function calculatePayeeTaxUtil(salaryPerMonth: number) {
    let salaryPerYear = salaryPerMonth * 12;
    salaryPerYear -= TAX_RELIEF_PER_YEAR;
    let totalTax = 0;
    const TaxIterator = TAX_FORMULA.entries();
    while (salaryPerYear > 0) {
        const taxBracket = TaxIterator.next().value
        if (taxBracket[0] === 6) {
            totalTax += salaryPerYear * taxBracket[1];
            salaryPerYear = 0;
        } else {
            totalTax += 500000 * taxBracket[1];
            salaryPerYear -= 500000;
        }
    }

    return totalTax / 12;
}
