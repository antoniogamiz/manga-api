import { ChapterEntity } from "../../entities/index.ts";
import { ParsingResult } from "../../utils/index.ts";

export interface ParseChapterPageUseCaseInterface {
  run(html: string): void;
  getResults(): ParsingResult<ChapterEntity>;
}
