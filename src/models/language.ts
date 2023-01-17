import { Language } from "../types.ts";

const languages = new Map<string, Language>();

languages.set("1", {
  id: "1",
  name: "Spanish",
});

languages.set("2", {
  id: "2",
  name: "Arabic",
});

languages.set("3", {
  id: "3",
  name: "Pig Latin",
});

export default languages;
