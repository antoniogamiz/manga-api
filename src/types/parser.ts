// @ts-ignore
import { Chapter, Genre, Manga, Status } from "./manga.ts";

export interface MangaParser {
  parse: (html: string) => Manga;
  parseTitle: (html: string) => string;
  parseAlternativeTitles: (html: string) => string[];
  parseStatus: (html: string) => Status;
  parseGenres: (html: string) => Genre[];
  parseChapters: (html: string) => Chapter[];
  parseChapter: (html: string) => Chapter;
}
