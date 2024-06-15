import { createContext, useEffect, useState } from "react";
import { EditSessionInfosType, IEditSessionInfosProvider, IGoToScreen } from "./types";
import { IExerciseType, IExerciseTypeProps, IOpenModalInfos, InfosSerie, TSubmitSerieInfos } from "../../utils/types/Exercise";
import MuscleGroupService, { IReturnDataGetMusclesGroups } from "../../service/MuscleGroupService";
import { useNavigation } from "@react-navigation/native";
import { IRouteEditSessionInfos, PrivateRouteNavitationProp } from "../../routes/private";
import { useQueries } from "@tanstack/react-query";
import { ISession } from "../../utils/types/Session";
import SessionService, { IGetLatestSessions } from "../../service/SessionService";
import Toast from "react-native-toast-message";
import Spinner from "react-native-loading-spinner-overlay";

export const EditSessionInfosContext = createContext<EditSessionInfosType>({
  navigate: null,
  idOfMusclesGroups: [],
  splitNamesInMuscleGroups: '',
  addNewExerciseContainer: () => {},
  addExerciseContainer: false,
  dataMusclesGroups: undefined,
  findTheExerciseOnListAlreadyAdded: (exerciseName: string) => false,
  findTheExerciseOnListNewExercise: (exerciseName: string) => false,
  handleAddNewExercise: (exercise: IExerciseType) => {},
  listOfNewExercises: [],
  selectedMuscleGroup: null,
  setSelectedMuscleGroup: null,
  addTheNewOnesExercisesForEditingInfos: () => {},
  tableInfos: {
    tableHead: [],
},
  setOpenModalInfos: null,
  addNewSet: {
    id: '',
    add: false,
},
  handleUpdateInfosOfSeries: async ({ weight, reps, partials, helpedReps, useSomeEquipment, rateSerie, typeOfSerie, }: Omit<TSubmitSerieInfos, 'exerciseId'>) => {},
  handleChangeAddNewSetToFalse: () => {},
  handleChangeAddNewToTrue: (id: string) => {},
  openModalInfos: null,
  howManyExercisesToAdd: () => 0,
  totalSeriesOfSession: () => 0,
  listOfExercisesAdded: [],
  loadingData: false,
  route: (infos: IRouteEditSessionInfos) => {},
  routesInfos: null,
  openModalGetLatestSessions: false,
  modalGetLatestSessions: async () => {},
  dataGetLatestSessions: undefined,
  backThePreviousScreen: undefined,
  goToScreen: (infos: IGoToScreen) => {},
  sessionId: '',
  resetListOfExercises: () => {}
});

