import cheerio from "cheerio";

import { MangaParser, Manga, Genre, Status, Chapter } from "../types";

/**
 * Parse for the [Manganelo](https://manganelo.com/) manga site.
 */
export default class ManganeloParser implements MangaParser {
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
    const $ = cheerio.load(html);
    const chapters = $(".container-chapter-reader")
      .contents()
      .map((i, e) => $(e).attr("src"))
      .get();
    return {
      title: $("h1").text(),
      chapterPages: chapters.map((url) => ({ url: url })),
    };
  }
}
