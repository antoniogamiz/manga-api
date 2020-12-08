import { HttpPageDataAccessInterface } from "../interfaces/index.ts";

export class HttpPageDataAccess implements HttpPageDataAccessInterface {
  async get(url: string, retries = 3): Promise<string> {
    try {
      const response = await fetch(url);
      return await response.text();
    } catch (error) {
      if (!retries) {
        throw new Error(`HTTP Error: ${error.message}`);
      }
    }
    return this.get(url, retries - 1);
  }
}
