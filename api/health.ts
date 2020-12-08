import { ServerRequest } from "../src/deps.ts";

export default (req: ServerRequest) => {
  req.respond({ status: 200 });
};
