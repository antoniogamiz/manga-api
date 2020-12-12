import { Router } from "../../../deps.ts";
import * as mangaRoutes from "./manga.routes.ts";
import { API_ROOT } from "../../../Settings.ts";

const router: Router = new Router();

router.get(`${API_ROOT}/manga`, mangaRoutes.getMangaBy);
router.get(`${API_ROOT}/manga/:mangaId`, mangaRoutes.getManga);
router.get(`${API_ROOT}/manga/:mangaId/:chapterId`, mangaRoutes.getChapter);

export { router };
