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
  "/available_challenge_cards/challenge/:challenge",
  async (ctx) => {
    const { challenge } = helpers.getQuery(ctx, {
      mergeParams: true,
    });
    ctx.response.body = await challenge_controller.available_challenge_cards(
      challenge,
    );
  },
);
router.get(
  "/challenge/:challenge/languages/:languages",
  async (ctx) => {
    const { challenge, languages } = helpers.getQuery(ctx, {
      mergeParams: true,
    });
    ctx.response.body = await challenge_controller.challenge_key(
      challenge,
      languages,
    );
  },
);
router.put(
  "/challenge/:challenge/languages/:languages",
  (ctx) => {
    const { challenge, languages } = helpers.getQuery(ctx, {
      mergeParams: true,
    });
    const attempt = ctx.request.body.arguments;
    ctx.response.body = challenge_controller.receiveChallengeAttempt(
      challenge,
      languages,
      attempt,
    );
  },
);

challenge_controller.challenge_key;

export default router;
