import { MangaEntity } from "../../entities/index.ts";
import { ParsingResult } from "../../utils/index.ts";

export interface ParseMangaPageUseCaseInterface {
  run(html: string): void;
  getResults(): ParsingResult<MangaEntity>;
}
