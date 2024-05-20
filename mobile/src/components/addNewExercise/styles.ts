import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  padding: 20px;
  background: #fff;
  margin: 16px 0px;
  flex: 1;
`;

export const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  gap: 14px;
`;

export const ConfirmSelectedExercises = styled.View`
  border: 5px solid;
  background: green;
  margin: auto;
  width: 50%;
  padding: 10px;
  z-index: 99;
`;

export const SearchButton = styled.TouchableOpacity`
  justify-content: center;
  border-width: 0.5px;
  padding: 4px;
  border-radius: 8px;
`;
