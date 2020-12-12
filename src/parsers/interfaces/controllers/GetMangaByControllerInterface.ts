import { MangaByRequest, MangaByResponse } from "../../entities/index.ts";

export interface GetMangaByControllerInterface {
  run(request: MangaByRequest): Promise<MangaByResponse>;
}
