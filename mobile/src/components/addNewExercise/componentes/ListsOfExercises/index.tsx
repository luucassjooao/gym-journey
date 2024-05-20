import {FlatList} from 'react-native';
import {IReturnDataGetMusclesGroups} from '../../../../service/MuscleGroupService';
import ExerciseContainer from '../ExerciseContainer';
import {IExerciseType} from '../../../../utils/types/Exercise';

interface IProps {
  mainList: IReturnDataGetMusclesGroups[];
  handleAddNewExercise(exercise: IExerciseType): void;
  findTheExerciseOnListAlreadyAdded(exerciseName: string): boolean;
  findTheExerciseOnListNewExercise(exerciseName: string): boolean;
}

export function ListOfExercises({
  findTheExerciseOnListAlreadyAdded,
  handleAddNewExercise,
  findTheExerciseOnListNewExercise,
  mainList,
}: IProps) {
  return (
    <FlatList
      data={mainList}
      renderItem={({item}) => (
        <FlatList
          data={item.exercises}
          renderItem={({item: exercise}) => (
            <ExerciseContainer
              key={exercise.id}
              item={exercise}
              handleAddNewExercise={handleAddNewExercise}
              thisExerciseIsSelectedOnListAlreadyAdded={findTheExerciseOnListAlreadyAdded(
                exercise.name,
              )}
              thisExerciseIsSelectedOnListNewExercise={findTheExerciseOnListNewExercise(
                exercise.name,
              )}
            />
          )}
          keyExtractor={exerciseItem => exerciseItem.id}
          keyboardShouldPersistTaps="handled"
        />
      )}
      keyExtractor={item => item.id}
      keyboardShouldPersistTaps="handled"
    />
  );
}
