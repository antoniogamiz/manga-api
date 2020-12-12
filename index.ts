import app from "./src/infraestructure/api/index.ts";

const port = 8000;
await app.listen({ port });
