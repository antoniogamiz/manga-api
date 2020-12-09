import { assertEquals } from "../../../src/deps.ts";
import { HttpPageDataAccess } from "../../../src/parsers/data-access/index.ts";
import { ParseChapterPageUseCase } from "../../../src/parsers/use-cases/index.ts";

import { expected } from "./json/ParseChapterPageUseCase.ts";

Deno.test("Should return the title of the manga", async () => {
  const { url, title } = expected;
  const httpPageDataAccess = new HttpPageDataAccess();
  const html: string = await httpPageDataAccess.get(url);

  const parseChapterPageUseCase = new ParseChapterPageUseCase();
  parseChapterPageUseCase.run(html);
  const { result } = parseChapterPageUseCase.getResults();

  assertEquals(result.title, title);
});

Deno.test("Should return the chapter pages of the manga", async () => {
  const { url, chapterPages } = expected;
  const httpPageDataAccess = new HttpPageDataAccess();
  const html: string = await httpPageDataAccess.get(url);

  const parseChapterPageUseCase = new ParseChapterPageUseCase();
  parseChapterPageUseCase.run(html);
  const { result } = parseChapterPageUseCase.getResults();

  assertEquals(result.chapterPages, chapterPages);
});
