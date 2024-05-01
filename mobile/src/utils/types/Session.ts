import {TSubmitSerieInfos} from './Exercise';
import {Muscle} from './Muscle';

interface Duration {
  start: string;
  end: string;
}

export interface ISession {
  id: string;
  userId: string;
  date: string;
  typeSession: string;
  duration: Duration;
  seriesinformation: Array<{[key: string]: TSubmitSerieInfos[]}>;
  targetedMuscles: Muscle[];
}
