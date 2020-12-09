import { ParseMangaPageUseCaseInterface } from "../interfaces/use-cases/index.ts";
import { MangaEntity } from "../entities/index.ts";
import { Genre, Status } from "../enums/index.ts";
import { Injectable } from "../../deps.ts";
import { HttpPageDataAccess } from "../data-access/index.ts";

@Injectable({ isSingleton: false })
export class ParseMangaPageUseCase implements ParseMangaPageUseCaseInterface {
  constructor(private readonly httpPageDataAccess: HttpPageDataAccess) {}
  run(html: string) {}
  getResults() {
    return new MangaEntity("", [], Status.COMPLETED, [], [], []);
  }
}
