import cheerio from "cheerio";

import {
  MangaParser,
  Manga,
  Genre,
  Status,
  Chapter,
  ChapterEntry,
} from "../types";

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
      chaptersEntries: [],
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
    const $ = cheerio.load(html);
    const genres = $(
      ".variations-tableInfo tbody tr:nth-child(4) td:nth-child(2) a"
    )
      .map((i, e) => $(e).text())
      .get();
    return genres.map((g: Genre) => (<any>Genre)[g]);
  }

  parseChapters(html: string): ChapterEntry[] {
    const $ = cheerio.load(html);
    const chapters = $(".row-content-chapter .a-h .chapter-name")
      .map((i, e) => ({ url: $(e).attr("href") }))
      .get();
    return chapters;
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
