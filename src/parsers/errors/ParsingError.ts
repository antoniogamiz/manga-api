export class ParsingError extends Error {
  constructor(public attr: string) {
    super(`${attr} cannot be parsed`);
    this.name = "ParsingError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
