import { MangaRequest, MangaResponse } from "../../entities/index.ts";
export interface GetMangaControllerInterface {
  run(request: MangaRequest): Promise<MangaResponse>;
}
