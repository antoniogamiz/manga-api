import { ChapterPageEntity } from "./ChapterPageEntity.ts";

export class ChapterResponse {
  constructor(
    public title?: string,
    public chapterPages?: ChapterPageEntity[],
    public errorMessage?: string,
    public statusCode?: number
  ) {}
}
