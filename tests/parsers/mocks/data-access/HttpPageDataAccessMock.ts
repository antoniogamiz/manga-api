import { Injectable, bootstrap } from "../../../../src/deps.ts";
import { HttpPageDataAccessInterface } from "../../../../src/parsers/interfaces/data-access/HttpPageDataAccessInterface.ts";
import { HttpPageDataAccess } from "../../../../src/parsers/data-access/HttpPageDataAccess.ts";

// deno-lint-ignore no-explicit-any
export const HttpPageDataAccessMock = (classDefinition: any, html: string) => {
  @Injectable()
  class HttpPageDataAccessMock implements HttpPageDataAccessInterface {
    get(url: string, retries = 3): Promise<string> {
      return Promise.resolve(html);
    }
  }
  return bootstrap(
    classDefinition,
    new Map([[HttpPageDataAccess, HttpPageDataAccessMock]])
  );
};
