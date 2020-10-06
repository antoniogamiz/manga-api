import dotenv from "dotenv";
import express, { Response, Request } from "express";
import * as bodyParser from "body-parser";
import { mangaRouter } from "./routes/manga";

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.SERVER_PORT;

app.use("/manga", mangaRouter);

app.get("/health", (req: Request, res: Response) =>
  res.send({ uptime: process.uptime(), message: "OK", timestamp: Date.now() })
);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
