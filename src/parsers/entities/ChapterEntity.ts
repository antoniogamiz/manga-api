import { ChapterPageEntity } from "./ChapterPageEntity.ts";

export class ChapterEntity {
  constructor(public title: string, public chapterPages: ChapterPageEntity[]) {}
}
