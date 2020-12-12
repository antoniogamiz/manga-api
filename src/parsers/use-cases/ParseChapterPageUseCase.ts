// @ts-ignore deno-lint-ignore
import { cheerio } from "../../deps.ts";

import { ChapterEntity } from "../entities/index.ts";
import { ParseChapterPageUseCaseInterface } from "../interfaces/use-cases/index.ts";
import { ParsingResult } from "../utils/index.ts";
import { HttpPageDataAccessInterface } from "../interfaces/repositories/index.ts";
import { ParsingError } from "../errors/index.ts";

export class ParseChapterPageUseCase
  implements ParseChapterPageUseCaseInterface {
  parsingResult: ParsingResult<ChapterEntity>;

  constructor(
    public readonly httpPageDataAccess: HttpPageDataAccessInterface
  ) {}

  async run(url: string) {
    const html = await this.httpPageDataAccess.get(url, 3);
    const $ = cheerio.load(html);
    const chapters = $(".container-chapter-reader")
      .contents()
      .map((i: number, e: cheerio) => $(e).attr("src"))
      .get();
    const chapter: ChapterEntity = {
      title: $("h1").text(),
      chapterPages: chapters.map((url: string) => ({ url: url })),
    };

    if (!chapter.title || !chapter.chapterPages) {
      this.parsingResult = new ParsingError(`Chapter (${url})`);
      return;
    }

    this.parsingResult = chapter;
  }

  getResults(): ParsingResult<ChapterEntity> {
    return this.parsingResult;
  }
}

export const makeParseChapterPageUseCase = (
  httpPageDataAccess: HttpPageDataAccessInterface
): ParseChapterPageUseCaseInterface =>
  new ParseChapterPageUseCase(httpPageDataAccess);
