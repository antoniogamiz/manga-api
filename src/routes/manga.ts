import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.send({ titles: [] });
});

export default router;
