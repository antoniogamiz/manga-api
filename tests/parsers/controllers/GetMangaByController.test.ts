import { assertEquals } from "../../../src/deps.ts";
import { makeGetMangaByController } from "../../../src/parsers/controllers/index.ts";
import { Status, Genre } from "../../../src/parsers/enums/index.ts";
import { ParsingError } from "../../../src/parsers/errors/index.ts";

Deno.test("Should return a MangaByResponse", async () => {
  const parseChapterPageUseCase = makeGetMangaByController(
    mockParseMangaListPageUseCase()
  );

  const response = await parseChapterPageUseCase.run({
    status: Status.COMPLETED,
    genre: Genre.DRAMA,
  });

  assertEquals(response.mangaEntries, [{ title: "mocked", url: "mocked" }]);
});

Deno.test("Should return a bad request error", async () => {
  const parseChapterPageUseCase = makeGetMangaByController(
    mockParseMangaListPageUseCaseWithError()
  );

  const response = await parseChapterPageUseCase.run({
    status: Status.COMPLETED,
    genre: Genre.DRAMA,
  });

  assertEquals(response.statusCode, 400);
});

const mockParseMangaListPageUseCase = () => {
  return {
    run: () => {},
    getResults: () => [{ title: "mocked", url: "mocked" }],
  };
};

const mockParseMangaListPageUseCaseWithError = () => {
  return {
    run: () => {},
    getResults: () => new ParsingError("Title"),
  };
};
