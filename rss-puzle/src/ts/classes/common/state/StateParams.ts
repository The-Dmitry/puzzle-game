interface Params {
  validFirstName: string;
  validSurname: string;
  loginData: [string, string];
}

export default interface StateParams extends Partial<Params> {}
