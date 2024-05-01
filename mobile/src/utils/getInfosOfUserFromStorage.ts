import AsyncStorage from '@react-native-async-storage/async-storage';
import {ASYNC_STORAGE_USER_KEY} from '../storage/AsyncStorageKeys';
import {UserType} from './types/User';

export async function getInfosOfUserFromStorage() {
  const userInfos = await AsyncStorage.getItem(ASYNC_STORAGE_USER_KEY);
  const parsedUserInfos: UserType = JSON.parse(userInfos || '{}');
  return parsedUserInfos;
}
