import { ServerRequest } from "https://deno.land/std@0.77.0/http/server.ts";

export default async (req: ServerRequest) => {
  req.respond({ status: 200 });
};
