import { Context } from "https://deno.land/x/oak/mod.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v1.11.0/mod.ts";

const viewPath = `${Deno.cwd()}/views/`;

configure({
  views: viewPath,
});

const index = async (ctx: Context, next: Function) => {
  const message = "Welcome to an early version of my web app! <3";

  const templateResult = await renderFile("index.eta", {
    title: "Al-Lugha Misma",
    message,
  });

  ctx.response.body = templateResult;
};

export default {
  index,
};
