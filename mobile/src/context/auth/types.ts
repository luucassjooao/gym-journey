import {ReactNode} from 'react';
import {UserType} from '../../utils/types/User';

export interface IAuthProvider {
  children: ReactNode;
}

export type AuthContextType = {
  user: UserType | null;
  signIn(email: string, password: string): Promise<void>;
  signUp(name: string, email: string, password: string): Promise<void>;
  logout(): Promise<void>;
};
