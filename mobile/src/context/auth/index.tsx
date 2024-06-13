import React, {createContext, useCallback, useEffect, useState} from 'react';
import {AuthContextType, IAuthProvider} from './types';
import {UserType} from '../../utils/types/User';
import {useQuery} from '@tanstack/react-query';
import AuthService from '../../service/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ASYNC_STORAGE_USER_KEY} from '../../storage/AsyncStorageKeys';
import Toast from 'react-native-toast-message';
import UserService from '../../service/UserService';
import {REACT_QUERY_BASIC_USER_INFOS_KEY} from '../../storage/RectQueryKeys';
import Spinner from 'react-native-loading-spinner-overlay';
import {getInfosOfUserFromStorage} from '../../utils/getInfosOfUserFromStorage';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: () => {},
  signIn: async () => {},
  signUp: async () => {},
});

export function AuthProvider({children}: IAuthProvider) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {isFetching} = useQuery({
    enabled: false,
    queryKey: [REACT_QUERY_BASIC_USER_INFOS_KEY],
    queryFn: async () => {
      const {token} = await getInfosOfUserFromStorage();
      if (token) {
        try {
          const response = await UserService.getUserInfo(token);
          setUser(response);
          await AsyncStorage.setItem(
            ASYNC_STORAGE_USER_KEY,
            JSON.stringify(response),
          );
          return response;
        } catch (error) {
          console.error('Error fetching user info:', error);
          handleLogout();
        }
      } else {
        handleLogout();
      }
    },
  });

  const loadInfos = useCallback(async () => {
    const {token, name, email, id} = await getInfosOfUserFromStorage();
    if (token) {
      setUser(prevState => {
        if (!prevState) {
          return {token, name, id, email};
        }
        return {...prevState, token};
      });
    } else {
      handleLogout();
    }
  }, []);

  useEffect(() => {
    loadInfos();
  }, [loadInfos]);

  async function handleLogout() {
    setUser(null);
    await AsyncStorage.removeItem(ASYNC_STORAGE_USER_KEY);
  }

  async function signIn(email: string, password: string) {
    setIsLoading(true);
    try {
      const response = await AuthService.signin(email, password);
      await AsyncStorage.setItem(
        ASYNC_STORAGE_USER_KEY,
        JSON.stringify(response),
      );
      setUser(response);
    } catch (error) {
      console.error('Error signin:', error);
      Toast.show({
        type: 'error',
        text1: 'Ouve algum erro ao você tentar fazer o login!',
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
    } catch (error) {
      console.error('Error signing up:', error);
      Toast.show({
        type: 'error',
        text1: 'Ouve algum erro ao você tentar fazer o seu cadastro!',
        text2: 'Tente novamente!',
        position: 'bottom',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Toast />
      <Spinner visible={isLoading || isFetching} />
      <AuthContext.Provider
        value={{
          user,
          logout: handleLogout,
          signIn,
          signUp,
        }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
