// @ts-ignore deno-lint-ignore
import { cheerio } from "../../deps.ts";

import { ParseMangaPageUseCaseInterface } from "../interfaces/use-cases/index.ts";
import { MangaEntity, ChapterEntryEntity } from "../entities/index.ts";
import {
  Genre,
  Status,
  stringToGenre,
  stringToStatus,
} from "../enums/index.ts";
import { HttpPageDataAccessInterface } from "../interfaces/repositories/index.ts";
import { ParsingResult } from "../utils/index.ts";
import { ParsingError } from "../errors/index.ts";

enum ROW_HEADERS {
  alternativeTitles = "Alternative",
  status = "Status",
  genres = "Genres",
}

export class ParseMangaPageUseCase implements ParseMangaPageUseCaseInterface {
  html: string;
  parsingResult: ParsingResult<MangaEntity>;
  static ROW_HEADERS = ROW_HEADERS;

  constructor(
    public readonly httpPageDataAccess: HttpPageDataAccessInterface
  ) {}

  async run(url: string) {
    this.html = await this.httpPageDataAccess.get(url, 3);

    const title = this.parseTitle();
    const alternativeTitles = this.parseAlternativeTitles();
    const status = this.parseStatus();
    const genres = this.parseGenres();
    const chaptersEntries = this.parseChapters();

    const firstErrorInParsing =
      title.error ||
      alternativeTitles.error ||
      status.error ||
      genres.error ||
      chaptersEntries.error;

    this.parsingResult = {
      error: firstErrorInParsing,
      result: {
        title: title.result,
        alternativeTitles: alternativeTitles.result,
        status: status.result,
        genres: genres.result,
        chapters: [],
        chapterEntries: chaptersEntries.result,
      },
    };
  }

  getResults() {
    return this.parsingResult;
  }

  parseTitle(): ParsingResult<string> {
    const $ = cheerio.load(this.html);
    const title = $("h1").text();

    const parsingResult: ParsingResult<string> = { result: title };
    if (!title) {
      parsingResult.error = new ParsingError("Title");
    }
    return parsingResult;
  }

  parseAlternativeTitles(): ParsingResult<string[]> {
    const $ = cheerio.load(this.html);
    const parsingResult: ParsingResult<string[]> = { result: [] };

    const rowIndex = this.findCorrectIndex(ROW_HEADERS.alternativeTitles);
    if (rowIndex === -1) return parsingResult;

    const alternativeTitles = $(
      `.variations-tableInfo tbody tr:nth-child(${rowIndex}) td:nth-child(2) h2`
    )
      .text()
      .split(";")
      .filter(Boolean)
      .map((e: string) => e.trim());

    parsingResult.result = alternativeTitles;
    if (!alternativeTitles)
      parsingResult.error = new ParsingError("Alternitve Titles");

    return parsingResult;
  }

  parseStatus(): ParsingResult<Status> {
    const $ = cheerio.load(this.html);
    const rowIndex = this.findCorrectIndex(ROW_HEADERS.status);
    const statusText = $(
      `.variations-tableInfo tbody tr:nth-child(${rowIndex}) td:nth-child(2)`
    ).text();
    const status = stringToStatus(statusText);

    const parsingResult: ParsingResult<Status> = { result: status };
    if (!status) {
      parsingResult.error = new ParsingError("Status");
    }

    return parsingResult;
  }

  parseGenres(): ParsingResult<Genre[]> {
    const $ = cheerio.load(this.html);
    const rowIndex = this.findCorrectIndex(ROW_HEADERS.genres);
    const genres = $(
      `.variations-tableInfo tbody tr:nth-child(${rowIndex}) td:nth-child(2) a`
    )
      .map((i: number, e: CheerioElement) => $(e).text())
      .get()
      .map((g: string) => stringToGenre(g));

    const parsingResult: ParsingResult<Genre[]> = { result: genres };
    if (!genres) {
      parsingResult.error = new ParsingError("Genres");
    }

    return parsingResult;
  }

  parseChapters(): ParsingResult<ChapterEntryEntity[]> {
    const $ = cheerio.load(this.html);
    const chapters = $(".row-content-chapter .a-h .chapter-name")
      .map((i: number, e: CheerioElement) => ({ url: $(e).attr("href") }))
      .get();

    const parsingResult: ParsingResult<ChapterEntryEntity[]> = {
      result: chapters,
    };
    if (!chapters) {
      parsingResult.error = new ParsingError("Chapters");
    }

    return parsingResult;
  }

  findCorrectIndex(header: ROW_HEADERS): number {
    const $ = cheerio.load(this.html);
    for (let i = 0; i < 5; i++) {
      const rowTitle = $(
        `.variations-tableInfo tbody tr:nth-child(${i}) td:nth-child(1)`
      ).text();
      if (rowTitle.includes(header)) return i;
    }
    return -1;
  }
}

export const makeParseMangaPageUseCase = (
  httpPageDataAccess: HttpPageDataAccessInterface
): ParseMangaPageUseCaseInterface =>
  new ParseMangaPageUseCase(httpPageDataAccess);
