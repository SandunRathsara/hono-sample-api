import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import Logger from "./logger.util";

export async function ResponseStructure(context: Context, next: Next) {
    await next();
    const logger = new Logger(ResponseStructure.name)

    switch (true) {
        case !context.error:
            const data: any = await context.res.json()
            context.res = Response.json({ success: true, message: 'Success', data })
            break;
        case context.error instanceof HTTPException:
            context.res = Response.json(
                { success: false, message: 'Internal Server Error' },
                { status: context.error instanceof HTTPException ? context.error.status : 500 });
            logger.error(context?.error?.message || JSON.stringify(context?.error))
            break;
        default:
            context.res = Response.json(
                { success: false, message: 'Internal Server Error' },
                { status: 500 });
            logger.error(context?.error?.message || JSON.stringify(context?.error))
            break;
    }
}