import {IExerciseType} from '../../utils/types/Exercise';
import HttpClient from '../utils/HttpClient';

export interface IReturnDataGetMusclesGroups {
  id: string;
  name: string;
  media?: string;
  exercises?: IExerciseType[];
}

class MuscleGroupService {
  private httpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  async getAllMusclesGroups(): Promise<IReturnDataGetMusclesGroups[]> {
    return this.httpClient.get('/muscleGroups');
  }

  async seletectedMusclesGroups(
    ids: string,
  ): Promise<IReturnDataGetMusclesGroups[]> {
    return this.httpClient.get(`/muscleGroups/multiple/${ids}`);
  }

  async findOneMuscleGroup(
    id: string,
  ): Promise<IReturnDataGetMusclesGroups | {}> {
    if (typeof id === 'undefined' || !id) {
      return {};
    }
    return this.httpClient.get(`/muscleGroups/${id}`);
  }
}

export default new MuscleGroupService();
