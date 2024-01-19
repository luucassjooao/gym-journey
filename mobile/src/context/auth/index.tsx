import {createContext, useEffect, useState} from 'react';
import {AuthContextType, IAuthProvider} from './types';
import {UserType} from '../../utils/types/User';
import {onlineManager, useQuery} from '@tanstack/react-query';
import AuthService from '../../service/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ASYNC_STORAGE_USER_KEY} from '../../storage/AsyncStorageKeys';
import Toast from 'react-native-toast-message';
import UserService from '../../service/UserService';
import {REACT_QUERY_BASIC_USER_INFOS_KEY} from '../../storage/RectQueryKeys';
import Spinner from 'react-native-loading-spinner-overlay';

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({children}: IAuthProvider) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(true);

  async function getTokenUser() {
    const userInfos = await AsyncStorage.getItem(ASYNC_STORAGE_USER_KEY);
    const parsedUserInfos: UserType = JSON.parse(userInfos || '{}');
    return parsedUserInfos.token;
  }

  useEffect(() => {
    const onlineStatus = onlineManager.isOnline();
    setIsOnline(onlineStatus);
  }, []);

  useEffect(() => {
    loadInfos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);

  const {refetch, isFetching} = useQuery({
    enabled: false,
    staleTime: Infinity,
    queryKey: [REACT_QUERY_BASIC_USER_INFOS_KEY],
    queryFn: async () => {
      const token = await getTokenUser();
      if (token) {
        const response = await UserService.getUserInfo(token);

        setUser(response);
        await AsyncStorage.setItem(
          ASYNC_STORAGE_USER_KEY,
          JSON.stringify(response),
        );
      }

      setUser(null);
      await AsyncStorage.removeItem(ASYNC_STORAGE_USER_KEY);
      logout();
      Toast.show({
        type: 'info',
        text1: 'Voce foi desconectado!',
      });
    },
  });

  async function loadInfos() {
    const token = await getTokenUser();

    if (token) {
      try {
        await refetch();
      } catch {
        logout();
      }
    }
  }

  async function signIn(email: string, password: string) {
    setIsLoading(true);

    try {
      const response = await AuthService.signin(email, password);

      setUser(response);
      await AsyncStorage.setItem(
        ASYNC_STORAGE_USER_KEY,
        JSON.stringify(response),
      );
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Ouve algum erro ao voce tentar fazer o login!',
        text2: 'Tente novamente!',
        position: 'bottom',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function signUp(name: string, email: string, password: string) {
    setIsLoading(true);

    try {
      const response = await AuthService.signup(name, email, password);

      setUser(response);
      await AsyncStorage.setItem(
        ASYNC_STORAGE_USER_KEY,
        JSON.stringify(response),
      );
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Ouve algum erro ao voce tentar fazer o seu cadastro!',
        text2: 'Tente novamente!',
        position: 'bottom',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    setUser(null);
    await AsyncStorage.removeItem(ASYNC_STORAGE_USER_KEY);
  }

  return (
    <>
      <Toast />
      <Spinner visible={isFetching || isLoading} />
      <AuthContext.Provider
        value={{
          user,
          logout,
          signIn,
          signUp,
        }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
