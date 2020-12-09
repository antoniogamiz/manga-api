// @ts-ignore deno-lint-ignore
import { cheerio } from "../../deps.ts";

import { MangaListEntryEntity } from "../entities/index.ts";
import { ParseMangaListPageUseCaseInterface } from "../interfaces/use-cases/index.ts";
import { ParsingResult } from "../utils/index.ts";
import { ParsingError } from "../errors/index.ts";
import { HttpPageDataAccess } from "../data-access/index.ts";
import { Injectable } from "https://deno.land/x/inject@v0.1.1/decorators.ts";

@Injectable({ isSingleton: false })
export class ParseMangaListPageUseCase
  implements ParseMangaListPageUseCaseInterface {
  parsingResult: ParsingResult<MangaListEntryEntity>;

  constructor(public readonly httpPageDataAccess: HttpPageDataAccess) {}

  async run(url: string) {
    const html = await this.httpPageDataAccess.get(url);
    const $ = cheerio.load(html);
    const entries = $(".panel-content-genres .content-genres-item > a")
      .map((i: number, e: cheerio) => ({
        title: $(e).attr("title"),
        url: $(e).attr("href"),
      }))
      .get();

    this.parsingResult = { result: entries };
    if (!entries)
      this.parsingResult.error = new ParsingError(`MangaList (${url})`);
  }

  getResults(): ParsingResult<MangaListEntryEntity> {
    return this.parsingResult;
  }
}
