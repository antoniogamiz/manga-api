import { assertEquals } from "../../../src/deps.ts";
import { makeGetMangaController } from "../../../src/parsers/controllers/index.ts";
import { Status } from "../../../src/parsers/enums/index.ts";
import { ParsingError } from "../../../src/parsers/errors/index.ts";

Deno.test("Should return a MangaResponse", async () => {
  const parseChapterPageUseCase = makeGetMangaController(
    mockParseChapterPageUseCase()
  );

  const response = await parseChapterPageUseCase.run({ mangaId: "mocked" });

  assertEquals(response.title, "MockManga");
});

Deno.test("Should return a bad request error", async () => {
  const parseChapterPageUseCase = makeGetMangaController(
    mockParseChapterPageUseCaseWithError()
  );

  const response = await parseChapterPageUseCase.run({ mangaId: "mocked" });

  assertEquals(response.statusCode, 400);
});

const mockManga = {
  title: "MockManga",
  alternativeTitles: [],
  status: Status.COMPLETED,
  genres: [],
  chapters: [],
  chapterEntries: [],
};

const mockParseChapterPageUseCase = () => {
  return {
    run: () => {},
    getResults: () => ({ result: mockManga }),
  };
};

const mockParseChapterPageUseCaseWithError = () => {
  return {
    run: () => {},
    getResults: () => ({
      result: mockManga,
      error: new ParsingError("Title"),
    }),
  };
};
