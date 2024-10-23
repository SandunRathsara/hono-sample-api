import {Context} from "hono";

export async function invokeService<PT>(c: Context, serviceMethod: (arg0: PT) => any) {
    const body = await c.req.json<PT>()
    const response = serviceMethod(body)
    return c.json(response)
}