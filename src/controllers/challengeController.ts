import { load } from "https://deno.land/std@0.189.0/dotenv/mod.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const env = await load();

const config: string = env["PG_CONFIG"];

const client = new Client(config);

const available_challenge_cards = async (challenge: string) => {
  await client.connect();

  const challenge_key_result = await client.queryObject(
    `SELECT languages.language 
      FROM available_challenge_cards 
      JOIN languages ON (available_challenge_cards.language=languages.id) 
      JOIN challenges ON (available_challenge_cards.challenge=challenges.id) 
        WHERE challenges.challenge = '${challenge}'`,
  );

  await client.end();
  return { "available_challenge_cards": challenge_key_result.rows };
};

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
        AND languages.language_http_friendly IN (${languagesFormatted})`,
  );

  await client.end();
  return { "challenge_key": challenge_key_result.rows };
};

const receiveChallengeAttempt = (
  challenge: string,
  languages: string,
  attempt: Promise<{ challenge_key: unknown[] }>,
) => {
  if (attempt === challenge_key(challenge, languages)) {
    return { "result": "YOU DID IT! CONGRATULATIONS!" };
  }
  return { "result": "TRY AGAIN!" };
};

export default {
  available_challenge_cards,
  challenge_key,
  receiveChallengeAttempt,
};
