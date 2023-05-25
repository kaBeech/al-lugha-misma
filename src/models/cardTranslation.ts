import { CardTranslation } from "../types.ts";

const cardTranslations = new Map<string, CardTranslation>();

cardTranslations.set("1", {
  id: "1",
  card: "Numbers",
  language: "Arabic",
  translations: [
    "Sifr",
    "waaHid",
    "'ithnaan",
    "thalaatha",
    "'arba3a'",
    "khamsa",
    "sitta",
    "sab3a",
    "thamaaniya",
    "tis3a",
    "3ashara",
  ],
});

cardTranslations.set("2", {
  id: "2",
  card: "Numbers",
  language: "Spanish",
  translations: [
    "cero",
    "uno",
    "dos",
    "tres",
    "cuatro",
    "cinco",
    "seis",
    "siete",
    "ocho",
    "nueve",
    "diez",
  ],
});

cardTranslations.set("3", {
  id: "3",
  card: "Numbers",
  language: "Pig Latin",
  translations: [
    "eerowzay",
    "unway",
    "ootay",
    "eethray",
    "orfay",
    "aivfay",
    "ixsay",
    "evensay",
    "eitsay",
    "ainnay",
    "entay",
  ],
});

export default cardTranslations;
