interface Params {
  validFirstName: string;
  validSurname: string;
  loginData: [string, string];
  checkSentence: boolean;
  nextLevel: number;
  afterItemMoving: boolean;
  isAllowedToMovePuzzle: true;
  gameRound: number;
  gameDifficulty: number;
  saveCompletedGame: number;
  lastCompletedGame: {
    difficulty: number;
    round: number;
  };
  showStatistics: number;
  addNextRoundButton: boolean;
  unresolvedSentences: number[];
  showTranslationHint: boolean;
  showAudioHint: boolean;
  showPuzzleBg: boolean;
}

type ValueOrNull<T> = {
  [P in keyof T]: T[P] | null;
};

export default interface StateParams extends ValueOrNull<Params> {}
