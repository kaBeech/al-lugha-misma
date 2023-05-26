import { helpers, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import homepageController from "../controllers/homepageController.ts";
import languageController from "../controllers/languageController.ts";
import potatoController from "../controllers/potatoController.ts";
import challengeController from "../controllers/challengeController.ts";

const router = new Router();

router.get("/", homepageController.index);
router.get("/languages", languageController.getLanguageList);
router.get("/potato", (ctx) => {
  ctx.response.body = potatoController.getPotatoList;
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
  "/challenge/:challenge/languages/:languages/key",
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
router.get(
  "/challenge/:challenge/languages/:languages/record",
  (ctx) => {
    // const { challenge, languages } = helpers.getQuery(ctx, {
    //   mergeParams: true,
    // });
    // ctx.response.body = await challengeController.getChallengeRecord(
    //   challenge,
    //   languages,
    // );
    ctx.response.body = "GET CHALLENGE RECORD route not yet implemented";
  },
);
router.get(
  "/challenge/:challenge/languages/:languages",
  (ctx) => {
    // const { challenge, languages } = helpers.getQuery(ctx, {
    //   mergeParams: true,
    // });
    // const attempt = ctx.request.body.arguments;
    // ctx.response.body = challengeController.startChallenge(
    //   challenge,
    //   languages,
    //   attempt,
    // );
    ctx.response.body = "START CHALLENGE route not yet implemented";
    // pseudo: Create session cookie with challenge, languages, and timestamp of challenge_start_time
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
