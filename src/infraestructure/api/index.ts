import { Application, Context } from "../../deps.ts";
import { router } from "./routes/index.ts";
import * as middleware from "./middleware/index.ts";

const app = new Application<Context>();

app.use(middleware.errorMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ port }) => {
  const url = `http://localhost:${port}`;
  console.log(`Listening on: ${port}`);
  console.log(`URL: ${url}`);
});

export default app;
