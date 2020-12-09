import { ParsingError } from "../errors/index.ts";

export type ParsingResult<T> = {
  result: T;
  error?: ParsingError;
};
