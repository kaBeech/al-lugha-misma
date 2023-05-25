import { load } from "https://deno.land/std@0.189.0/dotenv/mod.ts";
import { Context } from "https://deno.land/x/oak@v11.1.0/context.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const env = await load();

const config: string = env["PG_CONFIG"];

const client = new Client(config);

const potato_list = async (ctx: Context, next: Function) => {
  await client.connect();
  const list_potato_result = await client.queryObject(
    "SELECT NAME, TRANSLITERATED_WORD FROM LANGUAGES JOIN TRANSLITERATED_WORDS ON (LANGUAGES.ID=LANGUAGE)",
    // WHERE REFERENCE_WORD_ENGLISH = 1
  );

  console.log(list_potato_result.rows);
  ctx.response.body = { "potato_list": list_potato_result.rows };
  await client.end();
};

export default {
  potato_list,
};
