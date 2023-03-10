import { Router } from "https://deno.land/x/oak/mod.ts";
import homepageController from "../controllers/homepageController.ts";

import language_controller from "../controllers/languageController.ts";
// import { addTodo, getTodos } from "../controllers/todos.ts";

const router = new Router();

// Implement routes
router.post("/api/todos", addTodo);
// router.get("/api/todos", getTodos); // Get all todos

// GET request for homepage
router.get("/", homepageController.index);

// GET request for list of all languages.
router.get("/languages", language_controller.language_list);

export default router;
