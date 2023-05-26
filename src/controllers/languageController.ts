import { load } from "https://deno.land/std@0.189.0/dotenv/mod.ts";
import { Context } from "https://deno.land/x/oak@v11.1.0/context.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const env = await load();

const config: string = env["PG_CONFIG"];

const client = new Client(config);

const getLanguageList = async (ctx: Context) => {
  await client.connect();
  const listLanguageResult = await client.queryArray(
    "SELECT LANGUAGE FROM LANGUAGES",
  );
  ctx.response.body = { "language_list": listLanguageResult.rows };
  await client.end();
};

export default {
  getLanguageList,
};
