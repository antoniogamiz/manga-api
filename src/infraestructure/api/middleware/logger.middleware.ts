import { Context } from "../../../deps.ts";
import { log } from "../../../deps.ts";

const loggerMidleware = async (ctx: Context, next: () => Promise<void>) => {
  const { request, response } = ctx;
  log.info(`${request.method} ${response.status} ${request.url}`);
  await next();
};

export { loggerMidleware };
