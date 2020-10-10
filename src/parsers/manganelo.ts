import {
  Chapter,
  ChapterEntry,
  Genre,
  Manga,
  MangaParser,
  Status,
  // @ts-ignore
} from "../types/index.ts";

// @ts-ignore
import { cheerio } from "../deps.ts";

/**
 * Parse for the [Manganelo](https://manganelo.com/) manga site.
 */
export class ManganeloParser implements MangaParser {
  parse(html: string): Manga {
    return {
      title: this.parseTitle(html),
      alternativeTitles: this.parseAlternativeTitles(html),
      status: this.parseStatus(html),
      genres: this.parseGenres(html),
      chapters: [],
      chaptersEntries: this.parseChapters(html),
    };
  }
  parseTitle(html: string): string {
    const $ = cheerio.load(html);
    const title = $("h1").text();
    return title;
  }
  parseAlternativeTitles(html: string): string[] {
    const $ = cheerio.load(html);
    const alternativeTitles = $(
      ".variations-tableInfo tbody tr:nth-child(1) td:nth-child(2) h2",
    )
      .text()
      .split(";")
      .map((e: any) => e.trim());
    return alternativeTitles;
  }
  parseStatus(html: string): Status {
    const $ = cheerio.load(html);
    const status = $(
      ".variations-tableInfo tbody tr:nth-child(3) td:nth-child(2)",
    ).text();
    return (<any> Status)[status];
  }

  parseGenres(html: string): Genre[] {
    const $ = cheerio.load(html);
    const genres = $(
      ".variations-tableInfo tbody tr:nth-child(4) td:nth-child(2) a",
    )
      .map((i: any, e: any) => $(e).text())
      .get();
    return genres.map((g: Genre) => (<any> Genre)[g]);
  }

  parseChapters(html: string): ChapterEntry[] {
    const $ = cheerio.load(html);
    const chapters = $(".row-content-chapter .a-h .chapter-name")
      .map((i: any, e: any) => ({ url: $(e).attr("href") }))
      .get();
    return chapters;
  }

  parseChapter(html: string): Chapter {
    const $ = cheerio.load(html);
    const chapters = $(".container-chapter-reader")
      .contents()
      .map((i: any, e: any) => $(e).attr("src"))
      .get();
    return {
      title: $("h1").text(),
      chapterPages: chapters.map((url: string) => ({ url: url })),
    };
  }
}
