import { assertEquals, bootstrap } from "../../../src/deps.ts";
import { ParseChapterPageUseCase } from "../../../src/parsers/use-cases/index.ts";

import { expected } from "./json/ParseChapterPageUseCase.ts";

Deno.test("Should return the title of the manga", async () => {
  const { url, title } = expected;
  const parseChapterPageUseCase = bootstrap(ParseChapterPageUseCase);

  await parseChapterPageUseCase.run(url);
  const { result } = parseChapterPageUseCase.getResults();

  assertEquals(result.title, title);
});

Deno.test("Should return the chapter pages of the manga", async () => {
  const { url, chapterPages } = expected;

  const parseChapterPageUseCase = bootstrap(ParseChapterPageUseCase);
  await parseChapterPageUseCase.run(url);
  const { result } = parseChapterPageUseCase.getResults();

  assertEquals(result.chapterPages, chapterPages);
});
