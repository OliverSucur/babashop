import { Application, Router, send } from "https://deno.land/x/oak@v6.3.1/mod.ts"
import { Session } from "https://deno.land/x/session/mod.ts";

import { Product } from "./models/product.ts";

const app = new Application();

const products: Product[] = [];

export const session = new Session({
    framework: "oak",
    store: "memory",
});

await session.init();


const router = new Router();

router
    .get("/babashop/products", (ctx) => {
        ctx.response.body = products;
    })
    .get("/babashop/products:id", (ctx) => {
        ctx.response.body = products.find(e => e.id == ctx.params.id);
    });

app.use(session.use()(session));
app.use(router.routes());

export const api = router.routes();