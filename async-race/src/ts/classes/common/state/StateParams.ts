interface Params {
  startSoloRace: boolean;
  updateTrack: boolean;
  garagePage: boolean;
  updateWinners: boolean;
}

type ValueOrNull<T> = {
  [P in keyof T]: T[P] | null;
};

export default interface StateParams extends ValueOrNull<Params> {}
