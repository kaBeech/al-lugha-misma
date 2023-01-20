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

const languages = db.collection("languages");

// insert single user
const insertId = await languages.insertOne({
  id: "1",
  name: "Spanish",
});

// insert multiple users
const insertIds = await languages.insertMany([
  {
    id: "2",
    name: "Arabic",
  },
  {
    id: "3",
    name: "Pig Latin",
  },
]);
