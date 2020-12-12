import { Response, Context } from "../../../deps.ts";
import { stringToGenre, stringToStatus } from "../../../parsers/enums/index.ts";
import {
  makeGetMangaController,
  makeGetChapterController,
  makeGetMangaByController,
} from "../../../parsers/controllers/index.ts";
import { HttpPageDataAccess } from "../../../parsers/repositories/index.ts";
import {
  ChapterRequest,
  MangaRequest,
  MangaByRequest,
} from "../../../parsers/entities/index.ts";
import {
  ParseMangaPageUseCase,
  ParseChapterPageUseCase,
  ParseMangaListPageUseCase,
} from "../../../parsers/use-cases/index.ts";

export const getManga = async ({
  params,
  response,
}: {
  params: { mangaId: string };
  response: Response;
}) => {
  const { mangaId } = params;
  const getMangaPageController = makeGetMangaController(
    new ParseMangaPageUseCase(new HttpPageDataAccess())
  );

  const request = new MangaRequest(mangaId);
  const res = await getMangaPageController.run(request);
  const { errorMessage, statusCode, ...body } = res;

  response.body = errorMessage ? { errorMessage, statusCode } : body;
  return;
};

export const getChapter = async ({
  params,
  response,
}: {
  params: { mangaId: string; chapterId: string };
  response: Response;
}) => {
  const { mangaId, chapterId } = params;
  const getChapterPageController = makeGetChapterController(
    new ParseChapterPageUseCase(new HttpPageDataAccess())
  );

  const request = new ChapterRequest(mangaId, chapterId);
  const res = await getChapterPageController.run(request);
  const { errorMessage, statusCode, ...body } = res;

  response.body = errorMessage ? { errorMessage, statusCode } : body;
  return;
};

export const getMangaBy = async (ctx: Context) => {
  const { response } = ctx;
  const genreParameter = ctx.request.url.searchParams.get("genre");
  const statusParameter = ctx.request.url.searchParams.get("status");
  let genre, status;
  if (genreParameter) genre = stringToGenre(genreParameter);
  if (statusParameter) status = stringToStatus(statusParameter);

  const getMangaPageController = makeGetMangaByController(
    new ParseMangaListPageUseCase(new HttpPageDataAccess())
  );

  const request = new MangaByRequest();
  const res = await getMangaPageController.run(request);
  const { errorMessage, statusCode, ...body } = res;

  response.body = errorMessage ? { errorMessage, statusCode } : body;
  return;
};
