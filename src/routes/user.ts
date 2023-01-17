import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router.get("/users", (ctx) => {
  ctx.response.body = Array.from(ctx.state.models.users.values());
  //   ctx.response.body = "GET /users route not yet implemented";
});

export default router;
