import { load } from "https://deno.land/std@0.189.0/dotenv/mod.ts";
import { Application, Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import models from "./models/index.ts";
import routes from "./routes/index.ts";

const env = await load();

const port: number = +env["PORT"];

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
