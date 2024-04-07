interface Params {
  startSoloRace: boolean;
  updateTrack: boolean;
  garagePage: boolean;
  winnersPage: boolean;
  updateWinners: boolean;
  raceInProgress: boolean;
  blockView: boolean;
}

type ValueOrNull<T> = {
  [P in keyof T]: T[P] | null;
};

export default interface StateParams extends ValueOrNull<Params> {}
