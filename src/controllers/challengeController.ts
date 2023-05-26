import { load } from "https://deno.land/std@0.189.0/dotenv/mod.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const env = await load();

const config: string = env["PG_CONFIG"];

const client = new Client(config);

const challenge_key = async (challenge: string, languages: string) => {
  await client.connect();

  const languagesFormatted = languages.split(",");
  // for (const language of ctx.request.body.arguments.languages) {
  //   languagesFormatted = languagesFormatted + `'${language}',`;
  // }
  // languagesFormatted = languagesFormatted.slice(0, -1);

  const challenge_key_result = await client.queryObject(
    `SELECT REFERENCE_WORD_ENGLISH, TRANSLITERATED_WORD, LANGUAGES.LANGUAGE FROM LANGUAGES JOIN TRANSLITERATED_WORDS ON (LANGUAGES.ID=TRANSLITERATED_WORDS.LANGUAGE) JOIN REFERENCE_WORDS_ENGLISH ON (REFERENCE_WORD_ENGLISH=REFERENCE_WORDS_ENGLISH.ID) JOIN CHALLENGES ON (REFERENCE_WORDS_ENGLISH.CHALLENGE=CHALLENGES.ID) WHERE CHALLENGES.CHALLENGE = ${challenge} AND LANGUAGES.LANGUAGE IN (${languagesFormatted})`,
  );

  //   const list_potato_result = await client.queryObject(
  //     "SELECT REFERENCE_WORD_ENGLISH, LANGUAGES.LANGUAGE, TRANSLITERATED_WORD FROM LANGUAGES JOIN TRANSLITERATED_WORDS ON (LANGUAGES.ID=TRANSLITERATED_WORDS.LANGUAGE) JOIN REFERENCE_WORDS_ENGLISH ON (REFERENCE_WORD_ENGLISH=REFERENCE_WORDS_ENGLISH.ID) WHERE WORD = 'Potato'",
  //   );
  // ctx.response.body = { "challenge_key": (await challenge_key_result).rows };
  await client.end();
  return { "challenge_key": (await challenge_key_result).rows };
};

export default {
  challenge_key,
};
