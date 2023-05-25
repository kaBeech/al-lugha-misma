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
    challenge int NOT NULL REFERENCES challenges_sql_test (id),
    reference_word_english text NOT NULL
);
CREATE TABLE IF NOT EXISTS transliterated_words_sql_test (
    id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    created_at timestamp WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    language int NOT NULL REFERENCES languages_sql_test (id),
    reference_word_english int NOT NULL REFERENCES reference_words_english_sql_test (id),
    transliterated_word text NOT NULL
);

INSERT INTO languages_sql_test (language) VALUES 
    ('Arabic'),
    ('English'),
    ('French'),
    ('Hawai''ian'),
    ('Hindi'),
    ('Indonesian'),
    ('Pig Latin'),
    ('Spanish'),
    ('Swahili');
INSERT INTO challenges_sql_test (challenge) VALUES 
    ('Potato'),
    ('Numbers'),
    ('Colors');
INSERT INTO available_challenge_cards_sql_test (challenge, language) VALUES 
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (1, 7),
    (1, 8),
    (1, 9);
INSERT INTO reference_words_english_sql_test (challenge, reference_word_english) VALUES 
    (1, 'potato'),
    (2, '0'),
    (2, '1'),
    (2, '2'),
    (2, '3'),
    (2, '4'),
    (2, '5'),
    (2, '6'),    
    (2, '7'),
    (2, '8'),
    (2, '9'),
    (2, '10')
    (2, '11'),
    (2, '12'),
    (3, 'Black'),
    (3, 'White'),
    (3, 'Green'),
    (3, 'Red'),
    (3, 'Pink'),
    (3, 'Brown'),
    (3, 'Yellow'),
    (3, 'Orange'),
    (3, 'Blue');
INSERT INTO transliterated_words_sql_test (language, reference_word_english, transliterated_word) VALUES 
    (1, 1, 'baTaaTaa'),
    (2, 1, 'potato'),
    (3, 1, 'pomme de terre'),
    (4, 1, '''uala kahiki'),
    (5, 1, 'paTeTo'),
    (6, 1, 'kentang'),
    (7, 1, 'otatopay'),
    (8, 1, 'papa'),
    (9, 1, 'mbatata/kiazi'),
    (1, 2, 'Sifr'),
    (1, 3, 'waaHid'),
    (1, 4, '''ithnaan'),
    (1, 5, 'thalaatha'),
    (1, 6, '''arba3a'),
    (1, 7, 'khamsa'),
    (1, 8, 'sitta'),
    (1, 9, 'sab3a'),
    (1, 10, 'thamaaniya'),
    (1, 11, 'tis3a'),
    (1, 12, '3ashara'),
    (1, 13, '''aHada 3ashara'),
    (1, 14, '''ithnaa 3ashara'),
    (2, 2, 'zero'),
    (2, 3, 'one'),
    (2, 4, 'two'),
    (2, 5, 'three'),
    (2, 6, 'four'),
    (2, 7, 'five'),
    (2, 8, 'six'),
    (2, 9, 'seven'),
    (2, 10, 'eight'),
    (2, 11, 'nine'),
    (2, 12, 'ten'),
    (2, 13, 'eleven'),
    (2, 14, 'twelve'),
    (3, 2, 'zero'),
    (3, 3, 'un'),
    (3, 4, 'deux'),
    (3, 5, 'trois'),
    (3, 6, 'quatre'),
    (3, 7, 'cinq'),
    (3, 8, 'six'),
    (3, 9, 'sept'),
    (3, 10, 'huit'),
    (3, 11, 'neuf'),
    (3, 12, 'dix'),
    (3, 13, 'onze'),
    (3, 14, 'douze');