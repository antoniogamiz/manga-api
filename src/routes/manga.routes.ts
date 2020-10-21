import { helpers, Status, httpErrors, Response } from "../deps.ts";
import fetchPage from "../utils/http.ts";

const getManga = async ({
  params,
  response,
}: {
  params: { id: string };
  response: Response;
}) => {
  response.status = 200;
  response.body = {
    success: true,
    data: params.id,
  };
  return;
};

export { getManga };
