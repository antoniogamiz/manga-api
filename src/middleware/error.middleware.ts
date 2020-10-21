import { Status, Context } from "../deps.ts";

const errorMiddleware = async (ctx: Context, next: () => Promise<void>) => {
  try {
    await next();
  } catch (err) {
    const message = err.message;
    const status = err.status || err.statusCode || Status.InternalServerError;
    console.log(err);
    ctx.response.status = status;
    ctx.response.body = { status, message };
  }
};

export { errorMiddleware };
