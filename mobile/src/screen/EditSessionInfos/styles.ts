import styled from 'styled-components/native';

export const Container = styled.View`
  background: #0d0a1e;
  flex: 1;
`;

export const TopBarInfos = styled.View`
  width: 100%;
  border: 2px;
  padding-bottom: 15px;
  border-bottom-color: #fff;
`;

export const ContainerInfoExercise = styled.View`
  column-gap: 14px;
  flex: 1;
  margin-bottom: 20px;
`;

export const WrapperInfoExercise = styled.View`
  flex: 1;
  padding: 10px;
  flex-direction: column;
`;

export const NameImageOfExercise = styled.View`
  flex-direction: row;
  gap: 10px;
  margin-bottom: 10px;
  max-width: 300px;
`;

export const Header = styled.View`
  border: 2px;
  border-bottom-color: #fff;
  height: 50px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonHeader = styled.TouchableOpacity`
  border: 1px #fff;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin: 2px 10px 0px 10px;
  padding: 8px;
  border-radius: 8px;
`;
export const TextButton = styled.Text`
  color: #fff;
`;

export const ButtonMoreInfos = styled.TouchableOpacity`
  align-items: center;
  background: #361874;
  width: 100%;
  height: 100%;
`;

export const Image = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 20px;
  background: #fff;
`;

export const ViewAddExercises = styled.View`
  z-index: 99;
  position: absolute;
  bottom: 20px;
  align-self: center;
`;
