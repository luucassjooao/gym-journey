import {getInfosOfUserFromStorage} from '../../utils/getInfosOfUserFromStorage';
import {TSubmitSerieInfos} from '../../utils/types/Exercise';
import {ISession} from '../../utils/types/Session';
import HttpClient from '../utils/HttpClient';

interface IPropsCreateNewSession {
  typeSession: string;
  musclesGroupId: string[];
}

interface IPropsUpdateSeriesInformation {
  idOfSession: string;
  seriesInformation: {
    newExercise: boolean;
    exerciseId: string;
    series: TSubmitSerieInfos;
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
  }: IPropsCreateNewSession): Promise<ISession> {
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

  async getMyOwsSessions(): Promise<ISession[]> {
    const {token} = await getInfosOfUserFromStorage();
    return this.httpClient.get('/sessions', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  async getUniqueSession(id: string): Promise<ISession> {
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
