import styled from 'styled-components/native';

export const Overlay = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
  flex: 1;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;

export const Container = styled.View`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text<{danger: boolean}>`
  font-size: 32px;
  color: ${({danger}) => (danger ? 'red' : '#000')};
`;

export const ModalBody = styled.View`
  margin-top: 22px;
  max-height: 500px;
`;

export const Footer = styled.View`
  margin-top: 22px;
  flex-direction: row;
  align-items: center;
  /* justify-content: flex-end; */
`;
