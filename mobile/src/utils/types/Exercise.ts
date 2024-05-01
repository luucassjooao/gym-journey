export interface IExerciseType {
  id: string;
  musclesGroupsId: string;
  name: string;
  media: string;
}

export interface IPartials {
  reps: number;
  havePartials: boolean;
}

export interface IHelpedReps {
  haveHelped: boolean;
  reps: number;
}

export interface IUseSomeEquipment {
  use: boolean;
  listOfEquipment: string[];
}

export interface InfosSerie {
  newExercise?: boolean;
  reps: number;
  exerciseId: string;
  partials: IPartials;
  rateSerie: string;
  weight: number;
  helpedReps: IHelpedReps;
  useSomeEquipment: IUseSomeEquipment;
  typeOfSerie: string;
}

export type IExerciseTypeProps = IExerciseType & {
  series: InfosSerie[];
};

export type TSubmitSerieInfos = Omit<InfosSerie, 'newExercise'>;

export interface IOpenModalInfos {
  partials: IPartials;
  helpedReps: IHelpedReps;
  useSomeEquipment: IUseSomeEquipment;
  rateSerie: string;
  openModal: boolean;
}
// export interface ISubmitSerieInfos {
//   weight: number;
//   reps: number;
//   partials: IPartials;
//   helpedReps: IHelpedReps;
//   useSomeEquipment: IUseSomeEquipment;
//   rateSerie: string;
//   typeOfSerie: string;
// }
