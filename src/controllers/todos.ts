// import { config } from "https://deno.land/x/dotenv/mod.ts";

// const { DATA_API_KEY, APP_ID } = config();
// // const DATA_API_KEY =
// //   "ys5Hv5lZeOunQtDBvprfiYKQP4wa1AiVIK74op2M6wVE6dQY7uC3dtTyWtpRbRyK";
// // const APP_ID = "data-akssn";
// const BASE_URI =
//   `https://data.mongodb-api.com/app/${APP_ID}/endpoint/data/beta/action`;
// const DATA_SOURCE = "Cluster0";
// const DATABASE = "todo_db";
// const COLLECTION = "todos";

// const options = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "api-key": DATA_API_KEY,
//   },
//   body: "",
// };

import {
  MongoClient,
  ObjectId,
} from "https://deno.land/x/mongo@v0.30.1/mod.ts";

const client = new MongoClient();

await client.connect(
  "mongodb+srv://TestDB:iHcN8SGhpG4lm2W4@cluster0.iy0xnr9.mongodb.net/?authMechanism=SCRAM-SHA-1",
);

const db = client.database("test");

const users = db.collection("users");

// insert single user
const insertId = await users.insertOne({
  email: "john@test.com",
  name: "John Smith",
});

// insert multiple users
const insertIds = await users.insertMany([
  {
    email: "jane@test.com",
    name: "Jane Smith",
  },
  {
    email: "jack@test.com",
    name: "Jack Smith",
  },
]);

const allUsers = await users.find({}).toArray();

export { allUsers, insertId };

// const addTodo = async ({
//   request,
//   response,
// }: {
//   request: any;
//   response: any;
// }) => {
//   try {
//     if (!request.hasBody) {
//       response.status = 400;
//       response.body = {
//         success: false,
//         msg: "No Data",
//       };
//     } else {
//       const body = await request.body();
//       const todo = await body.value;
//       const URI = `${BASE_URI}/insertOne`;
//       const query = {
//         collection: COLLECTION,
//         database: DATABASE,
//         dataSource: DATA_SOURCE,
//         document: todo,
//       };
//       options.body = JSON.stringify(query);
//       const dataResponse = await fetch(URI, options);
//       const { insertedId } = await dataResponse.json();

//       response.status = 201;
//       response.body = {
//         success: true,
//         data: todo,
//         insertedId,
//       };
//     }
//   } catch (err) {
//     response.body = {
//       success: false,
//       msg: err.toString(),
//     };
//   }
// };

// const getTodos = async ({ response }: { response: any }) => {
//   try {
//     const URI = `${BASE_URI}/find`;
//     const query = {
//       collection: COLLECTION,
//       database: DATABASE,
//       dataSource: DATA_SOURCE,
//     };
//     options.body = JSON.stringify(query);
//     const dataResponse = await fetch(URI, options);
//     const allTodos = await dataResponse.json();

//     if (allTodos) {
//       response.status = 200;
//       response.body = {
//         success: true,
//         data: allTodos,
//       };
//     } else {
//       response.status = 500;
//       response.body = {
//         success: false,
//         msg: "Internal Server Error",
//       };
//     }
//   } catch (err) {
//     response.body = {
//       success: false,
//       msg: err.toString(),
//     };
//   }
// };

// export { addTodo, getTodos };
