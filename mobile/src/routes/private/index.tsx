import {NavigationProp} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../screen/Home';
import EditSessionInfos from '../../screen/EditSessionInfos';
import { EditSessionInfosProvider } from '../../context/editSessionInfos';

export interface IRouteEditSessionInfos {
  idOfMusclesGroups: string | string[];
  sessionId: string;
  nameOfMusclesGroups: string | string[] | null;
  backThePreviousScreen?: {
    idOfMusclesGroups: IRouteEditSessionInfos['idOfMusclesGroups']
    sessionId: IRouteEditSessionInfos['sessionId'];
    nameOfMusclesGroups: IRouteEditSessionInfos['nameOfMusclesGroups']
  };
}

export type PrivateRoutesParamList = {
  home: undefined;
  editSessionInfos: IRouteEditSessionInfos;
};

export type PrivateRouteNavitationProp = NavigationProp<PrivateRoutesParamList>;

const Private = createStackNavigator<PrivateRoutesParamList>();

export default function PrivateRoutes() {
  return (
    <EditSessionInfosProvider>
      <Private.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
        }}
        initialRouteName="home">
        <Private.Screen name="home" component={Home} />
        <Private.Screen name="editSessionInfos" component={EditSessionInfos} />
      </Private.Navigator>
    </EditSessionInfosProvider>
  );
}
