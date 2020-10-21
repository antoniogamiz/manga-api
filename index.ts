import app from "./src/app.ts";

const port = 8000;
console.log(`Server listening at http://localhost:${port}`);
await app.listen({ port });
