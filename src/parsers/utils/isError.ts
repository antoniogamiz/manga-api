export function isError<T>(result: T | Error): result is Error {
  return result instanceof Error;
}
