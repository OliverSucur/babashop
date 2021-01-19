import { Application } from "https://deno.land/x/oak@v6.4.0/mod.ts";
import { api, userSession } from "./lib/typescript/api.ts";
import { server } from "./lib/typescript/server.ts";

const app = new Application();

app.use(userSession);
app.use(api);
app.use(server);

console.log("Server running on http://localhost:8000");
app.listen({ port: 8000 });