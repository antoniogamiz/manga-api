import { Router, Request, Response } from "express";
import { MangaModel } from "../models";
const router = Router();

router.get("/", async (req: Request, res: Response, next: Function) => {
  try {
    const mangas = await MangaModel.find({}, { title: 1, _id: 0 })
      .limit(100)
      .exec();
    return res.json(mangas);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: Function) => {
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
  try {
    await manga.save();
    return res.status(201).send(manga);
  } catch (error) {
    res.status(400);
    next(error);
  }
});

export { router as mangaRouter };
