import { Application, Context } from "./deps.ts";
import { router } from "./routes/routes.ts";

const app = new Application<Context>();

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(`Listening on: ${port}`);
});

export default app;
