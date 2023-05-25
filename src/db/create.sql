CREATE TABLE IF NOT EXISTS languages_sql_test (
    id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    created_at timestamp WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    language TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS challenges_sql_test (
    id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    created_at timestamp WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    challenge TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS available_challenge_cards_sql_test (
    id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    created_at timestamp WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    challenge int NOT NULL REFERENCES challenges_sql_test (id),
    language int NOT NULL REFERENCES languages_sql_test (id)
);
CREATE TABLE IF NOT EXISTS reference_words_english_sql_test (
    id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    created_at timestamp WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    challenge int NOT NULL REFERENCES challenges_sql_test (id)
    reference_word_english text NOT NULL
);
CREATE TABLE IF NOT EXISTS transliterated_words_sql_test (
    id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    created_at timestamp WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    language int NOT NULL REFERENCES languages_sql_test (id)
    reference_word_english int NOT NULL REFERENCES reference_words_english_sql_test (id)
    transliterated_word text NOT NULL
)