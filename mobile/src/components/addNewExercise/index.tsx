import InputApp from '../Input';
import * as S from './styles';
import MuscleGroupService, {
  IReturnDataGetMusclesGroups,
} from '../../service/MuscleGroupService';
import {FlatList} from 'react-native-gesture-handler';
import {
  ReactNode,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react';
import ExerciseContainer from './componentes/ExerciseContainer';
import {useQueries} from '@tanstack/react-query';
import Spinner from 'react-native-loading-spinner-overlay';
import {ListOfExercises} from './componentes/ListsOfExercises';
import DropdownApp from '../Dropdown';
import { useEdit } from '../../hooks/useEdit';

const renderComponent = (condition: boolean, component: ReactNode) => {
  return condition ? component : null;
};

export default function AddNewExercise() {
  const {
    findTheExerciseOnListAlreadyAdded,
    findTheExerciseOnListNewExercise,
    selectedMuscleGroup,
    setSelectedMuscleGroup,
    handleAddNewExercise,
    dataMusclesGroups: exercises
  } = useEdit();

  const [searchExercise, setSearchExercise] = useState('');
  const [
    loadingSearchExerciseOfMuscleSelected,
    setLoadingSearchExerciseOfMuscleSelected,
  ] = useState<boolean>(false);

  const deferredSearchExercise = useDeferredValue(searchExercise);

  const filteredExercises = useMemo(() => {
    if (!deferredSearchExercise.trim()) {
      return exercises;
    }

    const normalizedSearch = deferredSearchExercise.toLowerCase().trim();

    return exercises?.filter(muscleGroup =>
        muscleGroup.exercises?.some(exercise =>
          exercise.name.toLowerCase().includes(normalizedSearch),
        ),
      )
      .map(muscleGroup => ({
        ...muscleGroup,
        exercises: muscleGroup.exercises?.filter(exercise =>
          exercise.name.toLowerCase().includes(normalizedSearch),
        ),
      }));
  }, [exercises, deferredSearchExercise]);

  const {
    '0': {data: dataMuscle},
    '1': {data: dataMuscleSelected, refetch: refetchMuscleSelected, isFetching},
  } = useQueries({
    queries: [
      {
        queryKey: ['Muscles'],
        queryFn: async (): Promise<IReturnDataGetMusclesGroups[] | undefined> =>
          MuscleGroupService.getAllMusclesGroups(),
      },
      {
        queryKey: ['SelectedMuscle'],
        queryFn: async (): Promise<IReturnDataGetMusclesGroups | {}> =>
          MuscleGroupService.findOneMuscleGroup(
            selectedMuscleGroup?.id as string,
          ),
      },
    ],
  });
  const namesOfMusclesGroups: string[] = dataMuscle?.map(mg => mg.name) || [];

  function handleSelectMuscleGroup(muscleGroup: string) {
    setLoadingSearchExerciseOfMuscleSelected(true);
    setSelectedMuscleGroup!(prevState => {
      if (prevState?.name === muscleGroup) {
        return prevState;
      }
      const findMuscleGroupSelected = dataMuscle?.find(
        mg => mg.name === muscleGroup,
      );
      return findMuscleGroupSelected!;
    });
  }

  useEffect(() => {
    refetchMuscleSelected();
    if (
      selectedMuscleGroup &&
      (dataMuscleSelected as IReturnDataGetMusclesGroups)?.name ===
        selectedMuscleGroup?.name
    ) {
      setSelectedMuscleGroup!(dataMuscleSelected as IReturnDataGetMusclesGroups);
    }
    setLoadingSearchExerciseOfMuscleSelected(false);
  }, [
    selectedMuscleGroup,
    refetchMuscleSelected,
    dataMuscleSelected,
    setSelectedMuscleGroup,
  ]);

  const componentes = {
    default: (
      <ListOfExercises
        mainList={exercises!}
        handleAddNewExercise={handleAddNewExercise}
        findTheExerciseOnListAlreadyAdded={findTheExerciseOnListAlreadyAdded}
        findTheExerciseOnListNewExercise={findTheExerciseOnListNewExercise}
      />
    ),
    searchExercise: (
      <ListOfExercises
        mainList={filteredExercises!}
        handleAddNewExercise={handleAddNewExercise}
        findTheExerciseOnListAlreadyAdded={findTheExerciseOnListAlreadyAdded}
        findTheExerciseOnListNewExercise={findTheExerciseOnListNewExercise}
      />
    ),
    selectedMuscleGroup: (
      <FlatList
        data={selectedMuscleGroup?.exercises}
        renderItem={({item}) => (
          <ExerciseContainer
            key={item.id}
            item={item}
            handleAddNewExercise={handleAddNewExercise}
            thisExerciseIsSelectedOnListAlreadyAdded={findTheExerciseOnListAlreadyAdded(
              item.name,
            )}
            thisExerciseIsSelectedOnListNewExercise={findTheExerciseOnListNewExercise(
              item.name,
            )}
          />
        )}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="handled"
      />
    ),
  };

  return (
    <S.Container>
      <S.Wrapper>
        <InputApp
          placeholder="Nome de um exercicio especifico"
          background="#fff"
          colorText="#000"
          value={searchExercise}
          onChange={e => setSearchExercise(e.nativeEvent.text)}
        />
      </S.Wrapper>

      <DropdownApp
        mainList={namesOfMusclesGroups}
        buttonDefaultMessage="Grupos Musculares"
        buttonAfterSelectMessage={selectedMuscleGroup?.name!}
        handleSelectOption={handleSelectMuscleGroup}
      />

      {renderComponent(
        !selectedMuscleGroup && searchExercise.length === 0,
        componentes.default,
      )}
      {renderComponent(searchExercise.length !== 0, componentes.searchExercise)}
      {renderComponent(!!selectedMuscleGroup, componentes.selectedMuscleGroup)}

      <Spinner visible={loadingSearchExerciseOfMuscleSelected || isFetching} />
    </S.Container>
  );
}
