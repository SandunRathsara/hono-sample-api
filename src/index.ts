import {serve} from '@hono/node-server'
import {Hono} from 'hono'
import salaryCalculatorController from "./modules/salary-calculator/salary-calculator.controller";
import {ResponseStructure} from "./util/response-structure.util";
import {cors} from 'hono/cors';
import {logger} from "hono/logger";
import Logger from "./util/logger.util";

const app = new Hono()


app.use('*', logger(Logger.httpLogger))
app.use('*', cors({origin: '*'}))
app.use('*', ResponseStructure)

app.get('/', (c) => {
    console.log('c', c)
    return c.text('Hello Hono!')
})

app.route('/salary', salaryCalculatorController)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port
})
