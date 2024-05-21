import {useEffect, useState} from 'react';
import MuscleGroupService, {
  IReturnDataGetMusclesGroups,
} from '../../service/MuscleGroupService';
import {
  IExerciseType,
  IExerciseTypeProps,
  IOpenModalInfos,
  InfosSerie,
  TSubmitSerieInfos,
} from '../../utils/types/Exercise';
import {PrivateRouteNavitationProp} from '../../routes/private';
import {useNavigation} from '@react-navigation/native';
import {useQueries} from '@tanstack/react-query';
import {ISession} from '../../utils/types/Session';
import SessionService from '../../service/SessionService';
import Toast from 'react-native-toast-message';
import {IProps} from '.';

export function useEditSessionInfos({route}: IProps) {
  const {sessionId, idOfMusclesGroups} = route.params;
  const [addExerciseContainer, setAddExerciseContainer] =
    useState<boolean>(false);
  const [listOfNewExercises, setListOfNewExercises] = useState<
    IExerciseTypeProps[]
  >([]);
  const [listOfExercisesAdded, setListOfExercisesAdded] = useState<
    IExerciseTypeProps[]
  >([]);
  const [selectedMuscleGroup, setSelectedMuscleGroup] =
    useState<IReturnDataGetMusclesGroups | null>();

  const [addNewInfosOnExercise, setAddNewInfosOnExercise] =
    useState<InfosSerie>({
      reps: 0,
      exerciseId: '',
      partials: {
        havePartials: false,
        reps: 0,
      },
      rateSerie: '',
      weight: 0,
      helpedReps: {
        haveHelped: false,
        reps: 0,
      },
      useSomeEquipment: {
        listOfEquipment: [],
        use: false,
      },
      typeOfSerie: '',
      newExercise: true,
    });
  const [addNewSet, setAddNewSet] = useState<{id: string; add: boolean}>();
  const [openModalInfos, setOpenModalInfos] = useState<IOpenModalInfos>({
    openModal: false,
    helpedReps: {
      haveHelped: false,
      reps: 0,
    },
    useSomeEquipment: {
      listOfEquipment: [],
      use: false,
    },
    partials: {
      havePartials: false,
      reps: 0,
    },
    rateSerie: '',
  });
  const [loadingDataSessions, setLoadingDataSession] = useState<boolean>(true);

  const navigate = useNavigation<PrivateRouteNavitationProp>();

  const idsOfMusclesGroups =
    typeof idOfMusclesGroups === 'string'
      ? idOfMusclesGroups
      : (idOfMusclesGroups as string[]).join(',');
  const {
    '0': {data: dataMusclesGroups},
    '1': {data: dataSessionAlreadyExist, isFetched, isLoading},
  } = useQueries({
    queries: [
      {
        queryKey: [`${idsOfMusclesGroups}`],
        queryFn: async (): Promise<IReturnDataGetMusclesGroups[]> =>
          MuscleGroupService.seletectedMusclesGroups(idsOfMusclesGroups),
      },
      {
        queryKey: [sessionId],
        queryFn: async (): Promise<ISession> =>
          SessionService.getUniqueSession(sessionId),
      },
    ],
  });

  useEffect(() => {
    if (dataSessionAlreadyExist) {
      setLoadingDataSession(true);
      for (const dataObject of dataSessionAlreadyExist.seriesinformation) {
        for (const key in dataObject) {
          if (Object.hasOwnProperty.call(dataObject, key)) {
            const series = dataObject[key];
            setListOfExercisesAdded(prevState => {
              const pushExercise: IExerciseTypeProps = {
                id: series[0].exerciseId,
                media: '',
                musclesGroupsId: idsOfMusclesGroups,
                name: key,
                series: series,
              };
              return [...prevState, pushExercise];
            });
          }
        }
      }
    }
    setLoadingDataSession(false);
  }, [dataSessionAlreadyExist, idsOfMusclesGroups]);

  function addNewExerciseContainer() {
    setAddExerciseContainer(prevState => prevState !== true);
  }

  const tableInfos = {
    tableHead: ['Reps', 'Peso', 'Tipo da serie', 'Mais Informações'],
  };

  function handleAddNewExercise(exercise: IExerciseType) {
    setListOfNewExercises(prevState => {
      if (prevState.some(({name}) => name === exercise.name)) {
        return prevState.filter(({name}) => name !== exercise.name);
      }

      const exerciseObj: IExerciseTypeProps = {
        id: exercise.id,
        series: [],
        media: exercise.media,
        musclesGroupsId: exercise.musclesGroupsId,
        name: exercise.name,
      };
      return [...prevState, exerciseObj];
    });
  }

  function findTheExerciseOnListAlreadyAdded(exerciseName: string): boolean {
    return listOfExercisesAdded.find(exercise => exercise.name === exerciseName)
      ? true
      : false;
  }
  function findTheExerciseOnListNewExercise(exerciseName: string): boolean {
    return listOfNewExercises.find(exercise => exercise.name === exerciseName)
      ? true
      : false;
  }

  function addTheNewOnesExercisesForEditingInfos() {
    setListOfExercisesAdded(prevState => {
      return prevState.concat(listOfNewExercises);
    });
    setListOfNewExercises([]);
    setAddExerciseContainer(false);
  }

  function handleChangeAddNewToTrue(id: string) {
    const hasSeriesInAnyExercise = listOfExercisesAdded.find(
      exercise => id === exercise.id,
    );
    if (hasSeriesInAnyExercise) {
      const verifyIfAlreadyExistsSeriesOnExercise =
        hasSeriesInAnyExercise.series.length > 0 ? false : true;
      setAddNewInfosOnExercise({
        exerciseId: id,
        newExercise: verifyIfAlreadyExistsSeriesOnExercise,
        reps: 0,
        partials: {
          havePartials: false,
          reps: 0,
        },
        rateSerie: '',
        weight: 0,
        helpedReps: {
          haveHelped: false,
          reps: 0,
        },
        useSomeEquipment: {
          listOfEquipment: [],
          use: false,
        },
        typeOfSerie: '',
      });
    }

    setAddNewSet({id, add: true});
  }

  function handleChangeAddNewSetToFalse() {
    setAddNewSet(prevState => ({
      id: prevState!.id,
      add: false,
    }));
  }

  async function handleUpdateInfosOfSeries({
    weight,
    reps,
    partials,
    helpedReps,
    useSomeEquipment,
    rateSerie,
    typeOfSerie,
  }: Omit<TSubmitSerieInfos, 'exerciseId'>) {
    try {
      await SessionService.updateSeriesInformation({
        idOfSession: sessionId,
        seriesInformation: {
          exerciseId: addNewInfosOnExercise.exerciseId,
          newExercise: addNewInfosOnExercise.newExercise as boolean,
          series: {
            exerciseId: addNewInfosOnExercise.exerciseId,
            helpedReps,
            partials,
            rateSerie,
            reps,
            useSomeEquipment,
            weight,
            typeOfSerie,
          },
        },
      });

      setListOfExercisesAdded(prevState => {
        const updatedList = prevState.map(exercise => {
          if (exercise.id === addNewInfosOnExercise.exerciseId) {
            return {
              ...exercise,
              series: [
                ...exercise.series,
                {
                  exerciseId: addNewInfosOnExercise.exerciseId,
                  weight,
                  reps,
                  partials,
                  helpedReps,
                  useSomeEquipment,
                  rateSerie,
                  newExercise: false,
                  typeOfSerie,
                },
              ],
            };
          }
          return exercise;
        });

        return updatedList;
      });
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Ouve algum erro ao registrar esse serie!',
        text2: 'Tente novamente!',
        position: 'bottom',
      });
    } finally {
      setAddNewSet({id: '', add: false});
      setAddNewInfosOnExercise({
        reps: 0,
        exerciseId: '',
        partials: {
          havePartials: false,
          reps: 0,
        },
        rateSerie: '',
        weight: 0,
        helpedReps: {
          haveHelped: false,
          reps: 0,
        },
        useSomeEquipment: {
          listOfEquipment: [],
          use: false,
        },
        typeOfSerie: '',
        newExercise: true,
      });
    }
  }

  function howManyExercisesToAdd() {
    const exercisesAlreadyAdded = listOfNewExercises.filter(
      e => e.series.length < 1,
    );
    return exercisesAlreadyAdded.length;
  }

  function totalSeriesOfSession() {
    let totalSeries = 0;
    for (const exercise of listOfNewExercises) {
      totalSeries += exercise.series.length;
    }
    return totalSeries;
  }

  const loadingData = loadingDataSessions || isFetched || isLoading;

  return {
    navigate,
    idOfMusclesGroups,
    addNewExerciseContainer,
    addExerciseContainer,
    dataMusclesGroups,
    findTheExerciseOnListAlreadyAdded,
    findTheExerciseOnListNewExercise,
    handleAddNewExercise,
    listOfNewExercises,
    selectedMuscleGroup,
    setSelectedMuscleGroup,
    addTheNewOnesExercisesForEditingInfos,
    tableInfos,
    setOpenModalInfos,
    addNewSet,
    handleUpdateInfosOfSeries,
    handleChangeAddNewSetToFalse,
    handleChangeAddNewToTrue,
    openModalInfos,
    howManyExercisesToAdd,
    totalSeriesOfSession,
    listOfExercisesAdded,
    loadingData,
  };
}
