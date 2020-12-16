import { Router } from "../../../deps.ts";
import * as mangaRoutes from "./manga.routes.ts";
import * as healthRoutes from "./health.routes.ts";
import Settings from "../../../Settings.ts";

const router: Router = new Router();
const { API_ROOT } = Settings;

router.get(`${API_ROOT}/manga`, mangaRoutes.getMangaBy);
router.get(`${API_ROOT}/manga/:mangaId`, mangaRoutes.getManga);
router.get(`${API_ROOT}/manga/:mangaId/:chapterId`, mangaRoutes.getChapter);

router.get(`${API_ROOT}/health`, healthRoutes.health);

export { router };
