import fetchPage from "../../src/utils/http.ts";
import { assert, assertThrowsAsync } from "../../src/deps.ts";

Deno.test("Basic fetch try", async () => {
  const html = await fetchPage("https://google.com");
  assert(html);
});

Deno.test("Bad fetch try", async function (): Promise<void> {
  await assertThrowsAsync(
    async (): Promise<void> => {
      await fetchPage("badFormedURL");
    },
  );
});
