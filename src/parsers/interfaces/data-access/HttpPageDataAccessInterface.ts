export interface HttpPageDataAccessInterface {
  get(url: string, retries: number): Promise<string>;
}
