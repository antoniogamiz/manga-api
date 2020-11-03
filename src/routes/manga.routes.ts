// helpers, Status, httpErrors,
import { Response } from "../deps.ts";
import fetchPage from "../utils/http.ts";
import { ManganeloParser } from "../parsers/index.ts";
import { Genre } from "../types/index.ts";

export const getManga = async ({
  params,
  response,
}: {
  params: { id: string };
  response: Response;
}) => {
  const html = await fetchPage(`https://manganelo.com/manga/${params.id}`);
  const parser = new ManganeloParser();
  response.status = 200;
  const { data, error } = parser.parse(html);
  if (error) response.body = { error: "This manga is not supported yet." };
  else response.body = data;
  return;
};

export const getMangaList = async ({
  params,
  response,
}: {
  params: { n: string };
  response: Response;
}) => {
  const html = await fetchPage(`https://manganelo.com/genre-all/${params.n}`);
  const parser = new ManganeloParser();
  response.status = 200;
  const { data, error } = parser.parseMangaList(html);
  if (error) response.body = { error: error };
  else response.body = data;
  return;
};

export const getChapter = async ({
  params,
  response,
}: {
  params: { mangaId: string; chapterId: string };
  response: Response;
}) => {
  const html = await fetchPage(
    `https://manganelo.com/chapter/${params.mangaId}/${params.chapterId}`
  );
  const parser = new ManganeloParser();
  response.status = 200;
  const { data, error } = parser.parseChapter(html);
  if (error) response.body = { error: error };
  else response.body = data;
  return;
};

export const getMangaByGenre = async ({
  params,
  response,
}: {
  params: { genre: Genre };
  response: Response;
}) => {
  const parser = new ManganeloParser();
  const url = parser.genreURLs[params.genre];
  if (!url) {
    response.body = { error: "Bad genre used." };
    return;
  }
  const html = await fetchPage(url);
  response.status = 200;
  const { data, error } = parser.parseMangaList(html);
  if (error) response.body = { error: error };
  else response.body = data;
  return;
};

export const getMangaByStatus = async ({
  params,
  response,
}: {
  params: { status: string };
  response: Response;
}) => {
  if (params.status !== "ongoing" && params.status !== "completed") {
    response.body = {
      error: "Bad status: only ongoing or completed are valid.",
    };
    return;
  }

  const html = await fetchPage(
    `https://manganelo.com/genre-all?state=${params.status}`
  );

  const parser = new ManganeloParser();
  response.status = 200;
  const { data, error } = parser.parseMangaList(html);
  if (error) response.body = { error: error };
  else response.body = data;
  return;
};
