import {SetStateAction, useRef} from 'react';
import {useErrors} from '../../hooks/useErrors';
import {NativeSyntheticEvent, TextInput, View} from 'react-native';
import {TextInputChangeEventData} from 'react-native';
import FormGroup from '../FormGroup';
import InputApp from '../Input';
import ButtonApp from '../Button';
import * as S from './styles';
import isEmailValid from '../../utils/isEmailValid';
import Toast from 'react-native-toast-message';
import Spinner from 'react-native-loading-spinner-overlay';
import {useNavigation} from '@react-navigation/native';
import {AuthRoutesNavigationProp} from '../../routes/public/auth.routes';

interface IProps {
  type: 'signin' | 'signup';
  name?: string;
  email: string;
  password: string;
  isSubmitting: boolean;
  setName: (value: SetStateAction<string>) => void;
  setEmail: (value: SetStateAction<string>) => void;
  setPassword: (value: SetStateAction<string>) => void;
  handleSubmit: () => void;
}

export default function AuthForm({
  type,
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
  handleSubmit,
  isSubmitting,
}: IProps) {
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

  const whereToNavigate = (): 'signin' | 'signup' =>
    type === 'signin' ? 'signup' : 'signin';
  const isFormValid =
    (type === 'signup' ? name : true) &&
    email &&
    password &&
    errors.length === 0;

  return (
    <S.Container>
      <S.ContainerWrapper>
        {type === 'signup' ? (
          <>
            <S.MainText>Crie sua conta</S.MainText>
            <S.MainText>e começe uma nova jornada!</S.MainText>
          </>
        ) : (
          <S.MainText>Login</S.MainText>
        )}

        <S.ContainerTextInput>
          {type === 'signup' && (
            <>
              <S.InfoText>Nome</S.InfoText>
              <FormGroup
                error={getErrorMessageByFieldName({fieldName: 'name'})}>
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
                  background={'#1b0c72'}
                />
              </FormGroup>
            </>
          )}
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
              background={'#1b0c72'}
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
              background={'#1b0c72'}
            />
          </FormGroup>
          <ButtonApp
            text={type === 'signin' ? 'Login' : 'Criar minha conta'}
            disabled={!isFormValid}
            style={[!isFormValid && {opacity: 0.3}]}
            onPress={handleSubmit}
          />
        </S.ContainerTextInput>

        <S.ContainerHr>
          <S.Hr />
          <View>
            <S.TextMiddleHr>
              {type === 'signin' ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            </S.TextMiddleHr>
          </View>
          <S.Hr />
        </S.ContainerHr>
        <ButtonApp
          text={type === 'signin' ? 'Criar um conta' : 'Fazer Login'}
          onPress={() => navigation.navigate(whereToNavigate())}
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
