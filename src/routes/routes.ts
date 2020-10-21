import { Router, Context } from "../deps.ts";

const router: Router = new Router();

router.get("", (ctx: Context) => {
  ctx.response.body = "hello world";
});

export { router };
