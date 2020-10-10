// @ts-ignore
import { ManganeloParser } from "../../src/parsers/index.ts";
// @ts-ignore
import fetchPage from "../../src/utils/http.ts";
import {
  Chapter,
  ChapterEntry,
  Genre,
  Manga,
  Status,
  // @ts-ignore;
} from "../../src/types/index.ts";
// @ts-ignore;
import { assert } from "../../src/deps.ts";

import spec from "./manganelo-spec.js";

Deno.test("Basic fetch try", async () => {
  const html = await fetchPage("https://google.com");
  assert(html);
});
