import { Context } from "https://deno.land/x/oak/mod.ts";
// import models from "../models/index.ts";

import { configure, renderFile } from "https://deno.land/x/eta@v1.11.0/mod.ts";

const viewPath = `${Deno.cwd()}/views/`;

configure({
  views: viewPath,
});

const language_list = async (ctx: Context, next: Function) => {
  // const list_language = ctx.state.models.languages.values();

  // ctx.render("language_list.eta", {
  //   title: "Language List",
  //   language_list: list_language,
  // });

  //   const compiledFunction = compileFileClient("../views/language.pug");
  //   ctx.response.body = compiledFunction({
  //     title: "Language List",
  //     language_list: list_language,
  //   });

  const list_language = ctx.state.models.languages.values();

  const templateResult = await renderFile("language_list.eta", {
    title: "Language List",
    language_list: list_language,
  });

  ctx.response.body = templateResult;
};

export default {
  language_list,
};
