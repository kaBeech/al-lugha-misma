import { Application, Context } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

import models from "./models/index.ts";
import routes from "./routes/index.ts";

// For some reason setting port with dotenv is breaking the view engine
// Running server.ts from somewhere other than the src folder also breaks it
const port = 8000;
// const port = parseInt(config()["PORT"]);

const app = new Application();

const logging = async (ctx: Context, next: Function) => {
  console.log(`HTTP ${ctx.request.method} on ${ctx.request.url}`);
  console.log("Hello Deno!!");
  console.log("returning a response ...");
  await next();
};

app.use(logging);

app.use(async (ctx, next) => {
  ctx.state = {
    models,
    me: models.users.get("1"),
  };

  await next();
});

app.use(routes.user.allowedMethods());
app.use(routes.user.routes());
app.use(routes.challenge.allowedMethods());
app.use(routes.challenge.routes());

app.addEventListener("listen", () => {
  console.log(`Listening on localhost:${port}`);
});

await app.listen({ port });
