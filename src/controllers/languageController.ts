import { load } from "https://deno.land/std@0.189.0/dotenv/mod.ts";
import { Context } from "https://deno.land/x/oak@v11.1.0/context.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const env = await load();

const config: string = env["PG_CONFIG"];

const client = new Client(config);

const language_list = async (ctx: Context, next: Function) => {
  await client.connect();
  const list_language_result = await client.queryArray(
    "SELECT NAME FROM LANGUAGES",
  );
  console.log(list_language_result.rows);
  ctx.response.body = { "language_list": list_language_result.rows };
  await client.end();
};

export default {
  language_list,
};
