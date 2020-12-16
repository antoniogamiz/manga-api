import { HttpPageDataAccessInterface } from "../interfaces/index.ts";
import { HttpPageEntity } from "../entities/index.ts";

export class HttpPageDataAccess implements HttpPageDataAccessInterface {
  async get(url: string, retries = 3): Promise<HttpPageEntity> {
    try {
      const response = await fetch(url);
      const html = await response.text();
      return { html };
    } catch (error) {
      if (!retries) {
        throw new Error(`HTTP Error: ${error.message}`);
      }
    }
    return this.get(url, retries - 1);
  }
}
