import { helpers, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import homepageController from "../controllers/homepageController.ts";
import languageController from "../controllers/languageController.ts";
import potatoController from "../controllers/potatoController.ts";
import challengeController from "../controllers/challengeController.ts";

const router = new Router();

router.get("/", homepageController.index);
router.get("/languages", languageController.language_list);
router.get("/potato", (ctx) => {
  ctx.response.body = potatoController.potato_list;
});
router.get(
  "/available_challenge_cards/challenge/:challenge",
  async (ctx) => {
    const { challenge } = helpers.getQuery(ctx, {
      mergeParams: true,
    });
    ctx.response.body = await challengeController.getAvailableChallengeCards(
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
    ctx.response.body = await challengeController.getChallengeKey(
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
    ctx.response.body = challengeController.processChallengeAttempt(
      challenge,
      languages,
      attempt,
    );
  },
);

export default router;
