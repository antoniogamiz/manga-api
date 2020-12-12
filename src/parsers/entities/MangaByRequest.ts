import { Genre, Status } from "../enums/index.ts";

export class MangaByRequest {
  constructor(public genre?: Genre, public status?: Status) {}
}
