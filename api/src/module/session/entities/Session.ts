export enum SessionType {
  DELOAD = 'DELOAD',
  STRENGTH = 'STRENGTH',
  HYPERTROPHY = 'HYPERTROPHY',
}

export type DurationSessionType = {
  start: Date;
  end: Date;
};

export type SeriesInformationType = {
  exerciseId: string;
  newExercise?: boolean;
  series: {
    typeOfSerie: string;
    reps: number;
    weight: number;
    rateSerie: string;
    partials: {
      havePartials: string;
      reps: number;
    };
    helpedReps: {
      haveHelped: boolean;
      reps: number;
    };
    useSomeEquipment: {
      use: boolean;
      listOfEquipment: string[];
    };
  };
};

export type SerieInformation = {
  seriesinformation: SeriesInformationType[];
};
