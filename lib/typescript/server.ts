import { send, Context } from "https://deno.land/x/oak@v6.4.0/mod.ts";

export const server = async (ctx: Context<Record<string, any>>) => {
    await send(
        ctx,
        ctx.request.url.pathname,
        {
            root: `${Deno.cwd()}`,
            index: "index.html"
        }
    )
}