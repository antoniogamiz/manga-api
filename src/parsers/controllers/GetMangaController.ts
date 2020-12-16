import { ObjectFactory } from "../../modules/common/factories/ObjectFactory.ts";

import { MangaEntity, MangaRequest, MangaResponse } from "../entities/index.ts";
import { GetMangaControllerInterface } from "../interfaces/controllers/index.ts";
import { ParseMangaPageUseCaseInterface } from "../interfaces/use-cases/index.ts";
import Settings from "../../Settings.ts";
import { isParsingError, ParsingResult } from "../utils/index.ts";

export class GetMangaController implements GetMangaControllerInterface {
  parseMangaPageUseCase: ParseMangaPageUseCaseInterface;

  constructor() {
    this.parseMangaPageUseCase = ObjectFactory.getInstance<ParseMangaPageUseCaseInterface>(
      "ParseMangaPageUseCaseInterface"
    );
  }

  async run(request: MangaRequest): Promise<MangaResponse> {
    const { mangaId } = request;
    const url = `${Settings.MANGA_URL}manga/${mangaId}`;
    await this.parseMangaPageUseCase.run(url);
    const mangaEntity = this.parseMangaPageUseCase.getResults() as ParsingResult<MangaEntity>;

    if (isParsingError(mangaEntity)) {
      return {
        errorMessage: mangaEntity.message,
        statusCode: 400,
      };
    }

    const {
      title,
      alternativeTitles,
      status,
      genres,
      chapterEntries,
    } = mangaEntity;

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
