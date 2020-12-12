import { ObjectFactory } from "../../../modules/common/factories/ObjectFactory.ts";

import { Response, Context } from "../../../deps.ts";
import { stringToGenre, stringToStatus } from "../../../parsers/enums/index.ts";
import {
  GetChapterControllerInterface,
  GetMangaByControllerInterface,
  GetMangaControllerInterface,
} from "../../../parsers/interfaces/index.ts";
import {
  ChapterRequest,
  MangaRequest,
  MangaByRequest,
} from "../../../parsers/entities/index.ts";

export const getManga = async ({
  params,
  response,
}: {
  params: { mangaId: string };
  response: Response;
}) => {
  const { mangaId } = params;
  const getMangaPageController = ObjectFactory.getInstance<GetMangaControllerInterface>(
    "GetMangaControllerInterface"
  );

  const request = new MangaRequest(mangaId);
  const res = await getMangaPageController.run(request);
  const { errorMessage, statusCode, ...body } = res;

  response.body = errorMessage ? { errorMessage, statusCode } : body;
  response.status = statusCode;

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
  const getChapterPageController = ObjectFactory.getInstance<GetChapterControllerInterface>(
    "GetChapterControllerInterface"
  );

  const request = new ChapterRequest(mangaId, chapterId);
  const res = await getChapterPageController.run(request);
  const { errorMessage, statusCode, ...body } = res;

  response.body = errorMessage ? { errorMessage, statusCode } : body;
  response.status = statusCode;

  return;
};

export const getMangaBy = async (ctx: Context) => {
  const { response } = ctx;
  const genreParameter = ctx.request.url.searchParams.get("genre");
  const statusParameter = ctx.request.url.searchParams.get("status");
  let genre, status;
  if (genreParameter) genre = stringToGenre(genreParameter);
  if (statusParameter) status = stringToStatus(statusParameter);

  const getMangaByPageController = ObjectFactory.getInstance<GetMangaByControllerInterface>(
    "GetMangaByControllerInterface"
  );

  const request = new MangaByRequest(genre, status);
  const res = await getMangaByPageController.run(request);
  const { errorMessage, statusCode, ...body } = res;

  response.body = errorMessage ? { errorMessage, statusCode } : body;
  response.status = statusCode;
  return;
};
