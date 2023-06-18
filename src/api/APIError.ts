export class APIError {
  constructor(
    readonly message: string,
    readonly statusCode: number,
  ) {
  }
}
