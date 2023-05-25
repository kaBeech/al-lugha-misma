import { Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const index = (ctx: Context) => {
  ctx.response.body = {
    "result": "You have successfully pinged the Al-Lugha-Misma API <3",
  };
};

export default {
  index,
};
