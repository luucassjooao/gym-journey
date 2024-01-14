import {useRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import * as S from './styles';
import AuthService from '../../service/AuthService';
import ButtonApp from '../../components/Button';
import {useErrors} from '../../hooks/useErrors';
import isEmailValid from '../../utils/isEmailValid';
import InputApp from '../../components/Input';
import FormGroup from '../../components/FormGroup';
import {useNavigation} from '@react-navigation/native';
import {AuthRoutesNavigationProp} from '../../routes/public/auth.routes';
import Toast from 'react-native-toast-message';
import Spinner from 'react-native-loading-spinner-overlay';

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailInputRef = useRef<TextInput | null>(null);
  const passwordInputRef = useRef<TextInput | null>(null);

  const {errors, setError, removeError, getErrorMessageByFieldName} =
    useErrors();

  const navigation = useNavigation<AuthRoutesNavigationProp>();

  function handleNameChange(
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) {
    setName(event.nativeEvent.text);

    if (!event.nativeEvent.text) {
      setError({field: 'name', message: 'Coloque seu nome porfavor!'});
    } else {
      removeError({fieldName: 'name'});
    }
  }

  function handleEmailChange(
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) {
    setEmail(event.nativeEvent.text);

    if (!event.nativeEvent.text || !isEmailValid(email)) {
      setError({field: 'email', message: 'Coloque seu email!'});
    } else {
      removeError({fieldName: 'email'});
    }
  }
  function handlePasswordChange(
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) {
    setPassword(event.nativeEvent.text);

    if (!event.nativeEvent.text) {
      setError({field: 'password', message: 'Coloque sua senha!'});
    } else if (event.nativeEvent.text.length < 6) {
      setError({
        field: 'password',
        message: 'Sua senha deve ter no mínimo 6 caracters!',
      });
    } else {
      removeError({fieldName: 'password'});
    }
  }

  async function handleSubmit() {
    setIsSubmitting(true);

    try {
      const response = await AuthService.signup(name, email, password);

      console.log(response);
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Ouve algum erro ao voce tentar fazer o seu cadastro!',
        text2: 'Tente novamente!',
        position: 'bottom',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const isFormValid = name && email && password && errors.length === 0;

  return (
    <S.Container>
      <S.ContainerWrapper>
        <S.MainText>Crie sua conta</S.MainText>
        <S.MainText>e começe uma nova jornada!</S.MainText>
        <S.ContaineTextInput>
          <S.InfoText>Nome</S.InfoText>
          <FormGroup error={getErrorMessageByFieldName({fieldName: 'name'})}>
            <InputApp
              value={name}
              onChange={handleNameChange}
              error={getErrorMessageByFieldName({fieldName: 'name'})}
              autoCapitalize="words"
              autoCorrect={false}
              autoComplete="name"
              onSubmitEditing={() => emailInputRef.current?.focus()}
              returnKeyType="next"
              enablesReturnKeyAutomatically
            />
          </FormGroup>
          <S.InfoText>E-mail</S.InfoText>
          <FormGroup error={getErrorMessageByFieldName({fieldName: 'email'})}>
            <InputApp
              ref={emailInputRef}
              value={email}
              onChange={handleEmailChange}
              error={getErrorMessageByFieldName({fieldName: 'email'})}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              returnKeyType="next"
              enablesReturnKeyAutomatically
            />
          </FormGroup>
          <S.InfoText>Senha</S.InfoText>
          <FormGroup
            error={getErrorMessageByFieldName({
              fieldName: 'password',
            })}>
            <InputApp
              ref={passwordInputRef}
              value={password}
              secureTextEntry
              onChange={handlePasswordChange}
              error={getErrorMessageByFieldName({fieldName: 'password'})}
              returnKeyType="done"
            />
          </FormGroup>
          <ButtonApp
            text="Criar minha conta"
            disabled={!isFormValid}
            style={[!isFormValid && {opacity: 0.3}]}
            onPress={handleSubmit}
          />
        </S.ContaineTextInput>
        <S.ContainerHr>
          <S.Hr />
          <View>
            <S.TextMiddleHr>Já tem uma conta?</S.TextMiddleHr>
          </View>
          <S.Hr />
        </S.ContainerHr>
        <ButtonApp
          text="Fazer Login"
          onPress={() => navigation.navigate('signin')}
        />
      </S.ContainerWrapper>

      <Toast />
      <Spinner
        visible={isSubmitting}
        animation="fade"
        size="large"
        overlayColor="rgba(0, 0, 0, 0.7)"
      />
    </S.Container>
  );
}
