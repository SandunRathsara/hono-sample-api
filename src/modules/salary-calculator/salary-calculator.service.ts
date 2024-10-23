import {SalaryDto, SalaryResponseDto} from "./salary-calculator.schema";
import {
    EPF_COM_PERCENT,
    EPF_EMP_PERCENT,
    ETF_COM_PERCENT,
    INME_CARE,
    STAMP_DUTY,
    WITH_HOLDING_TAX_PERCENT
} from "../../config";
import {calculatePayeeTaxUtil} from "../../util/calculate-payee-tax.util";
import Logger from "../../util/logger.util";
import {HTTPException} from "hono/http-exception";

const logger = new Logger('SalaryCalculatorService');

export default class SalaryCalculatorService {

    public calculateSalary(salaryDto: SalaryDto): SalaryResponseDto {
        try {
            const {basic, travel, rent = 0, business = 0, fuel = 0} = salaryDto;
            logger.debug(`Calculating salary for basic: ${basic}, travel: ${travel}, rent: ${rent}, business: ${business}, fuel: ${fuel}`)

            // calculate gross salary
            const grossSalary = basic + travel + rent + business + fuel;
            logger.debug(`Gross salary: ${grossSalary}`)

            // calculate payee tax salary
            const payeeTaxSalary = basic + travel;
            logger.debug(`Payee tax salary: ${payeeTaxSalary}`)

            // calculate payee tax
            const payeeTax = calculatePayeeTaxUtil(payeeTaxSalary);
            logger.debug(`Payee tax: ${payeeTax}`)

            // calculate with holding tax
            const withHoldingTax = rent * WITH_HOLDING_TAX_PERCENT;
            logger.debug(`With holding tax: ${withHoldingTax}`)

            // calculate total tax
            const totalTax = payeeTax + withHoldingTax;
            logger.debug(`Total tax: ${totalTax}`)

            // calculate epf by employee
            const epfByEmployee = basic * EPF_EMP_PERCENT;
            logger.debug(`EPF by employee: ${epfByEmployee}`)

            // calculate total deductions
            const totalDeductions = totalTax + epfByEmployee + withHoldingTax + STAMP_DUTY + INME_CARE;
            logger.debug(`Total deductions: ${totalDeductions}`)

            // calculate net salary
            const netSalary = grossSalary - totalDeductions;
            logger.debug(`Net salary: ${netSalary}`)

            // calculate epf by employer
            const epfByEmployer = basic * EPF_COM_PERCENT;
            logger.debug(`EPF by employer: ${epfByEmployer}`)

            // calculate etf by employer
            const etfByEmployer = basic * ETF_COM_PERCENT;
            logger.debug(`ETF by employer: ${etfByEmployer}`)

            // calculate total cost to employer
            const totalCostToEmployer = grossSalary + epfByEmployer + etfByEmployer;
            logger.debug(`Total cost to employer: ${totalCostToEmployer}`)

            // calculate total cost to employer per hour
            const totalCostToEmployerPerHour = totalCostToEmployer / (8 * 20);
            logger.debug(`Total cost to employer per hour: ${totalCostToEmployerPerHour}`)

            logger.info(`Salary calculated successfully`)
            return new SalaryResponseDto({
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
            })
        } catch (e) {
            logger.error(`Error occurred while calculating salary: ${e instanceof Error ? e.message : e}`)
            throw new HTTPException(500, {message: 'Error occurred while calculating salary'});
        }
    }
}
