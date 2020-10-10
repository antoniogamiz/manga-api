export interface Manga {
  title: string;
  /** Normally they are in different languages */
  alternativeTitles: string[];
  status: Status;
  genres: Genre[];
  chapters: Chapter[];
  chaptersEntries: ChapterEntry[];
}

export interface Chapter {
  title: string;
  chapterPages: ChapterPage[];
}

/**
 * Chapter entry found in a manga page but have not been parsed yet.
 * You need to fetch the html and call 'parseChapter'.
 */
export interface ChapterEntry {
  url: string;
}

export interface ChapterPage {
  /** URL of the page image */
  url: string;
}

/**
 * All possible status
 */
export enum Status {
  /**
   * New chapters are being released
   */
  Ongoing = "Ongoing",
  /**
   * Manga is completed
   */
  Completed = "Completed",
}

/**
 * All possibles genres
 */
export enum Genre {
  Action = "Action",
  Adult = "Adult",
  Adventure = "Adventure",
  Comedy = "Comedy",
  Cooking = "Cooking",
  Doujinshi = "Doujinshi",
  Drama = "Drama",
  Ecchi = "Ecchi",
  Fantasy = "Fantasy",
  GenderBender = "Gender bender",
  Harem = "Harem",
  Historical = "Historical",
  Horror = "Horror",
  Isekai = "Isekai",
  Josei = "Josei",
  Manhua = "Manhua",
  Manhwa = "Manhwa",
  MartialArts = "Martial arts",
  Mature = "Mature",
  Mecha = "Mecha",
  Medical = "Medical",
  Mystery = "Mystery",
  OneShot = "One shot",
  Psychological = "Psychological",
  Romance = "Romance",
  SchoolLife = "School life",
  Scifi = "Sci fi",
  Seinen = "Seinen",
  Shoujo = "Shoujo",
  ShoujoAi = "Shoujo ai",
  Shounen = "Shounen",
  Shounenai = "Shounen ai",
  SliceOfLife = "Slice of life",
  Smut = "Smut",
  Sports = "Sports",
  Supernatural = "Supernatural",
  Tragedy = "Tragedy",
  Webtoons = "Webtoons",
  Yaoi = "Yaoi",
  Yuri = "Yuri",
}
