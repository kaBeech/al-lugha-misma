import { Application, Context } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
// import {
//   etaEngine,
//   oakAdapter,
//   viewEngine,
// } from "https://deno.land/x/view_engine@v10.5.1c/mod.ts";
import { configure, renderFile } from "https://deno.land/x/eta/mod.ts";

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
app.use(routes.challenges.allowedMethods());
app.use(routes.challenges.routes());

app.addEventListener("listen", () => {
  console.log(`Listening on localhost:${port}`);
});

// app.use(
//   viewEngine(oakAdapter, etaEngine, {
//     viewRoot: "./views/eta",
//   }),
// );

// app.use((ctx, next) => {
//   ctx.render("index.eta", { name: "an early version of my web app!" });
// });

// const viewPath = `${Deno.cwd()}/views/eta/`

// configure({ views: viewPath });
// const getName = (u: URL) =>
//   u.searchParams.get("name") || "an early version of my web app!";
// let templateResult = await renderFile("index.eta", { name: "an early version of my web app!" });

await app.listen({ port });
