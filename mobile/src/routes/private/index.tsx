import {NavigationProp} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../screen/Home';
import EditSessionInfos from '../../screen/EditSessionInfos';

export type PrivateRoutesParamList = {
  home: undefined;
  editSessionInfos: {
    idOfMusclesGroups: string | string[];
    sessionId: string;
    nameOfMusclesGroups: string | string[];
    backThePreviousScreen?: {
      idOfMusclesGroups: string | string[];
      sessionId: string;
      nameOfMusclesGroups: string | string[];
    };
  };
};

export type PrivateRouteNavitationProp = NavigationProp<PrivateRoutesParamList>;

const Private = createStackNavigator<PrivateRoutesParamList>();

export default function PrivateRoutes() {
  return (
    <Private.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
      initialRouteName="home">
      <Private.Screen name="home" component={Home} />
      <Private.Screen name="editSessionInfos" component={EditSessionInfos} />
    </Private.Navigator>
  );
}
