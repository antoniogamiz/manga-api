import dotenv from "dotenv";
import express, { Response, Request } from "express";
import * as bodyParser from "body-parser";
import { mangaRouter } from "./routes/manga";
import mongoose from "mongoose";
import { exit } from "process";

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.SERVER_PORT;

app.use("/manga", mangaRouter);

app.get("/health", (req: Request, res: Response) =>
  res.send({ uptime: process.uptime(), message: "OK", timestamp: Date.now() })
);

console.log(process.env.DB_URL);
mongoose.connect(
  process.env.DB_URL || "",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("MongoDB connected");
    }
  }
);

mongoose.connection.on("error", (err) => {
  console.log(err);
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
