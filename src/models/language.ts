import {
  MongoClient,
  ObjectId,
} from "https://deno.land/x/mongo@v0.30.1/mod.ts";

import { Language } from "../types.ts";

const client = new MongoClient();

// Update URI
await client.connect(
  "mongodb+srv://<username>:<password>@<db_cluster_url>?authMechanism=SCRAM-SHA-1",
);

const db = client.database("test");

const users = db.collection("users");

// insert single user
const insertId = await users.insertOne({
  id: "1",
  name: "Spanish",
});

// insert multiple users
const insertIds = await users.insertMany([
  {
    id: "2",
    name: "Arabic",
  },
  {
    id: "3",
    name: "Pig Latin",
  },
]);

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

// const languages: Language[] = [
//   { id: "1", name: "Spanish" },
//   { id: "2", name: "Arabic" },
//   { id: "3", name: "Pig Latin" },
// ];

export default languages;
