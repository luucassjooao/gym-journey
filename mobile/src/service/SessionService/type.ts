interface Duration {
  start: string;
  end: string;
}

interface Partial {
  reps: number;
  havePartials: boolean;
}

interface HelpedReps {
  reps: number;
  haveHelped: boolean;
}

interface UseSomeEquipment {
  use: boolean;
  listOfEquipment: string[];
}

interface SeriesInformation {
  reps: number;
  weight: number;
  partials: Partial;
  rateSerie: string;
  exerciseId: string;
  helpedReps: HelpedReps;
  typeOfSerie: string;
  useSomeEquipment: UseSomeEquipment;
}

interface Muscle {
  name: string;
  id: string;
}

export interface IExerciseSession {
  id: string;
  userId: string;
  date: string;
  typeSession: string;
  duration: Duration;
  seriesinformation: Array<{[key: string]: SeriesInformation[]}>;
  targetedMuscles: Muscle[];
}
