import { ParsingError } from "../errors/index.ts";

export type ParsingResult<T> = T | ParsingError;

export function isParsingError(
  result: ParsingResult<unknown>
): result is ParsingError {
  return result instanceof ParsingError;
}
