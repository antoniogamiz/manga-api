import { ObjectFactory } from "../../modules/common/factories/ObjectFactory.ts";

import {
  ChapterEntity,
  ChapterRequest,
  ChapterResponse,
} from "../entities/index.ts";
import { GetChapterControllerInterface } from "../interfaces/controllers/index.ts";
import { ParseChapterPageUseCaseInterface } from "../interfaces/use-cases/index.ts";
import { isParsingError, ParsingResult } from "../utils/index.ts";
import { MANGA_URL } from "../../Settings.ts";

export class GetChapterController implements GetChapterControllerInterface {
  parseChapterPageUseCase: ParseChapterPageUseCaseInterface;
  constructor() {
    this.parseChapterPageUseCase = ObjectFactory.getInstance<ParseChapterPageUseCaseInterface>(
      "ParseChapterPageUseCaseInterface"
    );
  }

  async run(request: ChapterRequest): Promise<ChapterResponse> {
    const { mangaId, chapterId } = request;
    const url = `${MANGA_URL}chapter/${mangaId}/${chapterId}`;
    await this.parseChapterPageUseCase.run(url);
    const chapterEntity = this.parseChapterPageUseCase.getResults() as ParsingResult<ChapterEntity>;

    if (isParsingError(chapterEntity)) {
      return {
        errorMessage: chapterEntity.message,
        statusCode: 400,
      };
    }

    return {
      ...chapterEntity,
      statusCode: 200,
    };
  }
}
