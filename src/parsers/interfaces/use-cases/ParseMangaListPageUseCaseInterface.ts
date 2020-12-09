import { MangaListEntryEntity } from "../../entities/index.ts";
import { ParsingResult } from "../../utils/index.ts";

export interface ParseMangaListPageUseCaseInterface {
  run(url: string): void;
  getResults(): ParsingResult<MangaListEntryEntity>;
}
