import {Context, Hono} from "hono";
import {zValidator} from "@hono/zod-validator";
import {SalaryDto, SalarySchema} from "./salary-calculator.schema";
import SalaryCalculatorService from "./salary-calculator.service";
import {invokeService} from "../../util/invoke-service.util";

const salaryCalculatorController = new Hono()

const salaryCalculatorService = new SalaryCalculatorService()

salaryCalculatorController.post(
    '/',
    zValidator('json', SalarySchema),
    async (c) => {
        return invokeService<SalaryDto>(c, salaryCalculatorService.calculateSalary)
    }
)

export default salaryCalculatorController;
