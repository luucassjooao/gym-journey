import InputApp from '../Input';
import * as S from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MuscleGroupService, {
  IReturnDataGetMusclesGroups,
} from '../../service/MuscleGroupService';
import {FlatList} from 'react-native-gesture-handler';
import {
  ReactNode,
  SetStateAction,
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
import {IExerciseType} from '../../utils/types/Exercise';

const renderComponent = (condition: boolean, component: ReactNode) => {
  return condition ? component : null;
};

interface IProps {
  exercises: IReturnDataGetMusclesGroups[];
  listOfNewExercises: IExerciseType[];
  handleAddNewExercise(exercise: IExerciseType): void;
  findTheExerciseOnList(exerciseName: string): boolean;
  selectedMuscleGroup: IReturnDataGetMusclesGroups | null | undefined;
  setSelectedMuscleGroup: (
    value: SetStateAction<IReturnDataGetMusclesGroups | null | undefined>,
  ) => void;
}

export default function AddNewExercise({
  exercises,
  handleAddNewExercise,
  findTheExerciseOnList,
  selectedMuscleGroup,
  setSelectedMuscleGroup,
}: IProps) {
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

    return exercises
      .filter(muscleGroup =>
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
    '1': {data: dataMuscleSelected, refetch: refetchMuscleSelected},
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
    setSelectedMuscleGroup(prevState => {
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
      setSelectedMuscleGroup(dataMuscleSelected as IReturnDataGetMusclesGroups);
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
        mainList={exercises}
        handleAddNewExercise={handleAddNewExercise}
        findTheExerciseOnList={findTheExerciseOnList}
      />
    ),
    searchExercise: (
      <ListOfExercises
        mainList={filteredExercises}
        handleAddNewExercise={handleAddNewExercise}
        findTheExerciseOnList={findTheExerciseOnList}
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
            thisExerciseIsSelected={findTheExerciseOnList(item.name)}
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
          width={84}
          background="#fff"
          colorText="#000"
          value={searchExercise}
          onChange={e => setSearchExercise(e.nativeEvent.text)}
        />
        <S.SearchButton>
          <Icon name="search" solid size={30} />
        </S.SearchButton>
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

      <Spinner visible={loadingSearchExerciseOfMuscleSelected} />
    </S.Container>
  );
}
