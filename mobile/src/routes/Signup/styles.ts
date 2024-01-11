import styled from 'styled-components/native';

export const Container = styled.View`
  background: #210023;
  flex: 1;
`;

export const ContainerWrapper = styled.View`
  background: #caa823;
  position: absolute;
  width: 100%;
  height: 70%;
  border-radius: 8px;
  bottom: 0px;
  justify-content: space-around;
`;

export const ContaineTextInput = styled.View`
  gap: 16px;
  width: 100%;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  width: 70%;
  height: 48px;
  background: #fff;
`;

export const MainText = styled.Text`
  font-size: 38px;
`;
