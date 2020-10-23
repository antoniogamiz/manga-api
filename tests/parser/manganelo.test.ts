// @ts-ignore deno-lint-ignore
import { ManganeloParser, ROW_HEADERS } from "../../src/parsers/index.ts";
// @ts-ignore deno-lint-ignore
import fetchPage from "../../src/utils/http.ts";
import {
  Chapter,
  ChapterEntry,
  Genre,
  Manga,
  Status,
  // @ts-ignore deno-lint-ignore
} from "../../src/types/index.ts";
// @ts-ignore deno-lint-ignore
import { assertEquals } from "../../src/deps.ts";

import spec from "./manganelo-spec.js";

const parser: ManganeloParser = new ManganeloParser();

for (let i = 0; i < spec.mangas.length; i++) {
  Deno.test(`Spec case ${i}: title`, async () => {
    const html: string = await fetchPage(spec.mangas[i].url);
    const title: string = parser.parseTitle(html).data;
    assertEquals(title, spec.mangas[i].title);
  });

  Deno.test(`Spec case ${i}: alternative titles`, async () => {
    const html: string = await fetchPage(spec.mangas[i].url);
    const alternativeTitles: string[] = parser.parseAlternativeTitles(html)
      .data;
    assertEquals(alternativeTitles, spec.mangas[i].alternativeTitles);
  });

  Deno.test(`Spec case ${i}: status`, async () => {
    const html: string = await fetchPage(spec.mangas[i].url);
    const status: Status = parser.parseStatus(html).data;
    assertEquals(status, spec.mangas[i].status);
  });

  Deno.test(`Spec case ${i}: row indexes`, async () => {
    const html: string = await fetchPage(spec.mangas[i].url);
    let index: number = parser.findCorrectIndex(
      ROW_HEADERS.alternativeTitles,
      html
    );
    assertEquals(index, spec.mangas[i].indexes.alternativeTitles);
    index = parser.findCorrectIndex(ROW_HEADERS.status, html);
    assertEquals(index, spec.mangas[i].indexes.status);
    index = parser.findCorrectIndex(ROW_HEADERS.genres, html);
    assertEquals(index, spec.mangas[i].indexes.genres);
  });

  Deno.test(`Spec case ${i}: genres`, async () => {
    const html: string = await fetchPage(spec.mangas[i].url);
    const genres: Genre[] = parser.parseGenres(html).data;
    assertEquals(genres, spec.mangas[i].genres);
  });

  Deno.test(`Spec case ${i}: get all chapters`, async () => {
    const html: string = await fetchPage(spec.mangas[i].url);
    const chapters: ChapterEntry[] = parser.parseChapters(html).data;
    assertEquals(chapters, spec.mangas[i].chapter_entries);
  });

  Deno.test(`Spec case ${i}: get chapter title`, async () => {
    const html: string = await fetchPage(spec.mangas[i].chapters[0].url);
    const chapter: Chapter = parser.parseChapter(html).data;
    assertEquals(chapter.title, spec.mangas[i].chapters[0].title);
  });

  Deno.test(`Spec case ${i}: get chapter pages`, async () => {
    const html: string = await fetchPage(spec.mangas[i].chapters[0].url);
    const chapter: Chapter = parser.parseChapter(html).data;
    assertEquals(chapter.chapterPages, spec.mangas[i].chapters[0].chapterPages);
  });
}
