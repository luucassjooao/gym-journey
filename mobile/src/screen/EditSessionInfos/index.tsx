import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import * as S from './styles';
import ButtonApp from '../../components/Button';
import {useEffect, useState} from 'react';
import AddNewExercise from '../../components/addNewExercise';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {
  PrivateRouteNavitationProp,
  PrivateRoutesParamList,
} from '../../routes/private';
import {useQueries} from '@tanstack/react-query';
import MuscleGroupService, {
  IExerciseType,
  IReturnDataGetMusclesGroups,
} from '../../service/MuscleGroupService';
import {Image} from 'react-native';
import {Row, Rows, Table} from 'react-native-reanimated-table';
import AddNewSets from './components/AddNewSets';
import SessionService from '../../service/SessionService';
import Toast from 'react-native-toast-message';
import {IExerciseSession} from '../../service/SessionService/type';
import ModalApp from '../../components/Modal';

type RouteProps = RouteProp<PrivateRoutesParamList, 'editSessionInfos'>;

interface Props {
  route: RouteProps;
}

export type IExerciseTypeProps = IExerciseType & {
  series: InfosSerie[];
};

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

export interface ISubmitSerieInfos {
  weight: number;
  reps: number;
  partials: IPartials;
  helpedReps: IHelpedReps;
  useSomeEquipment: IUseSomeEquipment;
  rateSerie: string;
  typeOfSerie: string;
}

