import { load } from "https://deno.land/std@0.189.0/dotenv/mod.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const env = await load();

const config: string = env["PG_CONFIG"];

const client = new Client(config);

const challenge_key = async (challenge: string, languages: string) => {
  await client.connect();

  const languagesRaw = languages.split(",");
  let languagesFormatted = "";
  for (const language of languagesRaw) {
    languagesFormatted = languagesFormatted + `'${language}',`;
  }
  languagesFormatted = languagesFormatted.slice(0, -1);

  const challenge_key_result = await client.queryObject(
    `SELECT reference_words_english.reference_word_english, transliterated_word, languages.language 
      FROM languages 
      JOIN transliterated_words ON (languages.id=transliterated_words.language) 
      JOIN reference_words_english ON (transliterated_words.reference_word_english=reference_words_english.id) 
      JOIN challenges ON (reference_words_english.challenge=challenges.id) 
        WHERE challenges.challenge = '${challenge}' 
        AND languages.language IN (${languagesFormatted})`,
  );

  await client.end();
  return { "challenge_key": (await challenge_key_result).rows };
};

export default {
  challenge_key,
};
