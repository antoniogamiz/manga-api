import fetchData from "../../src/utils/http";
import ManganeloParser from "../../src/parsers/manganelo";
import { Chapter } from "../../src/types/manga";

import test_case from "./chapter_test_cases.json";

test("Get chapter title", async () => {
  const html: string = await fetchData(test_case.chapters[0].url);
  const parser = new ManganeloParser();
  const chapter: Chapter = parser.parseChapter(html);
  expect(chapter.title).toBe(test_case.chapters[0].title);
  expect(chapter.chapterPages).toStrictEqual(
    test_case.chapters[0].chapterPages
  );
});
