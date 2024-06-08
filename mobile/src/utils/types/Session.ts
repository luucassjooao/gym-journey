import {TSubmitSerieInfos} from './Exercise';
import {Muscle} from './Muscle';

interface Duration {
  start: string;
  end: string;
}

interface NewSeriesInformationType {
  exerciseName: string;
  exerciseId: string;
  exerciseMedia: string;
  observation?: string;
  series: TSubmitSerieInfos[];
  newExercise?: boolean;
}

export interface ISession {
  id: string;
  userId: string;
  date: string;
  typeSession: string;
  duration: Duration;
  seriesinformation: NewSeriesInformationType[];
  targetedMuscles: Muscle[];
}
