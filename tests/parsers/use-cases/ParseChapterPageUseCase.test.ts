import { assertEquals, bootstrap } from "../../../src/deps.ts";
import { makeParseChapterPageUseCase } from "../../../src/parsers/use-cases/index.ts";
import { HttpPageDataAccess } from "../../../src/parsers/repositories/index.ts";

import { expected } from "./json/ParseChapterPageUseCase.ts";

Deno.test("Should return the title of the manga", async () => {
  const { url, title } = expected;
  const parseChapterPageUseCase = makeParseChapterPageUseCase(
    new HttpPageDataAccess()
  );

  await parseChapterPageUseCase.run(url);
  const { result } = parseChapterPageUseCase.getResults();

  assertEquals(result.title, title);
});

Deno.test("Should return the chapter pages of the manga", async () => {
  const { url, chapterPages } = expected;

  const parseChapterPageUseCase = makeParseChapterPageUseCase(
    new HttpPageDataAccess()
  );
  await parseChapterPageUseCase.run(url);
  const { result } = parseChapterPageUseCase.getResults();

  assertEquals(result.chapterPages, chapterPages);
});
