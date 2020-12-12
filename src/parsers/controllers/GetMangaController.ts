import { MangaRequest, MangaResponse } from "../entities/index.ts";
import { GetMangaControllerInterface } from "../interfaces/controllers/index.ts";
import { ParseMangaPageUseCaseInterface } from "../interfaces/use-cases/index.ts";
import { MANGA_URL } from "../../Settings.ts";

export class GetMangaController implements GetMangaControllerInterface {
  constructor(
    public readonly parseMangaPageUseCase: ParseMangaPageUseCaseInterface
  ) {}

  async run(request: MangaRequest): Promise<MangaResponse> {
    const { mangaId } = request;
    const url = `${MANGA_URL}manga/${mangaId}`;
    await this.parseMangaPageUseCase.run(url);
    const { result, error } = this.parseMangaPageUseCase.getResults();

    if (error) {
      return {
        errorMessage: error.message,
        statusCode: 400,
      };
    }

    const { title, alternativeTitles, status, genres, chapterEntries } = result;
    return {
      title,
      alternativeTitles,
      status,
      genres,
      chapterEntries,
      statusCode: 200,
    };
  }
}

export const makeGetMangaController = (
  parseMangaPageUseCase: ParseMangaPageUseCaseInterface
): GetMangaControllerInterface => new GetMangaController(parseMangaPageUseCase);
