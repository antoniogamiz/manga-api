import { ServerRequest } from "https://deno.land/std@0.73.0/http/server.ts";
import { Response } from "../src/deps.ts";

import app from "../src/app.ts";

export default async (req: ServerRequest) => {
  req.url = req.url.replace("/api", "");
  const body = (await app.handle(req))?.body;
  req.respond({ body: body });
};
