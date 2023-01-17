interface User {
  id: string;
  username: string;
}

interface Language {
  id: string;
  name: string;
}

interface Card {
  id: string;
  name: string;
  numberOfFields: number;
  fields: string[];
}

interface CardTranslation {
  id: string;
  card: string;
  language: string;
  translations: string[];
}
export type { Card, CardTranslation, Language, User };
