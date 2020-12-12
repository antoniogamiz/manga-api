import { ObjectFactory } from "../../../src/modules/common/factories/ObjectFactory.ts";

import { assertEquals } from "../../../src/deps.ts";
import { ParsingError } from "../../../src/parsers/errors/index.ts";
import { GetChapterController } from "../../../src/parsers/controllers/index.ts";

Deno.test("Should return a ChapterResponse", async () => {
  mockParseChapterPageUseCase();
  const parseChapterPageUseCase = new GetChapterController();

  const response = await parseChapterPageUseCase.run({
    mangaId: "mocked",
    chapterId: "mocked",
  });

  assertEquals(response.title, "MockManga");
});

Deno.test("Should return a bad request error", async () => {
  mockParseChapterPageUseCaseWithError();
  const parseChapterPageUseCase = new GetChapterController();

  const response = await parseChapterPageUseCase.run({
    mangaId: "mocked",
    chapterId: "mocked",
  });

  assertEquals(response.statusCode, 400);
});

const mockParseChapterPageUseCase = () => {
  ObjectFactory.mockWithInstance("ParseChapterPageUseCaseInterface", {
    run: () => {},
    getResults: () => ({
      title: "MockManga",
      chapterPages: [],
    }),
  });
};

const mockParseChapterPageUseCaseWithError = () => {
  ObjectFactory.mockWithInstance("ParseChapterPageUseCaseInterface", {
    run: () => {},
    getResults: () => new ParsingError("Title"),
  });
};
