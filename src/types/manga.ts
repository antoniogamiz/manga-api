export interface Manga {
  title: string;
  /** Normally they are in different languages */
  alternativeTitles: string[];
  status: Status;
  genres: Genre[];
  chapters: Chapter[];
}

export interface Chapter {
  title: string;
  chapterPages: ChapterPage[];
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
  ONGOING,
  /**
   * Manga is completed
   */
  COMPLETED,
}

/**
 * All possibles genres
 */
export enum Genre {
  Action,
  Adult,
  Adventure,
  Comedy,
  Cooking,
  Doujinshi,
  Drama,
  Ecchi,
  Fantasy,
  GenderBender,
  Harem,
  Historical,
  Horror,
  Isekai,
  Josei,
  Manhua,
  Manhwa,
  MartialArts,
  Mature,
  Mecha,
  Medical,
  Mystery,
  OneShot,
  Psychological,
  Romance,
  SchoolLife,
  Scifi,
  Seinen,
  Shoujo,
  ShoujoAi,
  Shounen,
  Shounenai,
  SliceOfLife,
  Smut,
  Sports,
  Supernatural,
  Tragedy,
  Webtoons,
  Yaoi,
  Yuri,
}
