import { MangaEntity } from "../../entities/index.ts";

export interface ParseMangaPageUseCaseInterface {
  run(html: string): void;
  getResults(): MangaEntity;
}
