import {
  IHelpedReps,
  IPartials,
  IUseSomeEquipment,
} from '../../screen/EditSessionInfos';
import {getInfosOfUserFromStorage} from '../../utils/getInfosOfUserFromStorage';
import HttpClient from '../utils/HttpClient';
import {IExerciseSession} from './type';

interface IPropsCreateNewSession {
  typeSession: string;
  musclesGroupId: string[];
}

export interface InfosSerie {
  reps: number;
  partials: IPartials;
  rateSerie: string;
  weight: number;
  helpedReps: IHelpedReps;
  useSomeEquipment: IUseSomeEquipment;
  typeOfSerie: string;
  exerciseId: string;
}

interface IPropsUpdateSeriesInformation {
  idOfSession: string;
  seriesInformation: {
    newExercise: boolean;
    exerciseId: string;
    series: Omit<InfosSerie, 'newExercise'>;
  };
}

class SessionService {
  private httpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  async createNewSession({
    typeSession,
    musclesGroupId,
  }: IPropsCreateNewSession): Promise<IExerciseSession> {
    const {token} = await getInfosOfUserFromStorage();
    return this.httpClient.post(`/sessions/${musclesGroupId.join(',')}`, {
      body: {
        typeSession,
        sessionInformation: [],
        date: new Date(),
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  async getMyOwsSessions(): Promise<IExerciseSession[]> {
    const {token} = await getInfosOfUserFromStorage();
    return this.httpClient.get('/sessions', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  async getUniqueSession(id: string): Promise<IExerciseSession> {
    const {token} = await getInfosOfUserFromStorage();
    return this.httpClient.get(`/sessions/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  async updateSeriesInformation({
    idOfSession,
    seriesInformation,
  }: IPropsUpdateSeriesInformation) {
    const {token} = await getInfosOfUserFromStorage();
    return this.httpClient.put(`/sessions/${idOfSession}`, {
      body: {
        seriesInformation,
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new SessionService();
