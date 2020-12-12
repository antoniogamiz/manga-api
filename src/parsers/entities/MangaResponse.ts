import { ChapterEntryEntity } from "./ChapterEntryEntity.ts";
import { Status, Genre } from "../enums/index.ts";

export class MangaResponse {
  constructor(
    public statusCode: number,
    public title?: string,
    public alternativeTitles?: string[],
    public status?: Status,
    public genres?: Genre[],
    public chapterEntries?: ChapterEntryEntity[],
    public errorMessage?: string
  ) {}
}
