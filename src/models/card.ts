import { Card } from "../types.ts";

const cards = new Map<string, Card>();

cards.set("1", {
  id: "1",
  name: "Colors",
  numberOfFields: 7,
  fields: ["black", "white", "red", "green", "yellow", "blue", "brown"],
});

cards.set("2", {
  id: "2",
  name: "Numbers",
  numberOfFields: 11,
  fields: [
    "zero (0)",
    "one (1)",
    "two (2)",
    "three (3)",
    "four (4)",
    "five (5)",
    "six (6)",
    "seven (7)",
    "eight (8)",
    "nine (9)",
    "ten (10)",
  ],
});

export default cards;
