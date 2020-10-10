// @ts-ignore
import { Chapter, Genre, Manga, MangaParser, Status } from "../types/index.ts";

/**
 * Parse for the [Manganelo](https://manganelo.com/) manga site.
 */
class ManganeloParser implements MangaParser {
  parse(html: string): Manga {
    return {
      title: "",
      alternativeTitles: [],
      status: Status.COMPLETED,
      genres: [],
      chapters: [],
    };
  }
  parseTitle(html: string): string {
    return "";
  }
  parseAlternativeTitles(html: string): string[] {
    return [];
  }
  parseStatus(html: string): Status {
    return Status.COMPLETED;
  }
  parseGenres(html: string): Genre[] {
    return [];
  }
  parseChapters(html: string): Chapter[] {
    return [];
  }
  parseChapter(html: string): Chapter {
    return {
      title: "",
      chapterPages: [],
    };
  }
}
