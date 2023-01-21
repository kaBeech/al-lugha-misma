import { Context } from "https://deno.land/x/oak/mod.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v1.11.0/mod.ts";
import * as postgres from "https://deno.land/x/postgres@v0.14.2/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

// const databaseUrl = config()["DATABASE_URL"];
const databaseUrl = "dburl";

const pool = new postgres.Pool(databaseUrl, 3, true);

const connection = await pool.connect();
try {
  await connection.queryObject`
    CREATE TABLE IF NOT EXISTS languages (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL
    )
  `;
} finally {
  connection.release();
}

// const viewPath = `${Deno.cwd()}/views/`;

// configure({
//   views: viewPath,
// });

const language_list = async (ctx: Context, next: Function) => {
  // const list_language = Array.from(ctx.state.models.languages.values());
  const list_language = await connection.queryObject`
  SELECT * FROM languages
`;

  const list_language_string = JSON.stringify(list_language.rows, null, 2);

  const templateResult = await renderFile("language_list.eta", {
    title: "Language List",
    language_list: list_language_string,
  });

  ctx.response.body = templateResult;
  // ctx.response.body = JSON.stringify(list_language.rows, null, 2);
};

export default {
  language_list,
};
