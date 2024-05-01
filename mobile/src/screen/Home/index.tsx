import * as S from './styles';
import ButtonApp from '../../components/Button';
import CreateNewSession from '../../components/modais/createNewSession';
import {useState} from 'react';
import SessionService from '../../service/SessionService';
import {FlatList} from 'react-native';
import {useAuth} from '../../hooks/useAuth';
import Spinner from 'react-native-loading-spinner-overlay';
import {useNavigation} from '@react-navigation/native';
import {PrivateRouteNavitationProp} from '../../routes/private';
import {useQuery} from '@tanstack/react-query';

export default function Home() {
  const {logout} = useAuth();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const navigation = useNavigation<PrivateRouteNavitationProp>();

  const {data, isFetching, isLoading} = useQuery({
    queryKey: ['HomeSessions'],
    queryFn: async () => SessionService.getMyOwsSessions(),
    refetchInterval: 60 * 60 * 1000,
  });
  function switchModalVisible() {
    setModalVisible(prevState => prevState !== true);
  }

  return (
    <S.Container>
      <S.Text onPress={() => logout()}>EXIT</S.Text>
      <ButtonApp
        text="Criar uma nova sessao"
        onPress={() => switchModalVisible()}
      />

      <S.PreviousSessions>
        <S.Text>Suas ultimas sessoes</S.Text>

        <S.ViewFlatList>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <S.ContainerSessionDetails
                key={item.id}
                onPress={() =>
                  navigation.navigate('editSessionInfos', {
                    idOfMusclesGroups: item.targetedMuscles.map(i => i.id),
                    sessionId: item.id,
                  })
                }>
                <S.TextDetail>
                  Treino de:{' '}
                  {`${item.targetedMuscles.map(i => i.name.split('/')[0])}`}
                </S.TextDetail>
                <S.TextDetail>
                  Data: {`${new Date(item.date).toLocaleDateString()}`}
                </S.TextDetail>
              </S.ContainerSessionDetails>
            )}
            keyExtractor={item => item.id}
          />
        </S.ViewFlatList>
      </S.PreviousSessions>

      <CreateNewSession
        isModalVisible={modalVisible}
        switchModalVisible={() => switchModalVisible()}
      />
      <Spinner visible={isLoading || isFetching} />
    </S.Container>
  );
}
