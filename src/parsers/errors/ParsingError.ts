export class ParsingError extends Error {
  constructor(public attr: string, public html?: string) {
    super(`${attr} cannot be parsed`);
    this.html = html;
    this.name = "ParsingError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
