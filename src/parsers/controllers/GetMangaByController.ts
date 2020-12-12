import { ObjectFactory } from "../../modules/common/factories/ObjectFactory.ts";

import {
  MangaListEntryEntity,
  MangaByRequest,
  MangaByResponse,
} from "../entities/index.ts";
import { Genre, Status } from "../enums/index.ts";
import { genreIndexes } from "../utils/GenreURL.ts";
import { GetMangaByControllerInterface } from "../interfaces/controllers/index.ts";
import { ParseMangaListPageUseCaseInterface } from "../interfaces/use-cases/index.ts";
import { isParsingError, ParsingResult } from "../utils/index.ts";
import { MANGA_URL } from "../../Settings.ts";

export class GetMangaByController implements GetMangaByControllerInterface {
  parseMangaListPageUseCase: ParseMangaListPageUseCaseInterface;

  constructor() {
    this.parseMangaListPageUseCase = ObjectFactory.getInstance<ParseMangaListPageUseCaseInterface>(
      "ParseMangaListPageUseCaseInterface"
    );
  }

  async run(request: MangaByRequest): Promise<MangaByResponse> {
    const { genre, status } = request;
    const url = this.buildURL(genre, status);
    await this.parseMangaListPageUseCase.run(url);
    const mangaListEntryEntity = this.parseMangaListPageUseCase.getResults() as ParsingResult<
      MangaListEntryEntity[]
    >;

    if (isParsingError(mangaListEntryEntity)) {
      return {
        errorMessage: mangaListEntryEntity.message,
        statusCode: 400,
      };
    }

    return {
      mangaEntries: mangaListEntryEntity,
      statusCode: 200,
    };
  }

  buildURL(genre?: Genre, status?: Status): string {
    let uri;
    const genreIndex = genreIndexes.get(genre as number);
    const statusString = status === Status.COMPLETED ? "completed" : "ongoing";

    if (status && genre)
      uri = `advanced_search?s=all&g_i=_${genreIndex}_&sts=${statusString}&page=1`;
    if (status && !genre)
      uri = `advanced_search?s=all&sts=${statusString}&page=1`;
    if (!status && genre)
      uri = `advanced_search?s=all&g_i=_${genreIndex}_&page=1`;
    if (!status && !genre) uri = "genre-all";

    return `${MANGA_URL}${uri}`;
  }
}
