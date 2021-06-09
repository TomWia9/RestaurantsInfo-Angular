export class User {
  constructor(
    public id: string,
    public email: string,
    private _token: string
  ) {}

  get token(): string {
    //TODO check expirationDate
    return this._token;
  }
}
