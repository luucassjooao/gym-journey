import {useState} from 'react';
import {Button} from 'react-native';
import * as S from './styles';
import AuthService from '../../service/AuthService';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit() {
    try {
      const response = await AuthService.login(email, password);

      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <S.Container>
      <S.ContainerWrapper>
        <S.ContaineTextInput>
          <S.MainText>Login</S.MainText>
          <S.TextInput
            value={email}
            onChange={e => setEmail(e.nativeEvent.text)}
          />
          <S.TextInput
            value={password}
            onChange={e => setPassword(e.nativeEvent.text)}
          />
          <Button title="submit" onPress={handleSubmit} />
        </S.ContaineTextInput>
      </S.ContainerWrapper>
    </S.Container>
  );
}
