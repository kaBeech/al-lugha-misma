import { Router } from "https://deno.land/x/oak/mod.ts";

import language_controller from "../controllers/languageController.ts";

const router = new Router();

// GET request for list of all languages.
router.get("/languages", language_controller.language_list);

export default router;
