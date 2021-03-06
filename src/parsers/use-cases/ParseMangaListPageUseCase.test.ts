import { assertEquals } from "../../deps.ts";

import { ParseMangaListPageUseCase } from "./index.ts";
import { expected } from "./json/ParseMangaListPageUseCase.ts";

Deno.test("Should return a list of manga entries", async () => {
  const { url, entries } = expected;
  const parseMangaListPageUseCase = new ParseMangaListPageUseCase();

  await parseMangaListPageUseCase.run(url);
  const result = parseMangaListPageUseCase.getResults();

  assertEquals(result, entries);
});
