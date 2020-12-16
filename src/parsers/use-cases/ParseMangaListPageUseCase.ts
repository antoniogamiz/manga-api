import { ObjectFactory } from "../../modules/common/factories/ObjectFactory.ts";

// @ts-ignore deno-lint-ignore
import { cheerio } from "../../deps.ts";
import { MangaListEntryEntity } from "../entities/index.ts";
import { ParseMangaListPageUseCaseInterface } from "../interfaces/use-cases/index.ts";
import { ParsingResult } from "../utils/index.ts";
import { ParsingError } from "../errors/index.ts";
import { HttpPageDataAccessInterface } from "../interfaces/repositories/index.ts";

export class ParseMangaListPageUseCase
  implements ParseMangaListPageUseCaseInterface {
  parsingResult: ParsingResult<MangaListEntryEntity[]>;
  httpPageDataAccess: HttpPageDataAccessInterface;

  constructor() {
    this.httpPageDataAccess = ObjectFactory.getInstance<HttpPageDataAccessInterface>(
      "HttpPageDataAccessInterface"
    );
  }

  async run(url: string) {
    const { html } = await this.httpPageDataAccess.get(url, 3);
    const $ = cheerio.load(html);
    const entries = $(".panel-content-genres .content-genres-item > a")
      .map((i: number, e: cheerio) => ({
        title: $(e).attr("title"),
        url: $(e).attr("href"),
      }))
      .get();

    if (!entries) {
      this.parsingResult = new ParsingError(`MangaList (${url})`);
      return;
    }

    this.parsingResult = entries;
  }

  getResults(): ParsingResult<MangaListEntryEntity[]> {
    return this.parsingResult;
  }
}
