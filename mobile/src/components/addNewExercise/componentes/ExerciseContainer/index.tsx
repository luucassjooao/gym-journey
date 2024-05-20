import * as S from './styles';
import {IExerciseType} from '../../../../utils/types/Exercise';

interface IProps {
  item: IExerciseType;
  handleAddNewExercise: (item: IExerciseType) => void;
  thisExerciseIsSelectedOnListAlreadyAdded: boolean;
  thisExerciseIsSelectedOnListNewExercise: boolean;
}

export default function ExerciseContainer({
  item,
  handleAddNewExercise,
  thisExerciseIsSelectedOnListAlreadyAdded,
  thisExerciseIsSelectedOnListNewExercise,
}: IProps) {
  function verifyIfExerciseAlreadyAddedOnMainList() {
    return thisExerciseIsSelectedOnListAlreadyAdded
      ? null
      : handleAddNewExercise(item);
  }

  return (
    <S.Wrapper
      onPress={() => verifyIfExerciseAlreadyAddedOnMainList()}
      selecteAlreadyAdded={thisExerciseIsSelectedOnListAlreadyAdded}
      selectedNewExercise={thisExerciseIsSelectedOnListNewExercise}
      activeOpacity={1}>
      <S.Image source={require('../../../../../img/image.png')} />
      <S.Text>{item.name}</S.Text>
    </S.Wrapper>
  );
}
