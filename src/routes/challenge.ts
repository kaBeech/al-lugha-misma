import { helpers, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import homepageController from "../controllers/homepageController.ts";
import language_controller from "../controllers/languageController.ts";
import potato_controller from "../controllers/potatoController.ts";
import challenge_controller from "../controllers/challengeController.ts";

const router = new Router();

router.get("/", homepageController.index);
router.get("/languages", language_controller.language_list);
router.get("/potato", (ctx) => {
  ctx.response.body = potato_controller.potato_list;
});
router.get(
  "/challenge_key/challenge/:challenge/languages/:languages",
  (ctx) => {
    const { challenge, languages } = helpers.getQuery(ctx, {
      mergeParams: true,
    });
    ctx.response.body = challenge_controller.challenge_key(
      challenge,
      languages,
    );
  },
);

challenge_controller.challenge_key;

export default router;
