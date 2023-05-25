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
    language int NOT NULL REFERENCES languages_sql_test (id),
    challenge int NOT NULL REFERENCES challenges_sql_test (id)
)

-- CREATE TABLE IF NOT EXISTS available_challenge_cards (
--     id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
--     language INT NOT NULL
--     CONSTRAINT FK_AvailCard_Language FOREIGN KEY (language)
--       REFERENCES languages_sql_test (id)
--     challenge INT NOT NULL
--     CONSTRAINT FK_AvailCard_Challenge FOREIGN KEY (challenge)
--       REFERENCES challenges_sql_test (id)
-- )