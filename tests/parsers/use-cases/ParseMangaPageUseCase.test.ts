import { assertEquals } from "../../../src/deps.ts";
import { ParseMangaPageUseCase } from "../../../src/parsers/use-cases/index.ts";
import { expected } from "./json/ParseMangaPageUseCase.ts";
import { HttpPageDataAccess } from "../../../src/parsers/data-access/HttpPageDataAccess.ts";
import { HttpPageDataAccessMock } from "../mocks/data-access/HttpPageDataAccessMock.ts";

Deno.test("ParseMangaPageUseCase", async () => {
  const { url } = expected;
  const httpPageDataAccess = new HttpPageDataAccess();
  const html = await httpPageDataAccess.get(url);
  const parseMangaPageUseCase = HttpPageDataAccessMock(
    ParseMangaPageUseCase,
    html
  ) as ParseMangaPageUseCase;

  Deno.test("Should return the title of the manga", () => {
    const { title } = expected;
    const { result } = parseMangaPageUseCase.parseTitle();

    assertEquals(result, title);
  });
});
