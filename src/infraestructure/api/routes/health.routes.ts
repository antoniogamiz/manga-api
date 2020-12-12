import { Response } from "../../../deps.ts";

export const health = ({ response }: { response: Response }) => {
  response.body = { message: "All healthy :D" };
  response.status = 200;
  return;
};
