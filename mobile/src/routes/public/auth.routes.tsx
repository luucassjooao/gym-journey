import {NavigationProp} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Signin} from '../../screen/Signin';
import {Signup} from '../../screen/Signup';

export type AuthRootParamList = {
  signin: any;
  signup: any;
};

export type AuthRoutesNavigationProp = NavigationProp<AuthRootParamList>;

const Auth = createStackNavigator<AuthRootParamList>();

export default function AuthRoutes() {
  return (
    <Auth.Navigator
      screenOptions={{headerShown: false, animationEnabled: true}}
      initialRouteName="signin">
      <Auth.Screen name="signin" component={Signin} />
      <Auth.Screen name="signup" component={Signup} />
    </Auth.Navigator>
  );
}
