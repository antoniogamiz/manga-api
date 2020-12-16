import { HttpPageEntity } from "../../entities/index.ts";

export interface HttpPageDataAccessInterface {
  get(url: string, retries: number): Promise<HttpPageEntity>;
}
