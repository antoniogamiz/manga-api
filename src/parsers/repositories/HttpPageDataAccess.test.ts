import { assert, assertThrowsAsync } from "../../deps.ts";

import { HttpPageDataAccess } from "./index.ts";

Deno.test("Basic fetch try", async () => {
  const httpPageDataAccess = new HttpPageDataAccess();
  const html = await httpPageDataAccess.get("https://google.com");

  assert(html);
});

Deno.test("Bad fetch try", async function (): Promise<void> {
  const httpPageDataAccess = new HttpPageDataAccess();

  await assertThrowsAsync(
    async (): Promise<void> => {
      await httpPageDataAccess.get("bad url");
    }
  );
});
