interface Params {
  validFirstName: string;
  validSurname: string;
  loginData: [string, string];
  checkSentence: undefined | true;
  nextRound: number;
  nextLevel: number;
}

export default interface StateParams extends Partial<Params> {}
