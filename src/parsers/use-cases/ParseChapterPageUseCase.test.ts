import { assertEquals } from "../../deps.ts";

import { ParseChapterPageUseCase } from "./index.ts";
import { expected } from "./json/ParseChapterPageUseCase.ts";
import { ChapterEntity } from "../entities/index.ts";

Deno.test("Should return the title of the manga", async () => {
  const { url, title } = expected;
  const parseChapterPageUseCase = new ParseChapterPageUseCase();

  await parseChapterPageUseCase.run(url);
  const result = parseChapterPageUseCase.getResults() as ChapterEntity;

  assertEquals(result.title, title);
});

Deno.test("Should return the chapter pages of the manga", async () => {
  const { url, chapterPages } = expected;
  const parseChapterPageUseCase = new ParseChapterPageUseCase();

  await parseChapterPageUseCase.run(url);
  const result = parseChapterPageUseCase.getResults() as ChapterEntity;

  assertEquals(result.chapterPages, chapterPages);
});
