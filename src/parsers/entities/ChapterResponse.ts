import { ChapterPageEntity } from "./ChapterPageEntity.ts";

export class ChapterResponse {
  constructor(
    public statusCode: number,
    public title?: string,
    public chapterPages?: ChapterPageEntity[],
    public errorMessage?: string
  ) {}
}
