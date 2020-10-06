import fetchData from "../../src/utils/http";
import ManganeloParser from "../../src/parsers/manganelo";
import { Status, Genre, Chapter, ChapterEntry } from "../../src/types/manga";

import test_case from "./chapter_test_cases.json";

describe.only("Parse manga metadata", () => {
  const parser = new ManganeloParser();

  test("Parse title", async () => {
    const html: string = await fetchData(test_case.mangas[0].url);
    const title: string = parser.parseTitle(html);
    expect(title).toStrictEqual(test_case.mangas[0].title);
  });

  test("Parse alternative titles", async () => {
    const html: string = await fetchData(test_case.mangas[0].url);
    const alternativeTitle: string[] = parser.parseAlternativeTitles(html);
    expect(alternativeTitle).toStrictEqual(
      test_case.mangas[0].alternativeTitles
    );
  });

  test("Parse status", async () => {
    const html: string = await fetchData(test_case.mangas[0].url);
    const status: Status = parser.parseStatus(html);
    expect(status).toBe(test_case.mangas[0].status);
  });

  test("Parse genres", async () => {
    const html: string = await fetchData(test_case.mangas[0].url);
    const genres: Genre[] = parser.parseGenres(html);
    expect(genres).toStrictEqual(test_case.mangas[0].genres);
  });
});

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
