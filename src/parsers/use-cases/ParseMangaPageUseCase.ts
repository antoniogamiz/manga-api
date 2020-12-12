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
import { ParsingResult, isParsingError } from "../utils/index.ts";
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
    let error;
    if (isParsingError(title)) error = title;

    const alternativeTitles = this.parseAlternativeTitles();
    if (isParsingError(alternativeTitles)) error = alternativeTitles;

    const status = this.parseStatus();
    if (isParsingError(status)) error = status;

    const genres = this.parseGenres();
    if (isParsingError(genres)) error = genres;

    const chapterEntries = this.parseChapters();
    if (isParsingError(chapterEntries)) error = chapterEntries;

    if (error) {
      this.parsingResult = error;
      return;
    }

    this.parsingResult = {
      title,
      alternativeTitles,
      status,
      genres,
      chapters: [],
      chapterEntries,
    } as MangaEntity;
  }

  getResults() {
    return this.parsingResult;
  }

  parseTitle(): ParsingResult<string> {
    const $ = cheerio.load(this.html);
    const title = $("h1").text();

    let parsingResult: ParsingResult<string> = title;
    if (!title) {
      parsingResult = new ParsingError("Title");
    }

    return parsingResult;
  }

  parseAlternativeTitles(): ParsingResult<string[]> {
    const $ = cheerio.load(this.html);
    const rowIndex = this.findCorrectIndex(ROW_HEADERS.alternativeTitles);

    if (rowIndex === -1) return [];

    const alternativeTitles = $(
      `.variations-tableInfo tbody tr:nth-child(${rowIndex}) td:nth-child(2) h2`
    )
      .text()
      .split(";")
      .filter(Boolean)
      .map((e: string) => e.trim());

    let parsingResult: ParsingResult<string[]> = alternativeTitles;
    if (!alternativeTitles)
      parsingResult = new ParsingError("Alternitve Titles");

    return parsingResult;
  }

  parseStatus(): ParsingResult<Status> {
    const $ = cheerio.load(this.html);
    const rowIndex = this.findCorrectIndex(ROW_HEADERS.status);
    const statusText = $(
      `.variations-tableInfo tbody tr:nth-child(${rowIndex}) td:nth-child(2)`
    ).text();
    const status = stringToStatus(statusText);

    let parsingResult: ParsingResult<Status> = status;
    if (!status) {
      parsingResult = new ParsingError("Status");
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

    let parsingResult: ParsingResult<Genre[]> = genres;
    if (!genres) {
      parsingResult = new ParsingError("Genres");
    }

    return parsingResult;
  }

  parseChapters(): ParsingResult<ChapterEntryEntity[]> {
    const $ = cheerio.load(this.html);
    const chapters = $(".row-content-chapter .a-h .chapter-name")
      .map((i: number, e: CheerioElement) => ({ url: $(e).attr("href") }))
      .get();

    let parsingResult: ParsingResult<ChapterEntryEntity[]> = chapters;
    if (!chapters) {
      parsingResult = new ParsingError("Chapters");
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
