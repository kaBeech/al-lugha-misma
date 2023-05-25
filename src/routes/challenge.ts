import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import homepageController from "../controllers/homepageController.ts";
import language_controller from "../controllers/languageController.ts";
import potato_controller from "../controllers/potatoController.ts";

const router = new Router();

router.get("/", homepageController.index);
router.get("/languages", language_controller.language_list);
router.get("/potato", potato_controller.potato_list);

export default router;