export default function EditSessionInfos({route}: Props) {
  const {sessionId, idOfMusclesGroups} = route.params;
  const [addExerciseContainer, setAddExerciseContainer] =
    useState<boolean>(false);
  const [listOfNewExercises, setListOfNewExercises] = useState<
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
  const [openModalInfos, setOpenModalInfos] = useState<{
    openModal: boolean;
    helpedReps: {
      haveHelped: boolean;
      reps: number;
    };
    useSomeEquipment: {
      listOfEquipment: string[];
      use: boolean;
    };
    partials: {
      havePartials: boolean;
      reps: number;
    };
    rateSerie: string;
  }>({
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

  const navigate = useNavigation<PrivateRouteNavitationProp>();

  const idsOfMusclesGroups =
    typeof idOfMusclesGroups === 'string'
      ? idOfMusclesGroups
      : (idOfMusclesGroups as string[]).join(',');
  const {
    '0': {data: dataMusclesGroups},
    '1': {data: dataSessionAlreadyExist},
  } = useQueries({
    queries: [
      {
        queryKey: [`${idsOfMusclesGroups}`],
        queryFn: async (): Promise<IReturnDataGetMusclesGroups[]> =>
          MuscleGroupService.seletectedMusclesGroups(idsOfMusclesGroups),
      },
      {
        queryKey: [sessionId],
        queryFn: async (): Promise<IExerciseSession> =>
          SessionService.getUniqueSession(sessionId),
      },
    ],
  });

  useEffect(() => {
    if (dataSessionAlreadyExist) {
      for (const dataObject of dataSessionAlreadyExist.seriesinformation) {
        for (const key in dataObject) {
          if (Object.hasOwnProperty.call(dataObject, key)) {
            const name = key;
            const series = dataObject[key];
            setListOfNewExercises(prevState => {
              const idOfTheExercise = dataObject[name][0].exerciseId;
              if (prevState.some(re => re.id === idOfTheExercise)) {
                return prevState;
              }
              const newExercise: IExerciseTypeProps = {
                id: idOfTheExercise,
                media: '',
                musclesGroupsId: idsOfMusclesGroups,
                name,
                series,
              };
              return [...prevState, newExercise];
            });
          }
        }
      }
    }
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

  function findTheExerciseOnList(exerciseName: string): boolean {
    return listOfNewExercises.find(exercise => exercise.name === exerciseName)
      ? true
      : false;
  }

  function addTheNewOnesExercisesForEditingInfos() {
    setAddExerciseContainer(false);
  }

  function handleChangeAddNewToTrue(id: string) {
    const hasSeriesInAnyExercise = listOfNewExercises.some(
      exercise => exercise.series.length > 0,
    );

    setAddNewSet({id, add: true});
    setAddNewInfosOnExercise({
      exerciseId: id,
      newExercise: !hasSeriesInAnyExercise,
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
  }: ISubmitSerieInfos) {
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

      setListOfNewExercises(prevState => {
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
        text1: 'Ouve algum erro ao voce tentar fazer o login!',
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

  return (
    <S.Container>
      <Button
        onPress={() => navigate.navigate('home')}
        title="HOME
        "
      />
      <S.TopBarInfos>
        <Text>Data: {new Date().toLocaleDateString()}</Text>
        <Text>tempo: {new Date().toLocaleDateString()}</Text>
        <Text>Series Totais: 47</Text>
        <Text>
          grupos musculares totais:{' '}
          {typeof idOfMusclesGroups === 'string'
            ? '1'
            : idOfMusclesGroups.length}
        </Text>
      </S.TopBarInfos>
      <ButtonApp
        text="Encerrar sessao de treino"
        onPress={() => addNewExerciseContainer()}
      />
      <ButtonApp
        text="Adicionar um exercicio"
        onPress={() => addNewExerciseContainer()}
      />

      {addExerciseContainer ? (
        <>
          <AddNewExercise
            key={Math.random()}
            exercises={dataMusclesGroups!}
            findTheExerciseOnList={findTheExerciseOnList}
            handleAddNewExercise={handleAddNewExercise}
            listOfNewExercises={listOfNewExercises}
            selectedMuscleGroup={selectedMuscleGroup}
            setSelectedMuscleGroup={setSelectedMuscleGroup}
          />
          {listOfNewExercises.length > 0 && (
            <View
              style={{
                zIndex: 99,
                position: 'absolute',
                bottom: 20,
                alignSelf: 'center',
              }}>
              <ButtonApp
                onPress={() => addTheNewOnesExercisesForEditingInfos()}
                text={`Adicionar ${listOfNewExercises.length} exercicios`}
                style={{width: 300}}
              />
            </View>
          )}
        </>
      ) : (
        <S.ContainerInfoExercise>
          <FlatList
            data={listOfNewExercises}
            renderItem={({item}) => (
              <S.WrapperInfoExercise key={Math.random()}>
                <S.NameImageOfExercise>
                  <Image
                    source={require('../../../img/image.png')}
                    style={{width: 70, height: 70}}
                  />
                  <Text style={{color: '#fff'}}>{item.name}</Text>
                </S.NameImageOfExercise>
                <Text style={{color: '#fff'}}>
                  Observações sobre o treino...
                </Text>

                <View style={stylesTable.container}>
                  <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={tableInfos.tableHead} style={stylesTable.head} />
                    {item.series.map(
                      ({
                        reps,
                        weight,
                        typeOfSerie,
                        helpedReps,
                        partials,
                        useSomeEquipment,
                        rateSerie,
                      }) => (
                        <Rows
                          data={[
                            [
                              reps,
                              weight,
                              typeOfSerie,
                              <Button
                                title="+ Infos"
                                onPress={() =>
                                  setOpenModalInfos({
                                    openModal: true,
                                    helpedReps,
                                    partials,
                                    useSomeEquipment,
                                    rateSerie,
                                  })
                                }
                              />,
                            ],
                          ]}
                          style={{backgroundColor: '#fff'}}
                          key={Math.random()}
                        />
                      ),
                    )}
                  </Table>
                  {addNewSet?.add && (
                    <AddNewSets
                      handleUpdateInfosOfSeries={handleUpdateInfosOfSeries}
                      handleChangeAddNewSetToFalse={
                        handleChangeAddNewSetToFalse
                      }
                    />
                  )}
                  {!addNewSet?.add ? (
                    <ButtonApp
                      text="Add set"
                      onPress={() => handleChangeAddNewToTrue(item.id)}
                    />
                  ) : null}
                </View>
              </S.WrapperInfoExercise>
            )}
          />
        </S.ContainerInfoExercise>
      )}
      <Toast />
      <ModalApp
        cancelLabel="Voltar"
        onCancel={() =>
          setOpenModalInfos({
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
          })
        }
        title="Algumas das informações destas serie"
        visible={openModalInfos.openModal}
        onConfirm={() => {}}
        confirmLabel=""
        danger={false}>
        <Text>Como a serie foi: {openModalInfos.rateSerie}</Text>
        <Text>
          Quantas repetições forçadas/ajudadas teve:{' '}
          {openModalInfos.helpedReps.reps}
        </Text>
        <Text>
          Quantas repetições parciais teve: {openModalInfos.partials.reps}
        </Text>
        <Text>
          Quais equipamentos foram usados:{' '}
          {openModalInfos.useSomeEquipment.listOfEquipment.map(
            equipment => equipment,
          )}
        </Text>
      </ModalApp>
    </S.Container>
  );
}

const stylesTable = StyleSheet.create({
  container: {flex: 1},
  head: {backgroundColor: '#f1f8ff'},
});
