import { HttpPageDataAccess } from "../../../parsers/repositories/index.ts";
import {
  ParseMangaPageUseCase,
  ParseChapterPageUseCase,
  ParseMangaListPageUseCase,
} from "../../../parsers/use-cases/index.ts";
import {
  GetMangaController,
  GetChapterController,
  GetMangaByController,
} from "../../../parsers/controllers/index.ts";

type Injectable = {
  [key: string]: () => unknown;
};

// deno-lint-ignore prefer-const
let DEFAULT_IMPLEMENTATIONS: Injectable = {
  // Controllers
  GetMangaControllerInterface: () => new GetMangaController(),
  GetChapterControllerInterface: () => new GetChapterController(),
  GetMangaByControllerInterface: () => new GetMangaByController(),
  // Use Cases
  ParseMangaPageUseCaseInterface: () => new ParseMangaPageUseCase(),
  ParseChapterPageUseCaseInterface: () => new ParseChapterPageUseCase(),
  ParseMangaListPageUseCaseInterface: () => new ParseMangaListPageUseCase(),
  // Repositories
  HttpPageDataAccessInterface: () => new HttpPageDataAccess(),
};

// deno-lint-ignore prefer-const
let MOCK_IMPLEMENTATIONS: Injectable = {};

class Factory {
  static getInstance(interfaceName: string, parameters: unknown = []) {
    if (MOCK_IMPLEMENTATIONS[interfaceName])
      return MOCK_IMPLEMENTATIONS[interfaceName]();
    return DEFAULT_IMPLEMENTATIONS[interfaceName]();
  }

  static mockWithInstance(interfaceName: string, mock: unknown) {
    MOCK_IMPLEMENTATIONS[interfaceName] = () => mock;
  }
}

export const ObjectFactory = {
  getInstance<T>(name: string): T {
    return Factory.getInstance(name) as T;
  },

  mockWithInstance: Factory.mockWithInstance,
};
