import { assertEquals } from "../../../src/deps.ts";
import { makeParseMangaListPageUseCase } from "../../../src/parsers/use-cases/index.ts";
import { HttpPageDataAccess } from "../../../src/parsers/repositories/index.ts";
import { expected } from "./json/ParseMangaListPageUseCase.ts";

Deno.test("Should return a list of manga entries", async () => {
  const { url, entries } = expected;
  const parseMangaListPageUseCase = makeParseMangaListPageUseCase(
    new HttpPageDataAccess()
  );

  await parseMangaListPageUseCase.run(url);
  const result = parseMangaListPageUseCase.getResults();

  assertEquals(result, entries);
});
