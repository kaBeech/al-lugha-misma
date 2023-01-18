import { Context } from "https://deno.land/x/oak/mod.ts";
// import { compileFileClient } from "https://deno.land/x/pug/mod.ts";
// import models from "../models/index.ts";

const language_list = (ctx: Context, next: Function) => {
  //   const list_language = models.languages;

  //   ctx.response.render("language_list", {
  //     title: "Language List",
  //     language_list: list_language,
  //   });

  //   const compiledFunction = compileFileClient("../views/language.pug");
  //   ctx.response.body = compiledFunction({
  //     title: "Language List",
  //     language_list: list_language,
  //   });
  ctx.response.body = Array.from(ctx.state.models.languages.values());
};

export default {
  language_list,
};
