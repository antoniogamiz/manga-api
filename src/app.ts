import { Application, Context } from "./deps.ts";
import { router } from "./routes/routes.ts";

const app = new Application<Context>();

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
