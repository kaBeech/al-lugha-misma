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
  "/challenge_cards/word_list/:word_list",
  async (ctx) => {
    const { word_list } = helpers.getQuery(ctx, {
      mergeParams: true,
    });
    ctx.response.body = await challengeController.getAvailableChallengeCards(
      word_list,
    );
  },
);
router.get(
  "/word_list/:word_list/languages/:languages/key",
  async (ctx) => {
    const { word_list, languages } = helpers.getQuery(ctx, {
      mergeParams: true,
    });
    ctx.response.body = await challengeController.getChallengeKey(
      word_list,
      languages,
    );
  },
);
router.get(
  "/word_list/:word_list/languages/:languages/record",
  (ctx) => {
    // const { word_list, languages } = helpers.getQuery(ctx, {
    //   mergeParams: true,
    // });
    // ctx.response.body = await challengeController.getChallengeRecord(
    //   word_list,
    //   languages,
    // );
    ctx.response.body = "GET CHALLENGE RECORD route not yet implemented";
  },
);
router.get(
  "/word_list/:word_list/languages/:languages",
  (ctx) => {
    // const { word_list, languages } = helpers.getQuery(ctx, {
    //   mergeParams: true,
    // });
    // const attempt = ctx.request.body.arguments;
    // ctx.response.body = challengeController.startChallenge(
    //   word_list,
    //   languages,
    //   attempt,
    // );
    ctx.response.body = "START CHALLENGE route not yet implemented";
    // pseudo: Create session cookie with word_list, languages, and timestamp of challenge_start_time
  },
);
router.put(
  "/word_list/:word_list/languages/:languages",
  (ctx) => {
    const { word_list, languages } = helpers.getQuery(ctx, {
      mergeParams: true,
    });
    const attempt = ctx.request.body.arguments;
    ctx.response.body = challengeController.processChallengeAttempt(
      word_list,
      languages,
      attempt,
    );
  },
);

export default router;
