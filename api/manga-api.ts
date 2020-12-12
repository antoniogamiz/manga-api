import { ServerRequest } from "https://deno.land/std@0.73.0/http/server.ts";

import { createApp } from "../src/infraestructure/api/index.ts";

const app = createApp();

export default async (req: ServerRequest) => {
  req.url = req.url.replace("/api", "");
  const body = (await app.handle(req))?.body;
  req.respond({ body: body });
};
