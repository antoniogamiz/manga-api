import { Router, Request, Response } from "express";
import { MangaModel } from "../models";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.send({ titles: [] });
});

router.post("/", async (req: Request, res: Response) => {
  const {
    title,
    alternativeTitles,
    status,
    genres,
    chapters,
    chaptersEntries,
  } = req.body;

  const manga = MangaModel.build({
    title,
    alternativeTitles,
    status,
    genres,
    chapters,
    chaptersEntries,
  });

  await manga.save();
  return res.status(201).send(manga);
});

export { router as mangaRouter };
