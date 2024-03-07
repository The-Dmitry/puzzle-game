interface Params {
  validFirstName: string;
  validSurname: string;
  loginData: [string, string];
  checkSentence: undefined | true;
}

export default interface StateParams extends Partial<Params> {}
