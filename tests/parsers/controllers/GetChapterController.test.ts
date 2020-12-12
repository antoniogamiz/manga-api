import { assertEquals } from "../../../src/deps.ts";
import { makeGetChapterController } from "../../../src/parsers/controllers/index.ts";
import { Status } from "../../../src/parsers/enums/index.ts";
import { ParsingError } from "../../../src/parsers/errors/index.ts";

Deno.test("Should return a ChapterResponse", async () => {
  const parseChapterPageUseCase = makeGetChapterController(
    mockParseChapterPageUseCase()
  );

  const response = await parseChapterPageUseCase.run({
    mangaId: "mocked",
    chapterId: "mocked",
  });

  assertEquals(response.title, "MockManga");
});

Deno.test("Should return a bad request error", async () => {
  const parseChapterPageUseCase = makeGetChapterController(
    mockParseChapterPageUseCaseWithError()
  );

  const response = await parseChapterPageUseCase.run({
    mangaId: "mocked",
    chapterId: "mocked",
  });

  assertEquals(response.statusCode, 400);
});

const mockParseChapterPageUseCase = () => {
  return {
    run: () => {},
    getResults: () => ({
      title: "MockManga",
      chapterPages: [],
    }),
  };
};

const mockParseChapterPageUseCaseWithError = () => {
  return {
    run: () => {},
    getResults: () => new ParsingError("Title"),
  };
};
