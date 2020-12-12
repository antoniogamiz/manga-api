import { MangaListEntryEntity } from "./index.ts";

export class MangaByResponse {
  constructor(
    public mangaEntries?: MangaListEntryEntity[],
    public errorMessage?: string,
    public statusCode?: number
  ) {}
}
