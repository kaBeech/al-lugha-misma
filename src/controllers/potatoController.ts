import { load } from "https://deno.land/std@0.189.0/dotenv/mod.ts";
import { Context } from "https://deno.land/x/oak@v11.1.0/context.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const env = await load();

const config: string = env["PG_CONFIG"];

const client = new Client(config);

const potato_list = async (ctx: Context) => {
  await client.connect();
  const list_potato_result = await client.queryObject(
    "SELECT LANGUAGES.LANGUAGE, TRANSLITERATED_WORD FROM LANGUAGES JOIN TRANSLITERATED_WORDS ON (LANGUAGES.ID=TRANSLITERATED_WORDS.LANGUAGE) JOIN REFERENCE_WORDS_ENGLISH ON (REFERENCE_WORD_ENGLISH=REFERENCE_WORDS_ENGLISH.ID) WHERE WORD = 'Potato'",
  );
  ctx.response.body = { "potato_list": list_potato_result.rows };
  await client.end();
};

export default {
  potato_list,
};
