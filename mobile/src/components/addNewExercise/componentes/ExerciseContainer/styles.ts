import styled from 'styled-components/native';

export const Wrapper = styled.TouchableOpacity<{selected?: boolean}>`
  flex-direction: row;
  gap: 14px;
  margin-bottom: 4px;
  background: ${({selected}) => (selected ? 'red' : '#fff')};
`;

export const Image = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 100px;
`;
