import { Context } from "../../../deps.ts";
import { log } from "../../../deps.ts";

const loggerMidleware = (ctx: Context) => {
  const { request, response } = ctx;
  log.info(`${request.method} ${response.status} ${request.url}`);
};

export { loggerMidleware };
