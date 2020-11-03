// @ts-ignore deno-lint-ignore
import {
  Chapter,
  ChapterEntry,
  Genre,
  Manga,
  MangaListEntry,
  Status,
} from "./manga.ts";

export class ParsingError extends Error {
  constructor(public attr: string, public html?: string) {
    super(`${attr} cannot be parsed`);
    this.html = html;
    this.name = "ParsingError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export type ParsingResult<T> = {
  data: T;
  error?: ParsingError;
};

/**
 * Every page form genre URLs in a different way, so we need to store it
 * to know where to parse genre information
 */
export type GenreURLs = Record<Genre, string>;

/**
 * Generic parser. All supported manga sites must provide an implementation of this interface.
 */
export interface MangaParser {
  genreURLs: GenreURLs;
  parse: (html: string) => ParsingResult<Manga>;
  parseTitle: (html: string) => ParsingResult<string>;
  parseAlternativeTitles: (html: string) => ParsingResult<string[]>;
  parseStatus: (html: string) => ParsingResult<Status>;
  parseGenres: (html: string) => ParsingResult<Genre[]>;
  parseChapters: (html: string) => ParsingResult<ChapterEntry[]>;
  parseChapter: (html: string) => ParsingResult<Chapter>;
  parseMangaList: (html: string) => ParsingResult<MangaListEntry[]>;
}
