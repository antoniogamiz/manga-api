import { assertEquals } from "../../../src/deps.ts";
import {
  makeParseMangaPageUseCase,
  ParseMangaPageUseCase,
} from "../../../src/parsers/use-cases/index.ts";
import { HttpPageDataAccess } from "../../../src/parsers/repositories/index.ts";
import { expected } from "./json/ParseMangaPageUseCase.ts";

const parseMangaPageUseCase = new ParseMangaPageUseCase(
  new HttpPageDataAccess()
);

Deno.test("Should return the title of a manga", async () => {
  const { url, title } = expected;
  await parseMangaPageUseCase.run(url);
  const { result } = parseMangaPageUseCase.parseTitle();

  assertEquals(result, title);
});

Deno.test("Should return the alternative title of a manga", async () => {
  const { url, alternativeTitles } = expected;
  await parseMangaPageUseCase.run(url);
  const { result } = parseMangaPageUseCase.parseAlternativeTitles();

  assertEquals(result, alternativeTitles);
});

Deno.test("Should return the status of a manga", async () => {
  const { url, status } = expected;
  await parseMangaPageUseCase.run(url);
  const { result } = parseMangaPageUseCase.parseStatus();

  assertEquals(result, status);
});

Deno.test("Should return the genres of a manga", async () => {
  const { url, genres } = expected;
  await parseMangaPageUseCase.run(url);
  const { result } = parseMangaPageUseCase.parseGenres();

  assertEquals(result, genres);
});

Deno.test("Should return the chapters entries of a manga", async () => {
  const { url, chapterEntries } = expected;
  await parseMangaPageUseCase.run(url);
  const { result } = parseMangaPageUseCase.parseChapters();

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
  const parseMangaPageUseCase = makeParseMangaPageUseCase(
    new HttpPageDataAccess()
  );
  await parseMangaPageUseCase.run(url);
  const { result } = parseMangaPageUseCase.getResults();

  assertEquals(result, {
    title,
    alternativeTitles,
    genres,
    status,
    chapterEntries,
    chapters: [],
  });
});
