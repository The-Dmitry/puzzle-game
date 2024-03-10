interface Params {
  validFirstName: string;
  validSurname: string;
  loginData: [string, string];
  checkSentence: undefined | true;
  nextRound: number;
  nextLevel: number;
  afterItemMoving: undefined;
  isAllowedToMovePuzzle: true;
}

export default interface StateParams extends Partial<Params> {}
