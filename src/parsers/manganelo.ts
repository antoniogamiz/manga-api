import {
  Chapter,
  ChapterEntry,
  Genre,
  Manga,
  MangaParser,
  Status,
  ParsingResult,
  ParsingError,
  MangaListEntry,
  GenreURLs,
  // @ts-ignore deno-lint-ignore
} from "../types/index.ts";

// @ts-ignore deno-lint-ignore
import { cheerio } from "../deps.ts";

/**
 * Parse for the [Manganelo](https://manganelo.com/) manga site.
 */

enum ROW_HEADERS {
  alternativeTitles = "Alternative",
  status = "Status",
  genres = "Genres",
}

export class ManganeloParser implements MangaParser {
  static ROW_HEADERS = ROW_HEADERS;

  parse(html: string): ParsingResult<Manga> {
    const title = this.parseTitle(html);
    const alternativeTitles = this.parseAlternativeTitles(html);
    const status = this.parseStatus(html);
    const genres = this.parseGenres(html);
    const chaptersEntries = this.parseChapters(html);

    const firstErrorInParsing =
      title.error ||
      alternativeTitles.error ||
      status.error ||
      genres.error ||
      chaptersEntries.error;

    return {
      data: {
        title: title.data,
        alternativeTitles: alternativeTitles.data,
        status: status.data,
        genres: genres.data,
        chapters: [],
        chapterEntries: chaptersEntries.data,
      },
      error: firstErrorInParsing,
    };
  }

  parseTitle(html: string): ParsingResult<string> {
    const $ = cheerio.load(html);
    const title = $("h1").text();
    const error = title ? undefined : new ParsingError("Title");
    return { data: title, error };
  }

  parseAlternativeTitles(html: string): ParsingResult<string[]> {
    const $ = cheerio.load(html);
    const rowIndex = this.findCorrectIndex(ROW_HEADERS.alternativeTitles, html);
    if (rowIndex === -1) return { data: [] };
    const alternativeTitles = $(
      `.variations-tableInfo tbody tr:nth-child(${rowIndex}) td:nth-child(2) h2`
    )
      .text()
      .split(";")
      .filter(Boolean)
      .map((e: string) => e.trim());
    const error = alternativeTitles
      ? undefined
      : new ParsingError("Alternitve Titles");
    return { data: alternativeTitles, error };
  }
  parseStatus(html: string): ParsingResult<Status> {
    const $ = cheerio.load(html);
    const rowIndex = this.findCorrectIndex(ROW_HEADERS.status, html);
    const statusText = $(
      `.variations-tableInfo tbody tr:nth-child(${rowIndex}) td:nth-child(2)`
    ).text();
    const status = Status[(statusText as unknown) as keyof typeof Status];
    const error = status ? undefined : new ParsingError("Status");
    return { data: status, error };
  }

  parseGenres(html: string): ParsingResult<Genre[]> {
    const $ = cheerio.load(html);
    const rowIndex = this.findCorrectIndex(ROW_HEADERS.genres, html);
    const genres = $(
      `.variations-tableInfo tbody tr:nth-child(${rowIndex}) td:nth-child(2) a`
    )
      .map((i: number, e: CheerioElement) => $(e).text())
      .get()
      .map((g: Genre) => Genre[(g as unknown) as keyof typeof Genre]);
    const error = genres ? undefined : new ParsingError("Genres");
    return { data: genres, error };
  }

  parseChapters(html: string): ParsingResult<ChapterEntry[]> {
    const $ = cheerio.load(html);
    const chapters = $(".row-content-chapter .a-h .chapter-name")
      .map((i: number, e: CheerioElement) => ({ url: $(e).attr("href") }))
      .get();
    const error = chapters ? undefined : new ParsingError("Genres");
    return { data: chapters, error };
  }

  parseChapter(html: string): ParsingResult<Chapter> {
    const $ = cheerio.load(html);
    const chapters = $(".container-chapter-reader")
      .contents()
      .map((i: number, e: cheerio) => $(e).attr("src"))
      .get();
    const chapter: Chapter = {
      title: $("h1").text(),
      chapterPages: chapters.map((url: string) => ({ url: url })),
    };

    const error =
      chapter.title && chapter.chapterPages
        ? undefined
        : new ParsingError(`Chapter(${chapter.title})`);
    return { data: chapter, error };
  }

  parseMangaList(html: string): ParsingResult<MangaListEntry[]> {
    const $ = cheerio.load(html);
    const entries = $(".panel-content-genres .content-genres-item > a")
      .map((i: number, e: cheerio) => ({
        title: $(e).attr("title"),
        url: $(e).attr("href"),
      }))
      .get();
    return { data: entries };
  }

  findCorrectIndex(header: ROW_HEADERS, html: string): number {
    const $ = cheerio.load(html);
    for (let i = 0; i < 5; i++) {
      const rowTitle = $(
        `.variations-tableInfo tbody tr:nth-child(${i}) td:nth-child(1)`
      ).text();
      if (rowTitle.includes(header)) return i;
    }
    return -1;
  }

  genreURLs: GenreURLs = {
    Action: "https://manganelo.com/genre-2",
    Adult: "https://manganelo.com/genre-3",
    Adventure: "https://manganelo.com/genre-4",
    Comedy: "https://manganelo.com/genre-6",
    Cooking: "https://manganelo.com/genre-7",
    Doujinshi: "https://manganelo.com/genre-9",
    Drama: "https://manganelo.com/genre-10",
    Ecchi: "https://manganelo.com/genre-11",
    Fantasy: "https://manganelo.com/genre-12",
    "Gender bender": "https://manganelo.com/genre-13",
    Harem: "https://manganelo.com/genre-14",
    Historical: "https://manganelo.com/genre-15",
    Horror: "https://manganelo.com/genre-16",
    Isekai: "https://manganelo.com/genre-45",
    Josei: "https://manganelo.com/genre-17",
    Manhua: "https://manganelo.com/genre-44",
    Manhwa: "https://manganelo.com/genre-43",
    "Martial arts": "https://manganelo.com/genre-19",
    Mature: "https://manganelo.com/genre-20",
    Mecha: "https://manganelo.com/genre-21",
    Medical: "https://manganelo.com/genre-22",
    Mystery: "https://manganelo.com/genre-24",
    "One shot": "https://manganelo.com/genre-25",
    Psychological: "https://manganelo.com/genre-26",
    Romance: "https://manganelo.com/genre-27",
    "School life": "https://manganelo.com/genre-28",
    "Sci fi": "https://manganelo.com/genre-29",
    Seinen: "https://manganelo.com/genre-30",
    Shoujo: "https://manganelo.com/genre-31",
    "Shoujo ai": "https://manganelo.com/genre-32",
    Shounen: "https://manganelo.com/genre-33",
    "Shounen ai": "https://manganelo.com/genre-34",
    "Slice of life": "https://manganelo.com/genre-35",
    Smut: "https://manganelo.com/genre-36",
    Sports: "https://manganelo.com/genre-37",
    Supernatural: "https://manganelo.com/genre-38",
    Tragedy: "https://manganelo.com/genre-39",
    Webtoons: "https://manganelo.com/genre-40",
    Yaoi: "https://manganelo.com/genre-41",
    Yuri: "https://manganelo.com/genre-42",
  };
}
