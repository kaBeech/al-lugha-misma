import { load } from "https://deno.land/std@0.189.0/dotenv/mod.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const env = await load();

const config: string = env["PG_CONFIG"];

const client = new Client(config);

const getPotatoList = async () => {
  await client.connect();
  const listPotatoResult = await client.queryObject(
    `SELECT languages.language, transliterated_word 
      FROM languages 
      JOIN transliterated_words ON (languages.id=transliterated_words.language) 
      JOIN reference_words_english ON (transliterated_words.reference_word_english=reference_words_english.id) 
        WHERE reference_words_english.reference_word_english = 'potato'`,
  );
  await client.end();
  return { "potatoList": listPotatoResult.rows };
};

export default {
  getPotatoList,
};
