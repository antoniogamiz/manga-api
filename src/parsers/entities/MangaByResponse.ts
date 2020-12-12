import { MangaListEntryEntity } from "./index.ts";

export class MangaByResponse {
  constructor(
    public statusCode: number,
    public mangaEntries?: MangaListEntryEntity[],
    public errorMessage?: string
  ) {}
}
