import {Text} from 'react-native';
import * as S from './styles';
import {IExerciseType} from '../../../../service/MuscleGroupService';

interface IProps {
  item: IExerciseType;
  handleAddNewExercise: (item: IExerciseType) => void;
  thisExerciseIsSelected: boolean;
}

export default function ExerciseContainer({
  item,
  handleAddNewExercise,
  thisExerciseIsSelected,
}: IProps) {
  return (
    <S.Wrapper
      onPress={() => handleAddNewExercise(item)}
      selected={thisExerciseIsSelected}
      activeOpacity={1}>
      <S.Image source={require('../../../../../img/image.png')} />
      <Text>{item.name}</Text>
    </S.Wrapper>
  );
}
