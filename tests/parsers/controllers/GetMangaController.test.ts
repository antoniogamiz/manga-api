import { assertEquals } from "../../../src/deps.ts";
import { makeGetMangaController } from "../../../src/parsers/controllers/index.ts";
import { Status } from "../../../src/parsers/enums/index.ts";
import { ParsingError } from "../../../src/parsers/errors/index.ts";

Deno.test("Should return a MangaResponse", async () => {
  const parseMangaPageUseCase = makeGetMangaController(
    mockParseChapterPageUseCase()
  );

  const response = await parseMangaPageUseCase.run({ mangaId: "mocked" });

  assertEquals(response.title, "MockManga");
});

Deno.test("Should return a bad request error", async () => {
  const parseMangaPageUseCase = makeGetMangaController(
    mockMangaChapterPageUseCaseWithError()
  );

  const response = await parseMangaPageUseCase.run({ mangaId: "mocked" });

  assertEquals(response.statusCode, 400);
});

const mockParseChapterPageUseCase = () => {
  return {
    run: () => {},
    getResults: () => ({
      title: "MockManga",
      alternativeTitles: [],
      status: Status.COMPLETED,
      genres: [],
      chapters: [],
      chapterEntries: [],
    }),
  };
};

const mockMangaChapterPageUseCaseWithError = () => {
  return {
    run: () => {},
    getResults: () => new ParsingError("Title"),
  };
};
