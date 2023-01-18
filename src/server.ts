import { Application, Context } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import {
  etaEngine,
  oakAdapter,
  viewEngine,
} from "https://deno.land/x/view_engine@v10.5.1c/mod.ts";

import models from "./models/index.ts";
import routes from "./routes/index.ts";

// For some reason setting port with dotenv is breaking the view engine
// const port = parseInt(config()["PORT"]);
const port = 8000;

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
app.use(routes.challenges.allowedMethods());
app.use(routes.challenges.routes());

app.addEventListener("listen", () => {
  console.log(`Listening on localhost:${port}`);
});

app.use(
  viewEngine(oakAdapter, etaEngine, {
    viewRoot: "./views/eta",
  }),
);

app.use(async (ctx, next) => {
  ctx.render("index.eta", { name: "an early version of my web app!" });
});

await app.listen({ port });
