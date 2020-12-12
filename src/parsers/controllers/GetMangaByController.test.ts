import { ObjectFactory } from "../../modules/common/factories/ObjectFactory.ts";
import { assertEquals } from "../../deps.ts";

import { Status, Genre } from "../enums/index.ts";
import { ParsingError } from "../errors/index.ts";
import { GetMangaByController } from "./index.ts";

Deno.test("Should return a MangaByResponse", async () => {
  mockParseMangaListPageUseCase();
  const parseChapterPageUseCase = new GetMangaByController();

  const response = await parseChapterPageUseCase.run({
    status: Status.COMPLETED,
    genre: Genre.DRAMA,
  });

  assertEquals(response.mangaEntries, [{ title: "mocked", url: "mocked" }]);
});

Deno.test("Should return a bad request error", async () => {
  mockParseMangaListPageUseCaseWithError();
  const parseChapterPageUseCase = new GetMangaByController();

  const response = await parseChapterPageUseCase.run({
    status: Status.COMPLETED,
    genre: Genre.DRAMA,
  });

  assertEquals(response.statusCode, 400);
});

const mockParseMangaListPageUseCase = () => {
  ObjectFactory.mockWithInstance("ParseMangaListPageUseCaseInterface", {
    run: () => {},
    getResults: () => [
      {
        title: "mocked",
        url: "mocked",
      },
    ],
  });
};

const mockParseMangaListPageUseCaseWithError = () => {
  ObjectFactory.mockWithInstance("ParseMangaListPageUseCaseInterface", {
    run: () => {},
    getResults: () => new ParsingError("Title"),
  });
};
