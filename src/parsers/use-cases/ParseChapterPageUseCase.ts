// @ts-ignore deno-lint-ignore
import { cheerio } from "../../deps.ts";

import { ChapterEntity } from "../entities/index.ts";
import { ParseChapterPageUseCaseInterface } from "../interfaces/use-cases/index.ts";
import { ParsingResult } from "../utils/index.ts";
import { HttpPageDataAccess } from "../data-access/index.ts";
import { ParsingError } from "../errors/index.ts";
import { Injectable } from "https://deno.land/x/inject@v0.1.1/decorators.ts";

@Injectable({ isSingleton: false })
export class ParseChapterPageUseCase
  implements ParseChapterPageUseCaseInterface {
  parsingResult: ParsingResult<ChapterEntity>;

  constructor(public readonly httpPageDataAccess: HttpPageDataAccess) {}

  async run(url: string) {
    const html = await this.httpPageDataAccess.get(url);
    const $ = cheerio.load(html);
    const chapters = $(".container-chapter-reader")
      .contents()
      .map((i: number, e: cheerio) => $(e).attr("src"))
      .get();
    const chapter: ChapterEntity = {
      title: $("h1").text(),
      chapterPages: chapters.map((url: string) => ({ url: url })),
    };

    this.parsingResult = { result: chapter };
    if (!chapter.title || !chapter.chapterPages)
      this.parsingResult.error = new ParsingError(`Chapter (${url})`);
  }

  getResults(): ParsingResult<ChapterEntity> {
    return this.parsingResult;
  }
}
