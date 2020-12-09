import { ChapterEntity } from "./ChapterEntity.ts";
import { ChapterEntryEntity } from "./ChapterEntryEntity.ts";
import { Status, Genre } from "../enums/index.ts";

export class MangaEntity {
  constructor(
    public title: string,
    public alternativeTitles: string[],
    public status: Status,
    public genres: Genre[],
    public chapters: ChapterEntity[],
    public chapterEntries: ChapterEntryEntity[]
  ) {}
}
