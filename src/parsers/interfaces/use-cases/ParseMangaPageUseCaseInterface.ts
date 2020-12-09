import { MangaEntity } from "../../entities/index.ts";
import { ParsingResult } from "../../utils/index.ts";

export interface ParseMangaPageUseCaseInterface {
  run(url: string): void;
  getResults(): ParsingResult<MangaEntity>;
}
