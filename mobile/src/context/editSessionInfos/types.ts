import React, { ReactNode } from "react";
import { IRouteEditSessionInfos, PrivateRouteNavitationProp } from "../../routes/private";
import { IReturnDataGetMusclesGroups } from "../../service/MuscleGroupService";
import { IExerciseType, IExerciseTypeProps, IOpenModalInfos, TSubmitSerieInfos } from "../../utils/types/Exercise";
import { IGetLatestSessions } from "../../service/SessionService";

export interface IGoToScreen {
  targetedMuscles: {
    name: string;
    id: string;
  }[];
  id: string;
}

export interface IEditSessionInfosProvider {
  children: ReactNode;
}

export type EditSessionInfosType = {
  navigate: PrivateRouteNavitationProp | any;
  idOfMusclesGroups: string | string[];
  splitNamesInMuscleGroups: string;
  addNewExerciseContainer: () => void;
  addExerciseContainer: boolean;
  dataMusclesGroups: IReturnDataGetMusclesGroups[] | undefined;
  findTheExerciseOnListAlreadyAdded: (exerciseName: string) => boolean;
  findTheExerciseOnListNewExercise: (exerciseName: string) => boolean;
  handleAddNewExercise: (exercise: IExerciseType) => void;
  listOfNewExercises: IExerciseTypeProps[];
  selectedMuscleGroup: IReturnDataGetMusclesGroups | null | undefined;
  setSelectedMuscleGroup: React.Dispatch<React.SetStateAction<IReturnDataGetMusclesGroups | null | undefined>> | null;
  addTheNewOnesExercisesForEditingInfos: () => void;
  tableInfos: {
    tableHead: string[];
};
  setOpenModalInfos: React.Dispatch<React.SetStateAction<IOpenModalInfos>> | null;
  addNewSet: {
    id: string;
    add: boolean;
} | undefined;
  handleUpdateInfosOfSeries: ({ weight, reps, partials, helpedReps, useSomeEquipment, rateSerie, typeOfSerie, }: Omit<TSubmitSerieInfos, 'exerciseId'>) => Promise<void>;
  handleChangeAddNewSetToFalse: () => void;
  handleChangeAddNewToTrue: (id: string) => void;
  openModalInfos: IOpenModalInfos | null;
  howManyExercisesToAdd: () => number;
  totalSeriesOfSession: () => number;
  listOfExercisesAdded: IExerciseTypeProps[]  ;
  loadingData: boolean;
  route: (infos: IRouteEditSessionInfos) => void;
  routesInfos: IRouteEditSessionInfos | null;
  openModalGetLatestSessions: boolean;
  modalGetLatestSessions: () => Promise<void>;
  dataGetLatestSessions: IGetLatestSessions[] | undefined;
  backThePreviousScreen: IRouteEditSessionInfos | undefined;
  goToScreen: (infos: IGoToScreen) => void;
  sessionId: string;
  resetListOfExercises: () => void;
}
