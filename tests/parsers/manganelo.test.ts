import fetchData from "../../src/utils/http";
import ManganeloParser from "../../src/parsers/manganelo";
import { Chapter } from "../../src/types/manga";

import test_case from "./chapter_test_cases.json";

describe("Parse Chapter", () => {
  const parser = new ManganeloParser();

  test("Get chapter title", async () => {
    const html: string = await fetchData(test_case.chapters[0].url);
    const chapter: Chapter = parser.parseChapter(html);
    expect(chapter.title).toBe(test_case.chapters[0].title);
  });

  test("Get chapter pages", async () => {
    const html: string = await fetchData(test_case.chapters[0].url);
    const chapter: Chapter = parser.parseChapter(html);
    expect(chapter.chapterPages).toStrictEqual(
      test_case.chapters[0].chapterPages
    );
  });
});
