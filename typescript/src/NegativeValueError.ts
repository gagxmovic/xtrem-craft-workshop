export class NegativeValueError extends Error {
  constructor() {
    super("Can't multiply by negative amount");
  }

  message: string
}
