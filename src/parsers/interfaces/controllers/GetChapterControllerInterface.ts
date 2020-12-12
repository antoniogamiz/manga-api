import { ChapterRequest, ChapterResponse } from "../../entities/index.ts";

export interface GetChapterControllerInterface {
  run(request: ChapterRequest): Promise<ChapterResponse>;
}
