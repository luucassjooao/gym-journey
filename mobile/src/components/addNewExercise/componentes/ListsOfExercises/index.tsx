import {FlatList} from 'react-native';
import {
  IExerciseType,
  IReturnDataGetMusclesGroups,
} from '../../../../service/MuscleGroupService';
import ExerciseContainer from '../ExerciseContainer';

interface IProps {
  mainList: IReturnDataGetMusclesGroups[];
  handleAddNewExercise(exercise: IExerciseType): void;
  findTheExerciseOnList(exerciseName: string): boolean;
}

export function ListOfExercises({
  findTheExerciseOnList,
  handleAddNewExercise,
  mainList,
}: IProps) {
  return (
    <FlatList
      data={mainList}
      renderItem={({item}) => (
        <FlatList
          data={item.exercises}
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
      )}
      keyExtractor={item => item.id}
      keyboardShouldPersistTaps="handled"
    />
  );
}
