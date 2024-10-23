import {z} from "zod";
import {INME_CARE, STAMP_DUTY} from "../../config";

export const SalarySchema = z.object({
    basic: z.number(),
    travel: z.number(),
    rent: z.number().optional(),
    business: z.number().optional(),
    fuel: z.number().optional()
})

export type SalaryDto = z.infer<typeof SalarySchema>

export class SalaryResponseDto {
    grossSalary: number;
    payeeTaxSalary: number;
    payeeTax: number;
    withHoldingTax: number;
    totalTax: number;
    epfByEmployee: number;
    totalDeductions: number;
    netSalary: number;
    epfByEmployer: number;
    etfByEmployer: number;
    totalCostToEmployer: number;
    totalCostToEmployerPerHour: number;
    fixedDeductions: string = `Stamp Duty: ${STAMP_DUTY} | InME Care Recovery: ${INME_CARE}`

    constructor({
                    grossSalary,
                    payeeTaxSalary,
                    payeeTax,
                    withHoldingTax,
                    totalTax,
                    epfByEmployee,
                    totalDeductions,
                    netSalary,
                    epfByEmployer,
                    etfByEmployer,
                    totalCostToEmployer,
                    totalCostToEmployerPerHour
                }: {
                    grossSalary: number,
                    payeeTaxSalary: number,
                    payeeTax: number,
                    withHoldingTax: number,
                    totalTax: number,
                    epfByEmployee: number,
                    totalDeductions: number,
                    netSalary: number,
                    epfByEmployer: number,
                    etfByEmployer: number,
                    totalCostToEmployer: number,
                    totalCostToEmployerPerHour: number
                }
    ) {
        this.grossSalary = grossSalary;
        this.payeeTaxSalary = payeeTaxSalary;
        this.payeeTax = payeeTax;
        this.withHoldingTax = withHoldingTax;
        this.totalTax = totalTax;
        this.epfByEmployee = epfByEmployee;
        this.totalDeductions = totalDeductions;
        this.netSalary = netSalary;
        this.epfByEmployer = epfByEmployer;
        this.etfByEmployer = etfByEmployer;
        this.totalCostToEmployer = totalCostToEmployer;
        this.totalCostToEmployerPerHour = totalCostToEmployerPerHour;
    }
}