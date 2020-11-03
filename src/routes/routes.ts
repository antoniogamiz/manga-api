import { Router } from "../deps.ts";
import * as mangaRoutes from "./manga.routes.ts";

const router: Router = new Router();

router.get("/mangas/:id", mangaRoutes.getManga);
router.get("/mangas/:mangaId/:chapterId", mangaRoutes.getChapter);
router.get("/available/:n", mangaRoutes.getMangaList);
router.get("/available/genre/:genre", mangaRoutes.getMangaByGenre);
router.get("/available/status/:status", mangaRoutes.getMangaByStatus);

export { router };
