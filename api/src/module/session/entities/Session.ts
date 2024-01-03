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
    numberOfSerie: number;
    reps: number;
    weight: number;
    rateSerie: string;
    partials: {
      havePartials: string;
      reps: number;
    };
  };
};

export type SerieInformation = {
  seriesinformation: SeriesInformationType[];
};
