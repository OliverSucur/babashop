import { Application, Router, send } from "https://deno.land/x/oak@v6.3.1/mod.ts"
import { v4 } from "https://deno.land/std@0.80.0/uuid/mod.ts";
import { Session } from "https://deno.land/x/session/mod.ts";

import { Client } from "./models/client.ts";

const app = new Application();

const clients: Client[] = [
    { "id": "1", "firstName": "Oliver", "lastName": "Sucur"}
];

const session = new Session({
    framework: "oak",
    store: "memory",
});

await session.init();

app.use(session.use()(session));

const router = new Router();

router
    .get("/babashop/clients", (ctx) => {
        ctx.response.body = clients;
    })
    .get("/babashop/clients:id", (ctx) => {
        ctx.response.body = clients.find(e => e.id == ctx.params.id);
    });