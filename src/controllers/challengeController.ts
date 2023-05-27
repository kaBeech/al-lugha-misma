import { load } from "https://deno.land/std@0.189.0/dotenv/mod.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const env = await load();

const config: string = env["PG_CONFIG"];

const client = new Client(config);

const getAvailableChallengeCards = async (word_list: string) => {
  await client.connect();

  const challengeCardsResult = await client.queryObject(
    `SELECT languages.language 
      FROM challenge_cards 
      JOIN languages ON (challenge_cards.language=languages.id) 
      JOIN word_lists ON (word_lists.word_list=word_lists.id) 
        WHERE word_lists.word_list = '${word_list}'`,
  );

  await client.end();
  return { "challenge_cards": challengeCardsResult.rows };
};

const getChallengeKey = async (word_list: string, languages: string) => {
  await client.connect();

  const languagesRaw = languages.split(",");
  let languagesFormatted = "";
  for (const language of languagesRaw) {
    languagesFormatted = languagesFormatted + `'${language}',`;
  }
  languagesFormatted = languagesFormatted.slice(0, -1);

  const challengeKeyResult = await client.queryObject(
    `SELECT reference_words_english.reference_word_english, transliterated_word, languages.language 
      FROM languages 
      JOIN transliterated_words ON (languages.id=transliterated_words.language) 
      JOIN reference_words_english ON (transliterated_words.reference_word_english=reference_words_english.id) 
      JOIN word_lists ON (reference_words_english.word_list=word_lists.id) 
        WHERE word_lists.word_list = '${word_list}' 
        AND languages.language_http_friendly IN (${languagesFormatted})`,
  );

  await client.end();
  return { "challenge_key": challengeKeyResult.rows };
};

const processChallengeAttempt = (
  word_lists: string,
  languages: string,
  attempt: Promise<{ challenge_key: unknown[] }>,
) => {
  // pseudo: {
  //  verify whether attempt is successful,
  //  if (successful) {check cookie for challenge_start_time},
  //  if (found) {calculate and display completion_time [note: in milliseconds - please be mindful of int4 size limitations (it's between 24 and 25 days, in ms)]};
  //  query db for existing completion_record for this challenge,
  //  if !(found && faster than current attempt's completion_time) {
  //   create/update completion_record with current attempt's time
  //  };
  // }
  if (attempt === getChallengeKey(word_lists, languages)) {
    return { "result": "YOU DID IT! CONGRATULATIONS!" };
  }
  return { "result": "TRY AGAIN!" };
};

export default {
  getAvailableChallengeCards,
  getChallengeKey,
  processChallengeAttempt,
};
