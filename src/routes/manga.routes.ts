// helpers, Status, httpErrors,
import { Response } from "../deps.ts";
import fetchPage from "../utils/http.ts";
import { ManganeloParser } from "../parsers/index.ts";

const getManga = async ({
  params,
  response,
}: {
  params: { id: string };
  response: Response;
}) => {
  const html = await fetchPage(`https://manganelo.com/manga/${params.id}`);
  const parser = new ManganeloParser();
  response.status = 200;
  const result = parser.parse(html);
  if (result.error)
    response.body = { error: "This manga is not supported yet." };
  else response.body = parser.parse(html).data;
  return;
};

export { getManga };
