import { assertEquals } from "../../../src/deps.ts";
import { ParseMangaPageUseCase } from "../../../src/parsers/use-cases/index.ts";
import { expected } from "./json/ParseMangaPageUseCase.ts";

Deno.test("Should return the title of a manga", async () => {
  const { url, title } = expected;
  const parseMangaPageUseCase = new ParseMangaPageUseCase();

  await parseMangaPageUseCase.run(url);
  const result = parseMangaPageUseCase.parseTitle();

  assertEquals(result, title);
});

Deno.test("Should return the alternative title of a manga", async () => {
  const { url, alternativeTitles } = expected;
  const parseMangaPageUseCase = new ParseMangaPageUseCase();

  await parseMangaPageUseCase.run(url);
  const result = parseMangaPageUseCase.parseAlternativeTitles();

  assertEquals(result, alternativeTitles);
});

Deno.test("Should return the status of a manga", async () => {
  const { url, status } = expected;
  const parseMangaPageUseCase = new ParseMangaPageUseCase();

  await parseMangaPageUseCase.run(url);
  const result = parseMangaPageUseCase.parseStatus();

  assertEquals(result, status);
});

Deno.test("Should return the genres of a manga", async () => {
  const { url, genres } = expected;
  const parseMangaPageUseCase = new ParseMangaPageUseCase();

  await parseMangaPageUseCase.run(url);
  const result = parseMangaPageUseCase.parseGenres();

  assertEquals(result, genres);
});

Deno.test("Should return the chapters entries of a manga", async () => {
  const { url, chapterEntries } = expected;
  const parseMangaPageUseCase = new ParseMangaPageUseCase();

  await parseMangaPageUseCase.run(url);
  const result = parseMangaPageUseCase.parseChapters();

  assertEquals(result, chapterEntries);
});

Deno.test("Should return a parsed manga", async () => {
  const {
    url,
    title,
    alternativeTitles,
    genres,
    status,
    chapterEntries,
  } = expected;
  const parseMangaPageUseCase = new ParseMangaPageUseCase();

  await parseMangaPageUseCase.run(url);
  const result = parseMangaPageUseCase.getResults();

  assertEquals(result, {
    title,
    alternativeTitles,
    genres,
    status,
    chapterEntries,
    chapters: [],
  });
});
