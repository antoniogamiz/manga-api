import fetchData from "../../src/utils/http";
import ManganeloParser from "../../src/parsers/manganelo";
import { Chapter, ChapterEntry } from "../../src/types/manga";

import test_case from "./chapter_test_cases.json";

describe("Parse Chapters", () => {
  const parser = new ManganeloParser();

  test("Get all chapters", async () => {
    const html: string = await fetchData(test_case.mangas[0].url);
    const chapters: ChapterEntry[] = parser.parseChapters(html);
    expect(chapters).toStrictEqual(test_case.mangas[0].chapter_entries);
  });
});

describe("Parse Chapter", () => {
  const parser = new ManganeloParser();

  test("Get chapter title", async () => {
    const html: string = await fetchData(test_case.mangas[0].chapters[0].url);
    const chapter: Chapter = parser.parseChapter(html);
    expect(chapter.title).toBe(test_case.mangas[0].chapters[0].title);
  });

  test("Get chapter pages", async () => {
    const html: string = await fetchData(test_case.mangas[0].chapters[0].url);
    const chapter: Chapter = parser.parseChapter(html);
    expect(chapter.chapterPages).toStrictEqual(
      test_case.mangas[0].chapters[0].chapterPages
    );
  });
});
