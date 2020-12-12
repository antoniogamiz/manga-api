import { ObjectFactory } from "../../modules/common/factories/ObjectFactory.ts";
import { assertEquals } from "../../deps.ts";

import { Status } from "../enums/index.ts";
import { ParsingError } from "../errors/index.ts";
import { GetMangaController } from "./index.ts";

Deno.test("Should return a MangaResponse", async () => {
  mockParseChapterPageUseCase();
  const parseMangaPageUseCase = new GetMangaController();

  const response = await parseMangaPageUseCase.run({ mangaId: "mocked" });

  assertEquals(response.title, "MockManga");
});

Deno.test("Should return a bad request error", async () => {
  mockMangaChapterPageUseCaseWithError();
  const parseMangaPageUseCase = new GetMangaController();

  const response = await parseMangaPageUseCase.run({ mangaId: "mocked" });

  assertEquals(response.statusCode, 400);
});

const mockParseChapterPageUseCase = () => {
  ObjectFactory.mockWithInstance("ParseMangaPageUseCaseInterface", {
    run: () => {},
    getResults: () => ({
      title: "MockManga",
      alternativeTitles: [],
      status: Status.COMPLETED,
      genres: [],
      chapters: [],
      chapterEntries: [],
    }),
  });
};

const mockMangaChapterPageUseCaseWithError = () => {
  ObjectFactory.mockWithInstance("ParseMangaPageUseCaseInterface", {
    run: () => {},
    getResults: () => new ParsingError("Title"),
  });
};
