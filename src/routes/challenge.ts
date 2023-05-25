import { Router } from "https://deno.land/x/oak/mod.ts";
import homepageController from "../controllers/homepageController.ts";
import language_controller from "../controllers/languageController.ts";
import potato_controller from "../controllers/potatoController.ts";
// import { addTodo, getTodos } from "../controllers/todos.ts";

const router = new Router();

// Implement routes
// router.post("/api/todos", addTodo);
// router.get("/api/todos", getTodos); // Get all todos

router.get("/", homepageController.index);
router.get("/languages", language_controller.language_list);
router.get("/potato", potato_controller.potato_list);

export default router;
