import { Router } from "../deps.ts";
import * as mangaRoutes from "./manga.routes.ts";

const router: Router = new Router();

router.get("/mangas/:id", mangaRoutes.getManga);

export { router };
