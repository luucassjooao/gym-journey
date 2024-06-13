import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as S from './styles';
import ButtonApp from '../../components/Button';
import AddNewExercise from '../../components/addNewExercise';
import {RouteProp} from '@react-navigation/native';
import {PrivateRoutesParamList} from '../../routes/private';
import {Row, Rows, Table} from 'react-native-reanimated-table';
import AddNewSets from './components/AddNewSets';
import Toast from 'react-native-toast-message';
import ModalApp from '../../components/Modal';
import {useEditSessionInfos} from './useEditSessionInfos';
import TwoTextApp from '../../components/TwoText';
import Spinner from 'react-native-loading-spinner-overlay';

type RouteProps = RouteProp<PrivateRoutesParamList, 'editSessionInfos'>;
export interface IProps {
  route: RouteProps;
}

export default function EditSessionInfos({route}: IProps) {
  const {
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
    splitNamesInMuscleGroups,
    isLoadingUpdateSession,
    openModalGetLatestSessions,
    modalGetLatestSessions,
    dataGetLatestSessions,
    backThePreviousScreen,
    goToScreen,
    sessionId
  } = useEditSessionInfos({route});

  return (
    <>
    <S.Container>
      <S.Header>
        <S.ButtonHeader onPress={() => navigate.navigate('home')}>
          <S.TextButton>Home</S.TextButton>
        </S.ButtonHeader>
        {backThePreviousScreen && backThePreviousScreen.sessionId !== sessionId ? (
          <S.ButtonHeader onPress={() => navigate.navigate('editSessionInfos', {
            nameOfMusclesGroups: backThePreviousScreen.nameOfMusclesGroups,
            idOfMusclesGroups: backThePreviousScreen.idOfMusclesGroups,
            sessionId: backThePreviousScreen.sessionId,
          })}>
            <S.TextButton>Voltar a ultima sessao</S.TextButton>
          </S.ButtonHeader>
        ) : null}
        <S.ButtonHeader onPress={modalGetLatestSessions}>
          <S.TextButton>Ver ultimas sessoes</S.TextButton>
        </S.ButtonHeader>
      </S.Header>
      <S.TopBarInfos>
        <View style={{marginLeft: 8}}>
          <Text style={styles.textWhiteText}>
            Series Totais: {totalSeriesOfSession()}
          </Text>
          <Text style={styles.textWhiteText}>
            Grupos musculares:{' '}
            {typeof idOfMusclesGroups === 'string'
              ? '1'
              : idOfMusclesGroups.length}
            {` - ${splitNamesInMuscleGroups}`}
          </Text>
        </View>
      </S.TopBarInfos>
      <ButtonApp
        text={
          addExerciseContainer
            ? 'Não adicionar um exercicio'
            : 'Adicionar um exercicio'
        }
        style={[addExerciseContainer && {backgroundColor: 'red'}]}
        onPress={() => addNewExerciseContainer()}
      />

      {addExerciseContainer ? (
        <>
          <AddNewExercise
            key={Math.random()}
            exercises={dataMusclesGroups!}
            findTheExerciseOnListAlreadyAdded={
              findTheExerciseOnListAlreadyAdded
            }
            findTheExerciseOnListNewExercise={findTheExerciseOnListNewExercise}
            handleAddNewExercise={handleAddNewExercise}
            selectedMuscleGroup={selectedMuscleGroup}
            setSelectedMuscleGroup={setSelectedMuscleGroup}
          />
          {listOfNewExercises.length > 0 && (
            <S.ViewAddExercises>
              <ButtonApp
                onPress={() => addTheNewOnesExercisesForEditingInfos()}
                text={`Adicionar ${howManyExercisesToAdd()} exercicios`}
                style={{width: 300}}
              />
            </S.ViewAddExercises>
          )}
        </>
      ) : (
        <S.ContainerInfoExercise>
          <FlatList
            data={listOfExercisesAdded}
            renderItem={({item}) => (
              <S.WrapperInfoExercise key={Math.random()}>
                <S.NameImageOfExercise>
                  <S.Image source={{uri: item.media}} />
                  <View>
                    <Text style={[styles.textWhiteText, {fontSize: 18}]}>
                      {item.name}
                    </Text>
                  </View>
                </S.NameImageOfExercise>

                <View style={styles.container}>
                  <Table borderStyle={styles.borderStyle}>
                    <Row
                      data={tableInfos.tableHead}
                      style={styles.head}
                      textStyle={styles.rowStyle}
                    />
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
                              <S.ButtonMoreInfos
                                onPress={() =>
                                  setOpenModalInfos({
                                    openModal: true,
                                    helpedReps,
                                    partials,
                                    useSomeEquipment,
                                    rateSerie,
                                  })
                                }>
                                <Text style={styles.textWhiteText}>
                                  + Infos
                                </Text>
                              </S.ButtonMoreInfos>,
                            ],
                          ]}
                          style={styles.rowsStyle}
                          textStyle={{textAlign: 'center', color: '#000'}}
                          key={Math.random()}
                        />
                      ),
                    )}
                  </Table>
                  {addNewSet?.add && addNewSet?.id === item.id && (
                    <AddNewSets
                      handleUpdateInfosOfSeries={handleUpdateInfosOfSeries}
                      handleChangeAddNewSetToFalse={
                        handleChangeAddNewSetToFalse
                      }
                    />
                  )}
                  {!addNewSet?.add ? (
                    <ButtonApp
                      style={{backgroundColor: '#3772ffff'}}
                      text="Add set"
                      onPress={() => handleChangeAddNewToTrue(item.id)}
                    />
                  ) : null}
                </View>
              </S.WrapperInfoExercise>
            )}
            keyExtractor={item => item.id}
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
        <TwoTextApp
          colorFirstText={'#000'}
          fontSizeFirstText={20}
          textFirstText="Como a serie foi:"
          colorSecondText={'#000'}
          fontSizeSecondText={18}
          textSecondText={openModalInfos.rateSerie}
        />
        <TwoTextApp
          colorFirstText={'#000'}
          fontSizeFirstText={20}
          textFirstText="Quantas repetições forçadas/ajudadas teve:"
          colorSecondText={'#000'}
          fontSizeSecondText={18}
          textSecondText={openModalInfos.helpedReps?.reps}
        />
        <TwoTextApp
          colorFirstText={'#000'}
          fontSizeFirstText={20}
          textFirstText="Quantas repetições parciais teve: "
          colorSecondText={'#000'}
          fontSizeSecondText={18}
          textSecondText={openModalInfos.partials?.reps}
        />
        <TwoTextApp
          colorFirstText={'#000'}
          fontSizeFirstText={20}
          textFirstText="Quais equipamentos foram usados:"
          colorSecondText={'#000'}
          fontSizeSecondText={18}
          textSecondText={openModalInfos.useSomeEquipment.listOfEquipment
            .map(equipment => equipment)
            .join(' & ')}
        />
      </ModalApp>


      <Spinner visible={loadingData || isLoadingUpdateSession} />
    </S.Container>
      <ModalApp
        cancelLabel="Voltar"
        onCancel={modalGetLatestSessions}
        title=""
        visible={openModalGetLatestSessions}
        onConfirm={() => {}}
        confirmLabel=""
        danger={false}
        noPaddingOnTop
        isFlatList>
          <FlatList
            data={dataGetLatestSessions}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => item.id === sessionId ? true : goToScreen({
                targetedMuscles: item.targetedMuscles,
                id: item.id,
              })}>
              <S.ContainerInfosGetLatestSessions currentSession={
                item.id === sessionId ? true : false
              } >
                <S.Text currentSession={
                  item.id === sessionId ? true : false
                }>Treino de: {item.targetedMuscles.map(i => i.name.split('/')[0]).join(',')}</S.Text>
                <S.Text currentSession={
                  item.id === sessionId ? true : false
                }>Date: {`${new Date(item.date).toLocaleDateString()}`}</S.Text>
              </S.ContainerInfosGetLatestSessions>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ flexGrow: 0 }}
            style={{ flex: 0 }}
            keyExtractor={(item) => item.id}
          />
      </ModalApp>
      </>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  head: {
    backgroundColor: '#6320eeff',
  },
  textWhiteText: {
    color: '#fff',
  },
  borderStyle: {
    borderWidth: 2,
    borderColor: '#1f005d',
  },
  rowStyle: {
    textAlign: 'center',
    color: '#fff',
    padding: 0,
  },
  rowsStyle: {
    backgroundColor: '#cab9ed',
    height: 25,
  },
});
