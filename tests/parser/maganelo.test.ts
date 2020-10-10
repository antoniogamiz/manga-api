// @ts-ignore
import { ManganeloParser } from "../../src/parsers/index.ts";
// @ts-ignore
import fetchPage from "../../src/utils/http.ts";
import {
  Chapter,
  ChapterEntry,
  Genre,
  Manga,
  Status,
  // @ts-ignore;
} from "../../src/types/index.ts";
// @ts-ignore;
import { assertEquals } from "../../src/deps.ts";

import spec from "./manganelo-spec.js";

const parser: ManganeloParser = new ManganeloParser();

Deno.test("Parse title", async () => {
  const html: string = await fetchPage(spec.mangas[0].url);
  const title: string = parser.parseTitle(html);
  assertEquals(title, spec.mangas[0].title);
});

Deno.test("Parse alternative titles", async () => {
  const html: string = await fetchPage(spec.mangas[0].url);
  const alternativeTitles: string[] = parser.parseAlternativeTitles(html);
  assertEquals(alternativeTitles, spec.mangas[0].alternativeTitles);
});

Deno.test("Parse status", async () => {
  const html: string = await fetchPage(spec.mangas[0].url);
  const status: Status = parser.parseStatus(html);
  assertEquals(status, spec.mangas[0].status);
});

Deno.test("Parse genres", async () => {
  const html: string = await fetchPage(spec.mangas[0].url);
  const genres: Genre[] = parser.parseGenres(html);
  assertEquals(genres, spec.mangas[0].genres);
});

Deno.test("Parse manga metadata", async () => {
  const html: string = await fetchPage(spec.mangas[0].url);
  const manga: Manga = parser.parse(html);
  assertEquals(manga.title, spec.mangas[0].title);
  assertEquals(manga.alternativeTitles, spec.mangas[0].alternativeTitles);
  assertEquals(manga.status, spec.mangas[0].status);
  assertEquals(manga.genres, spec.mangas[0].genres);
});

Deno.test("Get all chapters", async () => {
  const html: string = await fetchPage(spec.mangas[0].url);
  const chapters: ChapterEntry[] = parser.parseChapters(html);
  assertEquals(chapters, spec.mangas[0].chapter_entries);
});

Deno.test("Get chapter title", async () => {
  const html: string = await fetchPage(spec.mangas[0].chapters[0].url);
  const chapter: Chapter = parser.parseChapter(html);
  assertEquals(chapter.title, spec.mangas[0].chapters[0].title);
});

Deno.test("Get chapter pages", async () => {
  const html: string = await fetchPage(spec.mangas[0].chapters[0].url);
  const chapter: Chapter = parser.parseChapter(html);
  assertEquals(
    chapter.chapterPages,
    spec.mangas[0].chapters[0].chapterPages,
  );
});