export function EditSessionInfosProvider({children}: IEditSessionInfosProvider) {
  const [routesInfos, setRoutesInfos] = useState<IRouteEditSessionInfos | null>({
    nameOfMusclesGroups: '',
    idOfMusclesGroups: '',
    sessionId: ''
  });
  const {nameOfMusclesGroups, idOfMusclesGroups, sessionId, backThePreviousScreen} = routesInfos as IRouteEditSessionInfos;

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
  const [loadingDataSessions, setLoadingDataSession] = useState<boolean>(false);
  const [isLoadingUpdateSession, setIsLoadingUpdateSession] =
    useState<boolean>(false);

  const [openModalGetLatestSessions, setOpenModalGetLatestSessions] = useState(false);

  const navigate = useNavigation<PrivateRouteNavitationProp>();

  function route({
    nameOfMusclesGroups,
    idOfMusclesGroups,
    sessionId,
    backThePreviousScreen
  }: IRouteEditSessionInfos) {
    setRoutesInfos({
      nameOfMusclesGroups,
      idOfMusclesGroups,
      sessionId,
      backThePreviousScreen
    })
  }

  const idsOfMusclesGroups =
    typeof idOfMusclesGroups === 'string'
      ? idOfMusclesGroups
      : (idOfMusclesGroups as string[]).join(',');
  const {
    '0': {data: dataMusclesGroups, },
    '1': {data: dataSessionAlreadyExist, isLoading, refetch: refetchInfosSession},
    '2': {data: dataGetLatestSessions},
  } = useQueries({
    queries: [
      {
        queryKey: [`${idsOfMusclesGroups}`],
        queryFn: async (): Promise<IReturnDataGetMusclesGroups[]> =>
          MuscleGroupService.seletectedMusclesGroups(idsOfMusclesGroups),
        enabled: !!idOfMusclesGroups,
      },
      {
        queryKey: [sessionId],
        queryFn: async (): Promise<ISession> =>
          SessionService.getUniqueSession(sessionId),
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        enabled: !!sessionId
      },
      {
        queryKey: [`${sessionId}-${idsOfMusclesGroups}`],
        queryFn: async (): Promise<IGetLatestSessions[]> => SessionService.getLatestSessions(typeof idsOfMusclesGroups === 'string' ? [idsOfMusclesGroups] : idsOfMusclesGroups),
        staleTime: 36000,
        refetchInterval: 36000,
        enabled: !!sessionId && !!idOfMusclesGroups
      }
    ],
  });

  useEffect(() => {
    return () => {
      (async () => {
        await refetchInfosSession();
      })();
    }
  }, []);

  useEffect(() => {
    setLoadingDataSession(true);
    if (dataSessionAlreadyExist) {
      setListOfExercisesAdded([]);
      for (const dataObject of dataSessionAlreadyExist.seriesinformation) {
        const {exerciseId, exerciseName, observation, series, exerciseMedia} = dataObject;
        setListOfExercisesAdded(prevState => {
          const pushExercise: IExerciseTypeProps = {
            id: exerciseId,
            media: exerciseMedia,
            musclesGroupsId: idsOfMusclesGroups,
            name: exerciseName,
            observation: observation as string,
            series,
          };
          return [...prevState, pushExercise];
        });
      }
    }
    setLoadingDataSession(false);
  }, [dataSessionAlreadyExist, idOfMusclesGroups, idsOfMusclesGroups]);

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
        observation: exercise.observation,
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
    setIsLoadingUpdateSession(true);
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
    setIsLoadingUpdateSession(false);
  }

  function howManyExercisesToAdd() {
    const exercisesAlreadyAdded = listOfNewExercises.filter(
      e => e.series.length < 1,
    );
    return exercisesAlreadyAdded.length;
  }

  function totalSeriesOfSession() {
    let totalSeries = 0;
    for (const exercise of listOfExercisesAdded) {
      totalSeries += exercise.series.length;
    }
    return totalSeries;
  }

  async function modalGetLatestSessions() {
    setOpenModalGetLatestSessions((prevState) => prevState !== true);
  }

  function goToScreen({id, targetedMuscles}: IGoToScreen) {
    const nameMuscles = targetedMuscles.map(({name}) => name);
    const idMuscles = targetedMuscles.map(({id}) => id);
    route({
      nameOfMusclesGroups: nameMuscles,
      idOfMusclesGroups: idMuscles,
      sessionId: id,
      backThePreviousScreen: {
        nameOfMusclesGroups,
        idOfMusclesGroups,
        sessionId
      }
    })

    navigate.navigate('editSessionInfos', {
      nameOfMusclesGroups: nameMuscles,
      idOfMusclesGroups: idMuscles,
      sessionId: id,
      backThePreviousScreen: {
        sessionId,
        nameOfMusclesGroups,
        idOfMusclesGroups
      }
    })
    modalGetLatestSessions()
  }

  function resetListOfExercises() {
    setListOfExercisesAdded([]);
  }

  const loadingData = loadingDataSessions || isLoading || isLoadingUpdateSession;
  const splitNamesInMuscleGroups =
    typeof nameOfMusclesGroups === 'string'
      ? nameOfMusclesGroups
        : !nameOfMusclesGroups ? ''
          :  nameOfMusclesGroups?.map(name => name.split('/')[0]).join(' & ');

  return (
    <>
      <Toast />
      <Spinner visible={loadingData} />
      <EditSessionInfosContext.Provider value={{
        navigate,
        idOfMusclesGroups,
        splitNamesInMuscleGroups,
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
        route,
        routesInfos,
        openModalGetLatestSessions,
        modalGetLatestSessions,
        dataGetLatestSessions,
        backThePreviousScreen,
        goToScreen,
        sessionId,
        resetListOfExercises
      }} >
        {children}
      </EditSessionInfosContext.Provider>
    </>
  )
}

