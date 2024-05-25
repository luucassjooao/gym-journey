import styled from 'styled-components/native';

export const Wrapper = styled.TouchableOpacity<{
  selecteAlreadyAdded?: boolean;
  selectedNewExercise: boolean;
}>`
  flex-direction: row;
  gap: 14px;
  margin-bottom: 4px;
  background: ${({selecteAlreadyAdded, selectedNewExercise}) =>
    selecteAlreadyAdded && !selectedNewExercise
      ? '#cad5caff'
      : !selecteAlreadyAdded && selectedNewExercise
      ? 'red'
      : '#fff '};
  border-radius: 8px;
  align-items: center;
  border: ${({selecteAlreadyAdded, selectedNewExercise}) =>
    selecteAlreadyAdded && !selectedNewExercise ? '0px' : '1px #000'};
`;

export const Image = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  margin: 4px;
`;

export const Text = styled.Text`
  font-size: 18px;
  color: #000;
  font-weight: 500;
`;

export const ViewTextName = styled.View`
  max-width: 300px;
  padding: 8px;
`;
