import { HttpPageDataAccess } from "../../../src/parsers/repositories/index.ts";

import { assert, assertThrowsAsync } from "../../../src/deps.ts";

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
