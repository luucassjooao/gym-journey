import {NavigationContainer} from '@react-navigation/native';

import AuthRoutes from './public/auth.routes';

export function Router() {
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  );
}
