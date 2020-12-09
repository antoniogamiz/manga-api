// @ts-ignore deno-lint-ignore
import { cheerio } from "../../deps.ts";

import { ChapterEntity } from "../entities/index.ts";
import { ParseChapterPageUseCaseInterface } from "../interfaces/use-cases/index.ts";
import { ParsingResult } from "../utils/index.ts";
import { ParsingError } from "../errors/index.ts";
import { Injectable } from "https://deno.land/x/inject@v0.1.1/decorators.ts";

@Injectable({ isSingleton: false })
export class ParseChapterPageUseCase
  implements ParseChapterPageUseCaseInterface {
  parsingResult: ParsingResult<ChapterEntity>;

  run(html: string) {
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
    this.validate();
  }

  validate() {
    const { title, chapterPages } = this.parsingResult.result;
    if (!title || !chapterPages)
      this.parsingResult.error = new ParsingError(`Chapter (${title})`);
  }

  getResults(): ParsingResult<ChapterEntity> {
    return this.parsingResult;
  }
}
