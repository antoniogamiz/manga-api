import { createApp } from "./src/infraestructure/api/index.ts";

const port = 8000;
const app = createApp();
await app.listen({ port });
