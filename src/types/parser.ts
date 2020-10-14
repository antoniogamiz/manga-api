// @ts-ignore deno-lint-ignore
import { Chapter, ChapterEntry, Genre, Manga, Status } from "./manga.ts";

/**
 * Generic parser. All supported manga sites must provide an implementation of this interface.
 */
export interface MangaParser {
  parse: (html: string) => Manga;
  parseTitle: (html: string) => string;
  parseAlternativeTitles: (html: string) => string[];
  parseStatus: (html: string) => Status;
  parseGenres: (html: string) => Genre[];
  parseChapters: (html: string) => ChapterEntry[];
  parseChapter: (html: string) => Chapter;
}
