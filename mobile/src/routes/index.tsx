import {NavigationContainer} from '@react-navigation/native';

import AuthRoutes from './public/auth.routes';
import {useAuth} from '../hooks/useAuth';
import PrivateRoutes from './private';

export function Router() {
  const {user} = useAuth();

  return (
    <NavigationContainer>
      {user ? <PrivateRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
