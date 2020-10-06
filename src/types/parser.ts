import { Manga, Status, Genre, Chapter, ChapterEntry } from "./manga";

export interface MangaParser {
  parse: (html: string) => Manga;
  parseTitle: (html: string) => string;
  parseAlternativeTitles: (html: string) => string[];
  parseStatus: (html: string) => Status;
  parseGenres: (html: string) => Genre[];
  parseChapters: (html: string) => ChapterEntry[];
  parseChapter: (html: string) => Chapter;
}
